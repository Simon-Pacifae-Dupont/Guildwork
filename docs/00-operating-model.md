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
Claude Code, Claude Cowork, Grok Build, a Grok profile, a person. The
mission contract names both, and the launcher refuses a mission whose
harness cannot physically do what the contract requires.

On the Lantern example — a small Python desktop application that tracks bench
sensors for a workshop, with a bridge to a physical bench controller — the
seats are:

| Seat | Runs as | Holds |
|---|---|---|
| Product Owner | the human | the bench, the product verdict, the merge to `main`, every irreversible act — and every terminal |
| Chief Architect | Claude Cowork, a cloud session | the board: contracts — which the launcher turns into every other seat's first instruction — routing, rulings, labels, the register, and the exact commands the human runs; never a terminal |
| Lead Software Engineer | Claude Code | implementation, tests, pull requests, adversarial self-review |
| Software Engineering | Grok Build | assigned atomic lots |
| HQ Architecture, Domain Expert, UX/UI | Grok profiles | adversarial review and domain authority, each in its lane |
| Witness | any seat that did not write the delivery | reads the delivery's evidence against the repository before the gate; the gate merges on the witness's word, not the author's |
| External reviewer | Codex, on request | a second opinion on architecture and contracts; no execution surface, so no arrow in the lifecycle below |

**The architect seat orchestrates, and it cannot execute.** That is a
design choice, not a limitation to work around. The Chief Architect runs in
a cloud session whose shell is `remote` — it can read and write GitHub end
to end and it can reach files on the developer machine, but it cannot run
a command there, start a harness, or push a commit. So everything it does
is an act on GitHub or a line of text: the contract on the issue, the
ruling in a comment, the label on the object, the register entry, the
routine merge it performs under the human's standing delegation — a GitHub
act recorded on the pull request, never a push — and the command it hands
the human to paste. The human runs the command and reports what the
terminal said; the architect reads the report and hands over the next one.
A seat that holds the board and cannot touch the tree is a seat that cannot
become the second writer or the silent substitution — and a seat that
merges only what a witness has read is not the merge tool either.

The division that makes the system work is stated once and kept: **the
architect seat holds the board; the human holds the terminals.** Issue
bodies, contracts, labels — including the routing labels — comments, rulings,
the register and the opening of a missing pull request are the architect's,
always and without being asked. Launch commands, merges under the gate, and
the final say are the human's. Handing the human an act of the board puts
him back in the loop the system exists to remove.

Two consequences of the shape, stated because a reader will ask:

- **What comes back.** Every incident a delivery surfaces goes to the
  register, and from the register into the next contracts as a criterion,
  a stop condition or a rule. The loop runs through the architect seat,
  which is why it holds both the register and the contracts.
- **Who signs.** The intended end state is one GitHub identity per seat, so
  that the history says who did what without anyone remembering. On the
  source project the bot identity exists and the seats still publish under
  the human's; the debt is recorded on the register with the event that
  will trigger paying it, which is how a known gap is kept from becoming a
  forgotten one.

## The lifecycle, end to end

A diagram of agents usually shows who calls whom. This one is better read
for where it can stop: seven conditions before a session starts, a witness
and a gate before anything lands, and a register that sends every incident
back into the next contract.

1. **The contract is written** on the issue form, by the architect seat.
   Every required field is filled; the dropdowns lead conservative; the
   title starts with the issue's own number so the mission can be found in
   a wall of terminals. The architect then hands the human one launch
   command.
2. **The launcher validates it** — the human runs it — against the
   governance *at the commit the mission will run on*, checks seven
   conditions, and refuses — naming which condition fired — or creates the
   branch and worktree, runs the entry command (`guild-hi`), and starts the
   declared harness under the declared model and effort with a first
   instruction generated from the issue. There is no paste, and there is no
   flag that can set a parameter the contract did not.
3. **The seat works** inside its worktree, stages by explicit path, pushes by
   explicit refspec, and posts a transmission report on the issue naming what
   actually ran.
4. **The delivery is a pull request** whose body carries one `Mission:` line
   naming the contract and the state of the delivery — `delivers`,
   `supersedes`, or `refused`.
5. **The session closes** with exactly one exit command (`guild-bye`), which
   writes the journal entry and returns a code that says whether the entry is durable —
   reachable from a pushed ref — or not yet.
6. **A witness reads the delivery** — a seat that did not write it checks
   the report's claims against the repository — and **the gate merges**: the
   architect seat under the human's standing delegation for routine work,
   the human himself for everything reserved.
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
