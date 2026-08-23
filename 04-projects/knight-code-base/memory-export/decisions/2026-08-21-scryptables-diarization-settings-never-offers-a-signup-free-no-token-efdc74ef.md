---
id: "efdc74ef-f253-41bf-aec6-b6bfdf7b16d2"
type: "decision"
date: "2026-08-21"
source: "agent"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Scryptable's Diarization Settings never offers a signup-free / no-token model option. Both model cho...

## Decision

Scryptable's Diarization Settings never offers a signup-free / no-token model option. Both model choices ("Standard" = pyannote/speaker-diarization-3.1, "Latest" = pyannote/speaker-diarization-community-1) require an accepted HuggingFace token.

## Rationale

Decision a94a5148 (2026-08-14 eng research) expected "older ungated 2.x models" to exist as a no-signup fallback. Checked live against the real HuggingFace API during Task 7's build (2026-08-21): every candidate pyannote diarization pipeline, including the legacy @2.1 id, reports gated=true. A WebSearch corroborated this independently. The world moved since the original decision was researched; this narrows a94a5148's GUI-settings-surface claim without reversing its core library choice (WhisperX/pyannote over NeMo/SpeechBrain remains correct and unaffected). Alternative considered: building the "gated-vs-ungated" toggle as originally speced and letting it silently fail for the ungated option; rejected, would ship a broken/false promise in end-user-facing settings copy.
