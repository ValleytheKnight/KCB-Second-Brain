---
id: "d46a8c5b-a834-450b-867f-ebfb359981db"
type: "learning"
date: "2026-07-30"
skill: "devknight"
learning-type: "pitfall"
key: "hearth-card-schema-unverified"
confidence: 7
trusted: false
source: "observed"
tags: ["knight-code", "learning", "devknight"]
---
# Learning: hearth-card-schema-unverified

## Insight

The DevKnight Workshop vault's Hearth plugin is installed and has a working generic dashboard, but no per-project cards exist yet since this vault's first two real projects were only just scaffolded. Hearth's card data lives in its own plugin data file as a minified bundle; a real card kind for linking out to a project note or kanban board appears to exist among its supported kinds, but the exact JSON shape for that entry was not confirmed from the minified source in the time available, and guessing at it risks writing an invalid card into a live plugin config. Add a real per-project Hearth card through the plugin's own UI rather than a direct file write, unless a future session invests the time to properly decode the card schema first.
