<!--
The mission issue is the contract; this pull request is the delivery surface.
Every section below is mandatory. Do not delete a section — if it does not
apply, say so in one line. "Validation — not run" in particular exists to be
filled, not removed.
-->

## Mission

<!--
One `Mission:` line, on its own line, in this section. It names the contract and
the state this delivery is in. `tools/ci/check_mission_line.py` reads it, and
`docs/guild/MISSION_WORKFLOW.md` §7 specifies it.

    Mission: #<issue>                                 the same as `delivers`
    Mission: #<issue> delivers
    Mission: #<issue> supersedes #<pr>[, #<pr> ...]
    Mission: #<issue> refused

`supersedes` says this pull request carries the content of pull requests that
are now closed. `refused` says this delivery was refused — and a refused
delivery is closed at the refusal, never left open.

An optional note for the reader may follow after ` — `. Nothing parses it.

The check is advisory: it does not block a merge, and a pull request with no
line does not fail it.
-->

Mission: #<issue>

Use `Closes #<issue>` as well only when the issue should auto-close on merge —
in a topology where deliveries merge into an integration branch it usually does
not work, and the closeout tool closes the contract from this line instead.

## Base / head

Base branch, head branch, worktree path, and the base SHA the work started from.

## Execution parameters

The model and the effort this work actually ran under, and how the session was
started: `tools/mission_launcher.py`, `tools/mission_launcher.py --resume`, or
by hand — name the command in that last case. State what ran, not what the
contract declares; where the two differ, that difference is the point of this
section. A corrective pass names its own parameters, not the first pass's.

## Files changed

Summary by area, not a diff dump.

## Validation — run

Exact commands, counts, durations and the commit-ish they ran against. Verdict
per command, using one of: `PASS` / `FAIL` / `TIMEOUT` / `ABORTED` / `NO VERDICT`.
Distinguish pre-existing failures from introduced ones, with evidence.

## Validation — not run

What was deliberately skipped and why. Write `nothing skipped` if that is true.

## Evidence

Load-bearing and mutation evidence, cited as repository paths — not pasted logs.

## Safety and governance invariants

- [ ] No product, runtime or safety code touched beyond the mission scope
- [ ] No mass staging — explicit paths only, staged set audited before commit
- [ ] One writer — no second writer and no unauthorized subagent
- [ ] Scope matches the mission issue

## Residual risks

List them, or write `none` explicitly.

## Merge authority

- [ ] delegated routine merge (Product Owner standing ruling, recorded on the delegation issue)
- [ ] reserved Product Owner gate: `<name the gate>`

## Report target

Where the transmission report goes, and whether it has been posted yet.
