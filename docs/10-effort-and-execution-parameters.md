# Effort and execution parameters

*The effort a contract declares, the flag the launcher passes, which levels
each seat carries, and the rule that every report states what actually ran.*

## Three parameters, one place each is decided

| Parameter | Decided | Enforced | Reported |
|---|---|---|---|
| **Agent** (the harness) | on the contract | the launcher starts that process and no other | in the transmission report and the pull request |
| **Model** | on the contract, free text, by the architect seat from what the lot must do | shape only — the CLI stays the authority on whether the name resolves | idem |
| **Effort** | on the contract, from a closed vocabulary | exact mapping; a level the seat does not carry is refused | idem |

The launcher enforces the declared model and effort **on the way in and
nowhere else.** A session started outside it can run under anything; that is
why the report and the pull request carry an *Execution parameters* section
that states what ran, not what the contract declares, and how the session
was started — the launcher, the launcher with `--resume`, or by hand with
the command named. A corrective pass names its own parameters, not the
first pass's.

## The effort mapping is fixed

| Contract | Command line |
|---|---|
| `AUTO` | flag omitted — the session inherits the runtime's own default |
| `LOW` | `--effort low` |
| `MEDIUM` | `--effort medium` |
| `HIGH` | `--effort high` |
| `EXTRA HIGH` | `--effort xhigh` |
| `MAX` | `--effort max` |
| `ULTRACODE` | `--effort ultracode` |

A value outside the left column is a refusal, never a nearest-neighbour
mapping. A contract once declared `Effort: MEDIUM` when the form did not
offer it, and `medium` happened to be a valid CLI value: a launcher that
mapped loosely would have started that mission at an effort no contract
legally declared, and nobody would have noticed. That coincidence is why the
mapping is exact — and why, when the gap was closed, it was closed from the
other end: the form now offers every level the seat carries, so an author
who wants a middle setting declares it instead of rounding up to spend
budget it does not need or down to risk the work. A test reads the table out
of the workflow document by its heading and compares it to the code, so the
two copies of one mapping cannot drift in silence.

**`AUTO` maps onto no flag, never onto a spelling of itself.** `--effort
auto` is rejected by the harness with a warning and the default effort — so
a future edit that "completes" the table by mapping `AUTO` to `--effort
auto` would start every `AUTO` mission with a warning and a silently
substituted effort.

What the mapping fixes is the **level**; the flag that carries it is the
seat's — `--effort` on one family of seats, `--reasoning-effort` on the
other, spelled the way that CLI's own help spells it so that a printed
command matches.

## Which levels a seat carries is the seat's

The form keeps **one** closed `Effort` vocabulary across every seat — there
is no per-seat dropdown, because a contract must mean the same thing to a
reader whichever agent it names — and condition 2 refuses a level the
declared seat does not carry, naming the seat and the level. This is the
mechanism that lets the form offer a level only one seat carries: offered to
every author, legal on one seat, refused on the other before a turn is
taken.

| Seat | Effort levels carried |
|---|---|
| the Claude seats (`claude`) | `low`, `medium`, `high`, `xhigh`, `max`, `ultracode` |
| the Grok seats (`grok`), profiles included | `low`, `medium`, `high`, `xhigh` |

**The sets are declared constants, measured rather than read.** Parsing each
CLI's `--help` for them was tried: one CLI enumerates nothing, so the parser
returned an empty vocabulary, so every pinned contract on that seat was
refused and six missions ran by hand in one day — outside the gate, which is
the cost a refusal actually buys. The third option between guessing and
refusing is that **the program names its own set when it rejects a value**:

```
$ grok --reasoning-effort definitely-not-a-level --max-turns 1 -p '…'
--effort/--reasoning-effort: unknown effort level 'definitely-not-a-level';
use one of: xhigh, high, medium, low
```

Verified by exercise once and recorded beside the constant. A constant
nobody has run against the tool is the same unverified guess in a different
place. And the principle cuts both ways: on the other seat `ultracode` is
**carried and unadvertised** — the flag takes it in silence while both
`--help` and the CLI's own rejection message omit it — so the constant
declares a level the free help-text audit cannot confirm, with that
exception named in the audit test rather than smuggled past it.
**Documentation about a program is not the program.** A CLI's bundled user
guide named seven canonical levels of its own, three of them rejected by the
installed binary.

**On one seat, condition 2 is the only gate there is.** The two CLIs
disagree about what an unknown level means: one exits `1` and starts
nothing; the other prints *unknown value — ignoring it and using the default*
and **runs anyway**. A mistyped effort on that seat is a session that
silently ran at some other effort, unless condition 2 catches it first.

**Known limit: the level sets are per seat, and the CLI's are per model.** A
contract declaring a seat, a model and a level the seat carries but that
model does not passes condition 2 and is refused by the CLI at launch —
before a turn is taken, with the accepted set in the message. Declaring the
intersection instead would refuse a configuration that was exercised and
works, and refusing a working configuration is what sent six missions round
the gate.

## `ULTRACODE` is not a rung

It authorises fanning the work out across subagents, so it changes what the
seat may do, not how hard it thinks. It is last in the dropdown for that
reason, and a contract that declares it also records the subagent
authorisation the form asks for — an exception recorded, never remembered.

## Model is free text on purpose

Model identifiers churn faster than a template should. The architect seat
chooses the model from what the lot must do, and the launcher checks the
identifier's **shape** — an alias the CLI's own help names, or a full name
of the shape that seat accepts — because neither mapped CLI enumerates its
models. A well-formed identifier passes and can still fail to resolve when
the session starts; the CLI stays the authority. The shape rule belongs to
the seat, never to the launcher: a rule written for one vendor's names was
once applied to another vendor's contract, and a mission was refused for
carrying a model name of exactly the right vendor.

## Budget is qualitative

`SMALL`, `MEDIUM`, `LARGE`. No quota percentages: a quota is a property of
an account on a given day, and a contract that named one would be wrong the
next morning.
