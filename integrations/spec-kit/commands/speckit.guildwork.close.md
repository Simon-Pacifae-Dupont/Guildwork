---
description: "Close the run on a typed verdict: delivered, partial or stopped"
scripts:
  sh: ../../scripts/bash/check-prerequisites.sh --json --paths-only
  ps: ../../scripts/powershell/check-prerequisites.ps1 -Json -PathsOnly
---

# Close the run

An implementation run ends on one of three verdicts, checked criterion by
criterion against the request. It never ends on "done", "complete" or
"finished": those say a run stopped, not what it delivered.

## User input

```text
$ARGUMENTS
```

Treat the input as notes from the user about the run (for example a criterion
they checked by hand). It does not choose the verdict for you: the evidence
does.

## The three verdicts

| Outcome | When | What it must carry |
|---|---|---|
| `delivered` | every acceptance criterion is met | for each criterion, the evidence: a test and its result, a command and its output, a file and line |
| `partial` | some criteria are met, at least one is not | the evidence for each one met; for each one not met, why, and where it goes next (a new request, or a row in the register) |
| `stopped` | a stop condition fired, or the run could not go on | the condition that fired, what was learned, and what the worktree holds that is not committed |

A run that stopped, with its condition and what it learned written down, is a
result. The next request for the same feature starts from it instead of
repeating it.

## Steps

1. Run `{SCRIPT}` once from the repository root and read `FEATURE_DIR`. Read
   `FEATURE_DIR/guildwork-request.md`. If it does not exist, say that this run
   had no written request, write nothing, and stop.

2. If its Verdict is not `approved`, say so plainly at the top of your report:
   code was written without an approved verdict. Close the run anyway, because
   what happened has to be on record.

3. Go through the **Acceptance criteria** one by one. For each, decide met or
   not met, and name the evidence you checked in this session. A criterion you
   did not check is not met.

4. Choose the outcome from the table. If any Stop condition fired, it is
   `stopped`, whatever else was met.

5. **Write the Outcome section** of the request, replacing what was there:

   ```text
   Outcome: <delivered | partial | stopped>
   On: <YYYY-MM-DD>
   Criteria: <1 met (evidence) · 2 met (evidence) · 3 not met (why) ...>
   Next: <for partial and stopped: where each unmet criterion goes; for delivered: none>
   ```

   Change nothing else in the request.

6. **Append one line to the register** at `.specify/memory/guildwork-register.md`
   (create it from `.specify/templates/overrides/guildwork-register.md` or
   `.specify/extensions/guildwork/templates/register.md` if it does not exist):

   ```text
   | <YYYY-MM-DD> | <FEATURE_DIR, relative> | close | <outcome> | <agent and model> | <criteria met>/<criteria total>; <the stop condition, or the first unmet criterion, or "all criteria met"> |
   ```

   Never edit or delete an existing row.

## Report

End with the Outcome block you wrote, then one line: for `delivered`, the
evidence a reviewer should open first; for `partial` and `stopped`, the next
action, and who owns it.
