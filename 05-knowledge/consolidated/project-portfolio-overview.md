---
type: consolidated
created: 2026-08-14
tags: ["#consolidated", "#knowledge", "#projects"]
sources: ["00-inbox/braindump-2026-08-12-1106-full-project-rundown.md"]
---

# Project Portfolio Overview

A durable synthesis of how Chris's active work fits together, distilled from the 2026-08-12 full project rundown braindump. Update this note (don't just re-braindump the same ground) as the portfolio shifts.

## Shape of the portfolio

Nine-plus distinct efforts running at once, across three ecosystems:

- **Obsidian plugins/themes** (nested inside the Knight Code repo): 5 shipped, 2 in active build, 2 backlog ideas. See [[04-projects/obsidian-plugins-themes/PROJECT-OVERVIEW]].
- **Electron/native apps**: [[04-projects/knightos/PROJECT-OVERVIEW|KnightOS]] (tabbed multi-project shell, Milestone 1 in progress) and [[04-projects/Scryptable/PROJECT-OVERVIEW|Protocol Whisper App]] (idea stage, wraps an already-proven Python pipeline).
- **A narrative campaign**: [[04-projects/dnd-campaign-felled-god/PROJECT-OVERVIEW|Revenge of the Felled God]], run partly by dedicated agents.
- **An "Obsidian but better" concept**: [[04-projects/obsidian-competitor/PROJECT-OVERVIEW|Obsidian Competitor]], idea stage.
- **[[04-projects/knight-code/PROJECT-OVERVIEW|Knight Code]] itself**, the agent tooling system all of the above runs on top of.

[Source: [[00-inbox/braindump-2026-08-12-1106-full-project-rundown]] | 2026-08-12 | confidence: high]

## How Chris organizes his own thinking

- **Lifecycle stage is the primary axis**: everything gets labeled shipped / active build / idea-stage, not by ecosystem or priority. Project overviews should keep surfacing this.
- **Every project pairs "what's built" with "what's the next concrete action."** This is the pattern to preserve when writing or updating any `PROJECT-OVERVIEW.md`, always name the single next step, not just status.
- **Agent-managed workflows are load-bearing, not just tooling**: the D&D campaign runs on loremaster (writer) + loreGod (scheduled QA), and DevKnight routes native Windows/Electron work. These agents are themselves part of "how Knight Code works" and worth tracking as Knight Code improvements when their behavior changes.

[Source: [[00-inbox/braindump-2026-08-12-1106-full-project-rundown]] | 2026-08-12 | confidence: high]

## Standing decisions already made

- Spellcraft's PDF export need was deliberately scoped out into its own separate future plugin (the mobile PDF exporter) before any code existed for either, an architecture decision made ahead of implementation.
- The five shipped Obsidian plugins/themes are tracked as one combined overview with a status table rather than five separate project folders, since a single maintainable table beats fragmenting nine+ tiny projects.

## Open questions worth revisiting

- Obsidian plugins/themes: is the combined-overview-with-status-table approach still working as the shipped count grows past five?
- Protocol Whisper App and Obsidian Competitor are both still idea-stage; neither has a committed start date. Worth a periodic check on whether either is ready to move to active build.
