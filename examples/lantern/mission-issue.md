# #118 — [MISSION] Dashboard tiles keep their last reading while the device bridge reconnects

*Labels: `ai-mission` (applied by the form) · `role:claude-code` ·
`mode:one-writer` · `risk:medium` · `gate:delegated` · `chantier:dashboard`
(applied by the Chief Architect).*

*Below is the issue body exactly as GitHub renders a submission of
`templates/github/ISSUE_TEMPLATE/ai_mission.yml`: one `###` section per
field, in the form's order. The launcher parses it by these headings.*

---

### Objective

Deliver the smallest lot that keeps a Dashboard tile showing its **last
reading, marked stale with the time it was taken**, from the moment the
bench-controller bridge drops until it reconnects — instead of blanking the
tile to `—` and losing the reading and its age. A stale reading is never
presented as live.

### Acceptance criteria

1. When `BridgeState` transitions to `DISCONNECTED`, every tile that held a
   reading keeps it, rendered in the stale style, with the badge `stale since
   HH:MM:SS` where the time is the reading's own timestamp — not the
   disconnection time. Verified by `tests/dashboard/test_tiles_stale.py`.
2. When the bridge returns to `CONNECTED`, the first fresh reading clears the
   badge and the stale style on that tile only; tiles whose sensor has not
   reported yet stay stale. Verified by the same file.
3. A tile that never held a reading shows `—` as today. Nothing about that
   path changes; verified by the existing `test_tiles_empty.py` still passing
   unmodified.
4. The stale badge fits inside the tile at the 1 280 × 800 floor without
   clipping, measured under the real desktop platform by the geometry marker
   run — the badge's bounding rectangle is inside the tile's, on every tile
   of the reference layout. The layout floor is the one
   `docs/design/LAYOUT_RULES.md` §3 records (1 280 × 800), cited rather
   than restated.
5. The full suite passes on the merge result: `python -m pytest -q` run after
   merging `origin/develop` into the branch, with the commit named beside the
   figure, per `MISSION_WORKFLOW.md` §14.
6. `docs/changelog.d/118-dashboard-stale-reading.md` exists and describes the
   change in the words a release note would use.

### Agent

Claude Code

### Capabilities required

shell: host-native, windows-desktop: yes

### Guild role

claude-code

### Model

claude-opus-5

### Effort

HIGH

### Budget

MEDIUM

### Mode

one writer

### Risk

MEDIUM

### Chantier

chantier:dashboard

### Screen demand

windows appear — under a minute, once, for the geometry run of criterion 4

### Host

any

### Concurrency

within standing ceiling

### Subagents

forbidden (default)

### Product Owner exception

_No response_

### Scope

- `src/lantern/dashboard/tiles.py` — the tile widget and its stale style
- `src/lantern/dashboard/tile_model.py` — the per-tile reading and its timestamp
- `tests/dashboard/test_tiles_stale.py` — new
- `docs/changelog.d/118-dashboard-stale-reading.md` — new
- `src/lantern/bridge/state.py` — **read only**: the `BridgeState` enum and its
  transitions are consumed, not changed

### Out of scope

- the bridge's reconnection logic, its retry timing and its serial handling
  (`src/lantern/bridge/`) — the mission consumes the state, it does not
  produce it
- the Device page and its calibration panel
- any change to the reading store schema or to `Sync`
- a global "offline" banner in the shell — a separate lot, if the Product
  Owner wants one, under `chantier:shell`

### Branch and worktree

feature/dashboard-stale-reading + wt-dashboard-stale-reading

### Human gate

routine — delegated merge (Product Owner standing ruling, recorded on the delegation issue)

### Reserved gate — which one

_No response_

### Stop conditions

1. Criterion 4 cannot be met without changing the tile's height — stop and
   report; the tile geometry is the layout rules', not this lot's.
2. `BridgeState` turns out to carry no usable timestamp for the last reading
   — stop and report rather than inventing one from the wall clock.
3. Any test outside `tests/dashboard/` fails on the branch and did not fail on
   the base commit — stop and report with the base commit named.
4. The geometry run cannot be performed on this host — stop and report; do
   not substitute an offscreen measurement for criterion 4.

### Report target

Chief Architect, as a comment on this issue

### Invariants

- [x] One writer respected — this mission does not create a second writer.
- [x] guild-hi at entry, exactly one guild-bye at close — never re-run on exit 3.
- [x] Branch pushed empty at entry, before the first file is written, and a comment posted on the issue when work begins. **Pushed again before the gate run.**
- [x] Journal entry preserved to a pushed ref before any worktree removal.
- [x] Explicit-path staging only — no git add -A, -u or dot.
- [x] No merge without the named human gate above.
- [x] Transmission report posted before guild-bye.
