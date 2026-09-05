# Role profiles

One short file per Guild role. The role labels of the mission taxonomy are
**derived from the files in this directory**, never from a remembered list: a
new profile is a new label, and the governance check fails until the
workflow document names it.

A profile is deliberately small — a domain, where the full definition lives,
the operational document, the escalation path and the mandatory reading. It
is the card a seat is dealt at entry, not the rulebook. The rulebook is the
team charter it points at.

The eight profiles of the Lantern example:

| Slug | Seat | Nature |
|---|---|---|
| `product-owner` | the human | final authority, merge to `main` |
| `chief-architect` | Codex | contracts, routing, rulings, the register |
| `claude-code` | Claude Code | implementation, tests, pull requests |
| `grok-build` | Grok Build | delivery of assigned atomic lots |
| `grok-hq` | Grok HQ (profile) | adversarial architecture review |
| `domain-expert` | Grok Domain Expert (profile) | the domain's measurement policy |
| `ux-ui` | Grok UX/UI (profile) | user journeys, interface clarity |
| `knowledge-steward` | unassigned | durable project memory, terminology |

A profile that has no active session owner says so in a `Status:` line, as
`knowledge-steward` does. A placeholder that looks staffed is worse than an
honest gap.
