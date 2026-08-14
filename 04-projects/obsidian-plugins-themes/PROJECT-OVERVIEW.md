---
type: project-overview
project: Obsidian Plugins & Themes
slug: obsidian-plugins-themes
created: 2026-08-12
status: active
tags: ["#project", "#overview"]
---

# Obsidian Plugins & Themes

> [!tip] Status: Active

```button
name Promote Project
type command
action QuickAdd: Promote Project
```

## What is this project?
Obsidian plugins and themes Chris builds, vibe-coded and nested inside the Knight Code repo. Repos are on GitHub (public and private).

## Current Status

### Shipped (live in the community directory)
| Name | Type | Version | Path | Repo |
|---|---|---|---|---|
| CSS Resource Variables | Plugin | v1.0.1 | `Knight Code\css-resource-variables` | ValleytheKnight/CSS-Resource-Variables |
| Kanban Complete Mover | Plugin | v1.0.2 | `Knight Code\obsidian-kanban-complete-mover` | ValleytheKnight/Kanban-Complete-Mover |
| TTRPG - Rathgar Gold | Theme | v1.1.2 | `Knight Code\ttrpg-rathgar-gold-theme` | ValleytheKnight/TTRPG-Rathgar-Gold-Theme |
| Canvas Text Scaler | Plugin | v0.2.0 | `Knight Code\obsidian-canvas-text-scaler` | ValleytheKnight/Canvas-Text-Scaler |
| Canvas Positioning Toolkit | Plugin | v1.0.0 | `Knight Code\obsidian-canvas-positioning-toolkit` | ValleytheKnight/Canvas-Positioning-Toolkit |

*(Paths above are relative to `C:\Users\Chris Brown\Documents\Knight Code\`)*

### Active build (not yet shipped)
- **Linked Text Styles** (v0.1.0) - `Knight Code\obsidian-linked-text-styles` - ValleytheKnight/Linked-Text-Styles. Reusable named text styles at the character level, live-referenced not frozen-copy. Scaffolded, data model and storage layer built, rendering approach risk-tested and passed. Style-insertion logic (writes the styled span into a note) not yet built.
- **Anchor Flow** (v0.1.0) - `Knight Code\obsidian-anchor-flow` - ValleytheKnight/Anchor-Flow. OneNote/Word-style image float-and-wrap. Toolbar, conversion, settings tab, and auto-convert-on-paste all built and verified live, including a rapid-multi-paste bug found and fixed. Some commits pushed, some still local awaiting go-ahead. Next step: hands-on manual v1 test walkthrough.

### Backlog / ideas (not started, no repo yet)
- **"Spellcraft"** (working title) - Homebrewery v3 port into Obsidian: D&D homebrew content rendering plus PDF/print export. Heavy research done (rendering pipeline, licensing for code and fonts, 22 scoped risk tests). No name finalized, no repo, nothing built.
- **Standalone mobile PDF exporter** - spun out of Spellcraft's PDF needs, pinned as its own separate future plugin (Obsidian's native PDF export is desktop-only). Not started.

## Project Resources
- [[braindumps/|Project Braindumps]]
- [[planning/|Planning Documents]]
- [[resources/|Resources]]

## Next Steps
- [ ] Anchor Flow: do the manual v1 test walkthrough, then decide on pushing remaining local commits
- [ ] Linked Text Styles: build the style-insertion logic
- [ ] Decide on a start timeline for Spellcraft / the mobile PDF exporter (currently backlog)

---

*This overview helps COG organize your plugin/theme-related thoughts and updates.*
