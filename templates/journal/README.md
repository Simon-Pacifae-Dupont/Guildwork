# Guild Journal

Append-only session records, one file per `guild-bye` invocation. The
continuity contract (`docs/guild/CONTINUITY_CONTRACT.md`) says what an entry
owes the next session; this file says what an entry looks like.

- **Read back by `guild-hi`**, which reports the latest entry relevant to the
  current branch as the session's operational state. Entries were originally
  write-only, and a fresh session recovered nothing an earlier session had
  learned. The curated handover (`docs/guild/HANDOVER.md`) remains the digest
  and is still reported — it is no longer the only voice, and the two are
  shown together under a warning when the journal is newer.
- **Never edited or deleted by tooling** once written. A correction belongs
  in a new entry, not a rewrite of an old one.
- **Filename**: `<UTC timestamp>-<role slug>-<short head sha>.md`, e.g.
  `20260902T174420Z-claude-code-8b1e0f3.md`. Sorts chronologically by
  default filesystem ordering, and that is what `guild-hi` orders by — not a
  filesystem mtime, which a fresh clone rewrites.

## Entry format 2

An identity header, then one `## ` section per field that has content. Only
the six original fields — Confirmed, Changed, Uncertain, Evidence, Next
decision owner, Smallest next action — are always present; the rest appear
when they say something. `ENTRY.md` beside this file is the skeleton.

```
# Guild Handover — <role title> — <UTC timestamp>

Branch: <branch> @ <head short sha>
Entry snapshot: <resolved | missing — recovered handover>
Work state: <complete | incomplete>
Handover format: 2

## Milestone
## Confirmed
## Changed
## Decisions
## Findings
## Uncertain
## Open decisions and blockers
## Evidence
## Artifacts
## Authoritative documents
## Stale or conflicting documents
## PR state
## Next decision owner
## Smallest next action
## Conversation-only knowledge not yet preserved
```

**Section content is not bounded to a line or to a summary.** The earlier
format was six `Key: value` lines capped at 400 characters each, fatally —
and the cap cost real operational knowledge, which is why the format changed.
What a reader sees at `guild-hi` is truncated *for display*, from the full
text, which stays here.

A heading in that list is a parse contract: the entry reader locates content
by it. Renaming one is a format change, not an edit.

## Format 1 entries still work

Entries written before format 2 carry their content as header `Key: value`
lines. The parser reads sections first and falls back to those keys, so every
historical entry still yields its fields — including its smallest next action. Nothing was
migrated and nothing was rewritten; append-only is untouched.

A session with no durable change still produces an entry — the six required
fields read `(no durable change this session)` rather than being silently
skipped. `guild-hi` steps over such an entry when looking for the current
operational state: a session that changed nothing did not retract the previous
session's smallest next action.
