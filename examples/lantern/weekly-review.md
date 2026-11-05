# Weekly review, 2026-11-23: 4 proposals to sign

*Lantern's weekly review issue, as the pass filed it and before the Product
Owner answered. One proposal has a reader who disagrees, and it is printed
as it came. Described in `docs/16-weekly-review.md`; the template is
`templates/WEEKLY_REVIEW.md`.*

---

## How it ran

- **Window:** 2026-11-16 to 2026-11-22.
- **Read:** 11 stop reports and closeouts, 6 findings and 1 incident,
  14 journal entries, the findings register, `docs/CHIEF_ARCHITECT.md`,
  `docs/guild/MISSION_WORKFLOW.md`, the architect seat's 18 memory notes,
  and, for the tests that span weeks, the eight earlier runs' issues.
- **Steering list read first:** *the Device page and the bridge; anything
  that made a mission stop before its first act.*
- **Readers:** stops and closeouts, findings and incidents, the register and
  notes: three read-only readers on a smaller Claude model, in parallel.
- **Synthesis:** the architect seat (Claude Code), each claim checked
  first-hand.
- **Reader of the proposals:** a Codex seat, another vendor. Brief anonymous.
- **Cost:** about 140 k tokens of reading, 25 k for the synthesis, 9 k for the
  reader; under four minutes.
- **Pass criterion:** at least one cross-session pattern the register does
  not hold, with evidence. **Met** (P1, P2).

## What last week's signatures changed

Last run's P1 (*a contract states the integration branch's commit it was
measured on*): stops for a false premise went from 4 of 12 to 1 of 11.

## Proposals to sign

Answer each one `signed`, `amended: <the change>` or `declined: <the reason>`.
Nothing is applied without that answer.

**P1 · `new` · a contract that needs the bench controller names the
capability, never the port.**
- **Prevalence:** 3 sessions out of 11.
- **Evidence:** #151 (stop: `COM3` named, the laptop exposes `COM5`), #156
  (same), #159 (stop on the bridge's handshake).
- **Text change:** `docs/guild/MISSION_WORKFLOW.md`, contract checklist, one
  line: *"A mission that talks to the bench controller requires
  `device-bridge` and names no serial port; the launcher resolves the port on
  the machine it runs on."*
- **Reader:** `fails`. *#151 and #156 hold: both stopped on a port the
  machine did not expose. #159 does not: it stopped on a firmware handshake
  timeout with the right port, a different cause. Prevalence is 2 of 11, not
  3.* The claim stands on two sessions; the Product Owner decides with the
  correction in view.

**P2 · `skill` · re-baseline a sensor fixture after a firmware update**
- **When to use it:** *when the bench controller's firmware version changed
  and a dashboard tile test fails on a recorded fixture.*
- **Steps as observed:**
  1. read the firmware note on the controller's issue (#154, #162, #171);
  2. record only the channels the contract names, with
     `tools/record_fixture.py --channel <name>` (#154, #162, #171);
  3. diff the new fixture against the previous one and paste the diff in the
     report (#162, #171);
  4. commit the fixture alone, the firmware version in the message (#154,
     #162, #171);
  5. run the dashboard tile tests, nothing wider (#154, #171).
- **Must not:** record on the laptop (no `device-bridge` there); record a
  channel the contract does not name; edit a test to fit a fixture.
- **Lives in / reaches:** `.claude/skills/rebaseline-fixture/SKILL.md` in the
  repository; it reaches the Lead Software Engineer seat and every mission
  that runs in a worktree of it. Nothing is loaded from a personal account.
- **Recurrence:** 3 sessions over 16 days (#154 on 2026-11-04, #162 on
  2026-11-12, #171 on 2026-11-20), each written out by hand.
- **Covered already by:** none (checked: the contract checklist, the
  register, `.claude/skills/`).
- **Reader:** `holds`. *Steps 1, 2 and 4 appear in all three reports; step 3
  in two, step 5 in two, as stated.*

**P3 · `merge` · the stale badge's time zone, said twice in the seat's
notes and once in the register.**
- **Prevalence:** not a pattern; a duplicate found in the register slice.
- **Evidence:** notes `stale-badge-zone` and `badge-time-in-reading-zone`;
  register entry P1.
- **Text change:** both notes become one line pointing at register P1, which
  keeps both notes' sources.
- **Reader:** `holds`.

**P4 · `retire` · "run `tools/sync_legacy.py` with `--dry-run` first".**
- **Last trace:** 2026-09-21, #144; no trace in the nine passes run since.
- **Cause gone:** `tools/sync_legacy.py` was deleted by #147, merged on
  2026-09-24; the Sync page no longer calls it.
- **Text change:** the rule's line in `docs/CHIEF_ARCHITECT.md` struck
  through: *retired 2026-11-23, the script it guarded was removed by #147.*
  Its incident stays in the incidents file.
- **Reader:** `holds`. *`git log --diff-filter=D` shows the deletion in
  #147; no file under `src/` or `tools/` names the script.*

## Recorded, no signature asked

- **`verified`:** *the number leading a mission title is compared against
  the issue it sits on* (register K1): four launches this week, two of them
  refused on it.
- **`dormant`:** *read every file as UTF-8, never through the shell's default
  encoding*. Last served on 2026-08-19. Its cause is still there: the
  workstation's second shell still defaults to a legacy code page. Kept.

## The seat's own notes

Delegated by the Product Owner on 2026-10-26, read by the Codex seat first:

- merged `bridge-reconnect-timing` into `bridge-reconnect` (reader: `holds`),
  applied;
- cut `cadence-oct-week-3`, a dated window that has passed (reader: `holds`),
  applied.

---

*Filed by the weekly pass, 2026-11-23, 08:52 (Europe/Paris). The next run
counts P1's and P2's patterns again.*
