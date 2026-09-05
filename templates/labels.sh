#!/usr/bin/env sh
# Guildwork — the label recipe.
#
# Three families, and only the first is capped. The mission taxonomy is
# seventeen labels and no more: one marker, one per role profile under
# docs/guild/roles/, and the mode / risk / gate / exception facets the queue
# is filtered on. `watcher:*` routes an object to a seat. `chantier:*` says
# which workstream a mission serves. Colours are cosmetic.
#
# Creating a label is a human, Product-Owner-authorized act: no agent runs
# these lines from a session. Applying one is the Chief Architect's act,
# always and without being asked. The two never conflict, because they are
# two different acts.
#
# `gh label create` fails on a label that already exists; use `gh label edit`
# for those — and reconcile any description written by hand before
# overwriting it, or it is lost.
#
# Run from the repository, or pass --repo <owner>/<name> to every line.

# --- the mission taxonomy: seventeen, and no more ----------------------------
gh label create ai-mission --color 0E8A16 --description "AI Guild mission contract"

gh label create role:chief-architect  --color 1D76DB --description "Runs as the Chief Architect role profile"
gh label create role:claude-code      --color 1D76DB --description "Runs as the Lead Software Engineer role profile"
gh label create role:domain-expert    --color 1D76DB --description "Runs as the Domain Expert role profile"
gh label create role:grok-build       --color 1D76DB --description "Runs as the Grok Build role profile"
gh label create role:grok-hq          --color 1D76DB --description "Runs as the Grok HQ role profile"
gh label create role:knowledge-steward --color 1D76DB --description "Runs as the Knowledge Steward role profile"
gh label create role:product-owner    --color 1D76DB --description "Runs as the Product Owner role profile"
gh label create role:ux-ui            --color 1D76DB --description "Runs as the UX/UI Design role profile"

gh label create mode:read-only  --color C5DEF5 --description "Read-only mission: the branch carries the journal, nothing else"
gh label create mode:one-writer --color 5319E7 --description "Writer mission: one feature branch, one worktree"

gh label create risk:low    --color C2E0C6 --description "Low risk"
gh label create risk:medium --color FBCA04 --description "Medium risk"
gh label create risk:high   --color D93F0B --description "High risk"

gh label create gate:delegated --color BFDADC --description "Routine merge under the standing Product Owner delegation"
gh label create gate:po        --color B60205 --description "Reserved Product Owner gate"

gh label create concurrency-exception --color E99695 --description "Product Owner concurrency or subagent exception, recorded on the issue"

# --- routing: an event, never a state ----------------------------------------
gh label create watcher:claude --color 0052CC --description "Route this object to the Claude seat"
gh label create watcher:codex  --color 0052CC --description "Route this object to the Codex seat"
gh label create watcher:both   --color 0052CC --description "Route this object to both seats"

# --- workstreams: descriptive, never load-bearing ----------------------------
gh label create chantier:dashboard          --color D4C5F9 --description "Workstream: the Dashboard page and the tiles an operator reads"
gh label create chantier:device             --color D4C5F9 --description "Workstream: the Device page, calibration and the bridge to the bench controller"
gh label create chantier:sync               --color D4C5F9 --description "Workstream: export and synchronisation of readings"
gh label create chantier:shell              --color D4C5F9 --description "Workstream: the frame every page wears"
gh label create chantier:gate               --color D4C5F9 --description "Workstream: the launcher, the governance check and the test gate"
gh label create chantier:watcher            --color D4C5F9 --description "Workstream: the GitHub label-event watcher"
gh label create chantier:governance         --color D4C5F9 --description "Workstream: the documents that say what the rules are"
gh label create chantier:release-provenance --color D4C5F9 --description "Workstream: proving what a shipped artefact is"
