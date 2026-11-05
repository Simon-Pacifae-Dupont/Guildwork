# The weekly review

*Once a week, a pass outside every session reads what the week's sessions
left behind and proposes changes to the rules: a new rule, a skill, a merge,
a retirement. Another model reads each proposal before the human sees it.
Nothing it proposes exists until the human signs it.*

The template is `templates/WEEKLY_REVIEW.md`; a filled Lantern example is
`examples/lantern/weekly-review.md`.

## Why a pass outside the sessions

A session sees only itself. When it hits a failure, it answers it, and the
lesson it writes is about its own case. The next session hits the same
failure from another side, answers it, and writes another lesson. Each one
is right, and the register grows a list of past cases instead of a check.

**Measured on a second project run under the same governance, first pass,
27 October 2026.** Among the week's most recent mission stops, about seven
in ten came from the architect seat's own contracts, not from the missions
(counts approximate: some stops fit two causes): a test outside the scope
pinning the very value the lot changed, or a stated layout that was false on
the integration branch. Every one had been answered the same day, and every
answering session had added a note to the seat's memory. The stops kept
coming for four days. No single session could see the pattern, because each
saw one stop. The pass saw it in under three minutes of reading, and the two
rules it proposed (a census of what a lot changes, and a measured premise for
any stated geometry) went into the contract checklist the same afternoon,
signed.

That first pass was run by hand: readers on a smaller model, the synthesis
by the architect seat itself, and **no reader on another model**. It found
the pattern; it was also a seat grading rules it had written. The reader
rule below exists because of that run, not in spite of it.

That is the whole case for the pass: **in-session curation records cases;
a pass across sessions finds causes.** The human's signature stays the gate
between the two.

## What it reads

Read-only, the week's material: mission closeouts and stop reports, findings,
incidents, journal entries, the findings register, the seats' rule documents
and the seats' own memory notes. Two of its tests span more than a week, so
it also reads the issues of its earlier runs and each rule's traces since it
was written. And it reads, first, a short list the human edits, *what matters
this month*, which steers where it looks.

It writes one issue per run and nothing else.

## What it proposes: a closed list

Every proposal carries exactly one kind. Four of them ask for a signature;
two are recorded only.

| Kind | When | Signed? |
|---|---|---|
| `new` | a failure repeated across sessions that no rule covers | yes |
| `skill` | a successful sequence repeated across sessions that no rule or skill covers (below) | yes |
| `merge` | two entries say the same thing, or overlap | yes |
| `retire` | a rule meets the retirement test (below) | yes |
| `verified` | the week shows the rule applied and holding | no, recorded |
| `dormant` | the rule left no trace, and the thing it guards is still there | no, recorded |

Each proposal carries the **exact text change**, **two or three linked
examples**, its **prevalence** (*n* sessions out of *N* read), and the
**reader's verdict** (below). A proposal without evidence is not filed.

## Learning from what worked, not only from what broke

The register was built from failures: an incident pays for a rule, a person
validates it. That is half of what a week teaches. The other half is the
sequence that went right three times, written out by hand three times,
because nothing remembered it.

**The trigger is recurrence, never size.** A `skill` is proposed when the
same successful sequence appears in **three distinct sessions over at least
two weeks**, and no rule or skill already covers it. A count of tool calls is
the wrong test: a long task that happened once is not a procedure, and a
three-step sequence that recurs every week is one. Two weeks keeps a busy
afternoon from looking like a habit.

**A skill is proposed, never written.** Before the signature there is no
draft file in the repository, no disabled skill, nothing a seat could load.
The proposal carries:

- the **name**, and **one sentence saying when to use it**, the way a seat
  will read it when deciding;
- the **steps as observed** in the sessions, not as imagined, each with the
  session it came from;
- **what it must not do**: the stop conditions the sessions respected;
- **where it lives and whom it reaches**. On the source project, mission
  seats run with the account's synced skills and automatic memory turned
  off, so a skill reaches a mission only through the repository or the
  contract, never by drifting in from a personal account;
- the sessions as links, the prevalence, and the reader's verdict.

Once signed, the architect seat writes it in one pull request, like any other
rule document, and the next run counts whether the sequence is still being
written out by hand.

## A rule is retired on evidence, never on silence

A rule **has served** in a week when it left a trace: a ruling or a contract
cites it, a guard refused under it, a stop or a report invoked it, or the
week's material shows a seat applying it.

A rule is proposed for `retire` only when **both** hold:

1. it has left **no trace for eight weekly passes**; and
2. **its cause is gone**: the tool or file it guards no longer exists, a
   mechanism now enforces it (the rule then becomes a pointer to the
   mechanism), or a later decision contradicts it.

**Silence alone gives `dormant`, not `retire`.** A guard against a rare
failure is silent precisely because it works; grading it by usage would
retire the encoding rule the week before the next encoding accident.
Usage-based curation fails the other way too: a wrong rule that is cited
often survives every pass. So the pass reads causes, not counters, and a
`dormant` rule is listed with the date it last served, so a human can see
the silence without the pass acting on it.

**What leaves, and what stays.** An incident never leaves
`docs/12-incidents.md`: it happened. The rule under it can be retired, and
its line is struck through with the date and the reason, never deleted. A
`merge` keeps the sources of both entries. Findings keep their own rule
(`docs/09-findings-register.md`: three sweeps without moving is a decline).

## The reader is never the author's model

**Every lesson, rule or skill, and every proposal of the pass, is read by a
model other than the one that wrote it, before the human sees it.** Another
vendor when the installation runs one (a Codex seat reads what Claude wrote);
otherwise another model of the same vendor (a smaller or a different model
reads what the larger one wrote). The record says which model read, so the
human knows which of the two guarantees he has.

- **The brief is anonymous.** The reader receives the proposal, its evidence
  links and the claim, and nothing that names the author: no model, no seat,
  no signature. It checks the claims first-hand, from the repository and the
  linked material, never from the wording.
- **It answers per proposal:** `holds`, `fails` or `cannot-check`, with the
  evidence. A partly true claim fails, and the answer says which part holds.
- **A disagreement goes to the human as it is.** The reader's `fails` is
  printed beside the proposal; nobody resolves it before the signature.

**Why another model, and why another vendor when there is one.** A model
reading its own output shares its blind spots, and a curator that judges
the rules it wrote is both party and judge. Another model of the same
vendor removes part of that; another vendor removes more. It does not remove
all of it: published measurements find that larger, more accurate models
agree on a large share of their wrong answers, even across architectures and
providers
([Kim et al., 2025](https://arxiv.org/abs/2506.07962): agreement 60 % of the
time when both err, on one leaderboard). That is why the reader comes
before the human's signature and never replaces it.

This is also the second reason the kit runs several vendors as seats. The
first is that each is good at something different; the second is that they
are not wrong about the same things.

## The seat's own notes

A seat's memory notes are its scratch, and the human may delegate their
curation to the seat itself: merging two notes that say the same thing,
dropping a dated window that has passed, cutting what a decision already
holds. **The delegation does not waive the reader.** The seat's changes to
its own notes are read by another model first, then applied and listed on
the run's issue. Doctrine, rules, skills, configuration and tools stay the
human's to sign, one proposal at a time.

## How a run goes

- **Weekly, out of band.** It adds nothing to a mission's latency and has
  its own token ceiling. On the source project it runs after the weekly
  quota resets.
- **Readers in parallel, then a synthesis.** Read-only readers, one per
  slice (stops, findings and incidents, the register), each on a smaller
  model; then a synthesis that checks every claim it carries first-hand.
  *Measured, 27 October 2026:* under three minutes for the readers, about
  two hundred thousand tokens of reading, plus the synthesis.
- **One issue, one signature per proposal.** The human answers each one
  `signed`, `amended` (with the change) or `declined` (with the reason).
  Nothing is applied without that answer.
- **The next run measures the last.** It counts whether the pattern behind
  each signed proposal fell. A rule that did not move the count is the next
  run's first candidate for `merge` or rewrite.

**The first run is the test.** It passes if it surfaces at least one
cross-session pattern the register does not hold, with evidence, and it
reports its own cost. Tooling waits for a second run that pays.

## What it is not

Not an agent improving itself: nothing it proposes exists before a person
signs, and the reader is never the author. Not usage telemetry: it reads
causes, not counters. Not a second register: it proposes changes to the
rules where they already live.

**Status.** The pass has run once, by hand, on 27 October 2026, on the
second project named above. The `skill` and `dormant` kinds, the retirement
test and the reader rule were ruled on 5 November 2026, and are carried from
its next run.
