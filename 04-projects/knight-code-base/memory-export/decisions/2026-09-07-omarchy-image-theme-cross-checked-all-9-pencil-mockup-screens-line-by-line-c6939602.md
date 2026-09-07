---
id: "c6939602-6447-4d34-9a1a-7fa692b8667d"
type: "decision"
date: "2026-09-07"
tags: ["knight-code", "decision"]
---
# Decision: omarchy-image-theme: cross-checked all 9 Pencil mockup screens line-by-line against the full CEO pla...

## Decision

omarchy-image-theme: cross-checked all 9 Pencil mockup screens line-by-line against the full CEO plan (ceo-plans/2026-09-06-omarchy-image-theme.md) and every "omarchy" decision log entry, not just internal design-review consistency. All 6 accepted CEO-review scope items (live preview, batch mode, collision guard, style presets, undo history, general theme editor) have real, matching canvas representation; the deferred palette-export item is correctly absent everywhere. Both foundational technical decisions (shell-out to wallust/omarchy, sequential batch processing) are correctly implied by the UI (real wallust error text named on the Generate Error screen; batch progress screen shows only one row "Processing" at a time, never several, matching sequential not parallel). Found 2 real coverage gaps and 1 plan-text self-contradiction, none silently resolved: (1) no mockup exists for the "wallust/omarchy missing from PATH at startup" case the plan requires; (2) no mockup exists for an "omarchy theme set" apply-failure (distinct from a wallust generation failure, which IS covered); (3) the CEO plan's own scope-decision line for style presets says they "only apply to image-driven generation," directly contradicted two lines later by the general-theme-editor entry, which lists preset switches as one of only two actions available with no source image. The canvas follows the general-editor entry (presets ARE shown on the Loaded screen), which matches the more specific, later-refined text, but the plan itself carries the contradiction unresolved.
