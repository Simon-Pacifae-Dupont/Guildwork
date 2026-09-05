# PR #124 — #118 — Dashboard tiles keep their last reading while the device bridge reconnects

*The pull request body, as the seat filled the template. The `Mission:`
line is the first thing the mission-line check reads; every other section
is what the reviewer reads.*

---

## Mission

Mission: #118 delivers

## Base / head

Base `develop` @ `3f9c2d1` · head `feature/dashboard-stale-reading` @
`c41d9e2` (journal commit `a9f3c10` on top, see Evidence) · worktree
`C:\repos\lantern-worktrees\wt-dashboard-stale-reading`.

## Execution parameters

Model `claude-opus-5`, effort `HIGH` (`--effort high`), started by
`tools/mission_launcher.py` at governance
`3f9c2d1a7b8e4c05d6f1a2b3c4d5e6f708192a3b`. What ran is what the contract
declares; no corrective pass.

## Files changed

- **Dashboard model** — `tile_model.py`: `TileReading` gains `taken_at` and
  `stale`; stale is set per tile on `DISCONNECTED`, cleared per tile on the
  first fresh reading after `CONNECTED`.
- **Dashboard widget** — `tiles.py`: stale style and the `stale since
  HH:MM:SS` badge, rendered from the reading's own timestamp.
- **Tests** — `tests/dashboard/test_tiles_stale.py`, new, 11 tests, two of
  them under the `geometry` marker.
- **Changelog fragment** — `docs/changelog.d/118-dashboard-stale-reading.md`.
- **Glossary** — one row added, *stale (Dashboard)*, per the name check.
- **Journal** — `docs/guild/journal/20260904T151806Z-claude-code-c41d9e2.md`.

Nothing under `src/lantern/bridge/`.

## Validation — run

| Command | Against | Result | Verdict |
|---|---|---|---|
| `python -m pytest -q tests/dashboard` | `c41d9e2` | 63 passed, 4.8 s | PASS |
| `$env:LANTERN_PLATFORM='windows'; python -m pytest -m geometry` | `c41d9e2`, interactive desktop session, `workstation` | 9 passed, 1 xfailed, 1 214 deselected, 41.2 s | PASS |
| `python -m pytest -q` | merge result `e07a55b` (`c41d9e2` + `origin/develop` @ `9d02c7f`) | 1 223 passed, 1 xfailed, 3 min 12 s | PASS |
| `python tools/ci/check_governance_consistency.py` | `c41d9e2` | ok | PASS |
| `ruff check .` | `c41d9e2` | ok | PASS |

No pre-existing failures: base `3f9c2d1` runs the full suite at 1 212
passed, 1 xfailed.

The pull request head at merge is `a9f3c10`, the journal commit on top of
`c41d9e2`: re-verified with `git diff --stat c41d9e2 a9f3c10` — one file
under `docs/guild/journal/`, no code — so the gate figure measured at
`e07a55b` describes the merged object.

## Validation — not run

nothing skipped

## Evidence

- criteria 1–3: `tests/dashboard/test_tiles_stale.py::test_disconnect_keeps_reading_and_marks_stale`,
  `::test_reconnect_clears_stale_per_tile`, `::test_never_read_tile_unchanged`
- criterion 4: `tests/dashboard/test_tiles_stale.py::test_badge_inside_tile_at_floor`
  (marker `geometry`), run log at `docs/evidence/dashboard_stale/20260904-118/geometry.txt`
- criterion 5: full-suite figure on the merge result, above
- criterion 6: `docs/changelog.d/118-dashboard-stale-reading.md`
- journal durability: `git branch -r --contains a9f3c10` → `origin/feature/dashboard-stale-reading`

## Safety and governance invariants

- [x] No product, runtime or safety code touched beyond the mission scope
- [x] No mass staging — explicit paths only, staged set audited before commit
- [x] One writer — no second writer and no unauthorized subagent
- [x] Scope matches the mission issue

## Residual risks

- Badge time is shown in the reading's zone, not the viewer's — matters only
  for exports read on another machine; Sync's, not this lot's. Reported for
  the register in the transmission report.

## Merge authority

- [x] delegated routine merge (Product Owner standing ruling, recorded on the delegation issue)
- [ ] reserved Product Owner gate: `<name the gate>`

## Report target

Chief Architect, as a comment on #118 — posted, with exit evidence appended
after guild-bye.
