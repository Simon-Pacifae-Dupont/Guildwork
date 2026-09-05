# The operating model

*What Guildwork is for, in one page, and the shape everything else hangs on.*

## The problem it solves

One person runs a software project with several AI coding agents at once —
different vendors, different harnesses, different strengths. The agents are
fast and tireless, and left to themselves they produce four kinds of damage
that no amount of prompting cures:

- **two agents write the same file** and the human becomes the merge tool;
- **an agent runs under parameters nobody declared** — another model, another
  effort level, another prompt — and nothing records the substitution;
- **what an agent learned dies with its context window**, so the next session
  re-derives it, or worse, works from a stale summary with confidence;
- **the human ends up as the message bus**, carrying instructions from one
  agent to another by hand, which is the one job the agents were supposed to
  remove.

Guildwork is the governance that was built, incident by incident, to stop
each of those on a real project. It is not a framework and it ships no
runtime. It is a set of contracts on GitHub, a small vocabulary, and the
specification of three tools that hold the contracts to account.

## The five surfaces

GitHub is the source of truth for a mission. Five surfaces, each with exactly
one job:

| Surface | Job |
|---|---|
| **Issue** | the mission **contract** — objective, scope, authority, stop conditions |
| **Project board** | the **queue**: `Backlog → Ready → Active → Review → Human Gate → Done` |
| **Worktree** | the isolated **workspace** one mission runs in |
| **Pull request** | the **delivery and review** surface |
| **Journal** | the durable **session memory**, one file per closed session |

The board is a projection, never truth. When the board and the issue
disagree, the issue is right and the board is stale. A mission may not be
expressed anywhere else: a mission stated only in a conversation does not
exist.

## The seats

A *seat* is a harness running under a role. The role is a short profile in
the repository (`templates/roles/`); the harness is whatever executes it —
Claude Code, Codex, Grok Build, a Grok profile, a person. The mission
contract names both, and the launcher refuses a mission whose harness cannot
physically do what the contract requires.

On the Lantern example — a small Python desktop application that tracks bench
sensors for a workshop, with a bridge to a physical bench controller — the
seats are:

| Seat | Runs as | Holds |
|---|---|---|
| Product Owner | the human | the bench, the product verdict, the merge to `main`, every irreversible act |
| Chief Architect | Codex | contracts, routing, rulings, the register, the board — never a terminal |
| Lead Software Engineer | Claude Code | implementation, tests, pull requests, adversarial self-review |
| Software Engineering | Grok Build | assigned atomic lots |
| HQ Architecture, Domain Expert, UX/UI | Grok profiles | adversarial review and domain authority, each in its lane |

The division that makes the system work is stated once and kept: **the
architect seat holds the board; the human holds the terminals.** Issue
bodies, contracts, labels — including the routing labels — comments, rulings,
the register and the opening of a missing pull request are the architect's,
always and without being asked. Launch commands, merges under the gate, and
the final say are the human's. Handing the human an act of the board puts
him back in the loop the system exists to remove.

## The lifecycle, end to end

1. **The contract is written** on the issue form. Every required field is
   filled; the dropdowns lead conservative; the title starts with the issue's
   own number so the mission can be found in a wall of terminals.
2. **The launcher validates it** against the governance *at the commit the
   mission will run on*, checks seven conditions, and refuses — naming which
   condition fired — or creates the branch and worktree, runs the entry
   command (`guild-hi`), and starts the declared harness under the declared model and
   effort with a first instruction generated from the issue. There is no
   paste, and there is no flag that can set a parameter the contract did not.
3. **The seat works** inside its worktree, stages by explicit path, pushes by
   explicit refspec, and posts a transmission report on the issue naming what
   actually ran.
4. **The delivery is a pull request** whose body carries one `Mission:` line
   naming the contract and the state of the delivery — `delivers`,
   `supersedes`, or `refused`.
5. **The session closes** with exactly one exit command (`guild-bye`), which
   writes the journal entry and returns a code that says whether the entry is durable —
   reachable from a pushed ref — or not yet.
6. **The gate merges** — the delegated routine gate, or the reserved human one.
7. **The closeout tool disposes** of what the run created, refusing every
   worktree whose material is not provably preserved, and closes the contract
   from the merged delivery's `Mission:` line.

## The four principles under the rules

**Measured, not assumed.** A capability, a figure, a freshness claim, a
process's liveness — each is recorded with how it was established and when.
`unknown` is a permitted value and it routes as *cannot*. A table marked
"observed" without the observation beside each cell was false within four
hours on the row describing its own author.

**Fail closed, and say which condition.** A check that could not be evaluated
blocks exactly as a failed one does. Every refusal names the condition, the
field and the remedy. A warning is not a softer refusal — it is a fact carried
into the durable artefacts so that a later reader finds it.

**A refusal does not prevent the mission; it moves it outside the gate.**
This is the principle that turned two refusals into warnings. A mission
refused for a guarantee the harness cannot give will be run by hand, where it
has that guarantee no more *and* none of the other checks either. The gate
therefore warns, starts, and obliges the seat to repeat the warning in its
report.

**Durable means reachable from a pushed ref.** A file in a working tree is
not preserved, a local commit is not preserved, a dangling object is not
preserved. Anything declared preserved is proved by a ref.

## What is deliberately not here

No database, no service, no daemon, no state machine, no ticket system, no
duplication of what Git and GitHub already record. The whole mechanism is a
form, a template, a label set, one more file read at entry, one richer file
written at exit, and three tools that refuse.
