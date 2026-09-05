# The board reader

*One page that reads the board for what it owes each seat — and says, on its
face, what it could not read.*

`board.html` is the page the Product Owner opens instead of the issue list.
It reads the repository's open issues (every page of them), its open pull
requests and its recently closed ones, and renders four things: **what is
owed to the Product Owner and to nobody else** (a reserved gate whose
delivery has arrived), **what was delivered under delegation** (the
architect's to merge, on the witness's word), **the open missions by
workstream**, and **what recently landed**.

It guesses nothing. A delivery exists when an open pull request carries the
line `Mission: #N delivers | supersedes` — `docs/02-delivery-contract.md`'s
convention, and the only evidence the page accepts. A workstream exists when
the `chantier:*` label is set. Whatever fits no rule — a pull request without
a `Mission:` line, a mission without a workstream, an issue page that could
not be read — is **counted separately, on the face of the board**, rather
than filed by guesswork. Those counters are the measure of what the
governance is not yet doing; they are meant to read zero.

## Where it runs

The page reads GitHub through the viewer's own connector, with the viewer's
credentials, and never holds a token. As written it runs as a page published
on claude.ai with the GitHub connector — the host that provides
`claude.use("mcp")`. Any host that offers the same call can serve it; a
plain web server cannot, and the page then says so instead of showing an
empty board.

The [Lantern demonstration](https://simon-pacifae-dupont.github.io/Guildwork/demo/board/)
is this same page with `SOURCE = "static"` and a frozen snapshot embedded, so
that the reading can be seen without a repository behind it.

## What to change

Everything a repository changes is in the `CONFIG` block at the top of the
script: `owner`, `repo`, the connector's display name, the four label names
the taxonomy fixes (`ai-mission`, `gate:po`, `gate:delegated`, the
`chantier:` prefix), the staleness threshold in days, the refresh interval,
and the human names of the workstreams. The strings are in `T`; the page
ships in English and the project the kit comes from runs it in French.

Described in `docs/00-operating-model.md` (the five surfaces) and
`docs/02-delivery-contract.md` (the `Mission:` line).
