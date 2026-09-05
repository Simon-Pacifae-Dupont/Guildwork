# The adoption path

*What it takes to run this on a repository, in what order, what this pack
contains and what it does not, and what to decide before the first mission.*

Guildwork is a demonstration, not a product. What is in this repository is
the shape of the system — contracts, forms, vocabulary, and the
specification of the three tools — precisely enough to audit. What is not in
it is the code of the tools, the day-one configuration of a project's seats,
and the month of incidents that made the rules stick. Those are the work.

## What is in the pack, and what is not

| In the pack | Not in the pack |
|---|---|
| the mission form and the pull request template, ready to drop in | the launcher, the closeout tool, the entry/exit commands — specified in `05`, `06`, `07`, not shipped |
| the label recipe, twenty-eight labels in three families | the governance check, the mission-line check, the title audit, the changelog assembler |
| eight role profiles and the seat model | a team charter (the document the profiles point at) written for your team |
| the journal format and the continuity contract | the measured capability table for your seats — every cell has to be observed, on your machines |
| the findings-register template and a filled example | the event watcher and its adapters |
| the regenerable-paths manifest with its reasoning | the render checks, the board schema, the token scopes — the human-only setup |
| the worked Lantern mission, end to end | your first forty incidents |

## The order, and why it is this order

**1. Adopt the vocabulary before any tool.** The five surfaces, the seat
model, the three-atom capabilities, the seventeen labels. A team that agrees
on what a *mission*, a *seat* and a *gate* are can run the whole lifecycle
by hand for a week and learn where its own incidents are. A team that
installs the launcher first argues with the launcher.

**2. Put the contract on the issue form and the delivery on the pull
request template.** Both are structural from day one — a field that
disappears is a question a reviewer has to ask by hand — and both resolve
from the default branch, so decide the branch topology first and record the
release-target guard beside it.

**3. Create the labels, by a human, once.** Then apply them from the
architect seat, always. Decide who the architect seat is before the first
mission: on the source project it is a cloud session with no shell on the
developer machine, and that division — the architect holds the board, the
human holds the terminals, and the architect *cannot* hold a terminal — is
the single rule that removed the human from the message path.

**4. Start the journal and the continuity contract.** One richer file
written at every exit, read at every entry. This is the cheapest part of
the system and the one that pays first: the first time a session opens and
already knows what the last one decided, the case for the rest is made.

**5. Measure the capability table.** Every seat, every property, with the
observation beside the value and `unknown` wherever nobody looked. This is
a day of work and it is not skippable: a launcher that trusts a guessed
table enforces the guess faithfully.

**6. Install the launcher, and route every mission through it.** Seven
conditions; refuse and name which. Run it `--dry-run` on the existing board
first and read what it refuses — on the source project the dry run over the
back catalogue is what found half the contract-writing rules.

**7. Install the closeout tool, and let it refuse.** Dry run by default. On
a healthy machine most worktrees refuse, and reading why is how the
regenerable-paths manifest gets written — by a person, from what the tool
found, never from a category.

**8. Open the register at the first board sweep**, and rule on every entry
at every sweep after that.

The fragments convention, the routing labels, the watcher and the workstream
labels come when the board is large enough to need them, and not before: on
the source project the workstream family arrived on day six of the form,
derived from the workstreams the board already carried, rather than invented
on day one.

## Decisions to make before the first mission

- **Who is the human gate, and what is reserved to it.** The delegation
  ruling that lets the architect seat perform routine merges is the single
  most consequential decision in the system, and it is recorded on an issue
  as verbatim wording with a date, never remembered.
- **Which branch is the integration branch, and which GitHub treats as
  default.** The resolution matrix follows from this and nothing in the
  pack works if it is wrong.
- **The concurrency ceiling**, spelled in the workflow document and nowhere
  else.
- **Which harnesses are seats, and which are advisory surfaces with no
  execution.** A profile is not a runtime.
- **What is regenerable**, decided by a person and committed, before the
  first removal.

## What adopting it looks like with help

Installing this on a repository, adapting the vocabulary to a team's own
workstreams and seats, measuring the capability table on the team's
machines, writing the launcher and closeout against the team's harnesses,
and running the first two weeks of missions alongside the team until the
rules are theirs — that is the service the author offers, and it is the
reason the tools are described here rather than shipped. The contact is in
the `README`.
