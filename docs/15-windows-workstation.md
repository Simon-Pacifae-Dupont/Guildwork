# A Windows workstation

*What breaks when agents run missions on a Windows workstation, and the fix
for each: two shells, three encodings, no administrator rights, a launched
session with the wrong PATH, agent CLIs that do not start, browsers that do
not start, and windows nobody asked for.*

The kit's tools are specified against a Windows developer machine, and most
of what goes wrong there goes wrong silently: a script runs and rewrites a
file with every accent doubled, a pattern compiles and never matches, a
session starts and skips the test it could not find. None of these is an
agent error. Each is a property of the workstation that nobody had measured,
and each was measured the day it cost something.

Every entry has the same four parts. **Symptom** is what was seen.
**Cause** is what was actually happening. **Fix** is the rule, and the
command where one exists. **Paid by** names the incident, anonymised.

## Two PowerShells

**Symptom.** A command that works in one terminal fails in another with
*The token '&&' is not a valid statement separator in this version.* The
same script behaves differently by hand and under a scheduled task.

**Cause.** Windows PowerShell 5.1 (`powershell.exe`) and PowerShell 7
(`pwsh.exe`) are two programs, installed side by side. Scheduled tasks,
shortcuts and many tools start 5.1 by default, whatever the human uses. In
5.1, `&&` and `||` are syntax errors.

**Fix.** Chain with `;`, which both versions accept. Name the executable in
full wherever a shell is started for an agent or a task, so the version is
a decision rather than a default. A command handed to a human is one per
block, with absolute paths, and carries no state from the block before it:
no `cd`, no shell variable set earlier. The human often opens a new
terminal for each command, and the one he opens may not be the version the
author had in mind.

**Paid by.** The source project, September 2026: a chained command handed
to the human stopped on the `&&` error in a window that was running 5.1.

## Text rewritten in the wrong encoding

**Symptom.** After a script edits a file, every accented character in it is
doubled (`é` becomes `Ã©`) and the diff touches every line that held one.

**Cause.** In 5.1, `Get-Content` reads a UTF-8 file that has no byte-order
mark as the ANSI code page, and `Set-Content` writes back what it read. The
bytes were never misread by the file system; they were misread by the
script, then written down as if correct. 5.1 reads its own scripts the same
way, so an accented literal inside a `.ps1` file saved without a BOM is
already something else by the time the script runs.

**Fix.** Never transform text with `Get-Content` / `Set-Content`. Read and
write through .NET with an explicit encoding:

```
$utf8 = New-Object System.Text.UTF8Encoding $false
$text = [IO.File]::ReadAllText('C:\repo\docs\page.md', $utf8)
[IO.File]::WriteAllText('C:\repo\docs\page.md', $text, $utf8)
```

or have the agent write the file with its own file tool, or copy whole
files rather than transforming them. Scripts that 5.1 runs are kept pure
ASCII: a non-ASCII character is written as `[char]0xC0` in code, or as
`\u00C0` inside a regular expression, never as a literal.

**Paid by.** The source project, 7 September 2026: one script corrupted
seven files of a published repository in a single run. The repair was a
`git revert`; the rule is that nothing on the workstation transforms text
through those two cmdlets again.

## Native output decoded as OEM

**Symptom.** A watcher that matches issue titles against `^\[À …\]` never
fires, although the titles are there. Printed from the script, the `À`
comes back as another character.

**Cause.** PowerShell decodes the output of native programs (`gh`, `git`,
any `.exe`) with the console's output encoding, which defaults to the OEM
code page. `gh` writes UTF-8. Every non-ASCII character in a title, a body
or a label name is decoded wrongly before the script sees it, and a pattern
written correctly matches nothing.

**Fix.** At the top of every script that reads a native program's output:

```
[Console]::OutputEncoding = New-Object System.Text.UTF8Encoding $false
$OutputEncoding = New-Object System.Text.UTF8Encoding $false
```

The first line governs how the output is decoded; the second, how
PowerShell encodes what it pipes into a native program. Write the pattern
itself in ASCII, as the previous entry says.

**Paid by.** A client installation, October 2026: a watcher matched
nothing for as long as the titles carried an accented capital.

## No administrator rights

**Symptom.** `corepack enable` fails with a permission error. A test suite
that needs a database has no database server to talk to, and installing one
needs rights the human does not have.

**Cause.** On a locked-down workstation the account is not an
administrator. `corepack enable` writes shims next to the Node installation,
which is a protected directory. A database installed the usual way is a
Windows service, which is installed by an administrator.

**Fix.** Do not enable corepack: call it. `corepack pnpm install` and
`corepack pnpm test` use the pnpm version pinned in the `packageManager`
field of `package.json`, and need no shim. For a test database, use the
portable archive of PostgreSQL rather than the installer: unpack it in the
user's own directories, `initdb` a data directory, and start it with
`pg_ctl`, with no Windows service, listening on `127.0.0.1` only. Nothing
outside the machine can reach it, and nothing needs elevation.

**Paid by.** A client installation, October 2026.

## The launched session cannot find its tools

**Symptom.** A mission session, started by the launcher in a new Windows
Terminal tab (`wt`), reports that `node` or `pnpm` is not recognised, and
cannot run its own test. The architect seat ran the test in its place.

**Cause.** The session's PATH is whatever the new tab gives it, not what
the launcher's own shell had. Nothing checked it on the way in, so the gap
was found halfway through the mission, by the one step that needed the
tool.

**Fix.** Make the session's PATH explicit: the launcher, or the seat's
profile, carries the tool directories into the session it starts. And at
entry, before any work, the session checks for the tools its contract will
need (`where node`, `where pnpm`, or the project's own equivalents) and
stops with a message naming the missing tool. A session that cannot run its
tests stops; it does not skip them and report the rest. This is the same
rule as *the interpreter is the environment's, spelled in full*, in
`05-launcher.md`, extended to every tool a mission calls.

**Paid by.** A client installation, October 2026: a test the contract
required was run by another seat than the one that wrote the code, because
the writing seat could not find the runtime.

## Agent CLIs that do not start their sandbox

**Symptom.** An agent CLI installed through `winget` starts, then fails as
soon as it runs a command, with `helper_unknown_error` from its sandbox.

**Cause.** The same agent ships more than one way, and the packages are not
equivalent on a given machine. The `winget` build of the Codex CLI could not
start its sandbox on that workstation; the `codex.exe` shipped inside the
Codex desktop app could.

**Fix.** Probe every agent CLI before a mission relies on it: its
`--version`, then one trivial read-only run in a scratch directory. Record
what works (which executable, which path, which flag) in the capability
table, with how and when it was observed (`04-capabilities-and-routing.md`).
On that workstation the witness ran through the desktop app's `codex.exe`,
with `--no-daemon`, and that is the line the table carries. A CLI nobody has
probed is `unknown`, and `unknown` routes as cannot.

**Paid by.** A client installation, October 2026: a witness seat could not
run until another build of the same CLI was found on the machine.

## Browsers for end-to-end tests

**Symptom.** The end-to-end suite fails before any test runs, on Firefox
only, with `spawn UNKNOWN`. Elsewhere, a test that passes on the workstation
fails in CI for want of a program.

**Cause.** Playwright's Firefox did not start on that workstation; Chromium
and WebKit did. Separately, a test called `pg_dump.exe` by that name (a
Windows-only binary, hard-coded), and a Linux CI runner has `pg_dump` and
no `.exe`.

**Fix.** The suite runs Chromium and WebKit by default, and Firefox only
when asked for by name. A test that calls a native binary picks the name by
platform:

```
const pgDump = process.platform === "win32" ? "pg_dump.exe" : "pg_dump";
```

A test that can only run on Windows says so, and is skipped elsewhere with
the reason printed, rather than failing in CI as if it were broken.

**Paid by.** A client installation, October 2026.

## Scheduled tasks, and what the human actually sees

**Symptom.** A watcher scheduled every minute flashes a console window on
the screen every minute. And a notification asking the human for a decision
is gone before he is back at the desk.

**Cause.** A scheduled task that starts `powershell.exe` gets a console
window, even with `-WindowStyle Hidden`, which hides it only once it has
been drawn. A notification balloon stays on screen for about fifteen
seconds, then disappears.

**Fix.** Start the task through a console host with no window:

```
conhost.exe --headless powershell.exe -NoProfile -File C:\tools\watcher.ps1
```

And split what is shown from what is owed. Information may go in a balloon,
since missing it costs nothing. A decision reminder stays on screen until
it is clicked, because a reminder that can be missed is a decision that can
be missed. Note that a task running without a desktop is not an interactive
session: `04-capabilities-and-routing.md` says what that changes for any
mission that measures the screen.

**Paid by.** A client installation, October 2026: a watcher that flashed a
window every minute, and a decision prompt shown while nobody was there to
read it.

## Once, on a new workstation

- `$PSVersionTable.PSVersion` in each shell agents and tasks will use; note which is 5.1.
- No `&&` in any command, script or handover a 5.1 shell may run; `;` instead.
- No `Get-Content` / `Set-Content` on text; `[IO.File]` with `UTF8Encoding $false`.
- Every `.ps1` that 5.1 runs is pure ASCII.
- Both output-encoding lines at the top of every script that reads `gh` or `git`.
- `corepack pnpm --version` answers, without administrator rights.
- The test database runs from the portable archive, on `127.0.0.1`, with no service.
- `where node` and `where pnpm` answer in a tab opened the way the launcher opens one.
- Every agent CLI probed, and its working executable recorded in the capability table.
- Playwright's default browsers start; Firefox is opt-in.
- No test hard-codes a Windows-only binary name.
- Every scheduled task starts headless; every decision reminder stays until clicked.

**See also** `05-launcher.md` (the launch, and the standing rules that
travel with it) · `06-session-cycle.md` (entry and exit) ·
`04-capabilities-and-routing.md` (the capability table).
