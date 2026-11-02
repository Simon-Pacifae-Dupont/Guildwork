---
description: "Refuse implementation unless an approved verdict covers the current spec, plan and tasks"
scripts:
  sh: ../../scripts/bash/check-prerequisites.sh --json --paths-only
  ps: ../../scripts/powershell/check-prerequisites.ps1 -Json -PathsOnly
---

# The gate before implementation

This command runs before __SPECKIT_COMMAND_IMPLEMENT__, as a mandatory hook,
and can also be run by hand. It reads. It never writes, never fixes, never
fills in a verdict, and never decides on anyone's behalf.

It checks seven conditions. It opens only when none of them fires. When one
fires, implementation does not start, and the refusal names which condition
fired, so the reader knows the one thing to do next.

## User input

```text
$ARGUMENTS
```

The input does not change what the gate checks. Nothing typed here can open it.

## Steps

1. Run `{SCRIPT}` once from the repository root and read `FEATURE_DIR`. If it
   fails, refuse under condition 1.

2. Check, in this order, and stop at the first that fires:

   | # | Fires when | Next action to name |
   |---|---|---|
   | 1 | `FEATURE_DIR/guildwork-request.md` does not exist | run __SPECKIT_COMMAND_GUILDWORK_REQUEST__ |
   | 2 | a section above **Verdict** is empty or still holds a placeholder between angle brackets (Objective, Acceptance criteria, Scope, Out of scope, Stop conditions, Risk, Who decides, Written against) | complete the request, naming the empty sections |
   | 3 | the Verdict line reads `pending` | the person under Who decides runs __SPECKIT_COMMAND_GUILDWORK_VERDICT__ |
   | 4 | the Verdict line reads `held` | change what the Reason names, rewrite the request, rule again |
   | 5 | the Verdict line reads `refused` | none: this plan does not go ahead, and that is the recorded decision |
   | 6 | the Verdict line is anything other than `pending`, `held`, `refused` or `approved`, or `By` or `On` is empty | the verdict must be recorded again with __SPECKIT_COMMAND_GUILDWORK_VERDICT__ |
   | 7 | the SHA-256 of `spec.md`, `plan.md` or `tasks.md` as they are now differs from the digest on the `Against` line | rewrite the request against the current files, and rule again |

   For condition 7, compute the digests with `sha256sum` (bash; `shasum -a 256`
   on macOS) or `(Get-FileHash -Algorithm SHA256 <path>).Hash.ToLower()`
   (PowerShell), and name every file that changed.

3. **If a condition fired**, print exactly this block, filled in, and nothing
   that suggests a way around it:

   ```text
   GUILDWORK GATE: REFUSED. Nothing was implemented.
     condition <n>: <the "fires when" text, as it applies here>
     <one line of detail: the empty sections, the reason recorded, or the files that changed>
     next: <the next action from the table>
   ```

   Then **stop the implementation**. Do not continue to the Outline of
   __SPECKIT_COMMAND_IMPLEMENT__. Do not create, modify or delete any file. Do
   not offer to approve, to edit the verdict, or to implement "just the safe
   part". End your turn.

   Under condition 5, add one line after the block: "This request was refused
   with its reason, and the register keeps it. Stopping here is the result of
   that decision, not a failure of the run."

4. **If no condition fired**, print:

   ```text
   GUILDWORK GATE: OPEN. Approved by <By> on <On>.
     against spec <first 12 hex>, plan <first 12 hex>, tasks <first 12 hex>
     scope: <the Scope section, in one line>
     stop conditions: <the Stop conditions, in one line>
   ```

   Then let __SPECKIT_COMMAND_IMPLEMENT__ continue. Its work stays inside the
   request's Scope, and it stops and reports when a Stop condition is met.

## What this gate is, and is not

It is an instruction the coding agent follows, read from files in the
repository. It is not a lock: an agent that ignores its instructions can write
code anyway. The binding control stays where it was, on the merge, held by a
person. What the gate adds is that the plan, the verdict and its reason are
written down before the code exists, and that a change to the plan after the
verdict closes it again.
