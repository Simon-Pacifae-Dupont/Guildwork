# Guildwork for Spec Kit

**No code is written until a named person approves a written request, and every verdict is kept.**

[Spec Kit](https://github.com/github/spec-kit) decides what to build: a
constitution, a specification, a plan, tasks. [Guildwork](https://github.com/Simon-Pacifae-Dupont/Guildwork)
decides who may deliver it, and what the human settles. This extension is
where the two meet: between `/speckit.tasks` and `/speckit.implement`, a
person reads one written request and rules on it, and the ruling, with its
reason, goes into a register that outlives the session.

## What it adds

```
/speckit.tasks
   └─ /speckit.guildwork.request     writes the request, from spec, plan and tasks
        /speckit.guildwork.verdict   the person who decides rules: approved, held or refused
/speckit.implement
   ├─ /speckit.guildwork.gate        mandatory: refuses unless an approved verdict covers the current plan
   └─ /speckit.guildwork.close       closes the run: delivered, partial or stopped
```

Three files carry it, and all three live in your repository:

| File | What it holds |
|---|---|
| `specs/<feature>/guildwork-request.md` | the request: objective, acceptance criteria, scope, out of scope, stop conditions, risk, who decides, and the SHA-256 of the spec, plan and tasks it was written against; then the verdict, then the outcome |
| `.specify/memory/guildwork-register.md` | one line per verdict and per close, appended, never edited |
| `.specify/extensions/guildwork/templates/` | the two templates; override them in `.specify/templates/overrides/` under `guildwork-request.md` and `guildwork-register.md` |

## The verdict is the person's

`/speckit.guildwork.verdict` is typed by the person named under **Who
decides**, with one of three words:

```
/speckit.guildwork.verdict approved
/speckit.guildwork.verdict held the retry policy is not in scope; split it out
/speckit.guildwork.verdict refused the vendor API is being retired in March
```

`held` and `refused` require a reason, because on those two the reason is
the useful part. Nothing else counts as a verdict: not `ok`, not `yes`, not an
empty line. The command records the verdict against the SHA-256 of the spec,
plan and tasks as they stand at that moment, so an approval covers what was
read and nothing written after it.

A refused request is a result. Its reason sits in the register, and the next
plan for the same feature starts by reading it rather than rediscovering it.

## The gate

`/speckit.guildwork.gate` runs before `/speckit.implement` as a mandatory
hook. It reads; it never writes. It refuses on the first of seven conditions
that fires, and names it:

1. there is no written request;
2. a section of the request is empty, or still holds its placeholder;
3. nobody has ruled yet;
4. the request was held, and the reason names what must change;
5. the request was refused;
6. the verdict is not one of the three words, or has no name or date;
7. the spec, the plan or the tasks changed after the verdict.

```
GUILDWORK GATE: REFUSED. Nothing was implemented.
  condition 7: plan.md changed after the verdict
  plan.md: verdict against 3f9c2d1a7b8e, now 9d02c7f1e44a
  next: rewrite the request against the current files, and rule again
```

When none fires, it prints who approved, when, and against which digests,
then lets implementation continue inside the request's scope.

Be clear about what that is. The gate is an instruction your coding agent
follows, read from files in your repository. It is not a lock: an agent that
ignores its instructions can still write code. The binding control stays on
the merge, held by a person. What the gate guarantees is narrower and still
worth having: the plan, the verdict and its reason exist in writing before the
code does, and touching the plan after the verdict closes the gate again.

## Every run ends on a verdict

Each step ends on a word from a closed list, never on "done":

| Step | Ends on |
|---|---|
| the request, ruled on | `approved` · `held` · `refused` |
| the implementation run | `delivered` · `partial` · `stopped` |

`/speckit.guildwork.close` checks the acceptance criteria one by one and
names the evidence for each. A criterion nobody checked is not met. A run that
stopped on one of its stop conditions says which, and what it learned, and
that is written in the register like any other result.

## Install

Requires Spec Kit 1.0 or later, in a project already set up with
`specify init`.

```
specify extension add guildwork --from https://github.com/Simon-Pacifae-Dupont/Guildwork/releases/download/guildwork-v0.1.0/guildwork.zip
```

From a clone, for development:

```
specify extension add --dev ./Guildwork/integrations/spec-kit
```

Then run `/speckit.tasks` as usual, accept the offer to write the request,
and have the person who decides rule on it before `/speckit.implement`.

To keep the commands but drop the gate in front of every implementation, set
`enabled: false` on the `before_implement` entry for `guildwork` in
`.specify/extensions.yml`. To remove everything:
`specify extension remove guildwork`. The register stays, because it is yours.

## What is not in it

The extension carries the forms and the commands. The Guildwork kit around it
specifies the rest (the mission contract, the launcher that refuses what is
not in order, the session journal, the closeout), and the tools themselves are
written for each team rather than shipped. The kit is at
[github.com/Simon-Pacifae-Dupont/Guildwork](https://github.com/Simon-Pacifae-Dupont/Guildwork).

## License

MIT. Simon Dupont, [LinkedIn](https://www.linkedin.com/in/simon-pacifae-dupont/),
simon.pacifae.dupont@gmail.com.
