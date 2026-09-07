---
id: "5d1ec5f9-c0ed-4e62-9fa4-42d9539aae0f"
type: "decision"
date: "2026-09-07"
tags: ["knight-code", "decision"]
---
# Decision: omarchy-image-theme resolution 3/5: the app never sets colors.toml's mode field, in v1 or v2. Relies...

## Decision

omarchy-image-theme resolution 3/5: the app never sets colors.toml's mode field, in v1 or v2. Relies entirely on Omarchy's own existing background-luminance auto-detect (the same fallback any hand-authored theme without a mode key already gets), confirmed by reading omarchy-theme-color's real resolve_theme_mode cascade. No UI, no preset, no logic added for light/dark. Settled, Chris confirmed and agreed, not an open question.
