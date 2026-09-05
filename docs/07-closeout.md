# The closeout tool — specification

*A fail-closed tool that inspects every registered worktree and refuses to
remove any whose material is not provably preserved. Refusal is the
deliverable; removal is what is left over when no condition fired. A second
mode closes the mission contracts that merged deliveries have discharged,
with four refusals of its own.*

This is a specification. The pack ships no code.

```
tools/mission_closeout.py                        dry run: every refusal, every removal that would happen
tools/mission_closeout.py --remove --only wt-<slug>   perform the removals; --remove is the authorisation, typed each time
tools/mission_closeout.py --missions             dry run: which merged deliveries discharge which contracts
tools/mission_closeout.py --missions --close     perform the closures
```

Dry run is the default. It is the tool a person runs and reads; it is never
scheduled and never unattended. Stand in the primary checkout when running
it: the tool resolves the regenerable-paths manifest from the checkout it
lives in, so the declaration governing a run is the one committed beside the
code that acts on it — and run from a worktree on a branch that predates the
manifest, it finds none and refuses every worktree, fail-closed and loud.

## Five conditions, each a refusal and never a warning

| # | Condition |
|---|---|
| 1 | the Guild session is closed — the session marker is absent |
| 2 | the working tree is clean, **untracked and ignored included** |
| 3 | the checked-out commit is reachable from a ref the remote is *asked* for, never from a tracking ref |
| 4 | no process holds the worktree directory |
| 5 | the branch is merged into the integration branch |

**A condition that could not be evaluated refuses exactly as a failed one
does.** The launcher that is wrong costs five minutes; this tool, wrong,
costs a journal. The five are not a restatement of the safe-deletion
checklist a person follows by hand: they are what discharges it, and the
tool prints that mapping, the worktree list before, the resolved target, the
list after, and the integrity confirmation on every run.

### Condition 1 — the session is closed

A process check is not a closure check. The session directory is ignored by
Git, so an unclosed session leaves a plain `git status` clean: the worktree
looks disposable and is not. `guild-bye` deletes the marker, which is why
its presence — not a running process — is the signal, and why the refusal
names the fix: run `guild-bye`, not *delete the file*.

### Condition 2 — clean, including what Git does not show by default

Untracked is the load-bearing half: a journal entry that mattered was once an
untracked file in a working tree, and every check that looks only at tracked
changes would have called that worktree disposable. Ignored is the half the
tool got wrong once: a plain `git status --porcelain` reports neither ignored
files nor — under a common configuration — untracked ones, so the condition
asks for both explicitly and distrusts the ambient configuration. It also
asks the index for submodule entries, because `git status` does not descend
into one and neither does `git worktree remove`.

**`git worktree remove` is not a second guard behind this condition.** It
derives its cleanliness check from the same machinery and is blind to the
same files: a gitignored file, or any untracked file under that
configuration, is destroyed by a `git worktree remove` that exits 0 with no
`--force` involved — reproduced end to end on two Git versions. Condition 2
is the only guard for that class, which is why it asks for everything. An
earlier revision of the tool's own documentation claimed the backstop
existed, and that claim is what made the hole invisible to the tool's own
review.

**Untracked entries are reported in two classes, and both refuse**: a path
no commit on any ref has ever held, and a path present in history but not at
the commit this worktree sits on. The split is explanation, never verdict.
`??` in a worktree pinned at an old commit means *untracked at this commit*,
and every reader so far had read it as *absent from the repository* — a
register entry, a warning that three directories held the only copies of
three journal entries, and then a whole mission contract, all written on the
false premise. Prose had recorded the lesson eight hours earlier and did not
prevent the repeat, so the report says it. Knowing the *path* is not knowing
the *content*: the file may still be the only copy of what it says.

**Ignored entries are reported in two groups — declared regenerable, and
everything else — and only the second refuses.** The declaration is the
committed manifest (`templates/REGENERABLE_PATHS.txt`); Git matches it
(`git ls-files --exclude-from`), and the tool holds no list of disposable
names and no glob engine of its own. A manifest that cannot be read or
parsed refuses **every** worktree rather than falling back to a default. The
declared group is printed whether or not anything refuses: a run that
silently omitted what it was about to destroy would be back to inferring,
with the inference hidden in an audit trail nobody reads.

### Condition 3 — reachable, on the server

Reachable, not present in the object database: a blob or a commit can sit in
the database unreachable from anything and be collected. The remote is asked
(`git ls-remote`); a tracking ref is never trusted, because a tracking ref is
a local cache that may be stale in either direction. A branch's commits are
exactly its tip's ancestors, so proving the tip reachable proves the branch.

**A worktree owns more than its HEAD.** `git worktree remove` deletes the
worktree's private metadata directory entirely, and that directory holds its
own HEAD reflog, its `ORIG_HEAD` and its worktree-scoped refs — none of which
exist in the common directory. A detached worktree that committed and moved
off leaves zero handles once that directory is gone. So the condition asks
the same question of every commit those private handles name, not only of
HEAD. A local reflog is not accepted as preservation, because the condition
is *on the server*, not *recoverable if nothing expires*.

### Condition 4 — nothing holds the directory

The developer platform exposes no process working directory to a standard
caller. What it does expose is whether the directory can be opened for
deletion with no sharing — which fails when *any* other handle is open on
it, and a shell sitting in a directory holds exactly such a handle. So this
condition observes a **superset** of *a process has it as its working
directory*: an explorer window or an indexer counts too. Superset is the safe
direction. Three gaps are named rather than papered over: a process whose
working directory is a *nested* directory holds no handle on the root, and
`git worktree remove` refuses that case on its own; on a platform where the
probe is not implemented the condition is unevaluable, therefore refusing;
and this condition alone measures something that changes by the second — so
a verdict is taken again immediately before each removal, and a verdict that
changed while the sweep was in progress is a stop.

Necessary, never sufficient: a dead process on an unclosed session is the
exact case the tool must refuse, and condition 1 is what refuses it.

### Condition 5 — merged, and nothing weaker

The branch is merged into the integration branch. Nothing else finishes a
mission. **An open pull request refuses too, and it did not always**: an open
pull request used to satisfy this condition, on the reasoning that a pushed
delivery under review is safe. The tree says why it is not — a returned lot
is resumed with the launcher's `--resume`, which rejoins *this* worktree on
*this* branch and creates nothing, so a worktree removed while its pull
request is open is exactly the directory a correction pass comes back to.
The change makes the tool refuse more and never less, which is the safe
direction for the one tool in the repository permitted to remove anything.

## What the tool never does

- **It never removes a path itself**; `git worktree remove` does, never with
  `--force`, and a removal Git refuses is a stop, never a fallback to the
  filesystem. There is no `rm`, no `rmtree` in the tool.
- **It never deletes a branch**, local or remote, and it never prunes. A
  registered path that no longer exists is a refusal naming `git worktree
  prune` as the operator's tool.
- **It never closes a terminal or terminates a process.** It reports which
  worktrees a terminal is sitting in, and which paths a terminal tab may
  still point at after a removal. Closing them is the operator's.
- **It is never run unattended.** It is run by a person who reads its
  output.

## Preserve, re-run, then remove — never in one motion

Extraction before removal is the operator's act, and the tool verifies it by
being re-asked. Demonstrated once: a commit was named only by one detached
worktree's own HEAD reflog. It was pushed to a preservation branch, and the
next run of the same tool reported one more head reachable than the previous
run, with that worktree's condition-3 refusal gone. Nobody asserted the
preservation; the query that had found the exposure reported it closed.

## The repository declares what is regenerable; the tool never guesses

`.gitignore` records what is *not committed* and says nothing about what may
be destroyed. The single exception to condition 2's refusal is a committed,
reviewed list of paths a tool remakes, whose contents were decided by the
human and are changed the way any reviewed file is changed. Nothing becomes
destroyable because a tool recognised its name — `__pycache__` is not
disposable because a tool knows the word; it is disposable because it is on
the list and somebody approved it. And what is *not* on the list is a
decision, recorded in the manifest with its reason: a vendor directory that
is the only copy; a captures directory regenerable in theory and needing the
device, a calibration and time in practice; a directory named `generated/`
that holds readings whose regeneration needs the device — the trap the whole
design exists to refuse.

## `--missions` — what closes a mission

Closing keywords do not close contracts in this topology (`02-delivery-contract.md`).
The second mode reads the merged pull requests over a stated window, takes
the mission number off each `Mission:` line, and closes the contract that
line names. The signal is **the pull request's merge**, and nothing weaker:
not a branch that looks contained in the integration branch — a branch can
be contained because it was rebased or cherry-picked, and closing on
containment would close contracts whose delivery was never accepted; not a
pull request that is merely closed — a *refused* delivery is closed unmerged,
and its contract is exactly the one that must stay open.

**Four refusals, and they are the deliverable:**

1. the delivery has not merged;
2. its `Mission:` line says `refused`;
3. the mission **carries a hold** — somebody wrote on the issue that it
   stays open;
4. the mission still has an **open** pull request, so a second delivery is
   on its way to the same contract.

**A hold is prose, because prose is what exists.** Holds on the source
project are a ruling posted in a comment after the merge and a line in a
transmission report; neither is a label or a field, so the tool matches
sentences — *stays open*, *remains open*, *keep it open*, *do not close*,
*must not be closed*, and their equivalents — and the phrases it matches are
listed in its source. That is a heuristic, and it earns its place on one
property: **it can only ever refuse.** A false positive costs a close that a
person does by hand, today's baseline. A false negative closes a contract
somebody asked to keep open, and a mechanism that closes what a person asked
to keep open is worse than the omission it repairs. The refusal quotes the
sentence it read, so the reader can overrule it. A hold worded some other
way is not seen, and the tool says so in its own report.

A question that could not be asked refuses exactly as a *no* does — the rule
the five worktree conditions already follow. The window of merged pull
requests is stated rather than assumed: a mission whose delivery merged
before it is not reported as refused, it is not reported at all, and the run
says so; and the open-pull-request read refuses rather than truncating if
its own window is reached, because a truncated list would silently lose the
open delivery that should have blocked a close.

## Exit codes

| Code | Means |
|---|---|
| `0` | the run completed and every removal it attempted succeeded — refusals are normal output, not failure; on a healthy machine most worktrees refuse |
| `1` | the tool could not run — its own failure, never a verdict about a worktree |
| `2` | a removal was attempted and did not happen — refused by the pre-removal re-check, or by Git itself; must never read as success |
| `3` | a closure was attempted and GitHub did not accept it — as above |
