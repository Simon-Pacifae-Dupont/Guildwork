# Capabilities and routing

*Three atoms, an enumeration that is not a ladder, a table whose every cell
carries its own provenance, and the rule that `unknown` routes as cannot.*

The workflow document says who may *merge* a mission. This one says which
agent is *able* to execute it, and every mission declares what it requires
in the `Capabilities required` field of the form.

## The failure this prevents

The `Agent` field is filled when the mission is written, from the author's
guess about who is free. Nothing checks that the named agent can physically
perform the work. On the source project that guess failed on a mission
written for an agent with no shell on the developer machine: sixteen of its
seventeen findings were carried without difficulty; the seventeenth lived in
a 117 KB test file, and the agent pushes file content by *retyping* it
through an API call — a vector that had already corrupted a project file
earlier in the same mission, caught only by blob-hash verification. Sorting
one import block would have meant retyping three thousand lines of
load-bearing test code. The lot was correct to stop. It should never have
been routed there.

## What is a capability, and what is not

The first version of the vocabulary listed four "capability axes". Only one
was a capability. The ruling that separated them says where each went, so
that nothing is deleted quietly:

- **Atomic capabilities** — properties of the agent's runtime that a launcher
  can check against a declared registry. These, and only these, are the
  vocabulary.
- **An access means** — a *file bridge*: the agent can list, read and write
  whole files on the machine, but every write transmits the entire file and
  correctness degrades with size. That describes how bytes move, not what a
  runtime can do.
- **Transport prudence** — a threshold for the agent's own judgement that no
  launcher can evaluate. Kept, and not deleted for failing to fit a taxonomy.
- **Separation of duties** — the executing agent should not merge its own
  work. A property to preserve deliberately, not a limit on ability.

And the constraint on growth: **an atom earns its place only if a launcher
can check it against a declared registry. Adding a fourth needs an observed
routing failure, not a hypothesis.** Two real distinctions — whether an
agent can write to GitHub, and whether a session survives the developer
machine being closed — are deliberately not atoms, because no mission has
been mis-routed on either.

## The vocabulary, and the rule

> A mission MUST declare the capabilities it requires. The named `Agent` MUST
> satisfy every declared capability. An agent that lacks a required
> capability may **author** the mission contract; it may not execute it.

Exactly three properties. On Lantern:

| Property | Values | Means |
|---|---|---|
| `shell` | `none` · `remote` · `host-isolated` · `host-native` | where commands execute. `host-isolated` is a VM or container **on** the developer machine; `host-native` is the same OS and process space as the desktop application |
| `windows-desktop` | `yes` · `no` | a real, **interactive** desktop session on the reference machine: its fonts, DPI and theme, and a toolkit platform that reports them |
| `device-bridge` | `yes` · `no` | the bench controller cabled, powered and drivable from that session |

`unknown` is additionally a permitted value of all three wherever a
capability is recorded.

**The locus is an enumeration, not a ladder.** It is tempting to write
`host-native ⊃ host-isolated ⊃ remote` and check by comparison. That is
false in both directions: a remote cloud shell has network egress and
installable packages a locked-down host VM may not; a host VM reaches the
developer's files a remote shell cannot. Declare and match exactly; never
compare. A router that compares will authorise the wrong mission eventually,
and silently, because a comparison that returns *good enough* produces no
error to read.

**The two hardware properties are gated by the locus, not implied by it.**
`host-native` is necessary for both and sufficient for neither. The device
must actually be connected before anything can be driven; the property
records that the agent *can reach it when it is up*, not that it is up now.
And a shell in a non-interactive session — a service, a scheduled task, an
SSH session with no desktop — returns a desktop platform whose font metrics
are not the reference machine's. Nothing errors; the numbers are simply
somebody else's. One toolbar button measured 123 px under the real platform
and 218 px offscreen; a guard written as *the layout floor fits inside
1 600 px* passes at both. A CI runner with a real desktop is still not
`windows-desktop: yes` in this sense, because it is not the reference
machine's fonts, DPI and theme.

**When a mission requires each property** — exhaustive by intent, so that a
mission needing something not on the list adds it here rather than reasoning
by analogy. `shell: host-native` when the mission edits an existing file in
place, runs a command where the developer's files are, observes runtime
behaviour on that machine, or touches a file too large to retransmit safely.
`windows-desktop: yes` when it asserts pixel geometry or reachability.
`device-bridge: yes` when it drives the bench controller: a capture run, a
live calibration, a write to the device.

## The capability table — every cell carries its provenance

Every cell records **how** its value was established and **when**. A cell
with no observation behind it is `unknown`, never `yes` and never `no`.

**`unknown` routes as *cannot execute*.** An agent whose capability is
unrecorded is not a capable agent; it is an unverified one. A table that
cannot say *I do not know* gets filled with guesses, because a blank cell in
a routing document reads as an invitation.

The previous table on the source project was marked *observed, not assumed*
— and was false within four hours, in the row describing its own author's
runtime. Marking a table as observed is not provenance. The table now carries
the observation itself, so a reader can weigh it without trusting anybody's
memory of having made it. The shape of a row:

| Agent | Property | Value | How established | Date |
|---|---|---|---|---|
| Claude Code (local CLI) | `shell` | `host-native` | commands in this agent's own shell mutate the developer machine's checkout directly; mission `<n>` ran the lint and the governance check there before pushing; process chain `claude.exe` in interactive session `<k>` on `workstation` | `<date>` |
| Claude Code (local CLI) | `device-bridge` | `yes` | mission `<n>` drove the bench controller through the bridge against a live instance — `<count>` writes, each read back independently (report permalink) | `<date>` |
| Grok Build (CLI) | `device-bridge` | `unknown` | **not measured, and deliberately not inferred**: the locus is `host-native`, which is necessary for both and sufficient for neither; no bridge run under this agent is recorded | `<date>` |
| Claude Cowork (cloud session) | `shell` | `remote` | shell commands execute in the vendor's container, not on the developer machine — a property of where the session runs, recorded by that session about itself. This is the architect seat: the locus is what makes it structurally unable to be a writer | `<date>` |

**"Entailed by the locus" is the only inference the table permits, and it
runs one way.** A `shell` whose value is known and is not `host-native`
forces the two hardware properties to `no`. A `shell` of `unknown` entails
nothing: the other two stay `unknown`, never `no` — a `no` with no
observation behind it is the guess the table exists to refuse. The inference
never runs backwards.

**An agent absent from the table is `unknown` on all three.** Unverified,
not incapable; it routes as *cannot execute* until someone gives it a row
with an observation in it.

**A profile is not a runtime.** A domain profile — a prompt loaded into a
harness — has no capabilities; the thing that loads it does. So the same
three profile names appear twice in the table, once per runtime that was
measured loading them, each row recording the loading runtime's locus, and
there is no contradiction. What those rows do not do is make a profile
*startable*: a row records what an agent can do, the launcher's condition 2
asks whether it can start the seat a form value names, and whether a given
mission launches is all seven conditions passing on that issue's own
fields. Three questions, not two. **A cell filled because filling it would
unblock a queued mission is the guess this table exists to refuse** — and
the cell a queued mission would most like filled is precisely the one left
`unknown` until somebody measures it.

## Consequences worth stating

**A new file is not an edit.** Creating a document or a workflow that did
not exist is safe from a file bridge at any size: there is no prior content
to corrupt, and the blob hash proves what landed. An agent without a shell is
well suited to authoring — contracts, workflows, configuration, new normative
documents — and poorly suited to touching what already exists.

**The executing agent should not merge its own work.** In a repository whose
governance rests on evidence not being self-declared, having the merge
performed by an agent that did not produce the work is a real control. Where
the split is natural, keep it. Do not collapse it for convenience.

**Session type is a routing dimension, not only model choice.** Cloud and
local sessions of the same model have different capabilities; the `shell`
locus is what expresses the difference.

**Durability is a scheduling property.** A mission that waits on something
slower than a session — a CI run, a long suite, an external review — needs an
agent whose session survives the wait. Still worth routing on; not an atom,
because no mission has yet been mis-routed on it.

## Transport prudence

An agent that moves file content by retyping it through an API call must not
rewrite a file whose size makes full retransmission unsafe. **The threshold
is 20 KB**, chosen because it is roughly where hand-transmission stops being
reliably verifiable, not because anything breaks at 20 001 bytes. Blob-hash
verification detects corruption; it does not prevent it, and a detected
corruption still costs a retry. No launcher can check this, and none should
be written to try.

## Read-only enforcement, per seat

A capability describes what a runtime *can do*; this describes what a
runtime *can be stopped from doing* from its own command line. The deciding
copy lives in the launcher's seat table, where every row carries what the
CLI is told, whether being told holds it, and the measurement behind that
answer — which the constructor refuses to let a row omit.

On the source project, **neither mapped CLI enforces read-only**, and that is
stated rather than inherited: one enumerates permission modes with no
read-only value and its nearest flag confines writes rather than denying
them; the other accepts a read-only sandbox flag that on the developer's
platform warns and continues without enforcement, and parses cleanly, so
the failure is silent.

Where a seat does not enforce, the launcher **warns and starts the mission
anyway.** It refused until the day two read-only missions, refused this
route, ran by hand under a planning mode — where they had no read-only
enforcement either, *and* none of the conditions, no one-writer check, no
governance pin and no session entry. The refusal bought a guarantee that did
not exist and paid for it with everything else. The warning is quoted
verbatim into the generated first instruction, and the seat is required to
repeat it in its transmission report:

> `read-only` declared, not enforced — the CLI serving this seat has no
> read-only mode; containment is the worktree and the merge gate, nothing
> else.

What `read-only` still governs is unchanged: what the lot may commit. The
mode is a contract with the seat, held by the seat's own discipline, the
worktree it was given and the merge gate at the end — which is exactly what
that sentence says, and why it is repeated where someone will read it later.

## Which of these claims are observations

Two of the three things this document used to call prose now execute: the
*declaration* is schema-enforced by the form and the governance check reads
the vocabulary on every run; the *match* is the launcher's condition 5, which
reads the table at runtime, holds no copy of it, refuses on any mismatch and
routes `unknown` as cannot. What is left as prose is named so it can be
attacked rather than assumed away: the rows of the table themselves — a cell
reading `yes` with a fabricated provenance would be enforced faithfully by
both the checker and the launcher; the table is trusted because a human
wrote it — and the bridge between the runtimes the table names and the
harnesses the form names, which is a convention between two vocabularies and
not a checked correspondence.
