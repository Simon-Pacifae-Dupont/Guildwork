# The launcher on #118 — a refusal, a disposal, a launch

*Three terminal transcripts, in the order they happened. Paths and SHAs are
Lantern's. The shape of the output is the tool's; the wording of each
refusal is the wording the specification in `docs/05-launcher.md` calls
for.*

## 1. The first dry run refuses

The Product Owner runs the dry run from the primary checkout, with the
environment's interpreter spelled in full:

```
PS> C:\repos\lantern\.venv\Scripts\python.exe C:\repos\lantern\tools\mission_launcher.py 118 --dry-run
```

```
Mission #118 — #118 — [MISSION] Dashboard tiles keep their last reading while the device bridge reconnects
  https://github.com/lantern-workshop/lantern/issues/118
  primary checkout: C:\repos\lantern
  governance policy: 3f9c2d1a7b8e4c05d6f1a2b3c4d5e6f708192a3b (origin/develop, fetched at launch)
  run: launch — creates the branch and the worktree the contract declares

REFUSED — 1 refusal(s). Nothing was started.

  condition 4: a second writer would be created
      branch 'feature/dashboard-stale-reading' already exists on origin -- a writer
      already holds the branch this Mode 'one writer' mission declares, and creating
      it again locally with 'git worktree add -b' would put a second, diverging line
      on the same name; under 'one writer' that is the two-writer failure itself
```

The banner shows the number twice — `Mission #118 — #118 — [MISSION] …` —
because the launcher prints `Mission #<number> — <title>` and the title
carries its own number by convention. Known, cosmetic, and not a defect: the
convention serves the terminal list, and the terminal list is the surface
that had the problem.

The refusal is correct. Three days earlier an attempt at this lot, run on
the laptop, had been refused at review: its pull request (#120, `Mission:
#118 refused`) was closed at the refusal with the refusal recorded on it,
but the branch survived on the remote because nobody wrote a disposition
for it. Silence is debris.

## 2. The disposal

The destructive act is the Product Owner's, on its own line, with the target
named. The Chief Architect records the disposition on #120's closing
comment — *branch `feature/dashboard-stale-reading` is spent: nothing on it
survives the refusal that this comment does not record, and its journal
entry is carried by the preservation pull request #122, merged* — and hands
over the one command:

```
PS> git -C C:\repos\lantern push origin --delete feature/dashboard-stale-reading
```

The local branch never existed on this machine; the earlier attempt ran on
the laptop.

## 3. The second dry run passes

```
PS> C:\repos\lantern\.venv\Scripts\python.exe C:\repos\lantern\tools\mission_launcher.py 118 --dry-run
```

```
Mission #118 — #118 — [MISSION] Dashboard tiles keep their last reading while the device bridge reconnects
  https://github.com/lantern-workshop/lantern/issues/118
  primary checkout: C:\repos\lantern
  governance policy: 3f9c2d1a7b8e4c05d6f1a2b3c4d5e6f708192a3b (origin/develop, fetched at launch)
  run: launch — creates the branch and the worktree the contract declares

CONTRACT OK — all 7 condition(s) pass.

Commands:
  1. git -C C:\repos\lantern worktree add C:\repos\lantern-worktrees\wt-dashboard-stale-reading -b feature/dashboard-stale-reading 3f9c2d1a7b8e4c05d6f1a2b3c4d5e6f708192a3b
  2. $env:PYTHONPATH = 'C:\repos\lantern-worktrees\wt-dashboard-stale-reading\src'; C:\repos\lantern\.venv\Scripts\python.exe -m lantern guild-hi --role claude-code
  3. claude --model claude-opus-5 --effort high '<generated first instruction, 6 412 characters>'

Generated first instruction (6412 characters):
------------------------------------------------------------------------
…see first-instruction.md…
------------------------------------------------------------------------
```

Three things a reader can check off this output. The governance SHA is the
commit the worktree will be created from — command 1 names it, not the ref.
The effort flag carries `high`, the exact mapping of the contract's `HIGH`,
and the model is passed as declared; there is no flag on the launcher that
could have set either. And the first instruction is the positional prompt
of command 3: the session starts with that turn already submitted, and
nothing is pasted.

## 4. The launch

The same command without `--dry-run`. The launcher fetches again, resolves
the ref again, re-evaluates the seven conditions against whatever the tree
is *now*, and only then runs the three commands. It exits `0` when the
agent session it started exits `0`; a non-zero agent exit is reported as
`4` with the agent's own code printed, never returned.

```
PS> C:\repos\lantern\.venv\Scripts\python.exe C:\repos\lantern\tools\mission_launcher.py 118
```

## 5. What `--list` showed while it ran

From another terminal, forty minutes in:

```
PS> C:\repos\lantern\.venv\Scripts\python.exe C:\repos\lantern\tools\mission_launcher.py --list
```

```
Missions with a live process on this host (read from the process table, not the disk):

  #118  executing  claude-code  pid 21844  up 0:41:07
        branch feature/dashboard-stale-reading
        worktree C:\repos\lantern-worktrees\wt-dashboard-stale-reading
        running under model claude-opus-5, effort high

Registered worktrees whose session marker is open with no process running them:

  C:\repos\lantern-worktrees\wt-sync-export-retry  (marker written 2026-09-02T19:04:11Z by grok-build on feature/sync-export-retry)

What this list cannot see: 0 process(es) whose command line this caller may not read;
sessions started by hand (no generated instruction to match); sessions on another
machine; agents behind a wrapper process; whether a live process is making progress.
A worktree in exactly one of the two lists above is the case to look at by hand.
```

The second list is the other half of the blindness: a session opened on the
sync worktree two days ago and never closed. Its process is gone. Whether
its journal was ever written is the closeout tool's condition 1, and the
remedy it will name is the exit command, run from that worktree — not
deleting the marker.
