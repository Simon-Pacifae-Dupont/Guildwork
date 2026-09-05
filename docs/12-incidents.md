# Incidents, and the rules they paid for

*Every rule in this pack was bought by a failure on a real project, and
most of them were bought within a week of each other. The failures are
listed here — anonymised, without issue numbers, with the domain removed —
because a rule whose incident is unknown is a rule that gets relaxed by the
first person who finds it inconvenient.*

The format is the same for each: what happened, then the rule it produced.
Dates are kept where they say something about tempo.

## Continuity

**A real test of the handover.** A session was closed, the context cleared
and a new session opened on the same branch. Git state survived perfectly.
The new session recovered the branch, the head, the pull request — and a
global priority three sprints stale. An audit's root causes, its recommended
next lot and the decision blocking it had to be reconstructed by hand from a
journal, a pull request, the repository and old scratch directories; some
of it was not recoverable at all.
→ *If a new session requires the human to repeat recent operational
context, the continuity system has failed.* Entry reads the journal; the
journal is read before the curated handover.

**The completed next action.** A session opened on a branch with no journal
entry, so entry fell back to an older entry whose next action read
*"authorise phase 3"* — while `HEAD` was the merge commit that delivered
phase 3. The entry had not been superseded; it had been completed, by a
session whose own entry was still sitting in an open pull request.
→ Precedence orders sources, not claims. A next action that observed Git
already falsifies is not current, whatever its rank, and the entry that won
says so.

**The 400-character cap.** The first journal format capped every field at
400 characters and made the cap fatal, so a session with more to say had to
condense until it fit. The cap cost real operational knowledge.
→ A field limit that exists for a screen must never reach the artefact.
Format 2; display truncation only, marked, beside the path to the full text.

**Two invalid refspecs in one night.** Two independent sessions, hours
apart, each closed from a detached worktree, and each was handed a push
command with an invalid refspec. Both refused to improvise, and that
judgement is the only reason both journals were recoverable. The tooling
should not depend on the operator being careful at 23:00.
→ Every mission gets the branch its contract names, read-only included; the
exit command prints the complete preservation procedure itself; a
preservation sequence ends at the push and never carries a `HEAD` refspec.

**Exit 0 under a warning.** A minimal-handover close printed *journal NOT
preserved* and, five lines below it, *Knowledge preserved*, and returned 0.
→ The durability verdict decides the exit code, never the shape of the
handover. No automation may read exit status as the outcome of a mission
unless the tool makes that status true.

**Twenty-five entries that said "none".** Seats that had checked and found
nothing conversation-only wrote the word `none` into the declaration —
twenty-two of them the bare word, fifteen on a single day — and each got
exit 3, then spent a paragraph of its report explaining a tool defect.
→ Three states, told apart structurally: named, declared absent, undeclared.
No string is matched.

## Routing and capabilities

**The 117 KB file.** A mission was written for an agent with no shell on the
developer machine. Sixteen of seventeen findings were carried without
difficulty; the seventeenth lived in a 117 KB test file, and the agent moves
file content by retyping it through an API call — a vector that had already
corrupted a project file earlier in the same mission, caught only by
blob-hash verification.
→ A three-atom capability vocabulary; a mission declares what it requires
and the launcher matches exactly; a 20 KB transport threshold for the
agent's own judgement.

**"Observed, not assumed", false in four hours.** The first capability table
was marked observed. It was false within four hours, in the row describing
its own author's runtime.
→ Every cell carries how and when it was established. `unknown` is a
permitted value and routes as cannot execute.

**The prose host.** A mission's criteria named the laptop in prose; every
*field* in the contract matched the workstation perfectly, and it ran there.
The seat then measured the laptop unreachable from the workstation. The same
morning another mission's harness turned out not to be authenticated on the
host it was launched on. No check anywhere could have seen either.
→ The `Host` field, a closed vocabulary of machine names, exactly one.

**The screen.** The human's words: *"when the agent works on the app's
geometry, does it have to manipulate the app's windows in the foreground?
It floods my screen and often I can't do anything else."* And a mission
that was foreground for a reason no window rule would have found — it drove
the physical device through a capture harness and needed the operator's
undivided attention.
→ The `Screen demand` field, three values and a duration, classified by
what the mission takes from the human and not by whether the toolkit draws
a window.

**The composited capture.** A capture read the client area of a window
through the platform's device context, which returns what is composited
inside the window's rectangle — so an overlapping window put its own pixels
into the evidence, and a later capture run's occlusion refusal fired
legitimately and wrote nothing.
→ *Exclusive foreground* is a measurement, not an implementation choice. A
window pushed behind another is not a slower measurement; it is a false one.

**The silent default agent.** Given a profile path that did not exist, the
harness exited 0 with an empty stderr and ran the default agent — byte for
byte the control's system prompt. And the bare-name form of the flag loaded
the profile headless and loaded nothing in the interactive terminal, with no
failure line even in the CLI's own debug log.
→ The launcher resolves the profile itself, from the governance commit,
before anything starts; the regime is part of the claim and every refusal
names it.

## The launcher

**The wrong role.** A session was entered as one role where the issue said
another.
→ Condition 3.

**Six commits behind.** The primary checkout was six commits behind the
remote, and a mission was launched with a flag that had been removed on the
branch it ran from. The gap was found by a reader noticing one flag, which
is not a control. Another day, an uncommitted edit to the capability
document became the policy every mission was validated against, and it
existed on one disk.
→ Fetch first; resolve the governance ref to a commit once; read every
policy out of that commit; create the worktree from the same commit; print
the SHA on every path.

**`Effort: MEDIUM`.** A contract declared a level the form did not offer,
and the level happened to be valid on the CLI. A launcher that mapped
loosely would have started that mission at an effort no contract legally
declared.
→ The mapping is exact; a value outside it is a refusal. Then the form was
widened to offer every level the seat carries, so the misdeclaration the
form had forced could not recur.

**The empty vocabulary.** The launcher parsed each CLI's `--help` for its
effort levels. One CLI enumerates nothing, so the parser returned an empty
set, so every pinned contract on that seat was refused, and six missions ran
by hand in one day.
→ Declared constants, measured by exercising the program and recorded
beside the constant. Documentation about a program is not the program.

**The refusal that moved the mission.** Two read-only missions were refused
because the harness has no read-only mode. Both then ran by hand under a
planning mode — where they had no read-only enforcement either, *and* none
of the conditions, no one-writer check, no governance pin and no session
entry.
→ *A refusal does not prevent the mission; it moves it outside the gate.*
The launcher warns, starts, and obliges the seat to repeat the warning in
its report.

**The ungoverned resume.** Two of four lots handled on one day were
returned; both resumes ran outside the launcher, and at least one corrective
pass executed on the CLI's default model rather than the model its contract
declared. Nothing reported the substitution — no launcher involved, no
contract to check against, no field for it in the report.
→ The `--resume` door; execution parameters mandatory in every report and
every pull request.

**The oldest return governed.** A lot returned twice carried two returns,
and the reader took the first match on the order the API delivered — the
oldest.
→ The newest return governs; the report names the one read and how many
older ones were passed over.

**Three files deleted by hand.** A refused resume named the obstacle as a
directory and a relative filename in two clauses of one sentence. Three
missions were resumed that day, each at the cost of a marker deleted by
hand.
→ A refused resume prints the absolute path, the branch, every field the
marker carries, and the remedy in order — the exit command first.

**The `###` inside the Objective.** A sub-heading written inside the
Objective for readability ended the Objective, and the generated instruction
would have arrived carrying two paragraphs of objective and ten acceptance
criteria pointing at items of a section it had dropped. Caught by reading
the parser, before launch.
→ Write `####` inside a field.

**Roughly nine, actually thirty.** A criterion predicted refusals falling to
roughly nine; the measured result was thirty. The prediction and the ruling
it contradicted were five paragraphs apart in the same comment, written by
the same seat.
→ A predicted figure is a hypothesis to test and account for, never a
target to reach; where it contradicts a ruling, the ruling wins and the
prediction is superseded in writing.

**Seventeen or twenty-five.** Four criteria written in twenty-four hours
carried numbers nobody had measured. One asked for twenty-five entries where the
governing ruling counts seventeen; both figures were real and counted
different populations. Another asked for twenty-five writes where the measurement
says thirty-six.
→ Every figure in a criterion names where it was measured. The measurement
governs the criterion's restatement of it, never the reverse.

**Three hours on a scrollbar.** A criterion said *enumerate every region*;
the seat read it as a runtime verification and spent three hours opening and
closing the application. The relaunched contract said *by reading source*,
and the same enumeration took a search.
→ A criterion that says *enumerate every X* says how it is satisfied.

**The manual worktree in the handover.** A handover contained a manual
`git worktree add` and then the launcher command for the same mission; the
launcher's one-writer condition refused, correctly, because the worktree
already existed.
→ Launch instructions are the launcher's or they are manual — never both.

**Another mission's number.** A title carried another mission's number for
a whole mission, and read as conforming at a glance.
→ Condition 7: the number is compared against the issue it sits on, never
matched as a shape.

**The comment that set a field.** A `### Mode: read-only` heading in a
comment took the whole heading as the field name, matched no label, and
passed — while the generated instruction told the agent no comment had set a
field. And when the check was tightened, transmission reports quoting the
launcher's own contract block produced one refusal per line.
→ Condition 6 reads both spellings; a comment naming the value the body
already declares is not an amendment; the instruction states what was
checked instead of certifying the result.

**Three closed contracts, relaunchable.** Three closed issues returned
*contract OK* with nothing saying so; a second run of any of them would have
produced a branch, a worktree and a delivery indistinguishable from a first.
→ The closed-contract warning — appended after the conditions, belonging to
none of them, changing no exit code.

**Both errors at once.** A live session was declared dead because it had
pushed nothing for twenty minutes, and had its branch and worktree destroyed
underneath it. In the same window a session believed finished had been
running for an hour and three quarters. Neither error was available to a
reader of the disk.
→ `--list` reads the process table; the marker reads the disk; neither is
the other's proof, and the two lists are printed together.

**The Store stub.** A bare `python` in a bare shell resolved to the
platform's store stub, and the launcher did not start.
→ The interpreter is the environment's, spelled in full.

## Delivery and disposal

**Five lifecycle failures in a day.** Two pull requests were superseded and
nothing said so — both relationships existed only in the head of whoever
performed them. A refused pull request was left open, so the live board
reported it for a day as a decision waiting for the human, who was about to
take it a second time.
→ The `Mission:` line with three states; a closed pull request records its
carrier reciprocally; a refused delivery is closed at the refusal.

**Five refused launches in a day.** Merging a delivery deletes the remote
head and nothing else; the local branch and its worktree survive, and they
are exactly what refuses the next launch of the same mission. Five launches
were refused in one day, four traced to debris a previous run left.
→ The disposition is owed at the moment the run ends, by the party that
ends it. Silence is debris.

**Five branches holding the only copy.** A census found five branches on
the remote each holding the sole reachable copy of one journal entry, and
every heuristic that reads a merged pull request would have deleted them.
→ A branch that is the only ref holding something is kept, the reason
recorded, and disposed of by carrying its content to the integration branch
first.

**The 445 KB changelog.** Two pull requests failed to merge twenty minutes
apart on the same changelog file, each having added a section at its top;
both resolutions were performed by the integrator.
→ One changelog fragment per mission; assembly once at release; the
assembly check deliberately not wired into pull-request CI.

**Twenty-nine issues closed by hand.** Closing keywords never fired in this
topology, so one sweep closed twenty-nine issues whose work had shipped days
earlier — and until then, *open* did not mean *not done*, and every count
taken off the board was wrong.
→ The closeout tool closes contracts from the merged delivery's `Mission:`
line, with four refusals that are the deliverable.

**The ignored file that `git worktree remove` destroys.** A gitignored
file, or any untracked file under a common configuration, is destroyed by a
`git worktree remove` that exits 0 with no `--force` — reproduced on two Git
versions. An earlier revision of the tool's own documentation claimed a
backstop existed, and that claim is what made the hole invisible to the
tool's own review.
→ Condition 2 asks for untracked *and* ignored explicitly; the only
exception is a committed manifest a person wrote down.

**`??` misread as "absent from the repository".** In a worktree pinned at
an old commit, an untracked path means *untracked at this commit*; every
reader had read it as *absent from the repository* — a register entry, a
warning that three directories held the only copies of three journal
entries, and then a whole mission contract, all on the false premise. Prose
had recorded the lesson eight hours earlier.
→ Untracked entries are reported in two classes, and the report says what
each means.

**The second lock.** Refusing the session directory as well as the marker
inside it — because the exit command deletes the marker and leaves the
empty directory — made every worktree that had ever hosted a closed session
refuse forever, for a directory containing nothing.
→ One condition per door; the manifest names the directory as regenerable
and states the residual risk beside it.

**Two figures for one commit.** The same commit reported ten thousand
passed under the declared test command and six failures under an inherited
environment variable that selected another platform backend — and both were
reported as *the full suite*.
→ A gate line records the command as run, including any environment
variable that selects a platform. Measure the merge result, not the branch
tip.

## Labels and forms

**The mission surface that did not render.** A specification, a diff
review, a green suite and an expert consultation all passed a mission form
that did not render at all, because GitHub serves issue forms from the
default branch. The next human render check then found a dropdown that led
with the widest authority.
→ The resolution matrix; the standing human render check; conservative
option ordering enforced by the governance check.

**Four labels that did not exist.** The workflow document instructed every
mission to apply a label no mission could apply, for weeks; the governance
check was green on every day the four labels did not exist and green once
they did. Thirteen others had been created by hand as missions needed them,
twelve with the default colour and eleven with no description.
→ Creating a label and applying one are two different acts; the check
verifies that the document names a label, never that GitHub has one, and
says so.

**Five useless routes out of thirty-three.** A routing label left on an
object was read as ownership, and objects already delivered or deferred were
routed again.
→ A routing label is an event, never a state.

**Eleven lots filed under the nearest page.** A census found that the
desktop frame had no workstream value of its own: eleven lots delivering
into the frame were filed under the nearest page, and a twelfth left the
field blank for the same reason without noticing it was the same reason.
→ The frame gets its own term, with the test that bounds it and the
sentence that keeps it the smallest term, not the largest.

## Documents

**Three correct reports, no correction.** Three missions reported the
workflow document stale, each reported correctly, none was in scope to fix
it, and two were deferred to *its own lot* by the same seat.
→ A lot that changes the launcher, the conditions, the form or the gates
updates the workflow document in the same lot; naming the fault is the
floor, not the discharge.

**True at the commit, false forty minutes later.** A paragraph pinned to a
commit described the launcher correctly at that commit and was false forty
minutes later, when a pull request merged sixteen minutes after the session
that wrote it had launched and twenty-eight minutes before it closed.
→ A dated pin is not a defence when the tree moves inside your own
session; freshness is the owner's obligation, discharged by the lot that
changes the tool.

**Three collisions, no correction.** Three lots on one day each found a
naming collision, each recorded it, and none produced a correction. Seven of
the nineteen collisions a later census found had been created inside its
last seven days.
→ A lot that introduces a name checks it against the glossary, reports the
check, and adds the row in the same lot where it can.

**One frame in sixty.** The only user reported something on screen; the
first response reached for reasons he might be mistaken — display scale, a
driver, an update — none evidenced. He filmed it, and one frame in sixty
showed exactly what he had described.
→ When the only user reports what he sees, ask what the instrument missed.
Where an observation cannot be reproduced, the finding is *not reproduced
by this method*, named with the method — never *probably not there*.
