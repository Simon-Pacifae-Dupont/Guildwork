# Session entry and exit

*`guild-hi` at entry, exactly one `guild-bye` at close, a session marker
between them, three exit codes decided by durability alone, and a
three-state declaration of what the session learned and did not write down.*

Sessions have closed without their journal reaching a ref. The fix is not
more prose: it is making entry and exit checkable by a reviewer from durable
artefacts. Two commands do that, and both are part of the project's own
command-line surface rather than a separate tool.

## Entry — `guild-hi --role <slug>`

Run in the worktree, before the agent starts — by the launcher on a launch,
by the operator on a hand start. A successful entry states, without anyone
being asked:

- current branch and head, tracking, ahead/behind, working-tree state;
- open pull requests;
- **the operational state**: its source path and whether it is branch-local,
  work state, milestone, completed work, decisions, open decisions and
  blockers, next decision owner, smallest next action, findings, artefacts,
  authoritative and stale documents, pull request state — read from the
  latest journal entry relevant to this branch (`08-continuity.md` says how
  it is selected);
- any operational-state conflict, with both sources;
- the curated handover's priority and next epic;
- known stale documents;
- the role's domain, escalation path and mandatory reading;
- **a preservation census**: which worktrees on this machine hold commits
  that exist nowhere else.

It writes a **session marker**, `.guild/session-state.json` — role, branch,
head SHA, timestamp, working-tree fingerprint; no pid, no host — and it
warns when a previous session's marker was never closed. Reporting that
warning is mandatory, so unclosed sessions surface at the next entry instead
of accumulating silently.

**Entry is performed once, by whoever starts the session.** When the
launcher runs it, the agent must not run it again: a second run overwrites
the snapshot the exit command compares against and reports a stale-snapshot
warning for a session that never happened. The generated first instruction
carries the transcript and its exit code, which is the entry evidence every
transmission report must cite.

**The census is relayed, not re-measured.** Entry is a terminal nobody else
reads, so the transmission report relays that a census was taken and names
every non-empty *unpreserved* or *unknown* bucket. It does not relay the
*preserved* count, a three-figure number on the developer machine and noise
on a board. A seat whose census was empty says so in one clause — an absent
line is indistinguishable from a seat that never looked. A closeout that
re-measures reports a different machine than the one the session started
on; a seat that could not read its own census says that instead, and does
not go and take one.

## Exit — `guild-bye`

Run exactly once per session, after the transmission report is posted and
the delivery pushed. It:

1. validates the handover structurally — presence of the fields the session
   class requires (its class is whether state changed, and whether the work
   is complete), and a paste guard of 20 000 characters per field that
   exists to reject a pasted log, never to shape a handover;
2. writes the journal entry, named `<UTC timestamp>-<role slug>-<short head sha>.md`;
3. deletes the session marker;
4. checks whether the entry is **machine-independent** — committed *and*
   reachable from the configured upstream;
5. records the conversation-only declaration, in one of three states;
6. returns a code the durability verdict decides.

It **never stages, commits or pushes.** It reports the gap and prints the
steps that close it; closing it is an explicit human act. That separation is
the lifecycle's design and this document does not touch it.

## Exit codes — the durability verdict decides

Three codes, and the durability verdict decides which one — never the shape
of the handover and never the class of the session.

| Code | Name | Means |
|---|---|---|
| `0` | `EXIT_OK` | the entry is committed *and* reachable from the configured upstream, and no conversation-only knowledge was named. The only code that means the close is finished |
| `2` | `EXIT_FATAL` | something went wrong: an invalid handover, an unreadable repository, a failed write. The entry may not exist at all |
| `3` | `EXIT_INCOMPLETE` | the entry is written and valid, and either it is not yet reachable from a pushed ref or conversation-only knowledge was **named**. Nothing failed; the close is unfinished |

**`EXIT_OK` requires machine-independence.** Written is not preserved,
committed is not preserved, and *this session changed nothing* is not an
exemption — an entry that lives on one disk is lost the same way regardless
of what its session did. An *unknown* verdict — no upstream to compare
against, or an ahead-count that could not be resolved — is `INCOMPLETE`
too, because an unproved push is not a push. Until one repair, a
minimal-handover close printed `[WARNING] journal NOT preserved` and, five
lines below it, `Knowledge preserved.`, and returned 0. The rule that
followed: **no automation of this workflow may read process exit status as
the outcome of a mission unless the tool makes that status true**; a
transport proposal that does is refused at the design stage.

**`EXIT_INCOMPLETE` is the ordinary outcome of a close, not an alarm.** The
exit command does not push, so the entry it has just written is never
already reachable at the moment it returns. Exit 3 says exactly that, and it
is cleared by running the printed steps — **never by re-running the exit
command**, which writes a second entry for one session. A second entry for
one session is worse than an ugly exit.

## Declaring conversation-only knowledge — three states

If a finding materially changes architecture, governance, the next action, a
blocking decision, scope, product behaviour or risk, it must be written into
a durable artefact before the session can be called complete. The exit
command cannot read a conversation and does not pretend to. What it
enforces is the consequence: the declaration is the agent's judgement; the
consequence is mechanical.

| Spelling | Means | Exit contribution |
|---|---|---|
| `--unpreserved "<text>"` | **Named.** This exists only in the chat. The text is recorded verbatim in the entry and printed back | `INCOMPLETE` |
| `--unpreserved-none` | **Declared absent.** *I checked; nothing from this session is conversation-only.* Written into the entry in words, so the record shows the check was made | none |
| neither flag | **Undeclared.** Nobody said. Reported as its own line; the entry carries no such section | none |

`--unpreserved "none"` is **not** the middle row. It is the first: `none` is
recorded as the conversation-only knowledge and the close returns 3. That is
deliberate: a seat whose one unpreserved item is a branch, a file or a
nickname called `none` must not have it swallowed, so no string is matched
and the three states are told apart structurally. `--unpreserved ""` is
`FATAL`, because an unset shell variable expands to exactly that and
forgetting must never look like checking.

The middle spelling exists because it was missing. Twenty-five journal
entries once declared *nothing* in words — twenty-two of them the bare word
`none`, fifteen written on a single day across as many sessions. Each of those
seats answered a negative correctly, had its answer read as its opposite,
and then spent a paragraph of its transmission report explaining a tool
defect. An exit code that fires as often on a correct answer as on a real
gap stops being read.

## Durable means reachable from a pushed ref

Nothing weaker counts:

- a file in the working tree is not preserved;
- a local commit is not preserved — it dies with the local `.git`;
- **an object in the object database is not preserved.** A blob with the
  right bytes can be dangling, reachable from no commit, and collected by
  `gc`. A lost local `.git` once destroyed local-only commits exactly as it
  destroyed untracked files, and that is the lesson the whole rule is
  named after.

Proof, by command:

```
git branch -r --contains <journal-commit>     # must be non-empty
git cat-file -e origin/<branch>:<journal-path>
```

The principle is broader than journal entries: **anything declared preserved
is proved by a ref**, not by an object's existence.

## Ordered closeout for a writer mission

1. Implement, validate, commit, push the branch by explicit refspec.
2. Post the transmission report; obtain the Chief Architect's acceptance.
3. Run the exit command **exactly once**.
4. Commit and push the journal entry on the **same feature branch**, staged
   by explicit path, so it rides the merge and survives delete-on-merge.
5. Re-verify the complete pull request head.
6. Merge — by merge commit — under the named gate.
7. Perform any human render check the surface requires.

**Never place the exit command after the merge**, and never after the
feature branch has been deleted: the push target it prints no longer exists.

**When the upstream branch no longer exists.** A session that closes *after*
its pull request merged has no upstream to make its entry reachable from,
and the exit command reports `INCOMPLETE` against a branch that is gone. Do
not recreate the merged branch to carry the journal: resurrecting a deleted
head re-opens a reference the merge deliberately closed and invites a stale
branch to be mistaken for live work. The pattern is a journal-only
preservation branch and pull request — `docs/preserve-<slug>-journal` →
the integration branch — carrying the entry and nothing else. Better still,
where the shape of the work allows: write the final entry on the feature
branch *before* the merge, so it rides the merge and needs no second pull
request. Until a preservation pull request merges, the entry is invisible to
the next entry, which falls back to an older one and reports a stale next
action under a warning.

## Detached sessions

A detached session has no branch, so there is no ref to push. The exit
command detects this and prints the complete ordered preservation procedure
itself, including the named branch to create. Follow the printed output; the
document deliberately does not restate those commands, because one copy of a
procedure exists, in the tool that measures the actual state, and a second
copy would drift from it. Three invariants hold regardless of what is
printed: a preservation sequence ends at the push; it never contains a
`HEAD` refspec, a bare push, or broad staging; and every command handed to
an operator names its target explicitly — `--repo <owner>/<repo>`, `-C
<path>` — rather than relying on the working directory, because the operator
is rarely standing where the command's author imagined, and an inferred
target is an answer nobody was asked for and nobody checks.

## What a transmission report must carry

Every transmission report — the comment a seat posts on the issue before it
closes — cites, and a reviewer rejects a report missing any of them the way
a pull request missing a template section is rejected:

1. **Entry evidence**: the entry command as invoked, its exit code, and the
   head it reported.
2. **The stale-snapshot disclosure**, if entry warned of one.
3. **Entry ordering**: an entry run mid-session is a deviation and is
   self-disclosed.
4. **Execution parameters**: the model and effort the session actually ran
   under, and how it was started.
5. **Exit evidence**: the exit code, the journal commit SHA, and the
   reachability proof.
6. **The name check**: a lot that introduces a name — a class, a field, a
   label, a display string, a value in a closed vocabulary — checks it
   against the project glossary before writing it and names what it
   checked; a lot that introduced no name says that instead. Where the check
   finds a collision the glossary does not carry, the lot adds the row in the
   same lot, or names the collision in its report as the floor and not the
   discharge. Three lots once found a collision each on one day, each
   recorded the finding, and none produced a correction.
7. **The preservation census relayed**, as above.
8. **The warnings the generated instruction told it to repeat** — read-only
   not enforced, closed contract — in the fixed wording.
