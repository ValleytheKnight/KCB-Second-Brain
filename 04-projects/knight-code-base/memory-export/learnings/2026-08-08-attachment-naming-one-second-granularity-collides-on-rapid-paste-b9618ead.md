---
id: "b9618ead-044d-4e9e-a2c4-ed22bcf78610"
type: "learning"
date: "2026-08-08"
skill: "obsidian-cli"
learning-type: "pitfall"
key: "attachment-naming-one-second-granularity-collides-on-rapid-paste"
confidence: 8
trusted: false
source: "observed"
tags: ["knight-code", "learning", "obsidian-cli"]
---
# Learning: attachment-naming-one-second-granularity-collides-on-rapid-paste

## Insight

Obsidian's own default attachment naming for pasted/dropped images ("Pasted image <YYYYMMDDHHMMSS>.png") has one-second granularity, not millisecond. Confirmed live: two images pasted back to back with no delay (via synthetic ClipboardEvent('paste') against the real editor DOM) landed on the identical generated filename whenever both fell within the same wall-clock second, independent of whether the two images had identical or deliberately distinct byte content, and only one vault 'create' event fired for that collided path. Any plugin logic that reacts to vault.on('create') for a pasted/dropped image (e.g. Anchor Flow's auto-convert-on-paste, arm-on-paste/consume-on-create pattern) needs to account for this: a second rapid paste within the same second will not get its own create event, so a single-slot "pending conversion" design will silently only handle one of the two. Not a data-loss bug in itself (the unhandled image stays a normal working embed), but a real gap in "every pasted image gets handled" for any plugin built on this assumption. Worth checking for on any future Obsidian plugin that hooks vault.on('create') to react to a paste/drop.
