<!--
Body of the issue titled "Unowned findings register — things that are true,
unassigned, and currently kept alive only by someone re-reading a closed
issue". One such issue per repository, kept open for the life of the project.
Entries are added by editing the body; rulings and strike-throughs are edits
too, so the body stays the whole register and a reader never has to scroll the
comments to know what is still alive.
-->

## What this is

A register of findings that are **established** — measured, reviewed, or ruled
— and that **no mission owns**. Nothing here is a mission. Each entry is a
candidate for one, or for an explicit decision not to.

It exists because a board sweep closes issues, and each closure otherwise ends
with *"named here so it is not lost with the issue."* That is a weak mechanism.
A note survives only as long as someone re-reads the issue it sits on, and the
whole point of closing an issue is that nobody re-reads it.

## The rule that keeps this from becoming a graveyard

**An entry leaves this register in exactly one of two ways:**

1. it becomes a mission issue, and the row is struck through with the issue
   number; or
2. the Chief Architect or Product Owner **explicitly declines it**, and the row
   is struck through with the reason.

"Still relevant, still nobody's" is not a third way. It is the state that
produced this issue.

**Reviewed at every board sweep.** An entry that has survived three sweeps
without moving is evidence that it is not actually worth doing, and should be
declined rather than carried a fourth time. Carrying a finding indefinitely is
a decision to ignore it, made without saying so.

**Nothing is added here that already has an open issue.** Duplication is what
makes registers untrustworthy.

**An entry has a key, a claim, a reason it matters and a source.** The key is
a family letter and a number that is never reused (`T1`, `G12`); the source is
a permalink — a comment, a report section, a file and line — so that a reader
can check the claim rather than trust the register.

---

## Tooling and CI

**T1 — <one-line claim>.**
<Why it is true, what it costs, and why no mission owns it yet.>
*Source:* <permalink>.

---

## Product and UX debt

**P1 — <one-line claim>.**
<...>
*Source:* <permalink>.

---

## Host and measurement

**H1 — <one-line claim>.**
<...>
*Source:* <permalink>.

---

## Governance

**G1 — <one-line claim>.**
<...>
*Source:* <permalink>.

---

## Policies in force

<!--
Rulings that are not findings but that every seat must apply, keyed K1, K2…
The register carries them because a ruling recorded on a closed issue is a
ruling nobody re-reads.
-->

**K1 — <the ruling, in one sentence>.** Ruled by <seat>, <date>, at <permalink>.

---

## Tracked elsewhere — deliberately not duplicated here

| Finding | Where |
|---|---|
| <finding that has its own open issue> | **#<n>** |

---

*Opened by <seat>, at the close of the <date> board sweep.*
