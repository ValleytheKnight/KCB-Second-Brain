---
id: "48032caa-9bc8-4c89-8ad5-025ebf9981ab"
type: "decision"
date: "2026-08-02"
scope: "repo"
source: "agent"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: A new planning document exists for KnightOS: "Project Tabs," a proposed tier above the existing chan...

## Decision

A new planning document exists for KnightOS: "Project Tabs," a proposed tier above the existing channel (terminal-tab) strip, run as a vertical rail on the left edge, with each Project holding fully independent channel state. Proposal stage only, not approved, not started, no Kanban card, does not change Milestone 1's Task 1-12 status. Full spec at Projects/KnightOS/01 Planning/Project Tabs Feature Spec.md in the DevKnight Workshop vault.

## Rationale

Chris asked for a proper design/spec document planned and strategized before any code is written, grounded in the real Task 7 session-persistence schema and architecture rather than assumed. The doc was built by reading the actual shipped code (src/shared/session.ts, src/main/session-store.ts, src/renderer/src/App.tsx, tab.ts) and the real keyboard-shortcut inventory directly, not from memory, and surfaces a real terminology collision found during that grounding: DESIGN.md's own metaphor table already uses "project" for today's single-directory tab concept ("Open project tab = tool hung on the shop rail"), which this feature would collide with if built without disambiguating first. The doc adopts "channel" (already used in decision 6ef09d20 and existing mockup captions) for today's concept and reserves "Project" for the new top-level tier, proposes a nested single-file schema v2 with a real v1-to-v2 migration path (exact-version-match loader already exists, per decision 223601d5's versioning insurance), a UI/interaction spec for the new left rail and unchanged-but-scoped top strip, edge cases (zero-Projects first launch, default naming, migration of an empty v1 file, background activity in non-active Projects), 4 new keyboard shortcuts checked directly against the full existing binding inventory for collisions, and an 8-task (A-H) vertically-sliced breakdown with dependencies and acceptance criteria matching the rigor of the existing Milestone 1 Task Breakdown. Several calls were made as recommendations rather than decisions and are listed as open questions for Chris rather than assumed: one file vs. one file per Project, left-rail drag-reorder, project-close-confirmation shape, default Project naming, whether Projects get their own color cap, the specific new shortcut keys, and whether a cross-project command palette is wanted later.

## Alternatives Considered

Splitting persistence into one file per Project (rejected as the recommendation, flagged as an open question instead): would introduce a new multi-file transactional-consistency risk that today's single atomic writeFileSync doesn't have, for no clear gain over a nested single-file structure that still gives full logical isolation. Silently reusing the word "project" for both the new tier and the existing per-directory concept (rejected): would leave DESIGN.md, the code, and this very document colliding on meaning, exactly the kind of unresolved ambiguity the project's own design-workflow discipline exists to catch before build starts. Deciding the open questions (default name, rail color cap, exact shortcut keys, close-confirmation shape) unilaterally instead of surfacing them (rejected): these are real preference/product calls belonging to Chris, not technical ones, and the project's standing practice is to present full context on genuine disagreements rather than pick silently.
