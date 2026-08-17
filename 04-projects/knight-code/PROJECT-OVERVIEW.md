---
type: project-overview
project: Knight Code
slug: knight-code
created: 2026-08-12
status: active
tags: ["#project", "#overview"]
---

# Knight Code

> [!tip] Status: Active

```button
name Promote Project
type command
action QuickAdd: Promote Project
```

## What is this project?
A personal AI-agent tooling system Chris runs in Claude Code, at `C:\Users\Chris Brown\Documents\Knight Code`. It has its own memory (decisions, promises, learnings, dev-diary), skills, agents, and enforcement hooks. This vault (Knight Code Base) is the human-readable window into it. Decisions, promises, learnings, and dev-diary entries sync here live, and a generated structure overview covers its skills, agents, MCP servers, and hooks.

This is Chris's main/child project. Track it here on an ongoing basis, not as a one-time note.

## Current Status
Actively developed and used daily. Obsidian plugins and themes Chris is building live nested inside this repo. Skill catalog expanded 2026-08-16 with knightcode-pytest-testing and knightcode-python-performance (filled a confirmed gap: no PySide6/PyQt Claude skill exists anywhere on GitHub), plus three new reference docs folded into knightcode-investigate. Structural knowledge-graph coverage (the graphify/lorebrain pattern, previously campaign vault and Knight Code only) extended to sibling app projects Scryptable and KnightOS via per-project MCP instances, with a new hard-enforcement hook (project-graph-gate.ts) blocking blind Grep/Glob under any graphed project folder. See [[braindumps/braindump-2026-08-16-1418-scryptable-graphify-skills|2026-08-16 session braindump]] for full detail.

## Project Resources
- [[braindumps/|Project Braindumps]]
- [[planning/|Planning Documents]]
- [[resources/|Resources]]
- [[04-projects/knight-code-base/README|knight-code-base/]] is the auto-synced mirror of the actual repo (memory export, structure overview), not a place to track things by hand; see that folder's README for the split.

## Next Steps
- [ ] Note improvement ideas for Knight Code as they come up #task
- [ ] Track ideas/progress for nested Obsidian plugins/themes (see [[04-projects/obsidian-plugins-themes/PROJECT-OVERVIEW|Obsidian Plugins & Themes]]) #task
- [ ] Audit Knight Code's API key and credential storage strategy (LLMjacking threat flagged in the 2026-08-14 daily brief) 📅 2026-08-20 #task

## Closing Notes

- 2026-08-12 18:36: implemented. mcp server can be found in [[mcp-servers]]. forced spec workflow is not a gate when planning new apps or plugins

---

*This overview helps COG organize your Knight Code-related thoughts and updates.*
