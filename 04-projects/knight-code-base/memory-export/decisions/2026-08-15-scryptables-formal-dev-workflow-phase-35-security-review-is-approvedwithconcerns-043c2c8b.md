---
id: "043c2c8b-4476-4223-8b01-521e79acd7f4"
type: "decision"
date: "2026-08-15"
source: "skill"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Scryptable's formal-dev-workflow Phase 3.5 Security Review is APPROVED_WITH_CONCERNS. No CRITICAL fi...

## Decision

Scryptable's formal-dev-workflow Phase 3.5 Security Review is APPROVED_WITH_CONCERNS. No CRITICAL findings. Four real findings carried forward as Phase 4 task-breakdown requirements: (1) HIGH, zip-slip path traversal in Craig archive extraction needs a path-containment check before any file write; (2) MEDIUM-HIGH, Scryptable's new own-MCP-server toggle needs to default OFF and require a locally-generated shared token on top of binding to 127.0.0.1 only; (3) MEDIUM, MCP client tool output is a real prompt-injection surface, needs first-party-vs-third-party visual distinction in the LLM Handoff transcript plus a confirm step before third-party-triggered disk writes or outbound calls; (4) LOW/informational, the local/custom endpoint field is not a current SSRF risk (user-typed in v1) but may never be set from imported/remote content without explicit confirmation in any future version. Reviewed and confirmed sound with no finding: API key/HuggingFace token storage via keyring, payment-data handling (none exists in v1), workspace/vault path validation, corrections/vocabulary JSON handling. OAuth token handling is moot, already eliminated by decision a0875546. Full review at protocol-whisper-app-security-review.md.

## Rationale

Ran as knightcode-cso's deep-scan mode (2/10 confidence bar) against the planned architecture and spec (CEO/design/eng review docs plus whisper_app_design.pen) rather than a codebase, since none exists yet, matching formal-dev-workflow's own Phase 3.5 instructions for a pre-code feature. Focused on the three named areas (secret storage, payment-data handling, OAuth/token handling) plus the two new trust boundaries this session added (MCP client and MCP server), which no prior review had touched. All four findings are genuinely actionable now, at the planning stage, rather than discovered after code exists, which is the entire reason this phase runs before task breakdown rather than after.
