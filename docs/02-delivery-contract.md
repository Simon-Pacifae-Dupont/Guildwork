# The delivery contract

*The pull request template, the `Mission:` line and its three states, the
three rules the end of a run owes its reader, and who disposes of what a run
created.*

The template is `templates/github/pull_request_template.md`. Every section
is mandatory; a section that does not apply says so in one line rather than
disappearing. A field that disappears from the template is a question a
reviewer would otherwise have to ask by hand, which is why the governance
check fails when one goes missing.

## The sections, and what a reviewer gets from each

| Section | What it carries |
|---|---|
| **Mission** | one `Mission:` line — the contract and the state of this delivery |
| **Base / head** | base branch, head branch, worktree path, the base SHA the work started from |
| **Execution parameters** | the model and effort the work *actually* ran under, and how the session was started — the launcher, the launcher with `--resume`, or by hand with the command named |
| **Files changed** | by area, not a diff dump |
| **Validation — run** | exact commands, counts, durations, the commit-ish they ran against, and a verdict per command from `PASS` / `FAIL` / `TIMEOUT` / `ABORTED` / `NO VERDICT`; pre-existing failures distinguished from introduced ones, with evidence |
| **Validation — not run** | what was deliberately skipped and why — `nothing skipped` if true |
| **Evidence** | load-bearing and mutation evidence as repository paths, not pasted logs |
| **Safety and governance invariants** | four checkboxes: scope, explicit-path staging, one writer, no product code beyond scope |
| **Residual risks** | listed, or `none` explicitly |
| **Merge authority** | delegated routine merge, or the reserved gate named |
| **Report target** | where the transmission report goes, and whether it has been posted |

**Execution parameters is the section that makes a substitution visible.**
The launcher enforces the declared model and effort on the way in and nowhere
else, so a session started outside it can run under anything — and one did,
a corrective pass on the harness's default model instead of the model its
contract declared, surfaced only because the human happened to read his own
terminal. The section asks for what ran, not what the contract declares;
where the two differ, that difference is the point.

## The `Mission:` line — a delivery names its contract

```
Mission: #<issue>                                 the same as `delivers`
Mission: #<issue> delivers
Mission: #<issue> supersedes #<pr>[, #<pr> ...]
Mission: #<issue> refused
```

Three states, because a vocabulary that can only say *"this pull request
belongs to #N"* expresses none of the failures that produced it — five in a
single day, every one *a state the board could not express*.

| State | What it claims |
|---|---|
| `delivers` | this pull request carries work for the mission — the default, so the bare `Mission: #<issue>` stays valid |
| `supersedes` | this pull request carries the content of the named pull request(s), which are **closed** |
| `refused` | this delivery was refused; the pull request is closed at the refusal |

An optional note for the reader may follow after an em dash; nothing parses
it. The keyword is recognised case-insensitively so that a lowercase line is
*seen and reported* rather than silently missed — an unseen line is the
failure mode the line exists to close.

**A check reads the line, and it is advisory twice over.** It runs on every
pull request and, where a line is present, verifies exactly this and
nothing more — one well-formed line in the `## Mission` section; the mission number resolves to an issue that
exists and is open; every number after `supersedes` resolves to a pull
request that exists and is closed — and its job neither fails the workflow
run nor is a required status. A finding still shows as a red line against
the pull request, which is the advisory signal and the whole point; nothing
about the merge is blocked. A pull request with no line at all does not
fail it: every pull request open when the line landed predated it, and
failing them would be the retroactive invalidation the ordering rule
forbids.

What it deliberately does not do, because a check that claims more than it
verifies is the defect it was written against: it closes no issue; it
enforces no merge order; it does not verify that a superseding pull request's
content reached the tree — that is the read whose absence produced the
failures, and a checker that claimed to do it and did it badly would make the
proxy look authoritative, worse than no checker at all.

## Three rules the end of a run owes its reader

The first two are owed by a closed pull request; the third by any run that
ends, however it ends.

1. **A closed pull request whose content was carried elsewhere records the
   carrier, reciprocally, at closure.** The closing comment names the pull
   request that carries the work, and the carrier's `Mission:` line says
   `supersedes #<pr>`. Two pull requests were superseded in one afternoon and
   nothing said so; both relationships existed only in the head of whoever
   performed them.
2. **A refused delivery is closed at the refusal, with the refusal recorded
   on it. An open pull request means the decision has not been made.** A
   refused pull request left open made the live board report it for a day as
   a decision waiting for the human — who was about to take it a second time.
3. **What the run created is disposed of when the run ends, or the reason it
   is kept is recorded on it.** A mission creates a branch and a worktree.
   Merging the delivery removes neither: GitHub's delete-on-merge deletes the
   *remote* head and nothing else, and the local branch and its worktree are
   exactly what refuses the next launch of the same mission on the one-writer
   condition. That cost five refused launches in one day, four of them traced
   to a branch or a directory a previous run left and nothing removed. The
   condition was right every time; nothing above it disposes.

The first two rules exist because the architect seat read a proxy — a pull request's
state — and concluded something about the tree. The third exists because
nothing read the tree at all.

## Who disposes, and when

The **disposition** is owed at the moment the run ends, by the party that
ends it. The **destructive act** is never theirs: deleting a branch or
removing a worktree is the human's, on its own line, with the target named.
What is owed is the record and the exact command, not the deletion.

| When the run ends | Who owes the disposition | What it says |
|---|---|---|
| **at merge** | the party who merges, in the same act | the branch and the worktree are spent — the remote head is gone, the local branch and directory are not, and they are named for removal |
| **at supersession** | the party who closes the superseded pull request | the carrier, reciprocally; and whether the superseded branch is spent or still holds something the carrier did not take |
| **at refusal** | the party who records the refusal | what survives the refusal and where it lives, or that nothing does |
| **at a stop** | the seat that stops, in its transmission report | what the worktree holds that no ref holds — it is the only party that knows |

**"Kept" is an act, not a default.** A branch survives because somebody
wrote down why, in a place the next reader will find: the closing comment,
the transmission report, or a census. Silence is debris.

**A branch that is the only ref holding something is kept, and the reason is
recorded on it.** A census once found five branches on the remote each
holding the sole reachable copy of one journal entry, and every heuristic
that reads a merged pull request would have deleted them. Such a branch is
disposed of by carrying its content to the integration branch first — after
which there is nothing left to keep — and never by deletion.

## Closing keywords, and what closes a mission instead

GitHub's closing keywords fire only when a pull request merges into the
branch GitHub treats as the default. In a topology where deliveries merge
into an integration branch, `Closes #N` in a delivery body has never closed
anything, and no amount of writing it more carefully changes that. The cost
is not tidiness: one sweep closed twenty-nine issues by hand whose work had
shipped days earlier, which means that until then *open* did not mean *not
done*, and every count taken off the board — including the concurrency
ceiling, which counts open missions — was wrong.

What closes a mission is the closeout tool, reading the merged pull requests,
taking the mission number off the `Mission:` line, and closing the contract
that line names — with four refusals that are the deliverable. `07-closeout.md`
specifies it.

## Gate figures — what a run must name

Two rules about the figure a delivery quotes for its test gate:

- **A gate figure names the environment it was measured in, not only the
  commit.** The same commit reported `exit 0` with ten thousand passed under
  the declared command and six failures under an inherited environment
  variable that selected another platform backend — and both were reported
  as *"the full suite"*. A gate line records the command as run, including
  any environment variable that selects a platform; a figure from any other
  invocation is a separate, named measurement.
- **A branch's gate figure is not the tree's — measure the merge result.**
  Two lots that touch no file in common can still compose a red tree, and
  every branch involved will have reported `exit 0` honestly. Merge the
  integration branch in, re-run the full suite on the merge commit, and name
  that commit beside the figure: it is the only figure that describes the
  object the human is actually asked to merge.

## Claims about pre-existing state

A claim that a failure, a count or a condition pre-existed a change names an
explicit commit-ish, never `HEAD`. `HEAD` moves, so a claim anchored to it
cannot be re-checked later. Prefer direct measurement in a clean tree at the
named base commit over an exported artefact.
