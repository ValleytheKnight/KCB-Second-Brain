---
id: "6db7e6f5-d775-49a2-9ff3-4a77c1271c89"
type: "decision"
date: "2026-08-14"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: formal-dev-workflow's Phase 2 (Design Review) now has an explicit Scope Stability Gate and won't aut...

## Decision

formal-dev-workflow's Phase 2 (Design Review) now has an explicit Scope Stability Gate and won't auto-advance to Phase 3 (Eng Review) on a single pass.

## Rationale

Chris's direct observation from this session: real mockup work with pen.dev repeatedly surfaced major scope (diarization, multi-provider LLM support, OAuth, MCP client/server, four separate config-management screens) that a single design-review pass never would have caught, and the workflow's state had already jumped to "eng" phase while this was still happening, exactly the failure mode being fixed. Phase 2 now explicitly expects multiple rounds, requires mockups for every screen/state not just the happy path, and gates advancement on an AskUserQuestion asking Chris directly whether scope is stable before bumping phase to "eng". Edited in formal-dev-workflow/SKILL.md.tmpl, regenerated and published via gen:skill-docs + skills:install, verified zero drift with skills:check.
