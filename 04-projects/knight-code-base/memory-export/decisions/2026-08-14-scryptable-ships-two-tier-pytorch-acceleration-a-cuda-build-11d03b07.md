---
id: "11d03b07-149f-4bfa-aae5-75890a2db3f6"
type: "decision"
date: "2026-08-14"
source: "user"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Scryptable ships two-tier PyTorch acceleration: a CUDA build for NVIDIA GPU owners, a CPU-only build...

## Decision

Scryptable ships two-tier PyTorch acceleration: a CUDA build for NVIDIA GPU owners, a CPU-only build for everyone else (AMD, Intel, no discrete GPU). Detected automatically at install/first-run rather than making the user choose, or hard-committing the whole app to one path.

## Rationale

Discovered live while setting up dev tooling: installing WhisperX pulled a CPU-only torch build by default even on a machine with a real NVIDIA GPU (GTX 1070 Max-Q, 8GB VRAM), which would have silently made transcription dramatically slower for any user who didn't know to check. On Windows specifically, AMD's ROCm acceleration path is unreliable/largely unsupported, so "CUDA if an NVIDIA GPU is detected, otherwise CPU" is the realistic two-tier setup, not a three-way GPU vendor split. CPU-only still works for everyone, just slower, acceptable for shorter recordings. Packaging/distribution mechanics (how the right build gets selected: bundled installer logic, a first-run detection step, or a build picker) still needs a real decision in the eng review, this entry captures the requirement and the two-tier shape, not the implementation.
