---
id: "d692856c-4f7d-426a-a3af-055066212f30"
type: "decision"
date: "2026-07-29"
scope: "repo"
source: "user"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: DevKnight gets a dedicated Obsidian vault ("DevKnight Workshop") as the shared human-readable worksp...

## Decision

DevKnight gets a dedicated Obsidian vault ("DevKnight Workshop") as the shared human-readable workspace for project artifacts (planning, design, execution, protocols, lessons learned, diagrams, progress), accessed via the obsidian-local-rest-api plugin's built-in MCP server, with DevKnight holding full authority inside the vault (including command execution) and treating any unrecognized change as Chris's explicit direction by default. This is separate from, not a replacement for, Knight Code's existing decision_log/promise_log/dev_diary_log/learnings_log MCP tools. DevKnight's concept-mockup design step draws from a multi-tool suite (Pencil, Google Stitch, Artifact, frontend-design/impeccable), chosen per project rather than fixed to one tool, and DevKnight must research and present new-tool candidates to Chris before ever installing one.

## Rationale

Chris wants one dedicated, human-editable shared workspace for actual application-development artifacts, distinct from Knight Code's own project-meta-tracking MCP tools which serve a different purpose. Full authority in the vault with default-to-Chris's-intent on unrecognized changes matches how Chris actually plans to use it (editing directly, installing his own plugins) without DevKnight treating his own edits as drift to fix.

## Alternatives Considered

Restricting DevKnight to CRUD-only vault access without command execution; having the vault fully replace Knight Code's existing MCP memory tools for DevKnight's scope; locking DevKnight to a single concept-mockup design tool.
