---
id: "95eed129-fee6-42ba-a17f-968e887d4d62"
type: "decision"
date: "2026-08-15"
source: "skill"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Eng review (FULL_REVIEW, APPROVED_WITH_CONCERNS): Scryptable's architecture is confirmed for export-...

## Decision

Eng review (FULL_REVIEW, APPROVED_WITH_CONCERNS): Scryptable's architecture is confirmed for export-format libraries (python-docx, fpdf2), Obsidian's direct-write mechanics, the five accessibility gaps' technical implementation (Qt/Win32 APIs), and diarization's credential/device/caching design (keyring, torch.cuda.is_available, HuggingFace's own cache). Two items are NOT approved as previously designed and need Chris's decision before task breakdown: Anthropic OAuth sign-in (decision 085a69e9) is blocked by Anthropic's own 2026 third-party OAuth ban, verified via WebSearch, not assumed; and the CUDA/CPU PyTorch distribution strategy (decision 11d03b07's two-tier requirement) needs a choice between two real packaging approaches given a CUDA build's multi-gigabyte size. Full detail in protocol-whisper-app-eng-review.md.

## Rationale

The Anthropic OAuth finding is the load-bearing one: building the already-mocked "Sign in with Anthropic" auth toggle as designed would ship a feature that violates Anthropic's Consumer Terms of Service and gets blocked regardless of engineering effort, since enforcement has been live since January 2026 and fully in effect since April 2026. This was caught by verifying the claim behind decision 085a69e9 with a real WebSearch rather than trusting it as still-current, exactly the kind of check this project's own "verify, don't guess" rule and "present full context on disagreements" rule both call for. Not decided unilaterally: this is a real capability loss versus what Chris originally asked for, so three real options were presented rather than silently substituting one. The CUDA/CPU item is a genuine product-facing tradeoff (build simplicity vs. end-user simplicity), also not decided here.
