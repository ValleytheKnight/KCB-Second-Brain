---
id: "363f3579-64fa-4fe6-aba7-57a15a4e637b"
type: "decision"
date: "2026-08-14"
source: "user"
confidence: 10
tags: ["knight-code", "decision"]
---
# Decision: Scryptable's design mockups are built in pen.dev (the Pencil MCP tool), not another mockup...

## Decision

Scryptable's design mockups are built in pen.dev (the Pencil MCP tool), not another mockup tool.

## Rationale

Chris's explicit instruction for this feature's design phase. Pencil MCP works on .pen files and requires get_app_state with schema/canvas flags before any other Pencil tool call; .pen files must never be read/grepped directly.
