---
id: "6f06cf7d-2652-4423-a4df-5884b1b6f8ba"
type: "decision"
date: "2026-08-14"
source: "user"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Security is now a hard gate in formal-dev-workflow (new Phase 3.5: Security Review, between Eng Revi...

## Decision

Security is now a hard gate in formal-dev-workflow (new Phase 3.5: Security Review, between Eng Review and Task Breakdown), not advisory text. cso and security-and-hardening now shell out to gitleaks and semgrep when installed, falling back to their existing Grep-heuristic checks with an explicit note when not installed.

## Rationale

Prompted by a request to check Knight Code's security tooling for Protocol Whisper, a payments/secrets/OAuth app. Found two gaps: cso and security-and-hardening both did secret and vulnerability scanning via hand-written regex, not real scanners; and formal-dev-workflow had no security phase at all, so a payments app could reach implementation without a single dedicated security check running. Gitleaks and semgrep are pre-built external binaries (no bundled-package build needed, unlike browse), so the fix is a PATH probe plus real shell-outs in the skill instructions. The security phase sits between Eng Review and Task Breakdown specifically because architecture is locked by then (something real to threat-model) but tasks aren't broken down yet (security requirements can shape the task list). Codevibes (github.com/danish296/codevibes) was evaluated and rejected as a skill wrapper, browser-only with no confirmed CLI/API, so it's documented as a reference-only external tool in AGENTS.md instead. Alternatives considered: a full browse-style bundled package for gitleaks/semgrep, rejected as unnecessary since both are pre-built external binaries, not something Knight Code compiles; wrapping codevibes as a real skill, rejected pending confirmation it has a callable API; wiring only gitleaks and deferring semgrep, rejected by Chris in favor of wiring both now.
