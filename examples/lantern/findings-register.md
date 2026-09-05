# Unowned findings register — things that are true, unassigned, and currently kept alive only by someone re-reading a closed issue

*Lantern's register issue, as its body reads after two board sweeps. Two
entries have already left — one became a mission, one was declined — and
their rows are struck through with the reason, never deleted.*

---

## What this is

A register of findings that are **established** — measured, reviewed, or
ruled — and that **no mission owns**. Nothing here is a mission. Each entry
is a candidate for one, or for an explicit decision not to.

## The rule that keeps this from becoming a graveyard

**An entry leaves this register in exactly one of two ways:** it becomes a
mission issue, and the row is struck through with the issue number; or the
Chief Architect or Product Owner explicitly declines it, and the row is
struck through with the reason. "Still relevant, still nobody's" is not a
third way.

**Reviewed at every board sweep.** Three sweeps without moving is a decline.
**Nothing is added here that already has an open issue.**

---

## Tooling and CI

**T1 — the geometry marker run is not in CI, and cannot be.**
The geometry tests need the reference machine's fonts, DPI and theme; the
CI runner has a desktop and the wrong metrics, so a run there measures the
runner, not the product. Every geometry criterion is therefore discharged on
the workstation by hand, and no check catches a lot that skipped it. Named
in the Out of scope of three lots, owned by none.
*Source:* #118 transmission report, *Validation — run*; `AGENT_CAPABILITIES.md` §3.

~~**T2 — `ruff format --check` is absent from the pull-request checks.**~~
~~`develop` is not format-clean, and enabling the check now would turn CI red on pre-existing state.~~
→ **declined by the Product Owner, sweep of 2026-09-04**: *"not before the release branch cut; reopen with a measurement of how many files it touches."*

---

## Product and UX debt

**P1 — the stale badge's time is shown in the reading's zone, not the viewer's.**
Matters only when an export is read on a machine in another zone — the
laptop, or a shared folder. Latent on the workstation, active the day Sync
ships an export with readings from two zones.
*Source:* #118 transmission report, *Residual risks*; PR #124.

**P2 — the stale style has not been measured under the high-contrast theme.**
The geometry run covers size, not contrast. A tile can be stale and
invisible as such under one of the two themes the shell offers.
*Source:* journal `20260904T151806Z-claude-code-c41d9e2.md`, *Uncertain*.

---

## Host and measurement

**H1 — the bench controller's serial timestamp drifts against the workstation clock by up to 4 s over a session.**
Measured across three sessions; the drift is monotone and resets on
reconnect. Every `taken_at` the Dashboard shows is the controller's clock,
and nothing corrects it. Whether that is acceptable for the badge is the
Domain Expert's question, not a lot.
*Source:* `docs/evidence/bridge_drift/20260829/README.md` §2.

---

## Governance

~~**G1 — a worktree with an open pull request satisfies closeout condition 5, and a returned lot resumes into that worktree.**~~
~~Removing one under review removes the directory a correction pass comes back to.~~
→ **became mission #127**, *closeout condition 5 accepts a merge and nothing weaker*; delivered by PR #128.

**G2 — a hold on a mission is prose, and a hold worded outside the listed phrases is not seen.**
The closeout tool's contract-closing mode matches five phrases. A hold
written *"leave this one for now"* closes the contract on the next
`--close`. The tool says so in its own report; the register carries it so
the next reader of a hold knows to use the listed words.
*Source:* `tools/mission_closeout.py`, `_HOLD_PHRASES`; #114 comment 3300921.

---

## Policies in force

**K1 — the number leading a mission title is compared against the issue it sits on, never matched as a shape.** Ruled by the Chief Architect, 2026-08-28, on #103; enforced by launcher condition 7 and the board title audit.

**K2 — a routing label applied to an object already delivered or deferred is a wasted dispatch; a seat that owns an object records that in the issue, not in a label.** Ruled by the Chief Architect, 2026-09-01, on #110.

---

## Tracked elsewhere — deliberately not duplicated here

| Finding | Where |
|---|---|
| `wt-sync-export-retry` carries an open session marker with a dead process and one commit only its reflog knows | **#125** |
| the global offline banner in the shell, named out of scope by #118 | **#129** |

---

*Opened by the Chief Architect at the close of the 2026-08-27 board sweep. Last reviewed at the sweep of 2026-09-04.*
