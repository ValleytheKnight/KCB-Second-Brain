---
id: "06e22cf5-bc10-4f47-9613-b054fc5b06ed"
type: "decision"
date: "2026-08-14"
source: "user"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Scryptable standardizes on the "p:" imported style library in whisper_app_design.pen (oran...

## Decision

Scryptable standardizes on the "p:" imported style library in whisper_app_design.pen (orange #FF8400 primary, warm neutral background, JetBrains Mono + Geist fonts), and ships dark mode using that library's already-built-in light/dark theme axis.

## Rationale

Four component/token libraries got imported into the pen.dev workspace (H:, p:, Y:, a:). Mixing them would violate the design review's own "one design system" rule, so one had to be chosen. The "p:" library's warm orange-on-cream palette is the closest match to the hand-built mockup's existing direction from the design review, and it already defines light/dark values for every token (background, card, border, status colors), so dark mode is a mode switch on existing tokens, not new design work.
