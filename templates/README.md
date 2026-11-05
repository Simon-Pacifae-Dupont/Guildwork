# Templates

*The two GitHub surfaces live under `github/` here, without the leading
dot, so that they read as templates rather than as this repository's own
configuration; they go to `.github/` in the adopting repository.*

The files to drop into a repository, written against the Lantern example.
Every value that is Lantern's (the workstream names, the capability
`device-bridge`, the machine names `workstation` and `laptop`, the role
`domain-expert`) is a placeholder for the adopting project's own, and every
help text that names a document names one the adopting project writes
(the list at the end of this page) from the corresponding page under
`docs/`.

| File | Goes to | Described in |
|---|---|---|
| `github/ISSUE_TEMPLATE/ai_mission.yml` | `.github/ISSUE_TEMPLATE/ai_mission.yml`, on the default branch | `docs/01-mission-contract.md` |
| `github/pull_request_template.md` | `.github/pull_request_template.md`, on the default branch | `docs/02-delivery-contract.md` |
| `github/pull_request_template.small.md` | `.github/PULL_REQUEST_TEMPLATE/small.md`, on the default branch; selected with `?template=small.md`, for small deliveries only | `docs/02-delivery-contract.md`, *Small deliveries* |
| `labels.sh` | run once, by a human | `docs/03-label-taxonomy.md` |
| `AI_TEAM.md` | the repository root | `docs/00-operating-model.md` |
| `roles/*.md` | `docs/guild/roles/` | `docs/00-operating-model.md` |
| `HANDOVER.md` | `docs/guild/HANDOVER.md` | `docs/08-continuity.md` |
| `journal/README.md`, `journal/ENTRY.md` | `docs/guild/journal/` | `docs/06-session-cycle.md`, `docs/08-continuity.md` |
| `REGENERABLE_PATHS.txt` | `docs/guild/` | `docs/07-closeout.md` |
| `FINDINGS_REGISTER.md` | the body of one issue, kept open | `docs/09-findings-register.md` |
| `WEEKLY_REVIEW.md` | the body of one issue per weekly run | `docs/16-weekly-review.md` |
| `changelog.d/README.md` | `docs/changelog.d/` | `docs/11-changelog-fragments.md` |
| `board/board.html` | published as a page on claude.ai with the GitHub connector (see `board/README.md`) | `docs/00-operating-model.md`, `docs/02-delivery-contract.md` |

## How each process ends

Every process these files carry ends on one word from a closed list, written
where the next reader looks first. None of the lists contains *done*: a word
that says something stopped, not what it delivered.

| Process | Ends on | Written in |
|---|---|---|
| a mission run | `delivered` · `partial` · `stopped` | the first line of the transmission report (`docs/06-session-cycle.md`) |
| a reserved gate | `approved` · `held` · `refused` | the gate comment, and the *Merge authority* line of the pull request |
| a delivery | `delivers` · `supersedes` · `refused` | the `Mission:` line (`docs/02-delivery-contract.md`) |
| a validation command | `PASS` · `FAIL` · `TIMEOUT` · `ABORTED` · `NO VERDICT` | *Validation: run* |
| a findings entry | struck through as a mission `#<n>`, or `declined` with its reason | the register (`docs/09-findings-register.md`) |
| a session | `complete` · `incomplete` | the journal entry's *Work state* |
| a weekly review proposal | `signed` · `amended` · `declined` | the Product Owner's answer on the run's issue (`docs/16-weekly-review.md`) |

`stopped`, `held`, `refused` and `declined` are results, each written with its
reason. A refusal that names why spares the next session the same attempt; a
mission that stops on its own stop condition did what the contract asked.

## What the templates reference

What the templates reference and do not contain, because it is the
adopting project's to write, under whatever names it prefers:

- the per-seat operational documents the role profiles name (`CLAUDE.md`,
  `AGENTS.md`, `docs/CHIEF_ARCHITECT.md`, `docs/DOMAIN_EXPERT.md`,
  `docs/CALIBRATION_COVERAGE.md`, `docs/design/LAYOUT_RULES.md`);
- the workflow document the form's help texts cite (`docs/guild/MISSION_WORKFLOW.md`)
  and the capability document (`AGENT_CAPABILITIES.md`): `docs/01` to
  `docs/11` of this pack, rewritten for one repository;
- the continuity contract (`docs/guild/CONTINUITY_CONTRACT.md`, from
  `docs/08`);
- the project glossary (`docs/GLOSSARY.md`) that the name check in every
  transmission report is made against.
