# Guildwork — design system

The reference for every surface that carries the Guildwork name: the site,
the two READMEs, the board demonstrations, the board reader shipped in
`templates/board/`, and the images rendered from them. Anything that
disagrees with this file is wrong, and this file is what gets corrected
first when the system changes.

## Ground and ink — the site's own

Every Guildwork surface is dark only. There is no light theme on the site,
and the demonstrations open dark whatever the visitor's system says
(`<html data-theme="dark">`).

| Token | Value | Role |
|---|---|---|
| `--ground` | `#0B1526` | the page |
| `--surface` | `#0A1322` | cards, panels, tiles |
| `--surface-2` | `#14223A` | a lifted panel, a header strip, a soft note |
| `--line` | `#1D2B44` | quiet rules between siblings |
| `--line-strong` | `#2B3B57` | a border that frames |
| `--ink` | `#F3EDE2` | text, ivory |
| `--ink-2` | `#9FAAC0` | secondary text |
| `--muted` / `--ink-3` | `#6B7791` | captions, eyebrows, counts |
| `--amber` | `#E9A23B` | the site's own accent: buttons, punch rules, the mark |
| `--brand` / `--accent` | `#5CB9C4` | links and notes inside a board — teal, so it never reads as a state |

The one exception is the shipped reader's light theme, kept for teams who
install the template outside the site: ivory ground `#F3EDE2`, navy ink
`#0B1526`, rules `#D9D2C4` / `#E8E2D6`, teal accent `#0D5C66`.

## The five states — the reference board's hues, never the site's

A state colours exactly three things: the counter of that state, the badge
that names it, and the left rule of a row or card in that state. Nothing
else on a board carries a state hue. These are the hues the reference
board established; they are not the site's semantic colours and must not
be swapped for them.

| State | Reader token | Hue (dark) | Row tint on navy | Hue (light, template only) | Tint (light) |
|---|---|---|---|---|---|
| running — the mission is executing | `--flight` / `--s-run` | `#E8AE57` | `#36322D` | `#8F5C10` | `#F9EDD8` |
| holds the screen / the bench — running *and* holding the one exclusive resource | `--s-bridge` | `#BDA2E4` | `#2E3049` | `#6B4795` | `#ECE4F6` |
| next — queued, with its rank | `--idle` / `--s-next` | `#79B4E0` | `#203348` | `#1A5384` | `#DDE9F3` |
| for you — nothing moves without your decision | `--owed` / `--s-you` | `#EC8A79` | `#372B33` | `#9C3223` | `#F8E1DC` |
| landed — merged, or ruled | `--landed` / `--s-done` | `#78C48C` | `#203637` | `#1C6640` | `#DCEBE1` |
| reading expired — not a sixth state: the absence of one | `--s-off` | `#93A3A1` | `#212B2A` | `#5C6A68` | `#E4E9E8` |

A row tint is the state hue mixed twenty percent into `--surface`, so a
tinted row still sits on navy rather than on the reference board's own
ground.

A decision card is a *for you* object: its rule, its number, its labels
and its confirm button are all `--s-you`. That is the state speaking, not
decoration, and it is why the card is the one place on the page that reads
red.

## What is not a state, and must never look like one

- **A workstream** lives in a panel's frame — its heading and its 3 px top
  rule — and nowhere else. Its hues are muted against the states on
  purpose: `#88A88F #80B8B6 #79A7BD #B2AF8C #B797B2 #A6ACCF`.
- **A pointer** (`issue of #N`, `delivers PR #N`, `waits for #N`) is
  neutral monospace in `--ink-2`. Where something comes from is a different
  question from what is happening to it.
- **A note or banner** (the frozen-demonstration flag, the reader's demo
  note) carries the teal accent, never a state hue. A red rule on a note
  would claim the reader owes something.
- **Why a row is blocked** is a word under its title, never a hue.

## Type

Site: Fraunces for display, IBM Plex Sans for text, IBM Plex Mono for
figures, labels and anything a machine wrote. Boards: Newsreader for
display (the reference board's face), IBM Plex Sans and Mono as on the
site. Counters are always tabular monospace.

## Where each surface reads its tokens

| Surface | File | Theme |
|---|---|---|
| the site, both languages | `index.html`, `fr/index.html` | dark only |
| the board as it runs (demonstration) | `demo/board/index.html` | dark only, forced |
| the shipped reader | `templates/board/board.html` | follows the viewer; light theme kept |
| the reader's demonstrations | `demo/board/reader/`, `fr/demo/board/` | dark, forced |
| the images | `brand/board-demo-dark.png`, `brand/board-demo.fr.png` | rendered from the two demonstrations above at 1020 px, 2×, quantised with a coverage palette so the small state glyphs keep their hue |

A change to a token is made here first, then applied to every file in the
table in the same commit. An image is never edited; it is re-rendered.
