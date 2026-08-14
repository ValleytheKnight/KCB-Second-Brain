---
id: "13f0f8ea-e0a2-44be-9f83-11769e467dee"
type: "decision"
date: "2026-08-14"
source: "user"
confidence: 7
tags: ["knight-code", "decision"]
---
# Decision: Scryptable's REST API is deferred past v1 and will be a paywalled/paid feature when built; MCP (clie...

## Decision

Scryptable's REST API is deferred past v1 and will be a paywalled/paid feature when built; MCP (client and server, both directions) ships free and works out of the box in v1.

## Rationale

Chris's explicit call. REST API automation use cases (folder-watchers, webhooks, multi-machine setups) are real but speculative until actual users ask for them, and introduces real design cost (auth, versioning, concurrency) worth avoiding until there's a real need. MCP is the core, expected integration path for v1 since the embedded LLM chat and any external agent connection (matching how Claude Code connects to pen.dev) depend on it, so it ships free by default rather than gated. This is the first paid-tier/monetization decision made for Scryptable, a real business-model addition distinct from the per-provider LLM API costs already covered (those bill the end user directly; this would be Scryptable itself charging for a feature).
