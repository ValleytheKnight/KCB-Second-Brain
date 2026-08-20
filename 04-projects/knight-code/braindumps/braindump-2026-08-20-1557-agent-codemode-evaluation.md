---
type: "braindump"
domain: "project-specific"
project: "knight-code"
date: "2026-08-20"
created: "2026-08-20 15:57"
themes: ["mcp-batching", "credential-security", "in-house-tooling", "trust-surface"]
tags: ["#braindump", "#raw-thoughts", "#knight-code"]
status: "captured"
energy_level: "medium"
emotional_tone: "neutral"
confidence: "high"
---

# Braindump: agent-codemode evaluation and in-house MCP batching plan

## Raw Thoughts

janwilmake/agent-codemode: evaluation

What it does: Instead of an agent making 40 sequential MCP tool calls, it writes one TypeScript script that calls multiple MCP servers directly and awaits them together (example: Linear + Axiom + Slack in one Promise.all). Claims ~290x context reduction on multi-call workflows by skipping the per-call round-trip through the model.

How it works: A standalone npm CLI/library, separate from Claude Code's own process. It reads Claude Code's live credentials directly off disk, `~/.claude/.credentials.json` (OAuth tokens) and `~/.claude.json`/`.mcp.json` (stdio and API-key servers), then executes generated scripts using those tokens to call MCP servers.

Maturity: 27 stars, 0 forks, single maintainer, 19 commits, MIT license. Nascent, no real track record.

Relevant to today's work: `~/.claude.json` is the exact file a Read deny rule was put on this session, because it holds plaintext bearer tokens (finding F1 from today's credential audit). That deny rule only governs Claude Code's own Read tool, it does nothing against a separate OS process. Installing this tool means handing a single-maintainer, unaudited npm package direct filesystem access to every live OAuth token and API key Claude Code holds, then running LLM-generated scripts with those credentials. That's a real increase in trust surface, not a hypothetical one.

Call: don't adopt this now. The batching idea is sound and matches a real problem Knight Code already cares about (rtk exists specifically to cut token overhead), but:
- It duplicates a concern Knight Code already addresses differently (structural knowledge-graph lookups over blind sequential calls, rtk's bash-output filtering), nothing here is a clear gap.
- Its credential-access model runs directly counter to the hardening just done this session.
- Trust footprint (single maintainer, near-zero adoption) doesn't clear the bar for something that reads live secrets.

If the underlying idea (script-based MCP batching to cut tool-call overhead) is worth having, that's a case for building it in-house inside Knight Code's own boundary, not importing this package. Flagged as background reading, not a dependency to pull in.

In-house MCP batching, high-level build plan:

Core idea, adapted, not copied: agent-codemode's win is real, one script calling N MCP tools beats N sequential round-trips through the model. But its credential-reading design doesn't apply here: Knight Code's own MCP servers (knightbrain_*, knight-code-memory, mnemosyne) are local stdio processes spawned by Claude Code with empty env blocks, not remote OAuth-authenticated servers. So the in-house version doesn't need to touch `~/.claude.json` or any credential file at all, that whole attack surface just isn't there for v1. Scope it to Knight Code's own trusted local servers only; leave remote/authenticated MCP servers out until there's an actual need.

Where it lives: as a skill + CLI, following the existing pattern (compare rtk's proxy-and-analytics shape, or browse's CLI). Not a new registry, not a parallel agent mechanism, a tool invoked the same way rtk or browse already are. Source edits go through `docs/SKILL_SOURCES_AND_INSTALLS.md`'s edit-source-then-skills:install flow if it ships as a skill.

Phases:
1. Codegen: introspect each configured MCP server's list_tools response and generate a typed TS wrapper module per server (e.g. `mcp.knightbrain.def(...)`, `mcp.memory.decisionSearch(...)`), the same shape agent-codemode's `examples/standup.ts` shows. Source: `.mcp.json` config Knight Code already has, no new discovery mechanism.
2. Script runner: a small bun-based executor that takes a script referencing the generated wrappers, runs it with the already-open stdio connections (or spawns fresh ones per server, matching current MCP proxy behavior), and returns one aggregated result to the agent instead of N tool-call round-trips.
3. Invocation surface: a skill (e.g. `knightcode-codemode`) that recognizes "this needs 5+ related tool calls" and offers the batched-script path instead of sequential calls. Mirrors how rtk is transparently substituted via hook rewriting, so this could plausibly also be hook-triggered rather than requiring the agent to remember to invoke it.
4. Measurement before expansion: instrument it the way `rtk gain` does: log token cost of batched vs. sequential on a handful of real workflows (knightbrain_* multi-query lookups, `decision_search` + `promise_search` + `dev_diary_search` combos are the obvious first targets) before deciding whether to extend it further.

Explicit non-goals for v1: no remote/OAuth MCP servers, no credential-file reading, no new agent-creation path, this is a tool, not an agent, so it doesn't touch `create_agent`/`.claude/agents/`.

Outcome: logged as a promise to return to this later. Logged in Knight Code memory as promise `d3c0f815`.

## Content Analysis

### Main Themes
1. **Trust-surface discipline:** Evaluating a third-party tool immediately against the credential hardening done the same session, catching a real conflict (unaudited npm package reading the exact file just protected) rather than treating the two as unrelated tasks.
2. **Adapt, don't import:** The valuable idea (script-based MCP batching) is separable from the risky implementation (filesystem credential reading). Knight Code's own MCP servers are local, unauthenticated stdio processes, so the risky part of agent-codemode's design doesn't even apply, an in-house version can take the win without the exposure.
3. **Consistency with existing tooling philosophy:** The proposed build slots into patterns Knight Code already has (rtk's proxy/analytics shape, hook-based transparent substitution, measure-before-expand discipline) rather than introducing a new mechanism.

### Supporting Ideas
- agent-codemode's ~290x context reduction claim is plausible mechanically (N round-trips through the model collapse to 1) but unverified for Knight Code's own workload shape.
- knightbrain_*, knight-code-memory, and mnemosyne queries (decision_search, promise_search, dev_diary_search) are named as the first real batching targets, they're multi-query lookups that already happen sequentially today.

### Questions Raised
- Should the batching skill be invoked explicitly by the agent, or hook-triggered automatically like rtk's bash rewriting?
- At what call-count threshold does batching actually pay for itself versus just adding script-generation overhead?

### Decisions Contemplated
- Adopt agent-codemode directly vs. build in-house: decided against adoption, in-house build proposed instead.
- Whether to log this as a promise or turn it into a full spec via `/knightcode-spec` immediately: decided to log as a promise (return to it later), not spec it now.

## Strategic Intelligence

### Key Insights
1. **Security review isn't a one-off checklist, it's a lens applied to everything evaluated afterward.** The same session that fixed the `~/.claude.json` exposure immediately used that exposure as the disqualifying factor for a new tool, rather than treating the audit as closed and moving on.
2. **"Good idea, bad delivery mechanism" is a distinct verdict from a flat reject.** The plan explicitly separates agent-codemode's mechanism (reject) from its underlying technique (worth building in-house), avoiding both uncritical adoption and throwing out a useful pattern.
3. **Local-only stdio MCP servers change the risk calculus entirely.** The same batching technique that's dangerous against remote OAuth-authenticated servers is low-risk against Knight Code's own local, unauthenticated servers, the threat model, not just the idea, determines whether something is buildable safely.

### Pattern Recognition
- **Connection to Previous Thinking:** Directly follows the same-session credential audit (see [[04-projects/knight-code/PROJECT-OVERVIEW]] closing notes, 2026-08-20 entry) and pattern-matches against `decionis/agent-safe-pipeline`, referenced in the 2026-08-19 daily brief as background reading on agent action-authorization design.
- **Recurring Patterns:** Token-cost reduction is a recurring priority (rtk itself exists for this reason); this braindump extends that priority into MCP tool-call batching specifically.
- **Evolution:** Moves from "audit and harden existing credential exposure" to "evaluate new tools against that hardened baseline" to "propose in-house build that keeps the win without reintroducing the exposure," a coherent same-day arc.

### Strategic Implications
- If built, this becomes a new piece of Knight Code's own tooling surface (alongside rtk, browse), worth tracking under the Knight Code project rather than as a one-off script.
- Reinforces a standing default: third-party tools that need direct credential-file access get a high bar, in-house alternatives that avoid touching those files are preferred when the underlying technique is sound.

## Action Items

### Immediate (24-48 hours)
- [ ] None, explicitly deferred, promise `d3c0f815` logged instead of an immediate task 📅 2026-08-21

### Short-term (1-2 weeks)
- [ ] Revisit promise `d3c0f815` (in-house MCP batching) when picking up new Knight Code tooling work 📅 2026-08-27

### Strategic Considerations
- Before building, decide the invocation-surface question (agent-invoked skill vs. hook-triggered) since it materially changes phase 3 of the plan.
- Measure actual token cost on `knightbrain_*`/`decision_search`/`promise_search`/`dev_diary_search` combos before deciding whether to expand batching beyond those first targets.

## Connections
- **Related Braindumps:** none yet linked
- **Relevant Projects:** [[04-projects/knight-code/PROJECT-OVERVIEW|Knight Code]]
- **Knowledge Base:** none yet linked

## Domain Classification
- **Primary Domain:** project-specific (Knight Code) (95%)
- **Reasoning:** Entire content is a tooling evaluation and build plan scoped to Knight Code's own MCP infrastructure and security posture, directly tied to the same-day credential audit logged in the Knight Code project overview.
- **Cross-Domain Elements:** Touches Knight Code Base vault only indirectly (via the daily brief that surfaced agent-codemode as a GitHub repo); no meaningful cross-domain content otherwise.
- **Privacy Level:** private (references internal Knight Code security posture and unpublished build plans)

## Processing Notes

### Emotional Context
- **Energy Level:** medium, methodical evaluation and planning, not high-excitement ideation.
- **Emotional Tone:** neutral, measured technical judgment throughout ("don't adopt this now," "worth having, that's a case for building it in-house").
- **Implications:** Consistent with a disciplined, security-conscious working style; no urgency signals beyond the same-day audit context.

### Confidence Assessment
- **Overall Analysis:** 90%, content is technically precise and internally consistent, minimal ambiguity in intent.
- **Domain Classification:** 95%, unambiguously Knight Code project-specific.
- **Strategic Insights:** 85%, insights are well-supported by the content itself; some extrapolation on "recurring pattern" framing.
- **Areas Requiring Clarification:** None blocking, the two open questions listed under "Questions Raised" are intentionally left open by the user's own decision to log this as a promise rather than resolve them now.

---

*Processed by COG Brain Dump Analyst*
