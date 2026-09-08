# The case, by the numbers

*What this governance ran on, how much went through it, and how fast. All
figures are real. They were measured on 7 September 2026 over complete days
only — 1 August to 6 September, thirty-seven days — and are frozen at that
reading; the domain is
deliberately not described beyond one sentence.*

## The project

A Windows desktop application in Python, driving an external audio host
process, with a full test suite of **12 100 tests** on the day of
measurement (10 400 a week earlier). One human — the Product Owner — who
holds the hardware, the product verdict and the merge to the release branch.
Every line of code, test and governance document since early August 2026
was written by AI seats under the contracts described in this pack.

### Later reading — kept separate from the frozen table

On 8 September, the latest complete suite result at commit `4859946b` was
**12 996 passed, 135 skipped and 24 xfailed: 13 155 collected tests**. On
7 September, 18 further pull requests merged. That makes **318 merges over
the 13 complete days from 26 August to 7 September — 24.5 a day** (318 ÷ 13,
rounded to one decimal). The contract and journal counts below were not read
again and remain frozen at 6 September; this update does not silently extend
their window.

## The seats

| | |
|---|---|
| role profiles | 8 |
| harness options on the mission form | 7 |
| startable seats, across two command-line harnesses | 6 — one CLI under two model tiers, the other bare and under three domain profiles |
| architect seat | Claude Cowork — a cloud session with no shell on the developer machine, holding the board and never a terminal: contracts, labels, rulings, the register, and every command the human runs |
| external reviewer | Codex, consulted on request; no execution surface, `unknown` on every capability |

## The throughput

| | |
|---|---|
| journal entries written by closed sessions | **531** in 35 days (3 August → 6 September) |
| … by the lead engineer seat | 498 |
| … by the five other AI seats that wrote one | 33 |
| busiest day | 46 closed sessions |
| mission contracts opened on the issue form | **323** in the 12 days to 6 September (26 August → 6 September) — about 27 a day |
| pull requests merged in those 12 days | **300** — about 25 a day |
| pull requests merged over the project's life | 541, of which 510 since the charter was adopted on 3 August |
| deliveries closed unmerged — refused or superseded | 14, of 555 closed |
| merged deliveries carrying a `Mission:` line | 325 |
| standing concurrency ceiling | 4 missions at once, any mix of writer and read-only — raised from 2 |

Twenty-seven contracts and twenty-five merges a day, for twelve days, with one
human at the gate. That is the number the rest of this pack exists to make
safe: at that tempo nothing survives on memory, and everything the human is
asked to remember is a defect.

## The governance corpus

| | |
|---|---|
| labels | 28 — the seventeen-label mission taxonomy, three routing labels, eight workstream labels |
| launcher conditions | 7 specified; the reference implementation currently refuses on 10 |
| closeout conditions | 5, plus four refusals in the contract-closing mode |
| register entries | five families; the governance family alone passed 130 entries |
| normative workflow document | 2 300 lines, 138 KB, owned by a named seat with a stated obligation |
| capability document | 50 KB, every cell of its table carrying its own provenance |
| continuity contract | 11 KB |
| launcher | 4 700 lines of Python, tested, reading three policy sources from the pinned governance commit at every run |
| closeout tool | 2 800 lines of Python, tested, holding no list of disposable names |
| rules produced by named incidents | about forty-five, listed in `12-incidents.md` |

## Two readings of the same numbers

**The optimistic reading.** A single person ran a seven-seat AI engineering
team at twenty-five merges a day for twelve days, with every merge behind a
named gate, every session leaving a durable record, every substitution of
model or effort surfaced in a durable artefact, and fourteen deliveries out
of five hundred and fifty-five closed refused or superseded — with the
refusal recorded on each.

**The sober reading.** The same period produced about forty-five incidents
serious enough to earn a rule, most of them inside one week. Most of the
seats the launcher can start are `unknown` on the hardware property the
queue would most like filled, and they will stay `unknown` until somebody
measures them. Neither command-line harness enforces read-only from its own
flags, and the governance says so rather than pretending. The launcher is
still formally opt-in. A closed-contract relaunch warns and does not refuse,
by a reasoned decision that could be wrong.

Both readings are true. The second is why the first is credible: every
weakness in the list above is stated in the governance itself, with the
measurement behind it, and a system that can say *I do not know* in the
places it does not know is the only kind whose *yes* is worth anything.
