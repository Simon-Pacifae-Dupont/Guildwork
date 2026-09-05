# Lantern — the worked example

Every example in this pack is written against **Lantern**, a fictional
project: a small Python desktop application for a workshop, showing bench
sensors — temperature, humidity, power draw, door contacts — on a
dashboard, with a bridge to a physical **bench controller** over a serial
link. It has three pages (Dashboard, Device, Sync) and a frame they all
wear (the shell). Its repository is `lantern-workshop/lantern`, its
integration branch is `develop`, its primary checkout on the workstation is
`C:\repos\lantern`, and its worktrees live in `C:\repos\lantern-worktrees\`.

Lantern exists so that the mechanics can be shown without describing any
real product. Nothing about it is load-bearing; every name in it is a
placeholder for the adopting project's own.

## One mission, end to end

The files in this directory follow a single mission — **#118, Dashboard
tiles keep their last reading while the device bridge reconnects** —
through the whole lifecycle, in the order a reader would meet them:

| File | Surface | What it shows |
|---|---|---|
| `mission-issue.md` | the issue | the contract as the form renders it — every field, the number leading the title |
| `launcher-dry-run.md` | the terminal | a refusal on condition 4, the disposal it asked for, then a clean verdict and the commands the launch would run |
| `first-instruction.md` | the seat's first turn | the instruction generated from the issue: contract block, governance SHA, verbatim sections, the entry transcript |
| `transmission-report.md` | a comment on the issue | what the seat posts before it closes: entry evidence, execution parameters, validation, the name check, the census relayed |
| `pull-request.md` | the pull request | the delivery, with its `Mission:` line and every template section filled |
| `journal-entry.md` | the journal | the format-2 entry the exit command wrote, and the exit code it returned |
| `closeout-dry-run.md` | the terminal | the closeout tool refusing four worktrees and clearing one, then closing #118 from its merged delivery |
| `findings-register.md` | the register issue | nine entries in five families, two of them already struck through |

The seats on Lantern are the ones `templates/roles/` describes; the labels
are the ones `templates/labels.sh` creates; the capability values are the
Lantern vocabulary of `docs/04-capabilities-and-routing.md`.
