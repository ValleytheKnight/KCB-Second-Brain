---
type: "structure-overview"
date: "2026-08-12"
tags: ["knight-code", "structure", "agents"]
---
# Knight Code Agents and Personas

Knight Code registers 8 real custom agents through the agent-manager MCP server (the only sanctioned way to create or edit an agent in this project). Names and descriptions below come from the live skills knowledge graph; the tables that follow are copied from AGENTS.md for what each is for and how it is invoked.
## Registered agents (from the live graph)

| Agent | Description |
|---|---|
| `devknight` | Router agent for native Windows GUI toolkit development (WinUI3/WPF) and Electron desktop app development, one-stop-shop entry point for end-to-end Windows application development including UI/UX. And |
| `impeccable-asset-producer` | Produces clean reusable raster assets from approved Impeccable mock references without redesigning the direction. |
| `impeccable-documenter` | Records DESIGN.md and its sidecar from a finished Impeccable build, deriving the design system from the shipped artifact rather than from intentions. |
| `impeccable-finish-reviewer` | Reviews a finished Impeccable build against its direction contract, the approved comp, and the chosen world's quality bar, returning an ordered list of material fixes. |
| `impeccable-manual-edit-applier` | Applies leased Impeccable live manual copy-edit batches to source and returns canonical Apply results. |
| `loreGod` | Read-only story QA and editorial authority for "Revenge of the Felled God." Reviews the campaign vault against craft standards and rules mastery, flags issues, reports to loremaster, never edits anyth |
| `loremaster` | Campaign writer and worldbuilder for "Revenge of the Felled God." Fully versed in the campaign lore. Writes in the synthesized style of Tolkien, Gwynne, Abercrombie, Swan, and Ruocchio. Always asks be |
| `Obsidian` | Dedicated Obsidian plugin/theme builder for ValleytheKnight's published and in-progress Obsidian community plugins and themes. Trained on the Obsidian plugin API, CodeMirror 6, Electron internals as t |

## Custom agents, purpose and invocation

Copied directly from Knight Code's own AGENTS.md.

| Agent | What it's for | How it's invoked |
|---|---|---|
| `loremaster` | Campaign writer/worldbuilder for "Revenge of the Felled God," full lore context, writes in a synthesized Tolkien/Gwynne/Abercrombie/Swan/Ruocchio style. Always asks before assuming or adding to lore. Owns the campaign vault `revenge-of-the-felled-god`. | "wake up loremaster" / "goodnight loremaster" (session bookends), `FORGE [topic]` (build a lore piece), full Protocol Index in `loremaster/SKILL.md` |
| `Obsidian` | Dedicated builder for ValleytheKnight's published/in-progress Obsidian plugins and themes. Trained on the plugin API, CodeMirror 6, Electron internals as they bear on Obsidian, submission policy, and every hygiene/testing lesson learned the hard way. | "activate obsidian" (turns on default-routing of Obsidian-shaped requests for the rest of the session) / "deactivate obsidian" (turns it back off), per `loremaster/tasking/Protocol Obsidian.md` |
| `devknight` | Router agent for native Windows GUI toolkit development (WinUI3/WPF), one-stop-shop entry point for end-to-end Windows application development including UI/UX. Routes to Microsoft's official `win-dev-skills` plugin (`winui-dev` agent + 8 skills) for the mechanical inner loop, and to Knight Code's own `autoplan`/`review`/`ship`/`health`/`cso` for everything else. Owns a persistent shared workspace, the DevKnight Workshop Obsidian vault (`C:\Users\Chris Brown\Documents\Obsidian Vaults\DevKnight Workshop`), with its own execute/pause project protocol. | "activate devknight" / "deactivate devknight" (same on/off routing model as Obsidian). Full design: `devknight/devknight-design-spec.md`. |
| `loreGod` | Read-only story QA and editorial authority for "Revenge of the Felled God." Reviews the campaign vault against craft standards and rules mastery, flags issues, reports to loremaster, never edits anything. | Runs on a Mon/Thu schedule via `loreGod/orchestrator.ps1`; can also be invoked live for an on-demand QA check. Full spec: `loreGod/loreGod-design-spec.md`. |
| `impeccable`'s 4 sub-agents | `impeccable-finish-reviewer`, `impeccable-documenter`, `impeccable-asset-producer`, `impeccable-manual-edit-applier`. | Not a standalone user-invoked phrase, spawned internally by `impeccable`'s own commands. Definitions: `impeccable/agents/*.md`. |


## Skill-embedded personas

A persona is a role a skill's own prompt puts Claude into for one run only, not a standing agent. Copied directly from AGENTS.md.

| Skill | Persona | Framing (verbatim from the template) |
|---|---|---|
| `cso` | Chief Security Officer | "You are a Chief Security Officer who has led incident response on real breaches and testified before boards about security posture. You think like an attacker but report like a defender. You don't do security theater, you find the doors that are actually unlocked." |
| `spec` | Principal engineer (backlog gatekeeper) | "You are a principal engineer who refuses to let ambiguous work into the backlog. ... You are friendly but relentless. Ambiguity is a bug and you will find it." |
| `plan-ceo-review` | CEO (mega plan reviewer, 5 posture modes) | "You are not here to rubber-stamp this plan. You are here to make it extraordinary, catch every landmine before it explodes..." Posture shifts by Chris's selected mode: SCOPE EXPANSION ("building a cathedral"), SELECTIVE EXPANSION ("a rigorous reviewer who also has taste"), HOLD SCOPE ("a rigorous reviewer"), SCOPE REDUCTION ("a surgeon"), COMPLETENESS IS CHEAP (bias toward the full implementation over a shortcut). |
| `plan-design-review` | Senior product designer (plan reviewer) | "You are a senior product designer reviewing a PLAN, not a live site. ... You are not here to rubber-stamp this plan's UI. You are here to ensure that when this ships, Chris feels the design is intentional." |
| `plan-eng-review` | (no persona, preference-framed) | No "You are a..." line. Framed around Chris's stated engineering preferences (DRY, tested code, explicit over clever) and a cognitive-pattern list ("How Great Eng Managers Think"), not a character. |
| `design-review` | Senior product designer + frontend engineer (live-site reviewer) | "You are a senior product designer AND a frontend engineer. Review live sites with exacting visual standards, then fix what you find." |
| `devex-review` | DX engineer (dogfooding a live product) | "You are a DX engineer dogfooding a live developer product. Not reviewing a plan." |
| `autoplan` | (no persona, pipeline-framed) | No "You are a..." line. Framed as a mechanical pipeline (6 decision principles auto-answering intermediate questions across the CEO/Design/Eng review phases), not a role. |
| `health` | Staff Engineer (owns the CI dashboard) | "You are a Staff Engineer who owns the CI dashboard. You know that code quality..." |
| `context-save` | Staff Engineer (keeps session notes) | "You are a Staff Engineer who keeps meticulous session notes." |
| `context-restore` | Staff Engineer (reads a colleague's notes) | "You are a Staff Engineer reading a colleague's meticulous session notes." |
| `ship` | (no persona, workflow-framed) | "You are running the /ship workflow. This is a non-interactive, fully automated workflow." Same, process not role. |
| `document-generate` | (no persona, workflow-framed) | "You are running the /document-generate workflow. Your job: produce high-quality, structured documentation..." Same, process not role. |
| `document-release` | (no persona, workflow-framed) | "You are running the /document-release workflow. This runs after /ship..." Same, process not role. |
| `investigate` | None (methodology-framed) | No "You are a..." line exists; the skill is framed around the Iron Law instead of a role. Confirmed by direct grep, not assumed. |
| `scrape` | None | Purely mechanical (a match-or-prototype path over `browse` primitives); no framing needed. |

