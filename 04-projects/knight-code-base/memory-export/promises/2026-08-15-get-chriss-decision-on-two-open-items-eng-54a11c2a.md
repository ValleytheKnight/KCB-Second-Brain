---
id: "54a11c2a-2267-486c-8c90-e9fd02a5f522"
type: "promise"
date: "2026-08-15"
scope: "repo"
tags: ["knight-code", "promise", "open", "fulfilled"]
status: "fulfilled"
---

# Promise: Get Chris's decision on two open items eng review surfaced for Scryptable: (1) the "Sign in with Ant...

## Promise

Get Chris's decision on two open items eng review surfaced for Scryptable: (1) the "Sign in with Anthropic" OAuth capability designed in decision 085a69e9 is blocked by Anthropic's own 2026 policy change and needs a real replacement choice (API-key-only for Anthropic, a narrower investigation into any sanctioned alternative, or routing through a local Claude Code install), (2) which CUDA/CPU distribution strategy to ship (two separate download variants vs. one lightweight installer with a first-run accelerator download). Both are documented with full tradeoffs in protocol-whisper-app-eng-review.md.

## Context

Surfaced during formal-dev-workflow Phase 3 (Eng Review) for feature protocol-whisper-app, 2026-08-14. Both items carry into Phase 3.5 Security Review's own OAuth/token-handling scope, so they should not be resolved silently, they need Chris's explicit call before Phase 4 task breakdown locks in the AI Provider Settings and packaging tasks.

## Resolution

Item 1 (Anthropic OAuth) resolved: Chris confirmed dropping the OAuth toggle entirely, Anthropic goes API-key-only, and the existing custom OpenAI-compatible endpoint option (decision 070855a6) is confirmed as the generic local/custom-model-runner path, no new architecture needed. Logged as decision a0875546, superseding 085a69e9. Item 2 (CUDA/CPU distribution) is still unresolved, not covered by this fulfillment, re-logged as its own promise so it isn't lost.
