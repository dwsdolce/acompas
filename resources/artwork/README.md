# Artwork sources

The editable originals behind the app's mark and wordmark. Nothing here is
built, shipped or read at runtime — `resources/` sits outside `public/`, so
Quasar never copies it into a build. That is deliberate: `public/audio` holds
the `.wav` masters and consequently uploads 51 MB of them on every deploy.
Sources belong where they cannot be served.

## What makes what

| source | becomes | how |
|---|---|---|
| `logo.svg` | `resources/icon.png` | rendered at 1024×1024 by the build |
| `wordmark.svg` | `public/palmas-wordmark.svg` | save as Optimised SVG |
| `logo-and-name.svg` | — | the combined lockup; unused so far |

`logo.svg` is the root of the whole icon chain, and nothing below it is
committed. `scripts/icons.mjs` renders the 1024×1024 master from it, then reads
`icongenie-profile.json` and produces whatever the target being built needs -
all of it driven by the build, none of it by hand. Nothing else feeds the icon
pipeline; the header wordmark is referenced directly from
`src/layouts/MainLayout.vue` and is not generated.

Edit the drawing and build: the master and every icon under it follow. There is
no export step to remember, which is the point - the master used to be exported
by hand and committed, and that made it the one place the chain could quietly
fall behind the artwork.

## The typeface

**Playball**, © 2011 The Playball Project Authors, under the SIL Open Font
License 1.1 — `OFL.txt` here, source at
<https://github.com/googlefonts/play-ball>.

It is kept because the letterforms cannot be recovered from the artwork: the
glyphs in these SVGs are **converted to outlines**, so they render identically
anywhere, with or without the font installed — but they can no longer be edited
as text. Setting a new word in the same face needs the font itself, and a
webfont that has moved or changed in five years is not something to rely on.

The licence permits redistribution, on the condition that the copyright notice
and licence travel with the font. That is why `OFL.txt` sits beside the `.ttf`
and should never be separated from it. Playball declares no Reserved Font Name,
so even a modified derivative carries no naming restriction.

Playball is also this project's own history rather than a borrowed style: A
Compás set its title in it through version 2.x, as live text —
`#title { font-family: 'Playball'; color: tomato }` — before the wordmark became
a raster image and the font left the tree.

## Exporting

Three things go wrong if they are not checked.

**Crop the page to the drawing.** Inkscape defaults to an A4 canvas, and the
first exports had the artwork sitting on one — covering 5% of the page, so
anything constrained to a header height rendered as an empty sliver. File →
Document Properties → *Resize page to content*, with everything selected.

**Convert text to outlines** before saving. An SVG containing a `<text>` element
that names Playball renders in whatever fallback the viewer happens to have.

**Keep the disc `#f44336`.** That is the app's `--q-primary`, so the icon and
the app agree. An earlier export used pure `#ff0000`, which reads noticeably
hotter than anything in the interface.

For `logo.svg` specifically: square, the disc full-bleed to the edges,
transparent outside it, and **no rounded corners** — iOS applies its own mask,
and a pre-rounded icon gets rounded twice. The transparency is correct here:
`packaging/prepare-ios-assets.mjs` flattens the iOS icon onto white for the App
Store, which rejects any icon carrying an alpha channel.

The header wordmark is white on transparent, which is what lets it sit on the
red toolbar in light mode and the near-black one in dark.
