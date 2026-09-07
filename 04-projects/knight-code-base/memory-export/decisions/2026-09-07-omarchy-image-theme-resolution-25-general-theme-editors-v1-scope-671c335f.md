---
id: "671c335f-9e6c-4536-920f-784d6879b2e9"
type: "decision"
date: "2026-09-07"
tags: ["knight-code", "decision"]
---
# Decision: omarchy-image-theme resolution 2/5: general theme editor's v1 scope is now explicitly simple/sparse ...

## Decision

omarchy-image-theme resolution 2/5: general theme editor's v1 scope is now explicitly simple/sparse themes only (colors.toml + backgrounds/, matching Chris's own real user themes on disk), not full preservation/editing of a theme's other real files (icons.theme, keyboard.rgb, vscode.json, neovim.lua, preview.png, preview-unlock.png, unlock.png, chromium.theme, shell.lock.toml). Chris's own words: "dont make the app heavier then it needs to be... at the end of the day the app just needs to spit out colors.toml." Full preservation/editing of those extra files deferred to v2 (added to TODOS.md, same blocker as resolution 1/5: formal-workflow gate blocked the direct edit, this decision is the durable record). v1 still must not silently destroy those files when the editor is pointed at a theme that has them, that minimum non-destructive handling is not deferred, only full support for editing them is.
