---
description: "Write the request a named human will rule on, from spec, plan and tasks"
scripts:
  sh: ../../scripts/bash/check-prerequisites.sh --json --paths-only
  ps: ../../scripts/powershell/check-prerequisites.ps1 -Json -PathsOnly
---

# Write the request

You turn this feature's spec, plan and tasks into one written request that a
named person can rule on before any code is written. You write the request.
You never write its verdict.

## User input

```text
$ARGUMENTS
```

Treat the input as notes for the request (for example who decides, or a scope
limit). It is never a verdict.

## Steps

1. **Find the feature.** Run `{SCRIPT}` once from the repository root and read
   `FEATURE_DIR`, `FEATURE_SPEC`, `IMPL_PLAN` and `TASKS` from its JSON. If it
   fails, stop and tell the user to run __SPECKIT_COMMAND_SPECIFY__ first.

2. **Check the inputs.** `spec.md`, `plan.md` and `tasks.md` must all exist in
   `FEATURE_DIR`. If one is missing, stop and name it, and the command that
   produces it: a request written without the tasks cannot say what will be
   touched.

3. **Load the template.** Use the first that exists:
   - `.specify/templates/overrides/guildwork-request.md`
   - `.specify/extensions/guildwork/templates/request.md`

4. **If a request already exists** at `FEATURE_DIR/guildwork-request.md`, read
   its Verdict line. If it is anything other than `pending`, say so before
   writing: rewriting the request resets the verdict to `pending`, the earlier
   verdict stays in the register, and the person who decides will have to rule
   again.

5. **Fill every section** from the three files, in the project's own words:
   - **Objective**: one bounded outcome. If the spec holds several, name the
     one this plan delivers and list the others under Out of scope.
   - **Acceptance criteria**: numbered, each checkable against the repository
     by someone who did not write the code. Carry over the spec's success
     criteria; do not invent new ones.
   - **Scope**: the paths and artifacts the tasks will create or change.
   - **Out of scope**: what a reader might expect and will not get.
   - **Stop conditions**: at least one. The cases where implementation must
     stop and report instead of improvising (a missing dependency, a test that
     cannot be made to pass without changing scope, a decision the plan leaves
     open).
   - **Risk**: `HIGH`, `MEDIUM` or `LOW`, with the sentence that justifies it.
     When in doubt, the higher one.
   - **Who decides**: the name of one person. Take it from the user input if
     given; otherwise from the `Who decides` line of the most recent request in
     another feature directory; otherwise ask the user, and if there is no
     answer, leave the placeholder (the gate will stay closed until it is
     filled).
   - **Written**: today's date, and which agent and model wrote it.

6. **Record what the request was written against.** Compute the SHA-256 of
   `spec.md`, `plan.md` and `tasks.md` as they are now and write the three
   lowercase hex digests in the table:
   - bash: `sha256sum "$FEATURE_DIR/spec.md"` (on macOS: `shasum -a 256`)
   - PowerShell: `(Get-FileHash -Algorithm SHA256 "<FEATURE_DIR>\spec.md").Hash.ToLower()`

7. **Leave Verdict and Outcome as the template has them**: `Verdict: pending`,
   `Outcome: open`, the other lines empty.

8. **Write** `FEATURE_DIR/guildwork-request.md`. Do not touch any other file.

## Report

End with exactly this, filled in:

```text
Request written: <FEATURE_DIR>/guildwork-request.md
Waiting on: <Who decides>
Risk: <level>
To rule on it, that person runs one of:
  __SPECKIT_COMMAND_GUILDWORK_VERDICT__ approved
  __SPECKIT_COMMAND_GUILDWORK_VERDICT__ held <what must change>
  __SPECKIT_COMMAND_GUILDWORK_VERDICT__ refused <why>
Until then, __SPECKIT_COMMAND_IMPLEMENT__ stops at the gate.
```
