---
type: "braindump"
domain: "project-specific"
project: "knight-code"
date: "2026-08-25"
created: "2026-08-25 20:56"
themes: ["codemode", "mcp-batching", "security-incident", "routing-advisory-hook"]
tags: ["#braindump", "#raw-thoughts", "#knight-code", "#codemode"]
status: "captured"
energy_level: "high"
emotional_tone: "neutral"
confidence: "high"
---

# Braindump: Codemode, feature history and today's routing advisory hook

## Raw Thoughts

What it is: codemode is a Knight Code skill (knightcode-codemode) that batches several of Knight Code's own MCP tool calls into one TypeScript script instead of paying a schema-load-plus-round-trip cost per call. Codegen reads each server's live listTools() output and writes typed wrapper functions per tool into codemode/generated/. A script is a plain TS module with a default-exported async function calling those wrapper functions across multiple servers, run through `bun run codemode/src/cli.ts run <script.ts>`. First run in a working directory spawns a session-lived daemon that holds server connections open (idle-timeout, no manual start).

Scope: v1 covers 10 named local servers. 6 are credential-free and generate automatically with no flag: knight-code-memory, knight-code-agent-manager, lorebrain, knightbrain, knightbrain_scryptable, knightbrain_knightos. knight-code-mnemosyne and the 3 Obsidian vaults (felled_god, devknight, plugin_tester) need `--server <name>` explicitly since they need live credentials or a running vault. spec-workflow and any remote/OAuth MCP server are explicitly out of scope for v1.

Build history (10 tasks, spec at specs/20260824-codemode-mcp-call-batching.md, issue #2): codegen for a single server, daemon skeleton with connection reuse and idle-timeout, runner executing a script through the daemon, then a security incident mid-build: code review found three Obsidian Local REST API keys committed in plaintext in .mcp.json from a pre-existing commit. Fixed by rotating all three keys at the source, moving them to ~/.knightcode/secrets/obsidian.env (chmod 600), rewriting .mcp.json to use Claude Code's ${VAR} expansion, adding the same expansion to codemode/src/mcp-config.ts (codemode's daemon spawns servers independently of Claude Code's own MCP loader, so both configs needed the fix), and purging the old keys from all git history with git filter-repo, force-pushed and verified clean against a fresh clone. Separately found and fixed a broken HTTPS port on the Plugin Tester vault during that rotation. Later tasks: fixed a daemon idle-timeout-mid-call race and a knight-code-mnemosyne orphan process leak, quoted non-identifier property keys (like "max-turns") in generated wrapper types so tsc doesn't choke, skill registration plus a generic .installignore gap fix in install-skills.ts, then demonstrated on 3 real workflows and closed the project out.

Today's addition, on top of the shipped feature: a PreToolUse hook, hosts/claude/hooks/codemode-routing-advisory-hook.ts, registered in .claude/settings.json. It fires on every single tool call to any codemode in-scope MCP server and injects a reminder (additionalContext) that codemode exists and to check before proceeding whether the current task needs another call to any in-scope server, in which case it should be one codemode script instead of separate direct calls. It never denies the call. Design reasoning: a hard deny-and-retry gate was considered and rejected, since a PreToolUse hook only sees the one call in front of it and can't know how many more are coming in the same turn, so denying would waste a real call every time. A once-per-session reminder was also considered and rejected: relying on the check holding in memory for the rest of a session is exactly the failure this exists to prevent, so the hook is stateless and fires on every matched call instead. Marked ADVISORY BY DESIGN per this project's hook authoring standard, since whether a given call is part of a multi-call workflow is a judgment about intent the hook can't verify mechanically. codemode/SKILL.md.tmpl's Limitations section was reworded to describe this (still no auto-invocation, no cron/standalone execution, the agent still writes and runs the script itself), then SKILL.md regenerated and the installed copy published.

Verified two ways: ran the hook directly against synthetic stdin twice with identical input, confirmed the reminder appears both times (no suppression). Then had a separate live Claude session (knight-code-94) call the real decision_search tool twice back to back; confirmed the reminder appeared both times, worded identically, and the real call still returned real data both times, never blocked or altered.

Committed and pushed to master as d744b9b: "Add codemode routing advisory hook, no rejected calls" (4 files: the new hook, .claude/settings.json, codemode/SKILL.md, codemode/SKILL.md.tmpl).

## Content Analysis

### Main Themes
1. **Codemode core mechanism:** batches multiple MCP tool calls into one generated TS script run through a session-lived daemon, cutting per-call schema-load-plus-round-trip cost.
2. **v1 scope boundary:** 6 credential-free servers auto-generate; 4 credentialed/live servers need explicit opt-in; remote/OAuth servers and spec-workflow are out of scope.
3. **Security incident and remediation:** plaintext API keys found mid-build, fixed with key rotation, env-file secrets, ${VAR} expansion in two separate config loaders, and full git history purge.
4. **Today's routing advisory hook:** a stateless, always-fires, never-deny PreToolUse hook nudging toward codemode when multiple in-scope calls are likely, with two rejected alternative designs (hard deny, once-per-session reminder).

### Supporting Ideas
- Daemon holds connections open per working directory with idle-timeout, no manual start/stop needed.
- Generated wrapper types needed quoting fixes for non-identifier keys (e.g. "max-turns") to satisfy tsc.
- install-skills.ts had a generic .installignore gap, fixed alongside skill registration.
- codemode's daemon spawns MCP servers independently of Claude Code's own MCP loader, so secret-handling had to be fixed in two places, not one.

### Questions Raised
- None stated explicitly by the source session. Open question for later: does the advisory hook's per-call reminder create meaningful prompt overhead across long sessions with many in-scope calls?

### Decisions Contemplated
- Hard deny-and-retry gate vs. stateless always-fire advisory: advisory chosen because a PreToolUse hook can't see future calls in the same turn, so denial would waste real calls.
- Once-per-session reminder vs. always-fire: always-fire chosen because relying on the agent's memory holding the check for the rest of the session is the exact failure mode this hook exists to prevent.

## Strategic Intelligence

### Key Insights
1. **Batching MCP calls is a real cost lever.** Schema-load-plus-round-trip overhead per call is large enough to justify a dedicated codegen, daemon, and advisory-hook system.
2. **Advisory-only hooks fit judgment calls a hook can't verify mechanically.** This project now has a stated standard ("ADVISORY BY DESIGN") for that class of hook.
3. **Cross-loader secret handling is a recurring trap.** Any subsystem that spawns its own MCP connections independently of Claude Code's loader needs its own ${VAR} expansion wired in, not just the main config.

### Pattern Recognition
- **Connection to Previous Thinking:** consistent with this vault's engineering-discipline stance on hooks and verification (see CLAUDE.md's Skill Post-Condition Rule and Closed-Loop Execute). Mutating work gets verified against the observed artifact, not the tool's return value; this hook build followed the same instinct, verified via synthetic stdin plus a live second session, not just "should work."
- **Recurring Pattern:** the security incident was found via code review, not original design, reinforcing the value of review passes on anything touching credentials.

### Strategic Implications
- codemode is now feature-complete for v1 scope with a live nudge mechanism in place; next natural extension point is deciding whether spec-workflow and remote OAuth servers get a v2.
- The advisory hook pattern (stateless, always-fire, never-deny, judgment-based) is a reusable template for other "remind but don't block" hooks in this codebase.

## Action Items

### Immediate (24-48 hours)
- [ ] None specified by source session.

### Short-term (1-2 weeks)
- [ ] Revisit whether the advisory hook's always-fire behavior needs tuning if it proves noisy in practice. 📅 2026-09-01

### Strategic Considerations
- v2 scope decision (spec-workflow, remote/OAuth servers) is open and not yet scheduled.

## Connections
- **Related Braindumps:** none yet on codemode.
- **Relevant Projects:** [[04-projects/knight-code]]
- **Knowledge Base:** none yet. Candidate for promotion to `05-knowledge/consolidated/` if codemode becomes a stable reference pattern.

## Domain Classification
- **Primary Domain:** project-specific (knight-code), 95%
- **Reasoning:** entirely about a named Knight Code feature (codemode) and a hook shipped today in the knight-code repo.
- **Cross-Domain Elements:** none.
- **Privacy Level:** private (mentions rotated API keys and internal file paths; no live secrets included).

## Processing Notes

### Emotional Context
- **Energy Level:** high. Dense, detailed technical recap covering a full build history plus a same-day addition.
- **Emotional Tone:** neutral. Factual project report, no strong affect markers.
- **Implications:** straightforward capture, no follow-up emotional context needed.

### Confidence Assessment
- **Overall Analysis:** 90%. Content is a clear, well-structured technical report from the originating session.
- **Domain Classification:** 95%. Unambiguous single-project scope.
- **Strategic Insights:** 80%. Insights drawn from the source narrative, not independently verified against the repo in this session.
- **Areas Requiring Clarification:** whether v2 scope (spec-workflow, remote/OAuth) is planned or just noted as a boundary.

---

*Processed by COG Brain Dump Analyst*
