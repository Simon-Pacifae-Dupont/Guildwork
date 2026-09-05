# Changelog fragments

**A mission does not add a section to `docs/CHANGELOG.md`. It adds
`docs/changelog.d/<issue>-<slug>.md`, a file nobody else touches.** The
fragment holds exactly what a changelog section holds — a `## ` heading and
its prose — and belongs to the mission that wrote it for the life of the
file. No other mission edits it.

Why: concurrent missions must not share a file. The changelog was the only
file every mission wrote, which made it the only place two concurrent missions
were guaranteed to conflict. At a concurrency ceiling of four, a wave of
missions all adding a section costs one hand-resolved conflict for every
mission after the first, each requiring a second witness. Two fragments cost
none: Git merges two adds without asking anyone.

## The fragment

```markdown
## <issue number> — <what changed, in the words a release note would use>

<One to five sentences. What a reader of the release needs to know; where the
evidence lives; what was deliberately not done.>
```

Named `<issue>-<slug>.md`, e.g. `118-dashboard-stale-reading.md`. The issue
number leads so the assembler can order fragments without reading them.

## Assembly

`tools/changelog_assemble.py` merges the fragments into `docs/CHANGELOG.md`
beneath its top-level heading, in descending issue order with ties broken by
ascending slug, into a region it rebuilds on every run between
`<!-- BEGIN changelog.d -->` and `<!-- END changelog.d -->`; `--check`
verifies without writing. It never deletes a fragment, and it never rewrites
what is already in the changelog outside that region.

**`docs/changelog.d/` is the source of truth for unreleased entries. The
assembled region is a derived snapshot of it.** Between releases the snapshot
is expected to be stale, and a stale snapshot is the designed state, not
drift: no ordinary mission runs the assembler, so fragments accumulate while
the assembled region stays where the last assembly left it. A mission that
counts more fragments than assembled sections has found the convention
working, not a defect to report.

**The snapshot is assembled once, at release preparation**, by one release
integrator authorised by the Product Owner, inside the release-preparation
change set. `--check` is a required gate for that change set only. It is
deliberately not wired into the ordinary pull-request checks: wiring it there
would make every correct fragment-producing mission fail until it also edited
the shared file, recreating through CI the exact concurrency defect the
convention removed.

## Two prohibitions

A mission writer never assembles the shared file: writing the fragment is the
whole changelog obligation. A release integrator never hand-edits the
generated region: the region is rebuilt wholesale on every run, so a hand edit
is erased by the next assembly — edit the fragment and assemble again.
