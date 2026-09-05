# Continuity — what a handover owes its successor

*Source precedence, the seven ways continuity fails, what a durable handover
carries, when a close is complete, and how a stale document is surfaced
rather than silently believed.*

This is the pack's version of the source project's continuity contract. On
an adopting project it lives beside the workflow document, and it is the one
place the continuity rules live: if a rule about session continuity is not
in it, it is not a rule.

## The rule this exists to enforce

> **If a new session requires the human to repeat recent operational
> context, the continuity system has failed.**

Ruled after a real test — close a session, clear the context, open a new
one on the same branch. Git state survived perfectly. Operational state did
not: the new session recovered the branch, the head, the pull request and a
*global priority three sprints stale*, and an audit's root causes, its
recommended next lot and the decision blocking it had to be reconstructed by
hand from a journal, a pull request, the repository and old scratch
directories. Some of it was not recoverable at all.

## The seven ways continuity fails

Named, so a change can say which one it closes.

| | Failure | Closed by |
|---|---|---|
| **A** | Git-preserved / context-lost — branch and commit survive, actionable work does not | entry reads the journal |
| **B** | Stale global state wins — an old curated handover overrides newer branch-local state | source precedence |
| **C** | Conversation-only finding — an audit or a decision exists only in the chat | the three-state declaration, and §5 |
| **D** | Truncated handover — a field limit forces findings or the next action out of the record | format 2; display truncation only |
| **E** | Source contradiction — the curated handover and the latest journal disagree | the conflict warning |
| **F** | Next action missing — the successor knows what happened, not what to do | required when incomplete |
| **G** | Decision blocker missing — the successor knows the next action but not what blocks it | required when incomplete |

## 1. Source precedence

When a session starts, operational truth is taken in this order:

1. **the latest durable operational handover relevant to the current branch**
   — a journal entry, branch-local, timestamped, written by the session that
   did the work;
2. **current branch and pull request state** — Git and GitHub, as observed;
3. **the curated tracked handover** — the project's `HANDOVER.md`;
4. **older or global summaries.**

The journal comes first because it is the only source that is both recent
and specific to the line of work. The curated handover is not demoted to
noise: it stays on screen at every entry. What changed is that it stopped
being the only voice.

**Selection.** Branch-local entries first; if none exists, the latest entry
overall is used and labelled as not branch-local. Entries recording no
durable change are stepped over rather than treated as current — a session
that changed nothing did not retract the previous session's next action.
Ordering is by filename, which the naming convention makes chronological and
which a fresh clone cannot rewrite the way it rewrites a modification time.

**A next action that observed Git already falsifies is not current, whatever
its rank.** Precedence orders *sources*, not *claims*. When the selected
entry is labelled not branch-local, its next action describes a different
line of work and may already have been carried out: rank 2 — the branch and
pull request state actually observed — settles it. This is not
hypothetical. A session once opened on a branch with no journal entry; entry
fell back to an older entry whose next action read *"authorise phase 3"*,
while `HEAD` was the merge commit that delivered phase 3. The entry had not
been superseded — it had been **completed**, by a session whose own entry was
still sitting unmerged in an open pull request. Reading the named entry is
the required first move, never treating the warning as noise and never
quietly dropping the stale next action without saying which source won and
on what evidence.

## 2. Conflict is surfaced, never resolved

When the selected journal entry carries an actionable next action **and** is
newer than the last revision of the curated handover, entry prints

```
[WARNING] operational-state conflict
```

and reports both sources with the evidence for the freshness claim. It does
not decide which is true — it has no way to know, and a tool that guessed is
how a stale document came to be quoted with confidence.

**Freshness is claimed from Git evidence, never from a date alone:**

| Evidence | Strength |
|---|---|
| commit ancestry — the journal was written on a commit that already contained that revision of the handover | preferred |
| the revision date Git records for the handover | fallback, and labelled as the weaker claim |
| no recorded revision at all | **no claim is made** — absence of evidence, not evidence of freshness |

## 3. The durable handover contract

A completed close must leave enough for a successor to resume unaided. The
journal entry is that artefact (`templates/journal/`). It carries:

| | Field | Required |
|---|---|---|
| identity | branch / head, entry snapshot, work state, format | always, written by the tool |
| | Milestone | optional |
| | **Confirmed** | when state changed |
| | **Changed** | when state changed |
| | Decisions | optional |
| | Findings | optional, and unbounded in practice |
| | **Uncertain** | when state changed |
| | **Open decisions and blockers** | when work is incomplete |
| | **Evidence** | when state changed |
| | Artifacts | optional |
| | Authoritative documents | optional |
| | Stale or conflicting documents | optional |
| | PR state | optional |
| | **Next decision owner** | when state changed; and when incomplete |
| | **Smallest next action** | when state changed; and when incomplete |
| | Conversation-only knowledge not yet preserved | optional — and see §5 |

**A session that changed state and did not declare itself finished is
presumed incomplete.** The presumption is the safe direction: being wrong
costs one extra flag, while the opposite default costs a successor the
decision that blocks it.

Validation stays deterministic and structural — presence and a paste-guard
length. It never judges prose quality, relevance or truth.

## 4. The durable record is not the display summary

**A field limit that exists for a screen must never reach the artefact.**
The original format capped every field at 400 characters and made the cap
fatal, so a session with more to say had to condense until it fit. That is a
display budget applied to a record, and it is failure D.

| Limit | Applies to | Value |
|---|---|---|
| paste guard | the journal entry | 20 000 characters per field — to reject a pasted log, not to shape a handover |
| display truncation | entry output | 320 characters per field, marked `[INFO] shown truncated`, always beside the entry's path |

Only the first touches the artefact. Everything a reader sees truncated is
one file read from its full text, and the path is always printed.

## 5. Conversation-only knowledge is not a valid handover artefact

If a finding materially changes architecture, governance, the next action, a
blocking decision, implementation scope, product behaviour or risk, it must
be written into a durable artefact before the session can be called
complete. The exit command cannot read a conversation and does not pretend
to. What it enforces is the consequence: the three-state declaration of
`06-session-cycle.md` is the channel for saying that such knowledge exists
and is not written down, and any value named there exits `INCOMPLETE` with
the text printed back. **The declaration is the agent's judgement; the
consequence is mechanical.**

Not writing something down because a field looked too small is the specific
behaviour this rule forbids. The field is not too small — see §4.

## 6. When a close is complete

The exit command returns `OK` only when all of these hold:

1. the handover is structurally valid for its session class;
2. the journal entry is written;
3. **it is machine-independent** — committed *and* reachable from the
   configured upstream. A local commit is not the bar: a lost local `.git`
   destroys local-only commits exactly as it destroys untracked files;
4. no conversation-only knowledge is named.

Failing 3 or 4 is `INCOMPLETE`, not `FATAL`: nothing went wrong, the close
is unfinished, and the two have different remedies — one needs a push, the
other needs someone to write something down. Both are reported when both
apply.

## 7. The entry bootstrap

A successful entry states, without anyone being asked, everything
`06-session-cycle.md` lists. If a reader has to ask *"what were we doing?"*
after a successful entry, this contract has been broken, and the break is a
defect.

## What this contract deliberately does not add

No database, no service, no daemon, no external dependency, no state
machine, no ticket system, no duplication of what Git and GitHub already
record. The whole mechanism is: one more file read at entry, one richer file
written at exit, and one warning when two documents disagree.

## The adjacent rule: who owns a normative document, and what they owe it

A continuity system is only as good as the documents it points at, and
documents rot. The source project's workflow document names its owner in its
header — and for weeks the header did not say what the owner owed it, which
is what let the file rot: three missions reported it stale, each reported
correctly, none was in scope to fix it, and three correct reports produced
no correction. That is a process defect, not an attention defect. The rule
that followed: **a lot that changes the launcher's behaviour, the
conditions, the mission form or the gates updates the workflow document in
the same lot.** Where it cannot — the file is outside its scope, or another
mission holds it — it names the fault in its transmission report, quoting
the sentence that has become false. Naming it is the floor, not the
discharge: the report goes to the architect seat, who owns opening the lot
that carries the correction.

And the freshness of any statement in such a document is the owner's
obligation, discharged by the lot that changes the tool — not by a note
promising that some later lot will notice. A dated pin is not a defence when
the tree moves inside your own session: a paragraph pinned to a commit was
true at the commit it named and false forty minutes later, when a pull
request merged sixteen minutes after the session that wrote it had launched.
