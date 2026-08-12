---
id: "30868434-f605-4e04-94ce-0194b8633490"
type: "decision"
date: "2026-08-03"
scope: "repo"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: Protocol Whisper's transcription step now passes vad="silero", initial_prompt (read fresh each run f...

## Decision

Protocol Whisper's transcription step now passes vad="silero", initial_prompt (read fresh each run from a new persistent vocabulary-master.txt), and refine_whisper_precision=0.2 to whisper_timestamped.transcribe(), in addition to the already-adopted condition_on_previous_text=False.

## Rationale

VAD fixes the short stock-filler hallucination pattern (Thank you./Okay./Yep. on idle channels) that survived the condition_on_previous_text fix. Confirmed via a full 3.8-hour stem re-transcription: the exact window that hallucinated 6x "Okay." in production instead recovered the real dialogue, zero hallucination loops found anywhere else in the stem, only 1.2% fewer words (consistent with cutting filler not real content), and 26% faster since it skips transcribing true silence. initial_prompt seeded from vocabulary-master.txt (comma-separated campaign proper nouns, Chris's explicit ask, grows session by session, kept under ~150-160 words per the model's own prompt-context budget) biases transcription toward correct fantasy-name spellings before a mis-transcription happens, complementing corrections-master.json's after-the-fact fixes. refine_whisper_precision=0.2 (down from the library default 0.5) tightens per-word timestamp precision, which matters directly because TASMAS's chronological transcript merge works purely by comparing word timestamps across the 5-6 separate per-speaker files.
