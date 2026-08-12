---
type: "braindump"
domain: "mixed"
date: "2026-08-12"
created: "2026-08-12 11:06"
themes: ["obsidian-plugins", "knightos", "dnd-campaign", "protocol-whisper-app", "project-tracking"]
tags: ["#braindump", "#raw-thoughts", "#mixed"]
status: "captured"
energy_level: "medium"
emotional_tone: "neutral"
confidence: "high"
---

# Braindump: Full Project Rundown Across Everything

## Raw Thoughts

Braindump: full project rundown across everything I'm working on.

### Obsidian plugins/themes, shipped, live in the community directory
- CSS Resource Variables (plugin, v1.0.1) - C:\Users\Chris Brown\Documents\Knight Code\css-resource-variables - github.com/ValleytheKnight/CSS-Resource-Variables
- Kanban Complete Mover (plugin, v1.0.2) - C:\Users\Chris Brown\Documents\Knight Code\obsidian-kanban-complete-mover - github.com/ValleytheKnight/Kanban-Complete-Mover
- TTRPG - Rathgar Gold (theme, v1.1.2) - C:\Users\Chris Brown\Documents\Knight Code\ttrpg-rathgar-gold-theme - github.com/ValleytheKnight/TTRPG-Rathgar-Gold-Theme
- Canvas Text Scaler (plugin, v0.2.0) - C:\Users\Chris Brown\Documents\Knight Code\obsidian-canvas-text-scaler - github.com/ValleytheKnight/Canvas-Text-Scaler
- Canvas Positioning Toolkit (plugin, v1.0.0) - C:\Users\Chris Brown\Documents\Knight Code\obsidian-canvas-positioning-toolkit - github.com/ValleytheKnight/Canvas-Positioning-Toolkit

### Obsidian plugins, active build, not yet shipped
- Linked Text Styles (v0.1.0) - C:\Users\Chris Brown\Documents\Knight Code\obsidian-linked-text-styles - github.com/ValleytheKnight/Linked-Text-Styles - reusable named text styles at the character level, live-referenced not frozen-copy. Scaffolded, data model and storage layer built, rendering approach risk-tested and passed. Style-insertion logic (the part that actually writes the styled span into a note) not yet built.
- Anchor Flow (v0.1.0) - C:\Users\Chris Brown\Documents\Knight Code\obsidian-anchor-flow - github.com/ValleytheKnight/Anchor-Flow - OneNote/Word-style image float-and-wrap. Toolbar, conversion, settings tab, and auto-convert-on-paste all built and verified live, including a rapid-multi-paste bug found and fixed. Some commits pushed, some still local awaiting my go-ahead. Next real step: my own hands-on manual test walkthrough before calling v1 done.

### Ideas, not started, no repo yet
- "Spellcraft" (working title) - Homebrewery v3 port into Obsidian: D&D homebrew content rendering plus PDF/print export. Heavy research done (rendering pipeline, licensing for code and fonts, 22 scoped risk tests), no name finalized, no repo, nothing built.
- Standalone mobile PDF exporter - spun out of Spellcraft's PDF needs, pinned as its own separate future plugin (Obsidian's native PDF export is desktop-only), not started.

### KnightOS
Path: C:\Users\Chris Brown\Documents\DevPrograms\KnightOS
GitHub: github.com/ValleytheKnight/KnightOS
A tabbed multi-project shell (Electron): one tab per project directory, full terminal, git status, session persistence. Milestone 1 (tab strip, terminal, git status, command palette, tab-close confirmation) in progress, currently on Task 9 (drag-to-reorder tabs, reopen-closed-tab shortcut, per-tab color coding). Milestone 6 (agent interaction convergence, hook-based session monitoring) is fully designed and reviewed but not started building.

### D&D campaign: "Revenge of the Felled God"
Vault path: C:\Users\Chris Brown\Documents\Obsidian Vaults\Revenge of the Felled God
GitHub mirror: github.com/ValleytheKnight/felled-god-mirror
Managed by two dedicated agents: loremaster (writer, runs live in conversation, never spawned) and loreGod (scheduled QA, Mon/Thu). Most recent automated QA run (2026-08-10) failed its sanity check; a loremaster pass to address it hasn't run yet.

### Protocol Whisper App, idea, real project scaffold, no code yet
Location: DevKnight Workshop vault, Projects/Protocol Whisper App/ (00 Overview, 01 Planning, 03 Diagrams, 04 Execution, 06 Lessons Learned notes already exist)
Owned by DevKnight (the router agent for native Windows GUI/Electron work).
No GitHub repo, nothing built yet.
A native WinUI3 shell wrapping the existing, working Protocol Whisper pipeline (Craig Discord recording -> Whisper transcription -> TASMAS stem-merging -> loremaster handoff), replacing today's manual, one-command-at-a-time Claude Code chat session with real dialog boxes for every human decision point, plus a scripted QA layer the manual pipeline doesn't have. The underlying Python pipeline it would wrap is real and already proven across two live episode runs; the app itself has no code written. Full idea write-up done (2026-07-30), migrated into DevKnight's real project structure same day. Next step, not yet done: a real scoping pass with me, ideally plan-ceo-review, before any WinUI3 code gets written.

### New interest sources to add (not all-inclusive, broad search also welcome)

LLMs / AI industry, general: Anthropic News, OpenAI Blog, Simon Willison's blog, Latent Space (newsletter + podcast), The Batch (DeepLearning.AI), Hacker News.

Agentic workflows / agentic operating systems: Simon Willison's blog, r/AI_Agents, LangChain's blog.

MCP: modelcontextprotocol.io, github.com/modelcontextprotocol, Simon Willison's blog.

PKM: r/ObsidianMD, r/PKMS, Nick Milo / Linking Your Thinking, Forte Labs newsletter.

Obsidian ecosystem: obsidian.md/blog, forum.obsidian.md, r/ObsidianMD.

AI skills/tools + GitHub repos: github.com/trending, Hugging Face blog, r/LocalLLaMA.

## Content Analysis

### Main Themes
1. **Portfolio breadth:** Chris is running five shipped Obsidian plugins/themes, two in active build, two unstarted ideas, one Electron app (KnightOS), one D&D campaign run partly by agents, and one native Windows app concept (Protocol Whisper App), all at once.
2. **"Shipped vs. in-progress vs. idea" is the organizing axis:** every project in this dump was explicitly labeled by lifecycle stage, this is how Chris naturally thinks about status.
3. **Agent-managed workflows are already load-bearing:** the D&D campaign runs on two dedicated agents (loremaster, loreGod) with a scheduled QA cadence, and DevKnight routes native Windows/Electron work, this isn't just "vibe coding," it's agent-orchestrated project management.
4. **A concrete blocker exists right now:** the 2026-08-10 loreGod QA run failed its sanity check and hasn't been addressed.
5. **Interest sources map cleanly onto the five interest topics already in MY-INTERESTS.md** (LLMs, agentic workflows, MCP, PKM, Obsidian, AI tools/GitHub), Chris did the categorization work himself.

### Supporting Ideas
- Anchor Flow has an unpushed-commits question: some commits are local, awaiting explicit go-ahead before pushing.
- Spellcraft's PDF export need has already been scoped out into its own separate future plugin (mobile exporter), a real architectural decision made in advance of any code.
- Protocol Whisper App explicitly wants a `plan-ceo-review` pass before any code starts, this is a self-identified next step, not just a status note.

### Questions Raised
- Should the loreGod QA failure from 2026-08-10 be addressed now, or is it queued behind other priorities?
- Are the unpushed Anchor Flow commits ready to push, or is there a reason they're being held back?
- Does Spellcraft (or the mobile PDF exporter) have a target start date, or is it staying in the idea backlog indefinitely?

### Decisions Contemplated
- Anchor Flow: push remaining local commits vs. hold until after the manual v1 test walkthrough.
- Protocol Whisper App: when to schedule the `plan-ceo-review` scoping pass before WinUI3 code starts.

## Strategic Intelligence

### Key Insights
1. **Chris is managing a real multi-project portfolio, not a single side project.** Nine+ distinct efforts across three ecosystems (Obsidian plugins/themes, Electron/native apps, a narrative campaign) all have live status. This vault's project-tracking structure (per-project overview + braindumps) is well-suited to this, but only if all nine get set up, not just the three created at onboarding.
2. **The agent-managed pieces (loremaster/loreGod for the campaign, DevKnight for native app work) are themselves worth tracking as part of "how Knight Code works,"** not just the projects they manage, this is exactly the kind of Knight Code improvement idea MY-PROFILE.md flagged wanting to capture.
3. **Two projects have a clear, single, named "next step"** (Anchor Flow's manual v1 test walkthrough; Protocol Whisper App's plan-ceo-review scoping pass), these are the two most useful todo-list items to surface immediately.

### Pattern Recognition
- **Connection to Previous Thinking:** MY-PROFILE.md and the onboarding interview only captured three of these projects (Knight Code, Obsidian Plugins & Themes as a single bucket, Electron App as one bucket). This braindump reveals the real shape: Obsidian work is five shipped + two in-build + two idea-stage items, and "Electron App" is actually KnightOS specifically, with Protocol Whisper App as a second, separate native app project.
- **Recurring Pattern:** Chris consistently pairs "what's built" with "what's the next concrete action," across nearly every project in this dump. That's a strong signal for how project overviews should be structured going forward.

### Strategic Implications
- The existing `04-projects/obsidian-plugins-themes/` and `04-projects/electron-app/` overviews are now out of date relative to reality and should be split/expanded to reflect the actual project list.
- The D&D campaign and Protocol Whisper App were not tracked as projects at all before this braindump; they should get their own project overviews.
- MY-INTERESTS.md's "Preferred News Sources" section is empty and should be filled in with the sources listed above.

## Action Items

### Immediate (24-48 hours)
- [ ] Decide whether to run a loremaster pass to fix the 2026-08-10 loreGod QA sanity-check failure 📅 2026-08-13
- [ ] Update MY-INTERESTS.md with the new preferred sources list 📅 2026-08-13

### Short-term (1-2 weeks)
- [ ] Do the manual v1 test walkthrough for Anchor Flow and decide on pushing remaining local commits 📅 2026-08-19
- [ ] Schedule a plan-ceo-review scoping pass for Protocol Whisper App before writing any WinUI3 code 📅 2026-08-19
- [ ] Build out individual project overviews for each shipped/in-progress/idea-stage Obsidian project, KnightOS, the D&D campaign, and Protocol Whisper App 📅 2026-08-19

### Strategic Considerations
- Worth deciding whether the five shipped plugins/themes get one combined "Obsidian Plugins & Themes" overview with a status table, or five individual overviews, given how many there are, a single overview with a status table is probably more maintainable than nine separate files.
- The two unstarted ideas (Spellcraft, mobile PDF exporter) could live as a "backlog" section inside that same combined overview rather than as standalone project folders, since neither has a repo yet.

## Connections
- **Relevant Projects:** [[04-projects/knight-code/PROJECT-OVERVIEW|Knight Code]], [[04-projects/obsidian-plugins-themes/PROJECT-OVERVIEW|Obsidian Plugins & Themes]], [[04-projects/electron-app/PROJECT-OVERVIEW|Electron App]]
- **Knowledge Base:** [[MY-PROFILE]], [[MY-INTERESTS]]

## Domain Classification
- **Primary Domain:** mixed (95%)
- **Reasoning:** Content spans multiple distinct projects across Obsidian plugin development, a separate Electron app, a D&D campaign, and a native Windows app idea, plus a separate ask (new interest sources) unrelated to any single project.
- **Cross-Domain Elements:** Project status tracking touches all of Chris's active work; the interest-sources list is a standalone profile update riding along in the same message.
- **Privacy Level:** private

## Processing Notes

### Emotional Context
- **Energy Level:** medium, dense, matter-of-fact status reporting across many projects, no strong excitement or frustration markers beyond the flagged QA failure.
- **Emotional Tone:** neutral, this reads as a deliberate status-capture exercise, not an emotional processing session.
- **Implications:** Good candidate for immediate structural follow-up (project overview updates) rather than reflective follow-up.

### Confidence Assessment
- **Overall Analysis:** 90% - content was already highly structured by Chris (labeled by lifecycle stage), leaving little ambiguity.
- **Domain Classification:** 95% - clearly spans multiple named projects, mixed is unambiguous.
- **Strategic Insights:** 85% - inferences about next steps and project-overview restructuring are well-grounded but represent recommendations, not settled decisions.
- **Areas Requiring Clarification:** Whether to structure Obsidian plugins/themes as one combined overview or split further; timing on the loreGod QA fix and the Protocol Whisper App scoping pass.

---

*Processed by COG Brain Dump Analyst*
