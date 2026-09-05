# The closeout tool, the morning after #118 merged

*Two transcripts. The first is the worktree sweep, dry run by default; the
second is the contract-closing mode. Both are run by the Product Owner from
the primary checkout, and both are read before anything is typed with
`--remove` or `--close`.*

## 1. The worktree sweep

```
PS> C:\repos\lantern\.venv\Scripts\python.exe C:\repos\lantern\tools\mission_closeout.py
```

```
mission_closeout -- dry run. Nothing is removed unless --remove is typed.
primary checkout: C:\repos\lantern
regenerable-paths manifest: C:\repos\lantern\docs\guild\REGENERABLE_PATHS.txt (20 patterns, read from the checkout this tool lives in)
remote asked: origin (git ls-remote, 23 heads)

--- safe-deletion checklist, and what discharges each step ---------------------
  1  uniqueness scan -- compare content, not names
       conditions 2 and 3: an untracked file, an ignored one and an unpushed commit are exactly the unique material a name-based heuristic misses
  2  classify what is found
       condition 1 separates knowledge a session has not yet written from everything else; condition 2 lists what is actually there
  3  extract unique material before any removal
       not this tool's act: while conditions 1-3 refuse, nothing is removed, and the extraction is the operator's (guild-bye, then a push)
  4  prove accessibility by a ref
       condition 3, which asks the remote and never a tracking ref
  5  remove, then verify
       git worktree remove, never --force; the list after and the integrity section below

--- worktree list, before -------------------------------------------------------
C:/repos/lantern                                      9d02c7f [develop]
C:/repos/lantern-worktrees/wt-dashboard-stale-reading a9f3c10 [feature/dashboard-stale-reading]
C:/repos/lantern-worktrees/wt-device-calibration-panel 5b7e21c [feature/device-calibration-panel]
C:/repos/lantern-worktrees/wt-sync-export-retry       7f0a9d4 [feature/sync-export-retry]
C:/repos/lantern-worktrees/wt-shell-headbar-tokens    e2c4180 [feature/shell-headbar-tokens]
C:/repos/lantern-worktrees/wt-gate-title-audit        0c9de55 (detached HEAD)

--- assessment ------------------------------------------------------------------
  [REMOVE ] wt-dashboard-stale-reading  (feature/dashboard-stale-reading)
           C:\repos\lantern-worktrees\wt-dashboard-stale-reading
           every condition passed: session closed, tree clean but for the paths listed below as declared regenerable, HEAD reachable from origin/develop, no handle held, finished work
      declared regenerable, and present -- these are destroyed by the removal:
        .guild/  __pycache__/ (4)  .pytest_cache/
  [REFUSED] wt-device-calibration-panel  (feature/device-calibration-panel)
           C:\repos\lantern-worktrees\wt-device-calibration-panel
      [condition 5: the branch is merged into origin/develop]
        not merged -- pull request #126 is open; an open pull request is 'not yet', not 'yes': a returned lot is resumed into this worktree
  [REFUSED] wt-sync-export-retry  (feature/sync-export-retry)
           C:\repos\lantern-worktrees\wt-sync-export-retry
      [condition 1: the Guild session is closed]
        .guild/session-state.json present -- a session was opened here on 2026-09-02T19:04:11Z by grok-build and never closed; the journal guild-bye would write does not exist yet. Remedy: run guild-bye from this worktree. Do not delete the marker.
      [condition 3: the checked-out commit is reachable from a pushed ref]
        HEAD 7f0a9d4 is reachable from origin/feature/sync-export-retry, but the worktree's own HEAD reflog names 1 further commit (c3e8b91) that no ref on origin contains
      [condition 4: no process holds the worktree directory]
        could not be evaluated -- the directory could not be opened for DELETE: ERROR_SHARING_VIOLATION; a handle is open on it (a shell, an explorer window or an indexer). Unevaluated is refused.
  [REFUSED] wt-shell-headbar-tokens  (feature/shell-headbar-tokens)
           C:\repos\lantern-worktrees\wt-shell-headbar-tokens
      [condition 2: the working tree is clean, untracked and ignored included]
        untracked, unknown to the repository (no commit on any ref has ever held it) -- 1 entry:
          docs/evidence/headbar/notes-before-measuring.md
        this is the file in the working tree that may be the only copy of what it says
  [REFUSED] wt-gate-title-audit  ((detached))
           C:\repos\lantern-worktrees\wt-gate-title-audit
      [condition 3: the checked-out commit is reachable from a pushed ref]
        detached at 0c9de55 -- reachable from origin/develop; but the worktree's private reflog names 2 commits (4a1f0e7, 88d3b2c) that no ref on origin contains, and git worktree remove deletes that reflog with the worktree
      [condition 5: the branch is merged into origin/develop]
        detached HEAD -- there is no branch to have merged

--- removal ---------------------------------------------------------------------
  would remove: wt-dashboard-stale-reading
    resolved target: C:\repos\lantern-worktrees\wt-dashboard-stale-reading  (registered, non-empty, 412 entries)
    $ git -C C:\repos\lantern worktree remove C:\repos\lantern-worktrees\wt-dashboard-stale-reading

  DRY RUN: none of the above ran. Re-run with --remove to perform them.

--- terminals -- reported, never closed -----------------------------------------
  a terminal appears to be sitting in: wt-sync-export-retry (condition 4 could not open the directory)
  after a removal, a terminal tab may still point at: wt-dashboard-stale-reading -- a tab whose shell has exited holds nothing, and condition 4 cannot see it. Closing it is yours.

--- summary ---------------------------------------------------------------------
  worktrees inspected : 5
  refused             : 4
  removable           : 1  (dry run -- none was removed)
  untracked entries, unknown to the repository       : 1
  untracked entries, present in history but not here : 0
```

What the report says, worktree by worktree:

- **`wt-dashboard-stale-reading`** is removable, and the tool still prints
  what the removal destroys — the declared-regenerable group — because a run
  that silently omitted it would be back to inferring.
- **`wt-device-calibration-panel`** has an open pull request. Until the
  rule changed, that satisfied condition 5; it no longer does, because a
  returned lot is resumed into exactly this directory.
- **`wt-sync-export-retry`** is the worktree the launcher's `--list` flagged
  the day before: an open session marker, a dead process, and a commit only
  its reflog knows. Three conditions refuse, and the first names the remedy
  — run the exit command from that worktree. Deleting the marker would pass
  condition 1 and lose the journal that was never written.
- **`wt-shell-headbar-tokens`** holds one file no commit anywhere has ever
  held. The tool cannot know whether it matters; it knows it is the only
  copy.
- **`wt-gate-title-audit`** is a detached read-only review worktree made by
  hand, reachable at HEAD — and its private reflog names two commits nothing
  on the remote contains. `git worktree remove` would delete that reflog
  with the worktree.

The Product Owner runs `--remove --only wt-dashboard-stale-reading`. The
tool re-evaluates the five conditions on that worktree immediately before
the removal, removes it through `git worktree remove` without `--force`,
prints the list after and the integrity confirmation, and exits `0`.

## 2. Closing the contract

```
PS> C:\repos\lantern\.venv\Scripts\python.exe C:\repos\lantern\tools\mission_closeout.py --missions
```

```
mission_closeout --missions -- dry run. Nothing is closed unless --close is typed.
merged pull requests read: 100 most recent (window stated: a delivery merged before it is not reported at all)
open pull requests read: 2 of a 200 window

  #128  Mission: #127 delivers        -> would close #127
        merged 2026-09-03T18:20:41Z into develop by merge commit 71c0a9e; #127 is open; no hold found in 3 comment(s); no other open pull request names #127
  #124  Mission: #118 delivers        -> would close #118
        merged 2026-09-04T16:41:20Z into develop by merge commit b6d1e77; #118 is open; no hold found in 5 comment(s); no other open pull request names #118
  #121  Mission: #109 supersedes #117 -> would close #109
        merged 2026-09-01T10:12:05Z into develop; #109 is open; no hold; #117 is closed unmerged as the line claims
  #123  Mission: #114 delivers        -> REFUSED (hold)
        merged 2026-09-03T21:03:44Z; #114 is open; hold read on #114 in comment 3300921: "…the contract stays open until the laptop measurement lands…" -- quoted so a person can overrule it

  DRY RUN: no issue was closed. Re-run with --missions --close to perform the 3 closure(s).
```

Three closures, one refusal quoting what it read. The hold on #114 is
prose — a sentence in a ruling — and the tool matched it on one of the
phrases listed in its source; a hold worded some other way would not have
been seen, and the report says so. The plain run reads merged deliveries
only; the other two refusals are what `--only-pr` answers when a person
names a pull request in whatever state it is in:

```
PS> C:\repos\lantern\.venv\Scripts\python.exe C:\repos\lantern\tools\mission_closeout.py --missions --only-pr 120
```

```
  #120  Mission: #118 refused          -> REFUSED (refused delivery)
        closed unmerged at the refusal; the contract it names stays open, which is the point -- #124 later delivered it
```

```
PS> C:\repos\lantern\.venv\Scripts\python.exe C:\repos\lantern\tools\mission_closeout.py --missions --only-pr 126
```

```
  #126  Mission: #115 delivers         -> REFUSED (not merged)
        open; nothing is closed from an unmerged delivery
```

The Product Owner reads the three closures, agrees, and types
`--missions --close`.
