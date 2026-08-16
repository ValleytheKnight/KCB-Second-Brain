---
id: "03fb101d-2597-4907-81e9-c686a133a1d7"
type: "promise"
date: "2026-08-15"
scope: "repo"
tags: ["knight-code", "promise", "open", "fulfilled"]
status: "fulfilled"
---

# Promise: Get Chris's decision on Scryptable's CUDA/CPU PyTorch distribution strategy: two separate download v...

## Promise

Get Chris's decision on Scryptable's CUDA/CPU PyTorch distribution strategy: two separate download variants (GPU/CPU, user picks) vs. one lightweight installer with a first-run accelerator download. Full tradeoffs in protocol-whisper-app-eng-review.md, item 6.

## Context

Split out from promise 54a11c2a after its OAuth item (item 1) resolved 2026-08-14. This is the one remaining open item blocking formal-dev-workflow's Phase 3.5 Security Review for feature protocol-whisper-app; do not advance past Phase 3.5 until Chris answers.

## Resolution

Resolved as a hybrid: explicit CUDA-package choice at install time, CPU-only default otherwise, a first-run GPU-detected upgrade prompt if the small installer was chosen on a GPU-capable machine, and an in-app upgrade path (Preferences/Diarization settings) for a later hardware upgrade. Logged as a decision. This closes both of eng review's open items (item 1 closed previously).
