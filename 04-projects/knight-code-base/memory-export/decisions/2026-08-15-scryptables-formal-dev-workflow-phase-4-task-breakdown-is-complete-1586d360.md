---
id: "1586d360-df13-412f-8137-27a9ce9335e2"
type: "decision"
date: "2026-08-15"
source: "skill"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: Scryptable's formal-dev-workflow Phase 4 (Task Breakdown) is complete: 22 vertically-sliced tasks ac...

## Decision

Scryptable's formal-dev-workflow Phase 4 (Task Breakdown) is complete: 22 vertically-sliced tasks across 7 phases (Foundation, Import/Core Pipeline, Assembly/Review/Export/Obsidian, AI Provider/LLM Handoff, MCP, Preferences/Accessibility, Packaging), each with acceptance criteria, verification steps, dependencies, and scope estimates. Full task list at protocol-whisper-app-tasks.md. All four Phase 3.5 security findings (decision 043c2c8b) are folded in as explicit acceptance criteria: zip-slip containment in Task 4, the custom-endpoint standing rule in Task 14, MCP client tool-output flagging plus confirm step in Task 17, MCP server default-off/localhost-only/shared-token in Task 18. This completes formal-dev-workflow's planning pipeline (CEO, design, eng, security, and now task breakdown all done); the workflow's own state file phase is now "implementation", which opens formal-workflow-gate.ts's enforcement hook for real Scryptable source code.

## Rationale

Followed knightcode-planning-and-task-breakdown's process (vertical slicing, dependency-graph ordering, checkpoints every 2-3 tasks, explicit acceptance criteria and verification per task) rather than a horizontal build-everything-then-integrate plan, per this project's standing preference (decision dc8e14d6's precedent). Folding the security findings into specific tasks as acceptance criteria, rather than leaving them as a separate cleanup pass at the end, was deliberate: a finding not tied to a concrete task and a concrete test is a finding that is easy to silently drop during implementation. No task exceeds roughly 5 touched modules; the one L-shaped candidate (accessibility) was deliberately sequenced last in its phase specifically to avoid rework, not split further, since it is inherently cross-cutting by nature rather than poorly scoped.
