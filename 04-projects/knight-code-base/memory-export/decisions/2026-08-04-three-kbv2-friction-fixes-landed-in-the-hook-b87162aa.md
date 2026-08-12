---
id: "b87162aa-114a-4ef8-b03d-bc119fe02c6e"
type: "decision"
date: "2026-08-04"
scope: "repo"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: Three KBV2 friction fixes landed in the hook layer: the SessionStart memory hook now injects the exa...

## Decision

Three KBV2 friction fixes landed in the hook layer: the SessionStart memory hook now injects the exact fully-prefixed ToolSearch select line that loads all nine verification tools in one call; skill-graph-first-gate.ts's denial message now names the schema-fetch step alongside the graph calls; vault-agent-gate.ts now neutralizes repo source paths (lorebrain/src, dist, tests, package.json, tsconfig) in the haystack before matching VAULT_MARKERS.

## Rationale

Knight Code's MCP tools arrive with deferred schemas, so CLAUDE.md's claim that a structural check is "one tool call away" was false in practice: every check cost a ToolSearch fetch plus the call. That extra step makes text search the cheaper path, which is exactly the behavior verify-first exists to prevent. Worse, a select query built from bare tool names returns "No matching deferred tools found", which reads as "the tools do not exist" and invites a Grep fallback. Injecting the exact prefixed line once per session converts a per-tool tax into a per-session one and names that trap explicitly.  The vault gate carried a real defect. `lorebrain` was a bare substring marker, and `lorebrain/src/skills.ts` is where KBV2's own graph code lives, so any dispatch to maintain the knowledge graph was denied to every agent type except loreGod, which is read-only and could not have done the work. The gate refused to let its own supporting system be maintained by a subagent.  Neutralizing the matched source-path text rather than early-returning on it is deliberate: an exemption would let a prompt naming both lorebrain/src and the "Revenge of the Felled God" vault through. Verified live across four dispatch shapes: source-path-only allowed, source-path plus vault name still denied, bare lorebrain still denied, subagent_type loremaster still denied unconditionally.

## Alternatives Considered

Rejected: narrowing the vault marker from bare `lorebrain` to the MCP tool names (lorebrain_query and siblings) plus phrases like "lorebrain vault". Precise, but it trades a false positive for a false negative on a safety gate, since a dispatch saying "use lorebrain to check X" with no tool name would then pass. Wrong direction for a control that protects the "Revenge of the Felled God" vault.  Rejected: having the SessionStart hook pre-query the skills graph or touch its marker file so skill-graph-first-gate.ts opens automatically. That would satisfy the gate before any real work began, which is equivalent to deleting it. The gate's value is that the structural check happens in the context of an actual question, so only the denial message was improved.  Rejected: reducing total MCP tool count to avoid schema deferral. Deferral is harness-side and driven by tool count; cutting real tools to win back schema slots is a worse trade than one batched fetch.
