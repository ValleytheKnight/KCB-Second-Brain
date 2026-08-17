---
type: "braindump"
domain: "project-specific"
project: "knight-code"
date: "2026-08-16"
created: "2026-08-16 14:18"
themes: ["scryptable-task3", "knight-code-skills", "graphify-knowledge-graphs", "knightos-worktree"]
tags: ["#braindump", "#raw-thoughts", "#knight-code", "#scryptable", "#knightos"]
status: "captured"
energy_level: "high"
emotional_tone: "focused"
confidence: "high"
---

# Braindump: Knight Code Session, Scryptable Task 3, New Skills, Graphify Rollout

## Raw Thoughts

**SCRYPTABLE (PySide6 desktop app, github.com/ValleytheKnight/Scryptable):**
- Picked up mid-build via DevKnight. Task 3 (First-Run Setup: a two-question chromeless wizard for workspace folder + a customizable "unit of work" term, persisted so it only shows once) was already done from a prior session, verified against real commits on disk.
- Had DevKnight cross-check Task 3's work against two newly-added Knight Code skills (pytest-testing, python-performance): no test-pattern deviations found, code too small in scale for profiling to matter yet.
- Ran a review/simplify pass on the unpushed Task 3 commits. Found and fixed two real violations of the "no history narration in code comments" rule (decision-log IDs baked into docstrings in first_run_wizard.py and branding.py), and removed one redundant test.
- Everything committed and pushed to Scryptable's GitHub, master matches origin/master.
- Next up: Task 4 (Craig archive import, with zip-slip path-traversal containment per the security review). Not started, needs explicit go-ahead per standing project rule.
- Ran DevKnight's pause ceremony to close out the session properly (vault sync, continuation point, kanban, daily note).

**KNIGHT CODE SKILL ADDITIONS (all installed as knightcode-<name>, catalog-registered, DevKnight's own routing table updated):**
- knightcode-pytest-testing: pytest patterns (fixtures, parametrize, mocking, conftest) plus a pytest-qt section specifically for PySide6 widget testing (qtbot.addWidget, qtbot.waitSignal/waitUntil instead of time.sleep).
- knightcode-python-performance: CPython-specific profiling (cProfile, line_profiler, memory_profiler, py-spy) and optimization patterns, distinct from the existing frontend/general performance-optimization skill.
- Three new reference files folded into the existing knightcode-investigate skill (not a new skill): reference-root-cause-tracing.md, reference-defense-in-depth.md, reference-condition-based-waiting.md.
- Source: researched sickn33/agentic-awesome-skills (1917 skills) plus the Qt Company's own official agent-skills repo. Confirmed finding: no PySide6/PyQt-specific Claude agent skill exists anywhere on GitHub. Qt's own repo only covers QML/C++, not Python/QtWidgets. Real, confirmed gap.

**GRAPHIFY / KNOWLEDGE GRAPH INFRASTRUCTURE (the "lorebrain" engine, same one powering knightbrain and the D&D campaign vault's lorebrain):**
- Discovered app project codebases outside Knight Code's own repo (Scryptable, KnightOS) had no structural knowledge graph, only the campaign vault and Knight Code's own code did.
- Decision: don't move app projects into Knight Code's repo, keep them separate (matches existing product-repo-isolation rule); instead stand up a separate lorebrain MCP instance per project, pointed at that project's own root folder.
- Tore down knightbrain_source: pointed at a source project fully removed from this machine and GitHub. Deleted the MCP registration and stale graph index. Generalized the shared "verify, don't guess" guidance text (used across every Knight Code skill) from a hardcoded single reference to a general knightbrain_<project> pattern.
- Set up and indexed two new graphs: knightbrain_scryptable and knightbrain_knightos. Both confirmed connected and query-tested live (real results returned: workspace-handling code in Scryptable, window-management code in KnightOS, down to file and line number).
- Wired graph setup into the formal-dev-workflow skill as a new "Phase 0a," inside existing Phase 0, not a new numbered phase. Fires automatically the first time the workflow runs for a genuinely new project folder under DevPrograms.
- Built a new hard-enforcement hook, project-graph-gate.ts, on Grep/Glob: blocks blind text search under any project folder with a registered knightbrain_<project> graph, redirecting to structural query tools instead. Reads its registry live from ~/.claude.json so future projects get gated automatically with no manual hook edits. If a graph's MCP tools are missing or erroring, the rule is to stop and tell Chris directly rather than silently fall back to Grep/Glob. That half is enforced by instruction, not mechanically, since a hook can't see live tool-connection state.
- DevKnight's own agent definition now names all of this explicitly: the graph tools by name, the hard no-Grep/Glob rule, and the fallback procedure if a graph is down.

**KNIGHTOS FOLDER STRUCTURE, EXPLAINED:**
- Two folders in DevPrograms: KnightOS and KnightOS-task10. Not a duplicate or an error.
- KnightOS-task10 is a real git worktree (second working-directory checkout sharing the same .git history, on branch task-10-auto-update) used to build Task 10 in isolation.
- That branch is already fully merged into master (confirmed via git merge-base). Worktree has served its purpose, now dead weight. Only the real KnightOS (master) folder was indexed for the graph.
- Open item: whether to have DevKnight remove the stale worktree with git worktree remove. Not yet done. Chris's call.

**Repo state:** All Knight Code repo changes committed and pushed across three commits today (skill additions, graphify decommission/setup, project-graph-gate hook plus devknight update). Nothing left uncommitted except intentionally-untracked scratchpad working files.

## Content Analysis

### Main Themes
1. **Scryptable Task 3 closeout:** verification, cleanup, and pause ceremony for a completed feature; Task 4 gated behind explicit go-ahead.
2. **Skill catalog expansion:** filled a confirmed gap (no PySide6 Claude skill exists anywhere) with two new skills plus three reference docs folded into an existing one.
3. **Graphify rollout to sibling projects:** extended the structural knowledge-graph pattern (previously campaign vault plus Knight Code only) to Scryptable and KnightOS, with hard enforcement via a new hook.
4. **Infrastructure hygiene:** decommissioned a dead graph (knightbrain_source), generalized hardcoded guidance text, clarified a worktree that looked like a duplicate folder but wasn't.

### Supporting Ideas
- pytest-qt patterns specifically address PySide6 testing gaps (qtbot signal/wait patterns vs time.sleep).
- The "no history narration in code comments" rule caught real violations (decision-log IDs in docstrings), showing the rule is doing its job.
- Hook enforcement (project-graph-gate.ts) is mechanical and hard; the "tell Chris if MCP is down" half is soft and instructional, a known asymmetry.

### Questions Raised
- Should the stale KnightOS-task10 worktree be removed now, or is there any reason to keep it around a bit longer?
- When Task 4 (Craig archive import) gets the go-ahead, does the zip-slip containment design need a fresh security review pass, or does the earlier review still cover it?

### Decisions Contemplated
- Worktree removal for KnightOS-task10: leaning toward removal (branch fully merged, confirmed via merge-base) but explicitly left as Chris's call, not yet executed.

## Strategic Intelligence

### Key Insights
1. **Graphify is now a standard rollout, not a one-off.** The Phase 0a wiring into formal-dev-workflow plus the live-registry hook means every future new project gets graphed and gated automatically. This was infrastructure work that pays off on every project going forward, not just today's three.
2. **Skill gap-filling was evidence-based, not assumed.** The PySide6 gap claim is backed by an actual search across a 1917-skill repo and Qt's own official repo, so it is safe to treat as durable fact rather than something to re-verify later.
3. **Product-repo-isolation rule held under pressure.** The instinct to consolidate Scryptable and KnightOS into Knight Code's repo for easier graphing was explicitly rejected in favor of per-project MCP instances, consistent with existing architecture rather than a shortcut.

### Pattern Recognition
- **Connection to Previous Thinking:** matches the existing product-repo-isolation rule and the pre-existing knightbrain/lorebrain pattern already used for the campaign vault and Knight Code itself. This session extended a proven pattern rather than inventing a new one.
- **Recurring Pattern:** cleanup before expansion. Tearing down knightbrain_source and generalizing hardcoded text happened in the same session as adding two new graphs, keeping the system from accumulating cruft as it scales.

### Strategic Implications
- Future new projects under DevPrograms should auto-graph via Phase 0a with no manual setup, reducing the chance of another silent gap like Scryptable and KnightOS had until today.
- Scryptable Task 4 is explicitly blocked pending go-ahead. Next session's default question should be whether to proceed.

## Action Items

### Immediate (24-48 hours)
- [x] Decide whether to remove the stale KnightOS-task10 git worktree (branch already merged into master) 📅 2026-08-17

### Short-term (1-2 weeks)
- [ ] Give go-ahead (or hold) on Scryptable Task 4: Craig archive import with zip-slip path-traversal containment 📅 2026-08-23

### Strategic Considerations
- No other app projects are known to be missing a knightbrain graph right now, but worth a periodic check as new DevPrograms folders appear. Phase 0a should catch this going forward automatically.

## Connections
- **Relevant Projects:** [[04-projects/Scryptable/PROJECT-OVERVIEW|Protocol Whisper App]], [[04-projects/knightos/PROJECT-OVERVIEW|KnightOS]], [[04-projects/knight-code/PROJECT-OVERVIEW|Knight Code]]

## Domain Classification
- **Primary Domain:** project-specific (Knight Code), 90% confidence
- **Reasoning:** Knight Code is the tooling system (DevKnight, skills, graphify infra) that acted on Scryptable and KnightOS in this session. The work itself is infrastructure and tooling, not app-feature content for either downstream project.
- **Cross-Domain Elements:** Scryptable Task 3/4 status and KnightOS worktree state are relevant to those projects' own tracking too.
- **Privacy Level:** private

## Processing Notes
### Emotional Context
- **Energy Level:** high. Dense, multi-track session covering three separate infrastructure efforts plus one app feature closeout.
- **Emotional Tone:** focused, methodical. Cleanup paired with expansion, decisions explicitly deferred where appropriate (Task 4 go-ahead, worktree removal) rather than rushed.

### Confidence Assessment
- **Overall Analysis:** 90%. Content was already well-structured and specific, low interpretive ambiguity.
- **Domain Classification:** 90%. Clearly Knight-Code-system work touching two other projects.
- **Strategic Insights:** 85%. Insights are directly evidenced by the content; the "durable fact" framing on the PySide6 gap is the one claim taken slightly on faith from the session's own research.
- **Areas Requiring Clarification:** none blocking. Two open decisions already flagged as action items.

---

*Processed by COG Brain Dump Analyst*
