---
id: "0468e363-ed73-4158-9730-1c2321655b0f"
type: "decision"
date: "2026-08-14"
source: "user"
confidence: 7
tags: ["knight-code", "decision"]
---
# Decision: Scryptable v1 supports three import scenarios: multi-track sources (Craig archive, plus a generic pe...

## Decision

Scryptable v1 supports three import scenarios: multi-track sources (Craig archive, plus a generic per-speaker-file import for other setups), single mixed-file multi-speaker recordings via automatic speaker diarization (WhisperX, which bundles Whisper + pyannote.audio + word-level alignment), and single-speaker mode for one-person recordings.

## Rationale

Chris wants full real-world coverage, not just Craig's own recording setup, end users record with all kinds of tools and don't always have pre-separated per-speaker tracks. WhisperX (open source, MIT-licensed, wraps Whisper + pyannote.audio + alignment) is the standard 2026 open-source path for adding diarization without hand-building it. Accepted audio formats: FLAC, WAV, MP3, M4A, OGG/Opus, AAC, covering Craig's FLAC output plus common formats from Audacity, OBS, phone recordings, and other Discord bots. Single-speaker mode skips the speaker-mapping step entirely, straight to transcription and review. This is real new architecture for the eng review: a diarization pipeline stage, a new dependency (WhisperX/pyannote), and a three-way import-mode branch (multi-track / mixed-file-diarize / single-speaker) instead of the original single Craig-shaped path.
