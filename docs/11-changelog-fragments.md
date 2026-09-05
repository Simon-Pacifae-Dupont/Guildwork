# The changelog is a fragment, not a shared file

*One file per mission that nobody else touches, assembled once at release.
The only file every mission wrote was the only place two concurrent missions
were guaranteed to conflict.*

The convention in full is `templates/changelog.d/README.md`; this page is
the reasoning.

## The measurement

Two pull requests failed to merge twenty minutes apart on the same 445 KB
changelog, each having added a section at its top. Both resolutions were
purely additive and were performed by the integrator — which is the boundary
erosion the one-writer rule exists to refuse: the human becoming the merge
tool for two agents that never touched the same line of product code. At a
concurrency ceiling of four, a wave of missions all adding a section costs
one hand-resolved conflict for every mission after the first, each requiring
a second witness. Two fragments cost none: Git merges two adds without
asking anyone.

## The convention

A mission adds `docs/changelog.d/<issue>-<slug>.md` — a `## ` heading and
its prose, exactly what a changelog section holds — and belongs to the
mission that wrote it for the life of the file. No other mission edits it.
Writing the fragment is the whole changelog obligation.

An assembler merges the fragments into the changelog beneath its top-level
heading, in descending issue order with ties broken by ascending slug, into
a region it rebuilds wholesale on every run; `--check` verifies without
writing. It never deletes a fragment and never rewrites what is already in
the changelog outside that region.

## The designed state is stale

**The fragments directory is the source of truth for unreleased entries; the
assembled region is a derived snapshot of it.** No ordinary mission runs the
assembler, so fragments accumulate while the assembled region stays where
the last assembly left it. Measured on the source project at two dates a
month apart: six fragments and one assembled section; then fifty-two
fragments and two assembled sections. Both readings are correct and neither
needs repair — the gap widening is the convention working, and the
assembler running once at release preparation is what closes it. Two
missions each reported the gap as drift, and each was right to escalate an
undocumented condition, which is why the condition is now documented: **a
mission that counts more fragments than assembled sections has found the
convention working, not a defect to report.**

## The gate is the release's, not the pull request's

`--check` is a required gate for the release-preparation change set only,
run by one release integrator authorised by the human, before the release
reaches the release branch or a tag. It is deliberately **not** wired into
the ordinary pull-request checks: wiring it there would make every correct
fragment-producing mission fail until it also edited the shared file,
recreating through CI the exact concurrency defect the convention removed by
construction. The reason is part of the rule.

## Two prohibitions

A mission writer never assembles the shared file. A release integrator never
hand-edits the generated region — it is rebuilt wholesale on every run, so a
hand edit is erased by the next assembly; edit the fragment and assemble
again.

## The rule binds contracts written from its date

No existing contract is amended by a convention that arrives after it; a
mission whose acceptance criteria still say *add a section to the changelog*
delivers what its own contract says. The changelog obligation is an
acceptance criterion the architect seat writes into a contract, not a field
of the mission form — which is the general shape of how a rule enters this
system: dated, forward-binding, and never retroactively invalidating the
contracts already on the board.
