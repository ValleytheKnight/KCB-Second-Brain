---
id: "085a69e9-cbab-4de6-b203-deb2f83ff4de"
type: "decision"
date: "2026-08-14"
source: "user"
confidence: 7
tags: ["knight-code", "decision", "superseded"]
status: "superseded"
---

# Decision: Scryptable's AI Provider settings support OAuth sign-in for Anthropic specifically (using an existin...

## Decision

Scryptable's AI Provider settings support OAuth sign-in for Anthropic specifically (using an existing Claude.ai account's Pro/Max subscription usage), in addition to a manual API key; OpenAI and custom-endpoint providers stay API-key-only.

## Rationale

Anthropic exposes a real OAuth login flow (the same one Claude Code itself uses) that lets a third-party app authenticate against an existing Claude subscription and draw on its included usage instead of separate metered API billing, a genuine benefit for a user who already pays for Claude. OpenAI and Google don't expose an equivalent public OAuth grant letting a third-party app spend a ChatGPT/Gemini subscription's included quota, their APIs are billed entirely separately from the consumer subscription, so API key is the only real integration path for those providers. This is a provider-capability limit, not a design gap.
