---
id: "e6c0f8a0-771b-4066-84c7-53755d82b0e5"
type: "decision"
date: "2026-08-07"
scope: "branch"
source: "skill"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Eng review (FULL_REVIEW): Mnemosyne memory integration's two open architecture questions resolved. g...

## Decision

Eng review (FULL_REVIEW): Mnemosyne memory integration's two open architecture questions resolved. get_context() bridge is a small Python wrapper script invoked via subprocess from session-start-memory-hook.ts, not an HTTP/SSE server. datamark() injection-safety wrapping is a thin proxy MCP server Knight Code owns, wrapping every Mnemosyne tool uniformly and applying datamark() per-field, registered in .mcp.json instead of connecting to mnemosyne mcp directly.

## Rationale

Both alternatives to the proxy (an argument-rewriting PreToolUse hook, a CLAUDE.md-level instruction) were ruled out: the hook mechanism isn't supported by any existing hook pattern in this repo, and the CLAUDE.md instruction provides no structural guarantee for a security-relevant function, conflicting with this project's own stated hook philosophy. The bridge script was chosen over an SSE-based alternative specifically to avoid running Mnemosyne as a persistent background service, which would have undercut the reason Mnemosyne was chosen over Hindsight in the first place.
