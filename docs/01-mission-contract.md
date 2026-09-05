# The mission contract

*The issue form, field by field; why the options are ordered the way they
are; which fields a comment may amend and which it may not.*

The template is `templates/github/ISSUE_TEMPLATE/ai_mission.yml`. It is a
GitHub issue form, so the contract is structured data GitHub renders and a
tool can parse, and it is served from the default branch — a form merged
anywhere else never renders (see the last section).

## The fields, and what each one buys

| Field | Kind | What it settles |
|---|---|---|
| **Objective** | text | one bounded outcome — not a wish list |
| **Acceptance criteria** | text | what a reviewer checks against the repository; every figure cites its measurement |
| **Agent** | dropdown | the harness that executes — the launcher starts *this* process and no other |
| **Capabilities required** | multi-select | what the harness must be able to do, in the three-atom vocabulary of `04-capabilities-and-routing.md` |
| **Guild role** | dropdown | the role profile the seat runs as, or the sentinel `none — internal worker` |
| **Model** | free text | which model — free text on purpose, because identifiers churn faster than a template should |
| **Effort** | dropdown | the reasoning effort the launcher pins on the command line, or `AUTO` for none |
| **Budget** | dropdown | qualitative only: `SMALL`, `MEDIUM`, `LARGE` — no quota percentages |
| **Mode** | dropdown | `read-only` or `one writer` — what may be committed to the branch, never whether one exists |
| **Risk** | dropdown | `HIGH`, `MEDIUM`, `LOW` — leads with HIGH |
| **Chantier** | free text, optional | which workstream the lot serves; descriptive, never load-bearing |
| **Screen demand** | free text, optional | what the mission takes from the human's screen, with a duration |
| **Host** | free text, optional | which machine, when the criteria can only be met on one |
| **Concurrency** | dropdown | `within standing ceiling` or a recorded exception |
| **Subagents** | dropdown | `forbidden (default)` or a recorded authorisation |
| **Product Owner exception** | text, optional | the verbatim wording and date when either default is departed from |
| **Scope** / **Out of scope** | text | exact paths; silence is not an exclusion |
| **Branch and worktree** | free text | `feature/<slug> + wt-<slug>` — both halves, in every mode |
| **Human gate** | dropdown | who may merge: the reserved human gate, or the delegated routine one |
| **Reserved gate — which one** | free text, optional | the gate's name when reserved |
| **Stop conditions** | text | when the seat stops and reports instead of improvising |
| **Report target** | free text | pre-filled: *Chief Architect, as a comment on this issue* |
| **Invariants** | checkboxes | the seven that hold for every mission — six must be ticked to submit; the empty push at entry is confirmed by the seat at entry, not by the author, and is the one left unrequired |

Three things about this list are less obvious than they look.

**A read-only mission still names a branch and gets a worktree.** Its journal
entry is not a product mutation, and durable means reachable from a pushed
ref: a detached worktree has no branch to commit the entry to and no refspec
to push it by, so the session's own record survives nowhere. *Read-only*
governs what may be committed to the branch, and that belongs in Scope and
Out of scope.

**The ceiling on concurrent missions is not spelled in the form.** The form
offers the stable token `within standing ceiling` and points at the workflow
document, which carries the number. A numeral inside a closed vocabulary
makes every issue that selected the old string unlaunchable the day the
ceiling moves; the governance check enforces that shape.

**Exceptions are recorded, never remembered.** The `po_exception` field
carries the human's verbatim wording and date, and the `concurrency-exception`
label is applied. The field is the record that survives — a label can be
removed and the recorded wording cannot.

## Conservative option ordering

**A required governance dropdown leads with its most conservative option, or
with an explicit non-answer.** GitHub pre-selects nothing unless the form
says so — only `effort` carries a `default:`, and it is `AUTO` — but a
reader's eye and a hurried author's click both land on the first option, so
a form that leads with the widest authority hands it out by accident.

| Field | Leads with | Why |
|---|---|---|
| `risk` | `HIGH` | over-declaring risk costs a review; under-declaring costs an incident |
| `guild_role` | `none — internal worker` | an untouched submission claims no Guild authority |
| `human_gate` | `reserved Product Owner gate` | fail closed: never hand out a delegated merge by default |
| `capabilities` | `shell: host-native` | the most demanding requirement a mission can state, so a hurried author over-declares rather than under-declares |
| `effort` | `AUTO` | pins nothing; the pinned levels then ascend, so the click nearest the top is the cheapest pin |

`mode`, `budget`, `concurrency` and `subagents` already lead conservative.
They were correct *by accident* before the rule existed, and accident does not
survive an edit — which is why the governance check enforces the ordering on
every run. The rule was found by a human render check that a specification,
a diff review, a green suite and an expert consultation had all passed:
three different controls found three different things, and none was
redundant.

## Three free-text fields that are closed vocabularies by convention

`Chantier`, `Screen demand` and `Host` are `input` fields, not dropdowns,
**on purpose.** The launcher derives the set of fields a comment may not
amend as *every field a condition addresses by name, plus every dropdown*.
A dropdown here would make a launcher condition read a field no condition is
meant to read, and would move a set a ruling fixed. The closed vocabulary
lives in the workflow document, where a reader and a reviewer can see it, and
in the field's help text.

The cost is named rather than hidden: an `input` accepts any string, so one
wrong value can be written unimpeded and then read unchecked. The governance
check reads the form and the document; it never compares a *contract* against
either. Which end of that hole to close first is a decision on an ordering
ruling, not a thing to improvise inside the form.

**A blank is undeclared, never `none` and never `any`.** Those are two
different claims, and only one of them was made. Contracts written before a
field existed are undeclared, and nobody retro-declares them: the right value
often depends on a measurement nobody has taken.

## `Screen demand` — what a mission takes from the human's machine

Three values, and the estimated time on screen beside the value, written
`<value> — <estimated time on screen>`. The duration is not decoration:
`exclusive foreground` for eight seconds and `exclusive foreground` for
twenty minutes are different decisions.

| value | what the human sees |
|---|---|
| `none` | nothing at all — windows are built in memory under an offscreen platform; the event loop and threads are real, only the pixels are not |
| `windows appear` | real windows open, do their work and close; bounded; the human can work around them |
| `exclusive foreground` | a real window, in the foreground, and nothing may overlap it; the machine is not usable for anything else while it runs |

What the field measures is the human's machine and attention, **not whether
the toolkit draws a window.** The counterexample was on the board the whole
time: a mission that drives the physical bench controller through a capture
harness takes the operator's undivided attention and is `exclusive
foreground`, and no rule about windows would have classified it. So classify
by asking what the mission takes from *him*: nothing, something bounded, or
the machine.

And `exclusive foreground` is a measurement, not an implementation choice. A
capture that reads the client area of a window reads what is composited
inside its rectangle, so an overlapping window puts its own pixels into the
evidence. A window pushed behind another is not a slower measurement; it is a
different and false one. No later lot may "fix" it by putting the window in
the background.

## `Host` — which machine

Three values, exactly one: `any`, `workstation`, `laptop`. The field exists
because two missions were routed to hosts where their own criteria were
unreachable — one contracted for the laptop in *prose* while every *field*
matched the workstation perfectly; one whose harness was not authenticated on
the host it was launched on — and no check anywhere could have seen either.

The values are machine names, not deictic phrases, because a vocabulary whose
values *are* names is one a future check could compare against something,
and `this workstation` has no referent on a form authored in a browser. The
cost is accepted: the name goes stale the day the machine is replaced, and
that is one line to edit.

## The body is the contract; a comment amends the prose

**A comment may amend the prose sections** — Objective, Acceptance criteria,
Scope, Out of scope, Stop conditions — **and may not amend a field of the
contract block**: Agent, Capabilities, Guild role, Model, Effort, Budget,
Mode, Risk, Branch and worktree, Concurrency, Subagents, Human gate. To change
one of those, edit the body and launch again; the launcher reads it fresh
every time.

The reason is ordering. The launcher parses the fields from the body,
validates them, chooses the seat, the model and the effort from them, starts
the agent — and *then* tells the agent to read the comments. A field set in a
comment would govern the run having been checked by nothing. Condition 6
refuses instead, naming the comment URL and the field.

It refuses on a line that both *reads* as setting a field (`Mode: read-only`,
`**Effort:** MAX`, a `### Mode` section with the value under it) *and* names
a value that field would take. Both halves are needed: a transmission report
quoting the launcher's own contract block otherwise produced one refusal per
line, each saying a field had been set to the value it already had. A comment
that names the value the body already declares is not amending it.

## Four rules about writing criteria

Each of these was paid for; `12-incidents.md` has the bill.

- **A `###` heading inside a field ends that field.** The parser splits the
  body on level-three headings, so a sub-heading written inside the Objective
  for readability truncates the Objective in the generated instruction. Write
  `####`.
- **A predicted figure is a hypothesis, never a target.** A criterion that
  predicted "roughly nine" refusals met thirty; the seat accounted for the gap
  and did not adjust the declaration to make the number come true. Where a
  prediction contradicts a ruling in the same document, the ruling wins and
  the prediction is superseded in writing.
- **A figure asserted as measured cites its measurement** — a file and a
  section, a test, a commit, or a comment permalink. Four criteria written in
  twenty-four hours carried numbers nobody had measured, two of them real
  figures that counted different things. A figure that cannot cite one is a
  prediction.
- **"Enumerate every X" says how it is satisfied** — by reading source, or by
  running the product. One reading is a search over files; the other needs
  the application open, a human at it, and a capability declaration to match.
  A criterion that leaves it open is a budget, a capability requirement and a
  human's evening, decided by whichever reading the seat happens to take.

## The title carries its own number first

`#118 — [MISSION] Dashboard tiles keep their last reading while the device
bridge reconnects`. Every mission title otherwise opens on the same
`[MISSION]` tag, and the surface that has to tell them apart is the human's
list of running terminals, where a session is identified by its title and by
nothing else. *Its own* is the half a reader skips: a title opening on some
other mission's number reads as conforming and points the terminal list at
the wrong contract, so the launcher compares the number against the issue it
sits on — condition 7 — and a board sweep names every open title that does
not conform. It renames nothing: a title is a human artefact and an automatic
rewrite of one is a change nobody reviewed.

## Where GitHub reads the form from

GitHub does not read every artefact from the branch you are working on. It
reads most of them from the **default branch**, and getting this wrong is
what made a whole mission surface inert for a day.

| Artefact | GitHub resolves it from | Consequence |
|---|---|---|
| Issue forms | **default branch** | a form merged anywhere else never renders |
| Pull request template | **default branch**, *not* the pull request's base | a template on a feature branch never pre-fills |
| Workflows with `schedule` / `workflow_dispatch` | must exist on the **default branch** to be triggerable | automation is reachable only once merged there |
| A release created with no explicit target and a new tag | the **head of the default branch** | would tag the integration branch |
| Labels, Projects | repository-level | the branch has no effect |

Two consequences follow. A change to a surface served from the default
branch cannot be render-checked before it merges, by anyone — so the render
check is recorded as owed at merge and discharged by whoever opens the
surface first, who reports what they saw. And making the integration branch
the default branch, so that forms and workflows resolve from where they are
developed, is a platform choice and not a promotion: the release topology
`main ← develop ← feature/*` is unchanged, and a release must target an
already-created tag reachable from `main`, never GitHub's implicit default.
