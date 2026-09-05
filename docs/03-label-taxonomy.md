# The label taxonomy

*Three families, and only the first is capped. Creating a label and applying
one are two different acts. A routing label is an event, not a state. A
workstream label is descriptive, never load-bearing.*

The recipe is `templates/labels.sh`. Colours are cosmetic.

## Three families

| Family | Count | Job |
|---|---|---|
| **mission taxonomy** | seventeen, and no more | who runs a mission, in what mode, at what risk, behind which gate, under which exception |
| `watcher:*` | three | route this object to that seat, now |
| `chantier:*` | eight on Lantern | which workstream a mission serves |

GitHub's stock labels — `bug`, `documentation`, `enhancement` — belong to
none of the three, and nothing here governs them. *"Seventeen and no more"*
governs the mission taxonomy, not the repository's whole label set; that was
a question left open until someone ruled it, and the ruling is recorded
rather than the open question erased.

## The mission taxonomy — seventeen labels

| Group | Labels | Purpose |
|---|---|---|
| Mission marker | `ai-mission` | board auto-add hook; the only label the form applies |
| Role (8) | `role:chief-architect`, `role:claude-code`, `role:domain-expert`, `role:grok-build`, `role:grok-hq`, `role:knowledge-steward`, `role:product-owner`, `role:ux-ui` | routing and filtering |
| Mode (2) | `mode:read-only`, `mode:one-writer` | writer visibility at a glance |
| Risk (3) | `risk:low`, `risk:medium`, `risk:high` | triage |
| Gate (2) | `gate:delegated`, `gate:po` | who may merge |
| Exception (1) | `concurrency-exception` | applied only with the exception field filled |

The role labels are **derived from the role profiles** in the repository,
never from a remembered list — a new profile is a new label, and the
governance check fails until the workflow document names it. The cap is
what keeps the taxonomy a taxonomy: a label set that grows by one every time
somebody wants a filter stops meaning anything within a month.

## Creating a label and applying one are two different acts

**Creating** these labels is a human, Product-Owner-authorised mutation. No
agent runs the recipe from a session. **Applying** one is the Chief
Architect's act, always and without being asked — the same standing rule
that puts issue bodies, contracts, comments, rulings and the register in that
seat's half. The two do not conflict; they were two existing rules that
nothing connected, which left the boundary to be re-derived under time
pressure by whoever hit it next.

The form applies exactly one label, `ai-mission`, through its `labels:` key
on submission. Every other label on a mission issue was applied by hand, and
no field of the form applies one.

**The governance check cannot tell you whether a label exists.** It asserts
that the workflow document *names* each label, re-deriving the role half from
the profiles directory. It never queries GitHub. On the source project it was
green on every day four of the seventeen did not exist, and green once they
did — one result for two opposite states. Thirteen labels had been created
one at a time by hand as missions needed them, twelve with GitHub's default
colour and eleven with an empty description, and no run of the recipe was
recorded anywhere. Whether a declared label exists, carries the colour its
line states, or has ever been applied is measured by hand or not at all.

## `watcher:*` — an event, never a state

`watcher:claude`, `watcher:codex` and `watcher:both` are routing for a
different machine: a deterministic, non-AI poller that observes label
events and starts, or in shadow mode records, a route to a seat. The labels
are created behind the human gate like the seventeen, and the poller never
creates, applies or removes them.

**Applying a routing label means *route this object to that seat now*. It
never means *this seat owns this object*.** The label is an event, not a
state. The poller routes on the `labeled` event and on nothing else: one
stable event id routes once per selected seat, `unlabeled` is inert, and a
label already sitting on an object asserts nothing and re-routes nothing.
No issue body, pull request body, comment or Markdown structure is parsed
for dispatch — an adversarial review showed a private Markdown parser
disagreeing with GitHub's rendering on closing fences, Unicode line
separators and lazy blockquote continuation, and that an issue's `user.login`
identifies the opener, not the editor. Removing prose from the authority
path closes the class rather than adding more exclusions.

Two consequences, and they are why the sentence is written down. **A routing
label left in place is not a claim of ownership.** And **a routing label
applied to an object already delivered or deferred is a wasted dispatch** —
a measurement found five useless routes out of thirty-three and traced every
one to that single practice, the routing label used as a seat-marker. No
code lot fixes it. A seat that owns an object records that in the issue, not
in a label.

## `chantier:*` — which workstream a mission serves

The taxonomy above answers who runs a mission, in what mode, at what risk
and behind which gate. It never answers *what the mission is for*, so a
human reading the board reconstructs a workstream by opening every issue,
and so does any tool. The workstream family answers that, and it is derived
from the workstreams the board actually carries rather than invented.

On Lantern:

| Label | What belongs in it |
|---|---|
| `chantier:dashboard` | the Dashboard page as it exists — its tiles, its layout passes, and the desktop code that paints them |
| `chantier:device` | the Device page: calibration, the bridge to the bench controller, and what it requires of the code that exists today |
| `chantier:sync` | export and synchronisation of readings — into the shared folder, never into the device |
| `chantier:shell` | the frame every page wears — the headbar, the navigation rail, the page frame and the tokens that place them |
| `chantier:gate` | the machinery that admits or refuses work: the launcher, the governance check, the test suite, and the figures a run must name |
| `chantier:watcher` | the GitHub label-event watcher — its poller, guards, adapters and state |
| `chantier:governance` | the documents that say what the rules are: the workflow document, the charter, the role profiles, the register, the forms |
| `chantier:release-provenance` | proving what an artefact is — deposited bytes, capture provenance, tags, signing and keys |

**Where two could apply, the chantier is where the lot's deliverable lands,
not where its evidence came from.** A tool that enforces a rule is `gate`; a
document that states one is `governance`. When the deliverable is *proof of
what an artefact is*, the chantier is `release-provenance` even though the
artefact belongs to another one. On the source project the discriminator,
applied by a seat that had not read it before classifying, raised agreement
with the board's declared values from 24 of 32 to 26 of 32, moved seven rows
and moved none the wrong way — and the discriminator's author is named,
because a decision whose author is unclear cannot be revisited.

**The frame's own term is the smallest one, not the largest.** `shell` is the
frame every page wears, not the pages themselves. The test: is it visible on
every page, or on one? A panel inside the Dashboard is `dashboard`, however
much chrome it has. And if a lot fits both `shell` and a page's chantier, it
is the page's — a frame change is only `shell` when the frame is what
changed. Without that sentence `shell` absorbs the other terms inside a
month, because almost every visual change can be argued to touch the frame,
and a term added to a list without its test is a term applied by taste. The
term arrived late, after a census measured that eleven lots delivering into
the frame had all been filed under the nearest page and a twelfth had left
the field blank for the same reason without noticing it was the same reason:
a vocabulary that forces its most structural lot to answer *nothing* is not
conservative, it is wrong.

**Three properties, and they are the whole design:**

- **Exactly one per mission.** The dimension is a partition, so a lot is
  never counted twice and the eight sum to the board.
- **Not required. An absent value is a legitimate state, not an oversight.**
  An unclassifiable lot must be visible as unclassified rather than forced
  into a wrong bucket, and nothing may treat a blank as a defect.
- **Descriptive, never load-bearing. No gate, no check and no launcher
  condition reads it.** This is the property that makes the family safe to
  apply by judgement and rename afterwards: the moment anything depends on
  it, it stops being free to correct. The register on the source project
  carries two entries for what happens when a descriptive field quietly
  acquires authority. This family is meant to be renamed by hand, often,
  without ceremony.

## The recipe

`templates/labels.sh` creates all twenty-eight. `gh label create` fails on a
label that already exists; those need `gh label edit`, which overwrites
without asking — so a description somebody wrote by hand is reconciled
before the line is run, or it is lost. The Project board schema and the
token scope that lets a session read it are the rest of the human-only setup.
