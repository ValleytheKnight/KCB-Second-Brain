---
id: "22bde02e-9915-4fd6-9068-890d23d400a9"
type: "decision"
date: "2026-08-03"
scope: "repo"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: Loremaster's episode-processing pass now finds Whisper mis-transcription patterns (fantasy names, ho...

## Decision

Loremaster's episode-processing pass now finds Whisper mis-transcription patterns (fantasy names, homebrew terms) and drafts them as corrections-master.json entries in the episode isolation note, for Chris's approval and Phase 8 apply, instead of just silently fixing them in that pass's own prose each time. corrections-master.json is a new persistent, cross-episode file at the Protocol Whisper workspace root (Documents\D&D\Felled God\Discord Episode Recording\), copied into each episode's raw_audio\corrections.json and passed explicitly to TASMAS ASSEMBLE via --corrections.

## Rationale

Chris asked for this directly after Episode 1's isolation note surfaced several resolved mis-transcriptions (Osha Trell/Selah Marsh, Perris Calt/Paris Halt, etc.) that had to be manually re-derived; he wants them caught automatically on every future episode instead. TASMAS already has a built-in --corrections mechanism for exactly this (case-insensitive find/replace, correct-value-keyed format), it just wasn't wired into the protocol as a persistent file the way names-master.json already is. Passing --corrections explicitly also avoids a real gotcha found while implementing this: TASMAS auto-detects an untold corrections.json and stops on an interactive y/n prompt with no non-interactive path, which would hang a headless run.
