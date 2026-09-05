# Transmission report — #118

*Posted by the seat as a comment on the issue, before the exit command. This
is the artefact a reviewer reads first; a report missing any of the eight
items `docs/06-session-cycle.md` lists is rejected the way a pull request
missing a template section is rejected.*

---

## Transmission report — mission #118, Lead Software Engineer (Claude Code)

**Delivery:** PR #124, `feature/dashboard-stale-reading` → `develop`, head
`c41d9e2`, base `3f9c2d1`.

### Entry evidence

`guild-hi --role claude-code` run by the launcher before this session
started; exit 0; head reported `3f9c2d1` on `feature/dashboard-stale-reading`.
No stale-snapshot warning. Entry was not re-run.

### Execution parameters

Model `claude-opus-5`, effort `HIGH` (`--effort high`), started by
`tools/mission_launcher.py` at governance
`3f9c2d1a7b8e4c05d6f1a2b3c4d5e6f708192a3b`. What ran is what the contract
declares.

### Preservation census (relayed from entry, not re-measured)

A census was taken at entry. `unpreserved`: empty. `unknown`:
`wt-sync-export-retry` — its HEAD reflog names one commit no remote ref
contains; entry could not establish whether it is load-bearing. Reported
here for the Chief Architect; this seat did not touch that worktree.

### What was done

- `src/lantern/dashboard/tile_model.py`: `TileReading` now carries
  `taken_at` and a `stale: bool`; the model marks every held reading stale
  on `BridgeState.DISCONNECTED` and clears the flag per tile on the first
  fresh reading after `CONNECTED`.
- `src/lantern/dashboard/tiles.py`: the stale style and the badge
  `stale since HH:MM:SS`, rendered from `taken_at`, never from the wall
  clock at disconnection.
- `tests/dashboard/test_tiles_stale.py`: 11 tests — criteria 1, 2 and 3,
  plus the badge geometry under the `geometry` marker for criterion 4.
- `docs/changelog.d/118-dashboard-stale-reading.md`.
- `src/lantern/bridge/state.py`: read, not changed — `git diff --stat`
  shows no line under `src/lantern/bridge/`.

### Validation — run

| Command | Against | Result | Verdict |
|---|---|---|---|
| `python -m pytest -q tests/dashboard` | `c41d9e2` | 63 passed in 4.8 s | PASS |
| `$env:LANTERN_PLATFORM='windows'; python -m pytest -m geometry` | `c41d9e2`, interactive desktop session on `workstation` | 9 passed, 1 xfailed, 1 214 deselected in 41.2 s | PASS |
| `python -m pytest -q` (full suite) | merge result `e07a55b` = `c41d9e2` + `origin/develop` @ `9d02c7f` | 1 223 passed, 1 xfailed in 3 min 12 s | PASS |
| `python tools/ci/check_governance_consistency.py` | `c41d9e2` | ok | PASS |
| `ruff check .` | `c41d9e2` | ok | PASS |

The geometry run was performed on the real desktop platform on this host,
in an interactive session, as criterion 4 requires; the environment variable
that selects the platform is recorded with the command because a full-suite
figure under the wrong platform is a different measurement. The full-suite
figure names the merge result, not the branch tip.

Pre-existing failures: none. The base commit `3f9c2d1` runs the same full
suite at 1 212 passed, 1 xfailed.

### Validation — not run

Nothing skipped.

### Name check

Introduced two names: `TileReading.taken_at` and `TileReading.stale`.
Checked both against `docs/GLOSSARY.md` and `src/`: `stale` appears in the
glossary under *Sync* with the meaning *an export older than its source* —
a different sense on a different surface. Recorded as a collision the
glossary does not carry; added the row *stale (Dashboard)* in this lot,
citing this report.

### Stop conditions

None fired. Criterion 4 was met without changing the tile's height (the
badge fits at 1 280 × 800 with 6 px to spare on the tightest tile).

### Residual risks

- The badge's time is the reading's `taken_at` in the workstation's local
  zone; a laptop in another zone displaying an export would show the
  reading's zone, not its own. Out of scope here (Sync), noted for the
  register.

### Warnings the launcher told this seat to repeat

None — the contract is `one writer`, the issue is open, the title carries
its own number.

### Disposition owed at merge

Branch `feature/dashboard-stale-reading` and worktree
`C:\repos\lantern-worktrees\wt-dashboard-stale-reading` are spent at
merge. The journal entry rides the branch (committed before the merge, see
below); nothing on the worktree is held by no other ref. Removal is the
Product Owner's, by the closeout tool.

### Exit evidence — appended after guild-bye

`guild-bye --unpreserved-none` exit 3 (`EXIT_INCOMPLETE`: entry written,
not yet reachable from a pushed ref). Journal entry
`docs/guild/journal/20260904T151806Z-claude-code-c41d9e2.md`, committed as
`a9f3c10` on `feature/dashboard-stale-reading` and pushed by explicit
refspec. Reachability:
`git branch -r --contains a9f3c10` → `origin/feature/dashboard-stale-reading`;
`git cat-file -e origin/feature/dashboard-stale-reading:docs/guild/journal/20260904T151806Z-claude-code-c41d9e2.md` → exit 0.
Exit 3 was cleared by the push; guild-bye was not re-run.
