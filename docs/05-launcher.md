# The launcher — specification

*A fail-closed tool that reads a mission issue by number, checks the contract
it declares against the governance at the commit the mission will run on,
and refuses to start anything when the contract does not check out.*

This is a specification. The pack ships no code: the behaviour below is what
the tool on the source project does, stated precisely enough to be
re-implemented or audited. Where a number is quoted, it is the source
project's.

## What a launch is

```
tools/mission_launcher.py <issue>            launch
tools/mission_launcher.py <issue> --dry-run  print every refusal that would fire and every command that would run; start nothing
tools/mission_launcher.py <issue> --resume   rejoin the worktree of a returned lot instead of creating one
tools/mission_launcher.py --list             list the missions running on this host, from the process table
```

On a clean contract the launcher performs, in order, what an operator would
otherwise type:

1. `git fetch origin`, **before** the contract is read;
2. resolve the governance ref (`origin/develop`) to a commit, once;
3. read the mission form, the capability table and the role profiles **out of
   that commit** (`git show <sha>:<path>`), never from a working tree;
4. read the mission issue from GitHub by number — body, title, state,
   comments;
5. evaluate the seven conditions;
6. create the branch and the worktree **from that same commit**;
7. export the source path so the worktree's session resolves its own
   source and not the primary checkout's;
8. run the entry command (`guild-hi --role <declared role>`) in the worktree;
9. start the declared harness with the declared model and the mapped effort,
   passing a **first instruction generated from the issue** as the positional
   prompt — which starts an interactive session with that turn already
   submitted. There is no paste.

The worktree is created from the same SHA the conditions measured, so the
revision the contract was validated against and the revision the mission
executes on are one object, not two that happen to agree. **The SHA is
printed** on the refused path and the accepted one, in the report and beside
the contract block of the generated instruction. Before it was, a mission was
launched with a flag that had been removed on the branch it ran from, from a
primary checkout six commits behind the remote; and on another day an
uncommitted edit to the capability document became the policy every mission
was validated against, and it existed on one disk. `--dry-run` runs the fetch
too: a dry run that measured a stale ref would print a verdict the real
launch would not use.

`--repo-root` overrides that read for the tests and for a deliberate local
run against uncommitted governance. It is the only path whose policy comes
off a disk, **and the report says so in those words** — an override that
rendered identically to a pinned run would be the same defect with a
friendlier face. A policy file that cannot be reached at the pinned commit
is a stop, never a fallback.

## The seven conditions

Every condition can refuse, and the message names which one fired.

| # | Condition | Why it is a refusal |
|---|---|---|
| 1 | a required field is absent or ambiguous | a mission that cannot state its own terms is not a contract |
| 2 | the declared `Agent`, `Model` or `Effort` is not available in this environment | launching at a different effort — or under a different prompt — than declared is the drift this exists to stop |
| 3 | the declared `Guild role` is not a known role | the demonstrated failure: a session entered as one role where the issue said another |
| 4 | a second writer would be created | the one-writer invariant, checked rather than trusted |
| 5 | the named `Agent` does not satisfy every declared capability | the capability table, read at runtime |
| 6 | a comment sets a field the issue body is the contract for | the amendment channel operates after validation, on text no condition read |
| 7 | the mission title names a different issue | the number leading a mission title is how the contract is found in a wall of terminals, and one title carried another mission's number for a whole mission |

**A condition that could not be evaluated blocks exactly as a refusal does.**
An unevaluated check is not a passing check, and the report names which one
and why. The form itself is checked the same way: a template that yields no
field, and a field id a condition addresses that the form no longer declares,
are both refusals under condition 1 — a renamed field is otherwise a
condition that quietly stops being evaluated.

**Three sources are read at runtime and never copied into the tool**: the
form supplies the fields and the option vocabulary; the capability document
supplies the table; the profiles directory supplies the role slugs. A
constant would agree with itself.

### Condition 1 — the contract states its own terms

Every required field is present, and every dropdown value is one the form
offers — matched against the options the form declares at the governance
commit, never taken as prose. `Branch and worktree` must split into two
halves. An optional field is never read at all: its value reaches neither
the contract nor the generated instruction, set or unset, which is why the
human reads `Screen demand` and `Host` on the issue before he launches, and
the launcher never prints them back to him.

### Condition 2 — the seat, the effort, the model, the profile

Four halves, and they are not the same check.

- **The seat is startable.** The `Agent` value must have a row in the
  launcher's seat table, and that row must be a startable seat rather than a
  recorded reason it cannot be started. A value with no row is refused
  naming it: a form value the launcher silently cannot start is the defect
  the table was built to repair. Each row carries the executable, the model
  flag, the effort flag, the model shape and the effort levels *that seat
  was measured to carry* — data, not branching prose.
- **The effort is one the seat carries.** Checked only for a pinned level,
  since `AUTO` passes no flag and has nothing to verify. The levels are
  declared constants because parsing the CLI's `--help` for them was tried
  and failed silently: a CLI that publishes no list yielded an empty
  vocabulary, which refused every pinned contract for that seat, and six
  missions ran by hand in one day as a result. The program names its own set
  when it rejects a value; that is where the constants came from, verified
  by exercise and recorded beside the constant.
- **The model has the right shape** — an alias the CLI's own help names, or
  a full name of the shape that seat accepts. Neither mapped CLI enumerates
  its models, so a well-formed identifier passes condition 2 and can still
  fail to resolve when the session starts; the CLI stays the authority on
  that. A shape rule that belonged to one CLI was once applied to another
  seat's contract, which is how a mission came to be refused for carrying a
  model name of exactly the right vendor.
- **A seat that loads a profile is not resolved until the file is.** The
  profile is read **before anything starts**, from the governance commit:
  present, readable, and declaring in its own front matter the name the
  `Agent` field maps onto. Three refusals, none of them a warning printed
  over a started run. The launcher does this because the CLI does not: given
  a profile path that does not exist, the harness in question exits `0` with
  an empty stderr and silently runs the default agent, byte for byte — so a
  mission contracted for the Domain Expert and quietly executed by the
  default agent would sign a transmission report with a seat that never ran.
  And the *regime* is part of the claim: the bare-name form loads a profile
  headless and loads nothing in the interactive terminal, with no error, no
  stderr and no failure line even in the CLI's own debug log. The launcher
  looks the (regime, argument form) pair up in a measured table, and every
  profile refusal names the regime it assumed.

### Condition 3 — the role exists

The declared `Guild role` is one of the profile slugs in the repository at
the governance commit, or the internal-worker sentinel.

### Condition 4 — one writer, checked rather than trusted

On the entry path: the declared branch does not exist, the declared worktree
is not registered, and its path is not a non-empty directory. Condition 4
refuses when the writer *this* mission declares already exists; it does not
establish the repository-wide ceiling, because no lock exists to establish
it with, and it says so.

**Condition 4 also warns, in exactly one case, and the warning is not a
refusal.** A `read-only` contract whose declared seat runs on a CLI with no
read-only mode — the state of every startable seat on the source project —
produces a warning rather than a refusal. The verdict deliberately does not
count it: *a warning that blocked would be a refusal wearing another word,
and a refusal that only printed would be the fail-open this launcher exists
to refuse.* The sentence is fixed, it travels with the seat's own
measurement, and it is quoted into the generated first instruction, which
obliges the seat to repeat it in its transmission report. A warning that
lived only in scrollback is the failure this repository kept rediscovering.

**Condition 4 evaluates both modes.** Its early return for `read-only` was
harmless while such a mission got a detached worktree; now that every
mission gets the branch its contract names, a read-only mission whose branch
already existed would fail at `git worktree add` instead — outside the
numbered refusals, in a tool whose contract is that a refusal names which
condition fired.

### Condition 5 — the seat can do what the contract requires

Every declared capability, matched exactly against the seat's row of the
capability table, read from the governance commit. `unknown` routes as
cannot. The bridge between the runtime names the table uses and the harness
names the form uses drops a row's trailing qualifier and requires the result
to name exactly one row; anything else is `unknown` on all three, which
fails closed.

### Condition 6 — the body is the contract

The protected set is derived from the form: *every field a condition
addresses by name, plus every dropdown.* A comment is refused when a line
both reads as setting a protected field and names a value that field would
take — and is not refused when it names the value the body already declares,
because a transmission report quotes the contract block. The refusal names
the comment URL and the field. The generated instruction then states what
was checked, rather than certifying the result: a guard that is missing is a
gap; a guard that reports having run is worse.

### Condition 7 — the title's own number

The number leading the title is compared against the issue it sits on —
never merely matched as a shape. A title leading with *another* issue's
number is refused. A title leading with **no** number warns and does not
block, since GitHub assigns the number after the body is written; that is
the drafting state, not a defect.

## The third warning is nobody's condition

The launcher reads the issue's state on the call it already makes, and warns
when the state is anything but open. It is **not an eighth condition**: it is
appended after the seven have run, carries no condition number, changes no
exit code, and a closed issue whose seven conditions pass still starts. Three
closed issues once returned *contract OK* with nothing saying so, and a
second run of any of them would have produced a branch, a worktree and a
delivery indistinguishable from a first. Why warn rather than refuse: a
refusal does not prevent the mission, it moves it outside the gate — and a
hard refusal would push a legitimate relaunch, a contract closed in error, or
a re-run after a revert out to where the by-hand missions ran. It fires on
`--resume` too: which door a run comes through changes nothing about what
state the issue is in.

## The generated first instruction

Built from the issue rather than composed. It carries, in order:

- who the seat is: the mission number, the role, and that this instruction
  was generated from the issue and does not replace it;
- on a resume, that this is a corrective pass, and the return comment that
  authorises it — by URL, with older returns listed as history;
- the issue URL, and one command that prints every comment with the URL it
  came from (not one command per comment keyed by an id the REST endpoint
  answers 404 for — the generated command has to run, not merely look
  plausible);
- **the contract block** as the form declares it: every dropdown and input
  the launcher read, the resolved branch and worktree path, the governance
  SHA, and the profile if one was resolved — with its declared name and the
  regime it was loaded in;
- the read-only warning where it applies, the title warning, the
  closed-contract warning, and a sentence naming which fields the comment
  check stood over;
- every prose section of the issue, **verbatim**;
- the entry transcript, already performed, with the instruction not to run
  the entry command again — a second run overwrites the snapshot the exit
  command compares against — and to close with exactly one exit command;
- the obligation to post the transmission report before closing, **naming
  the execution parameters in it**: model, effort, profile, and how the
  session was started — *state what actually ran, and say so plainly if it
  is not what this instruction names.*

An entry transcript longer than a fixed budget is truncated with a marker
saying where the cut fell and how to read the rest — and if the cut took the
preservation census, the census is re-attached after the marker, once, so
the seat reads it in the order the entry printed it.

## `--resume` — the return door, and what it is not

A lot handed back for a corrective pass already has its branch and its
worktree, which on the entry path is exactly what condition 4 refuses.
Before the door existed there was no governed way to resume, and the routine
path was the ungoverned one: two of four lots handled on one day were
returned, both resumes ran outside the launcher, and at least one corrective
pass executed on the CLI's default model rather than the model its contract
declared. Nothing reported the substitution.

**`--resume` is not permission to bypass condition 4. It is the distinction
condition 4 cannot otherwise draw** — between a *second* writer and *the
same* writer resuming, which are identical in every observable the entry
path has. It supplies two:

- **the issue carries a return** — one of its comments opens with the word
  `Returned`, which is the shape the board already writes;
- **the workspace is idle** — the entry command writes a session marker and
  the exit command deletes it, so a session still running, or that died
  without closing, leaves the marker behind and the resume refuses.

**The newest return is the one that governs.** A lot returned twice carries
two returns, and the older carries instructions the newer replaced; a resume
authorised by the superseded one puts a seat to work from a contract nobody
currently holds. The launcher orders every return by its creation time and
hands the seat the most recent; the report and the instruction both name the
comment that was read and say how many older ones were passed over. Until
that rule the reader took the first match on the order the API delivered,
which meant the oldest governed.

**The return is the permission; the closed session is the evidence.** A
comment says nothing about a session still mid-turn, so neither half stands
alone. Both are refusals of condition 4, alongside four more: the declared
worktree must be registered on the declared branch — a detached one fails
for its own named reason — its registered path must still be a directory, no
second worktree may hold that branch, and the branch must exist locally. The
limit is stated rather than hidden: the marker proves no *Guild session* is
open, never that no process is running, and an agent started in that
directory by hand leaves no trace the machine can read.

**A refused resume names its obstacle in full.** Where the workspace is not
idle, the refusal prints the marker's absolute path, the worktree it sits in
and the branch that worktree is registered on, then every field the marker
carries — role, branch, head SHA, timestamp, working-tree fingerprint — so
the operator reads what the obstacle *says*. Three missions were once
resumed at the cost of a file deleted by hand each, because the refusal
named a directory and a relative filename in two clauses of one sentence. It
then offers the remedy in the right order: the exit command, run from that
worktree, which writes the journal entry and only then deletes the marker;
and below it, the exact removal command for this shell if the operator has
established that no session is running there. **That judgement is his.**
The marker carries no pid and no host, so the launcher cannot tell whether
the session that wrote it is alive, and its timestamp is not a substitute.
Doubt cuts toward refusing.

**Nothing is removed.** `--resume` creates nothing and deletes nothing, and
a launcher that cleared its own liveness marker to get past its own refusal
would have removed the protection rather than the obstacle. A failed resume
is offered no removal command for the worktree or the branch: those hold the
work it came back for, and this tool created neither.

Every other condition is evaluated unchanged, by the same code in the same
order. What follows validation is the launch sequence minus its first step
— no `git worktree add`, then the same entry command and the same seat
command, built from the same contract by the same function. **There is no
flag that sets the model or the effort, on either path**: a parameter an
operator can type is a parameter an operator can forget.

## `--list` — the process table, and what it cannot see

The session marker cannot tell you whether anything is running: it says a
session was opened and not closed — whether the process that opened it is
alive or died an hour ago. On one night that gap cost both errors at once. A
live session was declared dead because it had pushed nothing for twenty
minutes, and had its branch and worktree destroyed underneath it; in the same
window, a session believed finished had been running for an hour and three
quarters.

`--list` answers the other half. It reads the process table and reports
every mission with a live process: the number, the verb, the role, the pid,
how long it has been up, its branch and worktree, and the model and effort
it is **actually** running under. Identification is the generated first
instruction, which the launcher passes as the positional prompt and which
therefore stays in the process's own argument list for as long as it runs.
It starts nothing, asks GitHub nothing, and takes no issue number. Beside
that it prints the registered worktrees whose session marker is open with no
process running them — the other half of the blindness.

**What it cannot see, and it says so in its own output**, because a list
that is silently incomplete is worse than no list: a process whose command
line this caller may not read (the count is printed); a session started by
hand, since only the launcher writes a generated instruction; a session on
another machine; an agent reached through a wrapper process; and whether a
live process is *working* — it proves a process exists with that argument
list, not that it is making progress.

**Neither read is the other's proof.** A worktree in both lists is
agreement; a worktree in exactly one is the case to look at by hand, and the
two lists are printed together so the comparison does not depend on anybody
remembering to make it.

## Exit codes

The exit code describes the launcher's own outcome, never the agent's.

| Code | Means |
|---|---|
| `0` | the launcher did what it was asked; on a real launch, the agent session it started also exited 0 |
| `1` | it could not proceed — an input it needs could not be read, or a step it runs itself failed |
| `2` | the contract did not check out; nothing was started |
| `4` | the agent session ran and exited non-zero; its own return code is printed rather than returned |

`3` is skipped deliberately: on the source project it already reads as
*nothing failed, the operator must act* (`guild-bye`'s `INCOMPLETE`),
and an agent session that exited non-zero is a failure. The agent's return
code is printed and not returned because returning it would put it in the
same space as these: a refusal and an agent that happened to exit `2` would
be one value, and no wrapper, script or CI step could tell them apart.
Disjoint by construction, not by the improbability of a collision.

## Three standing rules that travel with the launch

- **The interpreter is the environment's, spelled in full.** A bare `python`
  in a bare shell on the developer machine resolves to a store stub and the
  launcher does not start — observed, not inferred.
- **The source path is exported before any invocation.** Worktrees borrow the
  primary checkout's environment, and without the export a worktree session
  silently reads another checkout's code.
- **Pushes from a worktree go by an explicit branch-to-branch refspec**,
  never a bare push. A worktree branch's upstream is the integration branch,
  so a bare push aims at the integration branch rather than at the branch
  you are on. The rule stands regardless of protection state.

Staging is explicit-path only; `git add -A`, `git add .` and `git add -u`
are refused by the harness's own settings, and the refusal is a guard rail
rather than the rule.

## Launch instructions are the launcher's or they are manual — never both

The launcher creates the worktree and the branch itself. Handing over a
manual `git worktree add` *and then* the launcher command for the same
mission guarantees the condition-4 refusal, because by the time the launcher
runs, the worktree and the branch it was going to create already exist. The
refusal is correct; the wasted step is entirely in the instructions. Write
one route or the other.

## The launcher is opt-in, and that is a decision

Nothing forces a mission through it. A mission may still be started by the
commands the launcher runs, typed by hand — and everything the launcher
enforces is then enforced by whoever types them. The day the launcher
becomes the mandatory path is a decision, not an implementation, and on the
source project it was taken in practice before it was taken in writing:
every mission passes through the launcher, the profile seats included, and
the sentence saying it is opt-in stands until the ruling that retires it is
recorded.
