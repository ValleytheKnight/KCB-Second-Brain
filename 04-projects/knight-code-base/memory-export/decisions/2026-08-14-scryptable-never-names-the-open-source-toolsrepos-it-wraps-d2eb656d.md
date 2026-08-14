---
id: "d2eb656d-522a-4812-a710-393c87cb2227"
type: "decision"
date: "2026-08-14"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: Scryptable never names the open-source tools/repos it wraps in end-user-facing UI (TASMAS, WhisperX,...

## Decision

Scryptable never names the open-source tools/repos it wraps in end-user-facing UI (TASMAS, WhisperX, pyannote.audio, etc.); every setting and screen is labeled by what it does for the user, not by the underlying tool's name. Full attribution for every open-source dependency lives in a single About screen instead.

## Rationale

Chris's explicit standard, raised because the TASMAS Merge Settings dialog and the diarization Model field ("pyannote/speaker-diarization-3.1") both leaked internal tool names into end-user UI, forcing a user to know what TASMAS or pyannote even are just to use a settings screen. Being open source doesn't obligate naming them in the product UI; it obligates crediting them somewhere, which the About screen does. This is a standing UI-copy rule for every current and future OSS dependency, not a one-off rename.
