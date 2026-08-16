---
id: "b4098734-9728-4f0d-8049-43cae610334d"
type: "decision"
date: "2026-08-14"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: DevKnight's scope expanded to cover Python/PySide6 (Qt for Python) desktop development, alongside it...

## Decision

DevKnight's scope expanded to cover Python/PySide6 (Qt for Python) desktop development, alongside its existing WinUI3/WPF and Electron coverage, via update_agent (never a hand-edit). Real tools installed and verified on this machine: PySide6 6.11.1, PyInstaller 6.22.0, pytest-qt 4.5.0, WhisperX 3.8.6 (with a CUDA-enabled torch 2.8.0+cu128 build, GPU confirmed working), and the official Anthropic Python MCP SDK (already present, v2.0.0).

## Rationale

Scryptable needs this stack and DevKnight had zero Python/Qt coverage anywhere, not a hypothetical gap. No dedicated build-loop agent exists for this stack yet (same documented gap as Electron already has, no winui-dev equivalent), so day-to-day PySide6 work stays direct tool use rather than a one-stop dispatch, named explicitly in the routing table rather than left implicit. Real install-time finding worth keeping: installing whisperx pulled a CPU-only torch build by default even on a CUDA-capable machine (GTX 1070 Max-Q), silently losing GPU acceleration; fixed by reinstalling torch explicitly from PyTorch's own CUDA wheel index matching the installed driver and the version pin whisperx/pyannote require. This is now a documented session-start verification step so it gets checked, not assumed, on every future Python/ML project.
