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
| `--surface` | `#0A1322` | the plain level of the elevation ladder below: tiles, panels, rows |
| `--surface-2` / `--strip` | `#14223A` | a header strip, a hover, a selected control |
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

## Elevation — one ladder for every surface

The ground is navy and it stays navy, but nothing that sits on it may be
flat navy on navy: that is the mistake the site made until 7 September,
when the figure tiles, the offers and the chart panel all read as one
sheet. Every surface that carries the mark is placed on this ladder, and
the ladder is what a new widget reads before it draws anything.

| Level | Token | Value | Frame | Shadow | Use |
|---|---|---|---|---|---|
| ground | `--ground` | `#0B1526` | — | — | the page, and nothing else |
| surface | `--surface` | `#0A1322`, flat | `--line` `#1D2B44` | `--shadow` | a tile in a grid, a board panel, a list row, a menu — the plain level |
| card | `--card` | gradient 168°: `#1B2434` → `#0F1929` at 55 % → `#0A1322` | `--line` | `--shadow` | anything the eye should land on as an object: a figure, an offer, a door, a question, the chart |
| card-lead | `--card-lead` | gradient 168°: `#232C3B` → `#121C2D` at 52 % → `#0A1322` | `--line-amber` `#6E5330` | `--shadow-lift` | the one object of a section that is chosen or featured — at most one per section |
| strip | `--strip` | `#14223A`, flat | — | — | a header band inside a card, a hover, a selected control, a tooltip |
| well | `--well` | `#070D18`, flat | `--line-strong` `#2B3B57` | inset | an inset that reads as a hole: a terminal, a code block, an input |

The gradient starts less blue than the ground and ends at the surface
value, so a card lifts at its top-left and sits down at its bottom-right
without ever leaving the navy family. Two shadows only: `--shadow`
(`0 1px 2px rgba(0,0,0,.35), 0 16px 34px -22px rgba(0,0,0,.8)`) and
`--shadow-lift` (`0 2px 12px rgba(0,0,0,.5), 0 26px 64px -34px rgba(0,0,0,.9)`).

The board sits on the same ladder: its panels are *surface* with a
workstream frame, its header bands are *strip*, its decision card is
*surface* with a state rule and `--shadow-lift`. A board never uses
*card-lead*: on a board the thing that must stand out is a state, and a
state is a hue, not an elevation.

The exact wording a decision would publish is a *well*: `--well` with an
ivory frame and inset shadow. It is a preview, not an outcome, so it never
uses the green *landed* tint. Green appears only where the confirmed action
leads — in the frozen demonstration, the ring at the pointer's tip.

## The six states — the reference board's hues, never the site's

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
| for you — nothing moves without your decision | `--owed` / `--s-you` | `#F3EDE2` — the ink | `#393E48` | `#0B1526` — the ink | `#E4DFD3` |
| landed — merged, or ruled | `--landed` / `--s-done` | `#78C48C` | `#203637` | `#1C6640` | `#DCEBE1` |
| broken — something must be repaired before anything moves again | `--broken` / `--s-broken` | `#EC8A79` | `#372B33` | `#9C3223` | `#F8E1DC` |
| reading expired — not a seventh state: the absence of one | `--s-off` | `#93A3A1` | `#212B2A` | `#5C6A68` | `#E4E9E8` |

A row tint is the state hue mixed twenty percent into `--surface`, so a
tinted row still sits on navy rather than on the reference board's own
ground. On the light theme the ink is mixed at ten percent instead, since
twenty reads as grey on ivory.

**For you is the ink, not a hue.** Every other state is a machine state —
something a seat, a queue or a merge did. The human is the one object on
the board without a colour, so a *for you* counter, badge or rule is set
in the ink itself: the brightest thing on a dark page, without a hue to
read. A decision card is a *for you* object: its rule, its number, its
labels and its confirm button are all `--s-you`, which is why the card is
the one place where a button is ivory on navy.

**Red means broken, and nothing else.** Red is what a reader feels as
"something went wrong", so no state that means "your turn" may use it.
*Broken* is a delivery whose checks are red, a seat that exited on an
error, a bridge that was lost while a claim stood, a reading that failed
or came back short — anything that has to be repaired before the thing it
sits on can move again. It is the loudest hue on the board, and the only
one that is allowed to be loud. A board with nothing broken shows no red
at all; that is the point.

The names adapt to a project — the reference board says *running* where a
reader may say *in flight*, and a French board says *cassé* — but the
seven positions, their hues and what each may colour do not. That is what
makes the states one system across every board that carries the mark,
whatever project it follows.

## The counter bar shows every state, green included

The row of counters at the top of a board carries one tile per state, in
the ladder's order — running, holds the screen, next, for you, broken,
landed — and then the plain counts. A state that is absent that day shows
its zero in its own hue rather than disappearing: a board with `0 broken`
in red and `9 landed` in green says more than a board with neither. Green
is the state that resolves the tension red creates, and a bar that shows
red without green leaves the reader holding it.

A demonstration also shows the hand. The frozen board cannot click, so it
draws the pointer on the confirm, the button pressed, and a green ring at
the tip: what the reader would do, and what colour it leads to. The image
of the board that the site and the READMEs carry is cut just below that
card, so it ends on the action rather than on a list.

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

## An image of a surface is a door to it

Every image that shows a surface which exists interactively — the board,
the canvas, a reader — is wrapped in a link to that surface and carries the
same button, bottom right, on a strip of `--surface` under the image, never
over it: *Explore the interactive canvas ↗*, *Explore the interactive
board ↗*. The `alt` says the image can be clicked. A bare image of an
interactive surface is a mistake: the reader must never have to guess that
the real thing is one click away. The READMEs, which cannot draw a button,
make the image itself the link and say so in the caption.

## Focus lights the thread, and dims the rest

Every surface that shows more than one object — the canvas, a board, a
reader — answers the pointer the same way. Hover or keyboard-focus one
object and its **thread** stays lit while everything else on the surface
steps back to 18 % opacity, in 160 ms. Nothing is brightened, recoloured
or moved except the object under the pointer, which may lift by 2 px.
Leaving it, pressing Escape, or tapping elsewhere restores the surface.

What a thread is depends on where you start:

- from a **counter tile** — every object in that state (hover *for you*
  and only what is owed to you stays readable);
- from a **row, card or process** — every object that shares one of its
  numbers (`#131` lights `PR #133` because the row says *delivers PR
  #133*), plus the counter tile of its state;
- on the **canvas**, from a block — its wires, the blocks at their other
  ends, and the refusal note that hangs from it.

A tile with no state (`open issues`) starts no thread. A panel's frame and
heading are never dimmed: the workstream stays as context around its one
lit row. Text is never covered by the effect, and the effect never lies:
an object is lit because it is related, not because it is important.

Every object that can start a thread is reachable by keyboard (`tabindex`),
and focus behaves exactly as hover. `prefers-reduced-motion` removes the
transition, not the dimming.

## A running system shows the work moving

A canvas that draws a production line has to read like one: every wire
carries a train of parcels at one constant speed, and a pipe with nothing
in it is a pipe that has stopped. The parcel takes the colour of its wire
and nothing else enters the palette: a **filled** parcel where something
really runs today, an **outline** on a path that is drawn but not yet
active — the same distinction the teal *next* thread already makes, said
twice so it cannot be missed.

Three rules hold it in place. A parcel passes *behind* a label, never
across the word, so the labels are painted last. Nothing moves under
`prefers-reduced-motion: reduce` — the parcels are not drawn at all,
rather than drawn and frozen. And nothing is drawn in `?export`: the
rendered image has to stay a still picture, identical from one render to
the next.

Speed is a constant of the surface, not of the wire: 42 pixels a second,
one parcel every 34 pixels, capped at sixteen per wire so a long return
loop does not become a bead curtain.

## Rhythm — four gaps, and no other vertical number

Airy, not empty. The site keeps four named distances and every margin on
the page is one of them:

| Token | Value | Between |
|---|---|---|
| `--gap-section` | 72 px (48 on mobile) | one section and the next — each side, so 144 px of ground between two titles |
| `--gap-object` | 32 px (24 on mobile) | a section's intro and its first object: a frame, a grid, a terminal, a card row |
| `--gap-caption` | 16 px | an object and the caption or note that reads it |
| `--gap-para` | 12 px | two paragraphs |

The hero breathes more (88 px above, 64 below) because nothing precedes it.
A grid never ends on an empty cell: the documents grid has sixteen cells
because the sixteenth is the drop-in files, not a hole. When a screen shows
more ground than content between two sections, the fix is the token, not
the section.

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

| the operating canvas | `demo/canvas/`, `fr/demo/canvas/` | dark only |

A change to a token is made here first, then applied to every file in the
table in the same commit. An image is never edited; it is re-rendered. The
focus behaviour above is carried by the same short script on every surface
in the table; a new surface inherits it before it inherits anything else.
