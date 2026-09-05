# Templates

*The two GitHub surfaces live under `github/` here, without the leading
dot, so that they read as templates rather than as this repository's own
configuration; they go to `.github/` in the adopting repository.*

The files to drop into a repository, written against the Lantern example.
Every value that is Lantern's — the workstream names, the capability
`device-bridge`, the machine names `workstation` and `laptop`, the role
`domain-expert` — is a placeholder for the adopting project's own, and every
help text that names a document names one the adopting project writes —
the list at the end of this page — from the corresponding page under
`docs/`.

| File | Goes to | Described in |
|---|---|---|
| `github/ISSUE_TEMPLATE/ai_mission.yml` | `.github/ISSUE_TEMPLATE/ai_mission.yml`, on the default branch | `docs/01-mission-contract.md` |
| `github/pull_request_template.md` | `.github/pull_request_template.md`, on the default branch | `docs/02-delivery-contract.md` |
| `labels.sh` | run once, by a human | `docs/03-label-taxonomy.md` |
| `roles/*.md` | `docs/guild/roles/` | `docs/00-operating-model.md` |
| `journal/README.md`, `journal/ENTRY.md` | `docs/guild/journal/` | `docs/06-session-cycle.md`, `docs/08-continuity.md` |
| `REGENERABLE_PATHS.txt` | `docs/guild/` | `docs/07-closeout.md` |
| `FINDINGS_REGISTER.md` | the body of one issue, kept open | `docs/09-findings-register.md` |
| `changelog.d/README.md` | `docs/changelog.d/` | `docs/11-changelog-fragments.md` |
| `board/board.html` | published as a page on claude.ai with the GitHub connector — see `board/README.md` | `docs/00-operating-model.md`, `docs/02-delivery-contract.md` |

What the templates reference and do not contain, because it is the
adopting project's to write, under whatever names it prefers:

- the team charter (`AI_TEAM.md`) that every role profile points at, and the
  per-seat operational documents the profiles name (`CLAUDE.md`,
  `AGENTS.md`, `docs/CHIEF_ARCHITECT.md`, `docs/DOMAIN_EXPERT.md`,
  `docs/CALIBRATION_COVERAGE.md`, `docs/design/LAYOUT_RULES.md`);
- the workflow document the form's help texts cite (`MISSION_WORKFLOW.md`)
  and the capability document (`AGENT_CAPABILITIES.md`) — `docs/01` to
  `docs/11` of this pack, rewritten for one repository;
- the continuity contract (`docs/guild/CONTINUITY_CONTRACT.md`, from
  `docs/08`) and the curated handover (`docs/guild/HANDOVER.md`) that
  `guild-hi` reports beside the journal;
- the project glossary (`docs/GLOSSARY.md`) that the name check in every
  transmission report is made against.
