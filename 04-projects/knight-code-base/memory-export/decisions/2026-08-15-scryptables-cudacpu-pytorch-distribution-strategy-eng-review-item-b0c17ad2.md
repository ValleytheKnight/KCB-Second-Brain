---
id: "b0c17ad2-e90e-4b4f-a1b0-81597665a01e"
type: "decision"
date: "2026-08-15"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: Scryptable's CUDA/CPU PyTorch distribution strategy (eng review item 6) is a hybrid, not either of t...

## Decision

Scryptable's CUDA/CPU PyTorch distribution strategy (eng review item 6) is a hybrid, not either of the two originally-framed options. (1) At install time, a user who knows they have a compatible NVIDIA GPU can explicitly choose the full CUDA-accelerated package (2.6-5GB download). (2) The small CPU-only installer (~150-200MB) is the default for everyone else. (3) If the small installer is chosen and an NVIDIA GPU is detected on the machine (first-run/install-time detection), the app prompts asking whether to download and install the full GPU-accelerated package instead, never forcing either direction silently. (4) If a user upgrades their graphics card later, installing the GPU package is a real in-app action (Preferences/Diarization settings), not a full reinstall. This resolves and closes promise 03fb101d.

## Rationale

Chris's own call, presented with the eng review's two original options as a starting point but resolved as a richer hybrid rather than picking one. Balances build simplicity (most users get the small default download, matching the CEO review's PyInstaller --onefile v1 packaging choice) against end-user simplicity (nobody with a real GPU is stuck on CPU-only without being asked, and nobody without one is forced through a multi-gigabyte download) and against long-term flexibility (a later hardware upgrade doesn't require reinstalling the whole app). This closes eng review's second and final open item.
