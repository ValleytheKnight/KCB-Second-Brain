---
type: "structure-overview"
date: "2026-08-12"
tags: ["knight-code", "structure", "overview"]
---
# Knight Code Structure Overview

Knight Code is Chris's personal, single-user AI-agent tooling system, built as a set of skills, real custom agents, MCP servers, and enforcement hooks that all run inside Claude Code. This overview is a generated, structural view into what the system actually contains, not a narrative description.

This overview is split across five notes in this same folder:

- `skills.md`, every installed skill, its declared tools, invoke method, and associated agent.
- `agents.md`, every registered custom agent and every skill-embedded persona.
- `mcp-servers.md`, every registered MCP server and its launch command.
- `hooks.md`, every lifecycle hook and what each one enforces or automates.
- `repo-layout.md`, the top-level directory layout of the Knight Code repo.

Generated from Knight Code's own live skills knowledge graph, SKILL-CATALOG.md, AGENTS.md, .mcp.json, and the hook source files themselves, by `scripts/generate-structure-overview.ts` in the knight-code-base-companion repo.

## Recent capability additions (manually noted)

- **Real security scanners, 2026-08-14:** `cso` and `security-and-hardening` now check for `gitleaks` (secret-leak scanner) and `semgrep` (vulnerability-pattern scanner) on the machine before scanning, and run the real tool as the primary check when present. If neither is installed, both skills fall back to the old keyword-grep heuristic and say so plainly in the report rather than silently degrading. Neither tool is installed on this machine yet; install with `winget install gitleaks` and `pip install semgrep` to activate the upgraded scans.
- **Hard-gated Phase 3.5: Security Review, 2026-08-14:** `formal-dev-workflow` now runs a mandatory security review between Eng Review and Task Breakdown, using `cso`'s deeper audit against the planned architecture rather than existing code. It checks where secrets/API keys/OAuth tokens live, whether payment card data ever touches Chris's own servers versus a processor's hosted fields, and how OAuth tokens are stored and rotated. Enforced by the workflow's existing hook, the same hard way as the other pre-implementation phases.
- **codevibes reference only, 2026-08-14:** a browser-only AI code scorer with no confirmed way for Claude Code to call it automatically; documented as a reference entry in `AGENTS.md`, not wired into any skill.
