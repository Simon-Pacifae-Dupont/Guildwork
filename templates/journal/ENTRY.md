# Guild Handover — <role title> — <UTC timestamp>

Branch: <branch> @ <head short sha>
Entry snapshot: <resolved | missing — recovered handover>
Work state: <complete | incomplete>
Handover format: 2

## Milestone

<optional — the named step this session reached>

## Confirmed

<required when state changed — what was verified true, with the command or path that shows it>

## Changed

<required when state changed — completed work, by file and by effect>

## Decisions

<optional — decisions made this session, each with who made it and where it is recorded>

## Findings

<optional, and unbounded in practice — what was learned; a finding that changes the next action, a blocking decision, scope, behaviour or risk belongs here or in a durable artefact, never only in the conversation>

## Uncertain

<required when state changed — what was not verified, and what would verify it>

## Open decisions and blockers

<required when work is incomplete — the decision that blocks the next action, and who owns it>

## Evidence

<required when state changed — repository paths, commit-ish, comment permalinks>

## Artifacts

<optional — files, reports, evidence directories produced>

## Authoritative documents

<optional — which documents this session took as normative>

## Stale or conflicting documents

<optional — which documents this session found wrong, and the sentence that is wrong>

## PR state

<optional — number, head, base, review state>

## Next decision owner

<required when state changed, and when incomplete — a seat, never "someone">

## Smallest next action

<required when state changed, and when incomplete — one action, small enough to start without a meeting>

## Conversation-only knowledge not yet preserved

<optional — declared through the tool's own flag, never typed here by hand: `--unpreserved "<text>"` names it, `--unpreserved-none` declares it absent, and neither flag leaves it undeclared>
