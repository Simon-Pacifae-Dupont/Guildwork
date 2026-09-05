# The findings register

*One issue, kept open for the life of the project, holding everything that
is true, unassigned, and would otherwise be kept alive only by someone
re-reading a closed issue. An entry leaves it in exactly two ways.*

The template is `templates/FINDINGS_REGISTER.md`; a filled Lantern example is
`examples/lantern/findings-register.md`.

## Why a register, and why on an issue

Every board sweep closes issues, and a closed issue carries findings that
were true, measured or ruled and that no mission owns. The weak mechanism is
to write *"named here so it is not lost with the issue"* in the closing
comment: a note survives only as long as someone re-reads the issue it sits
on, and the whole point of closing an issue is that nobody re-reads it. The
other weak mechanism is to open an issue per finding: a finding nobody has
decided about is not ready to be a mission, and inventing a contract for it
is how a board fills with lots nobody starts.

The register sits between the two. It is a GitHub issue because that is
where every seat already reads, because its body can be edited by the
architect seat without a pull request, and because a permalink to a comment
on it is a citation every other document can carry. On the source project
the workflow document, the capability document and the launcher's own source
cite register entries by key — `G7`, `H2`, `K1` — the way a legal text
cites a precedent.

## The rule that keeps it from becoming a graveyard

**An entry leaves the register in exactly one of two ways:**

1. it becomes a mission issue, and the row is struck through with the issue
   number; or
2. the Chief Architect or the Product Owner **explicitly declines it**, and
   the row is struck through with the reason.

*"Still relevant, still nobody's"* is not a third way. It is the state that
produced the register.

**Reviewed at every board sweep.** An entry that has survived three sweeps
without moving is evidence that it is not actually worth doing, and should
be declined rather than carried a fourth time. Carrying a finding
indefinitely is a decision to ignore it, made without saying so.

**Nothing is added that already has an open issue.** Duplication is what
makes registers untrustworthy. A closing table, *tracked elsewhere —
deliberately not duplicated here*, names the findings that live on their own
issue and where.

## The shape of an entry

```
**G12 — a routing label left in place is read as ownership, and it is not.**
A measurement over thirty-three routes found five useless dispatches, every
one traced to a routing label used as a seat-marker. No code lot fixes it;
a seat that owns an object records that in the issue.
*Source:* <permalink to the report section>.
```

Four parts, always: a **key** — a family letter and a number never reused —
a **claim** in one sentence, the **reason it matters** in a few, and a
**source** that is a permalink, so a reader can check the claim rather than
trust the register. The families are whatever the project's findings
actually fall into; on the source project they are tooling and CI (`T`),
product and UX debt (`P`), host and measurement (`H`), governance (`G`), and
a fifth family, policies in force (`K`), for rulings that are not findings
but that every seat must apply — a ruling recorded on a closed issue is a
ruling nobody re-reads.

An entry states its own epistemic status. *"Recorded as carried by lot X. I
have not verified that it landed and I am not claiming it did"* is a valid
entry, listed at its actual status rather than assumed closed, which is the
whole reason the register is worth keeping honestly.

## How it is used, day to day

- A seat that finds something outside its scope **reports it in its
  transmission report**; the architect seat decides whether it is a
  register entry, a mission, or nothing, and writes the entry in the same
  sweep.
- A document that states a rule **cites the entry that produced it**, so
  the rule can be revisited from its evidence rather than from memory. A
  decision whose author is unclear cannot be revisited; a rule whose
  incident is unclear cannot be relaxed safely.
- A **board sweep** walks the register top to bottom: each live entry is
  turned into a mission, declined with a reason, or carried — and a third
  carry is a decline.
- The register **never carries a mission's own work**: an entry is a
  finding, not a to-do, and the day it becomes a to-do it becomes an issue.

## What it is not

Not a backlog: a backlog is a queue of things to do, and the register holds
things that are true. Not a changelog: a changelog records what changed, and
the register records what was found and not yet acted on. Not a decision
log: rulings live where they were made — on the issue, in the document they
amend — and the register's `K` family only points at the ones every seat
must apply.
