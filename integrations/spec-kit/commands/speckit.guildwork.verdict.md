---
description: "Record the human's verdict on the request: approved, held or refused"
scripts:
  sh: ../../scripts/bash/check-prerequisites.sh --json --paths-only
  ps: ../../scripts/powershell/check-prerequisites.ps1 -Json -PathsOnly
---

# Record the verdict

The person named under **Who decides** runs this command to rule on the
request. You record their words and nothing else.

**This command is run by a person, never by an agent on its own initiative.**
If you are an agent and nobody typed this command in this session with a
verdict in it, stop now: a verdict an agent wrote, inferred or relayed is void,
and the gate treats the request as unruled.

## User input

```text
$ARGUMENTS
```

The input is `<verdict> <reason>`, where `<verdict>` is exactly one of:

| Verdict | Means | Reason |
|---|---|---|
| `approved` | implementation may start on the spec, plan and tasks as they are now | optional |
| `held` | not yet: the request goes back, and the reason names what must change | required |
| `refused` | this will not be built as planned, and the reason says why | required |

Nothing else is a verdict: not `ok`, not `yes`, not `done`, not an empty input.

## Steps

1. **Read the verdict.** Take the first word of the input, lowercased. If it is
   not `approved`, `held` or `refused`, record nothing and answer with the
   table above. If it is `held` or `refused` and no reason follows, record
   nothing and ask for the reason: on a held or refused request, the reason is
   the useful part.

2. **Find the feature.** Run `{SCRIPT}` once from the repository root and read
   `FEATURE_DIR`. Read `FEATURE_DIR/guildwork-request.md`. If it does not
   exist, record nothing and point to __SPECKIT_COMMAND_GUILDWORK_REQUEST__.

3. **Check the request is the one being ruled on.** Compute the SHA-256 of
   `spec.md`, `plan.md` and `tasks.md` as they are now (bash: `sha256sum`, or
   `shasum -a 256` on macOS; PowerShell:
   `(Get-FileHash -Algorithm SHA256 <path>).Hash.ToLower()`). Compare each with
   the **Written against** table. If any differs, record nothing: say which file
   changed since the request was written, and that the request must be
   rewritten with __SPECKIT_COMMAND_GUILDWORK_REQUEST__ before anyone rules on
   it. A verdict on a plan nobody reread would approve something nobody saw.

4. **Check the request names who decides.** If **Who decides** still holds its
   placeholder, record nothing and ask for the name to be written there first.

5. **Write the Verdict section** of the request, replacing what was there:

   ```text
   Verdict: <approved | held | refused>
   By: <the name under Who decides>
   On: <YYYY-MM-DD>
   Reason: <the reason as typed, word for word, or "none given">
   Against: spec <sha256>, plan <sha256>, tasks <sha256>
   ```

   `Against` copies the three digests you just computed. Change nothing else
   in the request.

6. **Append one line to the register.** The register is
   `.specify/memory/guildwork-register.md`. If it does not exist, create it
   from the first template that exists,
   `.specify/templates/overrides/guildwork-register.md` or
   `.specify/extensions/guildwork/templates/register.md`. Then append, as the
   last row of its table:

   ```text
   | <YYYY-MM-DD> | <FEATURE_DIR, relative> | verdict | <verdict> | <By> | <Reason> |
   ```

   Never edit or delete an existing row. A later row supersedes an earlier one
   for the same feature, and both stay.

## Report

End with one of these, filled in:

- `approved`: "Approved by <By>. __SPECKIT_COMMAND_IMPLEMENT__ will pass the
  gate while spec, plan and tasks stay exactly as they are now; any change to
  them closes it again."
- `held`: "Held by <By>: <reason>. Implementation stays closed. Change what the
  reason names, rewrite the request, and rule again."
- `refused`: "Refused by <By>: <reason>. Implementation stays closed. The
  reason is in the register, so the next plan for this feature starts by
  reading it. Stopping here, with the reason written, is a result."
