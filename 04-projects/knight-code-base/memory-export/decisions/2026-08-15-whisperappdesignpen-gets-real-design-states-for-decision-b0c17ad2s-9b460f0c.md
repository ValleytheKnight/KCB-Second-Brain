---
id: "9b460f0c-94cc-4452-b54c-8e0c82c0a2ff"
type: "decision"
date: "2026-08-15"
source: "agent"
confidence: 7
tags: ["knight-code", "decision"]
---
# Decision: whisper_app_design.pen gets real design states for decision b0c17ad2's hybrid CUDA/CPU distribution ...

## Decision

whisper_app_design.pen gets real design states for decision b0c17ad2's hybrid CUDA/CPU distribution flow: a new top-level "GPU Acceleration Available (Dialog)" frame (id SkeTG, matching KnightOS's own elevated-terminal warning pattern of an explanatory dialog with a "don't ask again" checkbox) for the first-run "GPU detected on this small-installer machine, want to upgrade?" prompt; and a new top-level "Transcription and Diarization Settings (CPU, Upgrade Available)" frame (id e6euEe, a copy of the existing Diarization settings dialog with Device set to CPU) adding an in-app "Install GPU Acceleration" action directly below the Device field, for the later-hardware-upgrade path. The explicit install-time package choice (CUDA build vs. CPU build) is NOT designed as an in-app screen: v1 packaging is PyInstaller --onefile with no installer-wizard framework yet (the CEO review defers --onedir plus Inno Setup to later), so that choice is a download-page/distribution-page concern, not part of this app-mockup file's own screens.

## Rationale

Reasoned directly from the CEO review's packaging decision rather than assuming every option in decision b0c17ad2 needed its own app screen. Options 3 and 4 (the detection prompt and the in-app upgrade action) are genuinely in-app UI, options 1 and 2 (explicit install-time choice, small-installer default) are download/distribution-page concerns outside a single-app-window mockup file's scope for v1. Flagged explicitly here rather than silently building a screen for something that may not belong in this file, so the reasoning is checkable rather than assumed. The dialog reuses an already-established pattern from KnightOS's own elevated-terminal warning (decision f7bcc9be) for a "don't ask again" plus mandatory-warning-before-a-real-tradeoff shape, rather than inventing a new one.
