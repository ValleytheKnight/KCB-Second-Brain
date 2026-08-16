---
type: "dev-diary"
date: "2026-08-15"
tags: ["knight-code", "dev-diary", "scryptable", "formal-dev-workflow", "security-review", "phase-3.5"]
---
# Scryptable Phase 3.5 Security Review starting

Chris authorized moving forward: starting formal-dev-workflow's Phase 3.5 Security Review for protocol-whisper-app now. Eng review is closed (both open items resolved, design work done in whisper_app_design.pen, decisions a0875546, b0c17ad2, c1bdd9b5, 4e025062, 9b460f0c).  No code exists yet for Scryptable (repo is an empty shell, formal-workflow-gate.ts blocks real writes until task breakdown completes), so this runs as cso's deep-scan mode against the planned architecture and spec (CEO review, design review, eng review, whisper_app_design.pen), not against a codebase, per formal-dev-workflow's own Phase 3.5 instructions. Focus areas per that skill: secret storage design (HuggingFace token, Anthropic/OpenAI API keys, local-endpoint credentials), payment-data handling (none directly, third-party providers bill users themselves), and OAuth/API token handling (OAuth was already dropped entirely this session, decision a0875546, simplifying this surface). Also reviewing the two new surfaces added this session: the MCP client (connecting out to user-configured servers) and Scryptable's own MCP server (external agents connecting in), since both are new trust boundaries not covered by any prior review.  Logging this now, before the review's findings are written, so the review's start is durable even if this session ends mid-review.
