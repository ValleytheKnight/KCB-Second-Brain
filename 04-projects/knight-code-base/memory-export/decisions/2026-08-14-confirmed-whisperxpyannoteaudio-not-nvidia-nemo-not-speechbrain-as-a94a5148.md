---
id: "a94a5148-9703-454f-a422-21ded22f8a21"
type: "decision"
date: "2026-08-14"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: Confirmed WhisperX/pyannote.audio (not NVIDIA NeMo, not SpeechBrain) as Scryptable's diarization lib...

## Decision

Confirmed WhisperX/pyannote.audio (not NVIDIA NeMo, not SpeechBrain) as Scryptable's diarization library, after direct comparison.

## Rationale

Verified against alternatives per Chris's explicit request: pyannote is free (CC-BY-4.0), runs fully locally, no ongoing API cost. One real caveat: pretrained weights are gated on HuggingFace behind a free account/access token (not payment), a one-time signup, after which it runs fully offline; older ungated 2.x models exist as a no-signup fallback with lower accuracy. Accuracy (~11-19% DER) is competitive with NeMo's best model and close to paid commercial services (7-10%). NeMo is heavier to set up and only wins when already using NeMo for ASR or handling heavy speaker-overlap audio, neither applies here. SpeechBrain lacks a turnkey pretrained diarization pipeline. GUI settings surface needed: HuggingFace token field, gated-vs-ungated model choice, min/max speaker count, device (CPU/GPU).
