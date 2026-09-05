# The journal entry for #118

*`docs/guild/journal/20260904T151806Z-claude-code-c41d9e2.md`, as the exit
command wrote it. The identity header is the tool's; each section is the
seat's, unbounded, and only the ones with content appear.*

---

```
# Guild Handover — Lead Software Engineer — 2026-09-04T15:18:06Z

Branch: feature/dashboard-stale-reading @ c41d9e2
Entry snapshot: resolved
Work state: complete
Handover format: 2

## Milestone

Dashboard tiles survive a bridge drop with their last reading and its age (#118).

## Confirmed

- `BridgeState` carries the last reading's timestamp on the tile model side
  (`TileReading.taken_at`), so the badge never reads the wall clock — stop
  condition 2 did not fire.
- The stale badge fits every tile of the reference layout at 1 280 × 800
  under the real desktop platform, 6 px to spare on the tightest tile
  (`docs/evidence/dashboard_stale/20260904-118/geometry.txt`).
- Full suite on the merge result e07a55b: 1 223 passed, 1 xfailed. Base 3f9c2d1: 1 212 passed, 1 xfailed.

## Changed

- src/lantern/dashboard/tile_model.py — TileReading.taken_at, TileReading.stale, per-tile stale set/clear on bridge transitions
- src/lantern/dashboard/tiles.py — stale style, `stale since HH:MM:SS` badge
- tests/dashboard/test_tiles_stale.py — new, 11 tests
- docs/changelog.d/118-dashboard-stale-reading.md — new
- docs/GLOSSARY.md — one row, *stale (Dashboard)*

## Decisions

- The badge shows the reading's own time, not the disconnection time — the
  contract's criterion 1, and the reason: an operator wants to know how old
  the number is, not when the cable went.
- No global offline banner: named out of scope by the contract, carried to
  the register as a candidate under chantier:shell rather than done here.

## Findings

- `stale` collides with the glossary's Sync sense (*an export older than its
  source*). Two surfaces, two meanings; row added rather than the word
  changed, because the Dashboard sense is the one an operator says aloud.
- `wt-sync-export-retry` carries an open session marker with no process and
  one commit no remote ref contains (entry census). Not this lot's; reported.
- The geometry marker run takes 41 s on this host with windows appearing —
  the contract's `Screen demand` (under a minute, once) was accurate.

## Uncertain

- Whether the stale style reads correctly under the high-contrast theme —
  not measured; the geometry run covers size, not contrast. A UX/UI seat
  question.

## Evidence

- PR #124, head c41d9e2, merge result e07a55b
- docs/evidence/dashboard_stale/20260904-118/geometry.txt
- transmission report: https://github.com/lantern-workshop/lantern/issues/118#issuecomment-3301177

## Artifacts

- docs/changelog.d/118-dashboard-stale-reading.md

## Authoritative documents

- docs/guild/MISSION_WORKFLOW.md at 3f9c2d1 (governance pin)
- docs/design/LAYOUT_RULES.md §3 (the 1 280 × 800 floor)

## PR state

- #124 open, delegated routine gate; transmission report accepted by the Chief Architect (#118 comment 3301190) before this close

## Next decision owner

Chief Architect

## Smallest next action

Merge #124 by merge commit under the delegated routine gate, once this
entry has ridden the branch (pushed, reachable), and record the disposition
of the branch and worktree in the merge comment.

## Conversation-only knowledge not yet preserved

Declared absent by the seat at close (--unpreserved-none): nothing from this
session exists only in the conversation.
```

---

The exit command returned **3** — `EXIT_INCOMPLETE` — because at the
moment it returned the entry was written and valid but not yet reachable
from a pushed ref; it never pushes. The seat committed the entry by explicit
path on the feature branch, pushed by explicit refspec, proved reachability
with the two commands `docs/06-session-cycle.md` names, and appended that
evidence to its transmission report. It did not run the exit command a
second time.
