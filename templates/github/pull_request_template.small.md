<!--
The light template, for small deliveries only: documentation, governance text
that changes no rule, or a pure copy. No code, tests, migrations, CI or
templates, and a handful of files. Anything else uses the full template.
`docs/guild/MISSION_WORKFLOW.md` says when this one applies.

Every section below is mandatory. Do not delete a section: if it does not
apply, say so in one line.
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
are now closed. `refused` says this delivery was refused, and a refused
delivery is closed at the refusal, never left open.

An optional note for the reader may follow after a colon. Nothing parses it.

The check is advisory: it does not block a merge, and a pull request with no
line does not fail it.
-->

Mission: #<issue>

## What changed

Each file, and in a line why it changed. A few lines in all.

## How it was verified

The commands as run and what they printed, or `pure copy: verified by hash`
with the hash compared on each side.

## Execution parameters

One line: the model and effort this work actually ran under, and how the
session was started (the launcher, the launcher with `--resume`, or by hand
with the command named).

## Merge authority

- [ ] delegated routine merge (Product Owner standing ruling, recorded on the delegation issue)
- [ ] reserved Product Owner gate: `<name the gate>`, witness: `<seat>`, verdict: `<verdict>`

## Journal

The path of this session's journal entry.
