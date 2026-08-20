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
- [x] Audit Knight Code's API key and credential storage strategy (LLMjacking threat flagged in the 2026-08-14 daily brief) 📅 2026-08-20 #task

## Closing Notes

- 2026-08-20: Credential storage audit complete. Fixed F1 (CRITICAL): `~/.claude.json` held five plaintext MCP bearer tokens (Obsidian REST API keys, lorebrain-vault, knight-code-base) unprotected, while on-disk copies of the same secrets were already Read-denied. Added `Read(~/.claude.json)` to the deny list in `.claude/settings.json`. Fixed F2 (MEDIUM): redaction engine (`lib/redact-patterns.ts`) had no pattern for `Bearer <hex>` tokens; added `bearer.hex_token` (HIGH tier), regenerated Mnemosyne's ported config (13 to 14 patterns), `redact-guard.test.ts` 20/20 pass. Gmail password handling and the three `~/.knightcode/*` credential files needed no changes (correctly permissioned, gitignored, Read-denied).
- 2026-08-20: Checked Claude Developer Platform's Aug 19 Skills API GA against Knight Code, no action needed. GA just makes the `skills-2025-10-02` beta header optional, no endpoint/auth change, and no Knight Code skill or hook references that header. GitHub-hosted skills (a separate Aug 7 feature) and the Managed Agents controls (session budgets, advisor models, geo pinning) all belong to Anthropic's Managed Agents product, a hosted cloud-agent service Knight Code doesn't use, it runs entirely through local Claude Code sessions. Worth revisiting only if Knight Code skills (e.g. obsidian-plugins-themes, winui pack) are ever distributed to run outside Claude Code.
- 2026-08-12 18:36: implemented. mcp server can be found in [[mcp-servers]]. forced spec workflow is not a gate when planning new apps or plugins

---

*This overview helps COG organize your Knight Code-related thoughts and updates.*
