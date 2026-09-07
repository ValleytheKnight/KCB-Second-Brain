---
id: "943ad769-019f-4c77-93f8-a72844c1e8b1"
type: "decision"
date: "2026-09-07"
tags: ["knight-code", "decision"]
---
# Decision: omarchy-image-theme: audited all 11 Pencil frames for anything contradicting the 5 just-resolved dec...

## Decision

omarchy-image-theme: audited all 11 Pencil frames for anything contradicting the 5 just-resolved decisions (v2-deferral of preview.png generation and extra-file preservation, mode never set, collision guard scope, wallpaper pinning). Did this via a full text-content scan of every screen, not sampling. Item 1 (preview.png): confirmed clean, nothing on any screen claims or implies the in-app live-preview/mini-terminal feeds Omarchy's real picker as a written preview.png; the Selection screen's mini-terminal cards only ever show "$ omarchy theme set <name>", about applying a theme, not generating a picker asset. No change needed. Item 2 (extra-file preservation): confirmed a real, unaddressed contradiction and fixed it. The Selection screen (E50mj6) listed 5 real official Omarchy themes (tokyo-night, gruvbox, catppuccin-mocha, everforest, nord, all confirmed via direct file reads to carry icons.theme/keyboard.rgb/vscode.json/neovim.lua/preview images beyond colors.toml) alongside Chris's sparse autumn-hearth with no visual distinction, and the Loaded screen (dFXN0) demonstrated the full edit flow specifically on tokyo-night, a full-featured theme, with no indication anything would be lossy. Fixed on canvas: each of the 5 official-theme cards on the Selection screen now carries a small warning-toned note ("Colors only in v1 -- extras not saved"); the Loaded screen's Editing Section now carries a warning banner ("This theme has extra files (icons, keyboard, VS Code). v1 saves colors only."). Chose the visual-cue-in-place approach over restricting v1's editable theme list, since it keeps the Selection screen's real visual range while being honest about the v1/v2 boundary exactly where a user would hit it.
