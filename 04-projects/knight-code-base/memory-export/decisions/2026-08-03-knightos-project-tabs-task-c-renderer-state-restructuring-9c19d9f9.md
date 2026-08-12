---
id: "9c19d9f9-b918-47ee-a6cb-cee99fb6dd6e"
type: "decision"
date: "2026-08-03"
scope: "repo"
source: "agent"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: KnightOS Project Tabs Task C (renderer state restructuring) is complete: App.tsx's flat tabs/activeT...

## Decision

KnightOS Project Tabs Task C (renderer state restructuring) is complete: App.tsx's flat tabs/activeTabId/gitStatusByTab/close-history state is now a per-Project structure (projects: ProjectState[], activeProjectId), backed by a new src/renderer/src/project.ts module of pure helpers (ProjectState, toPersistedProject, buildRestoredProject, createProjectFromTab, resolveActiveProjectId, findProject, and a per-project close-history map: recordClosedTabForProject/popMostRecentClosedTabForProject). The session IPC contract (session.load/session.save across src/shared/session.ts, src/main/session-store.ts, src/preload/api.ts) now carries every Project, not just the active one, fulfilling decision 31a4407c's deferral of "full multi-project exposure over IPC" to this task. No new UI shipped (Task D's job); with exactly one Project active, every Milestone 1 behavior is unchanged, proven by the full existing Vitest (150 to 153 tests) and Playwright e2e (26 specs) suites passing with no change to test intent. Main process's terminal/pty registry required zero changes, confirming the spec's own architectural claim.

## Rationale

A real, completed, invasive restructuring task with lasting downstream impact (Task D's left rail switcher builds directly on this shape), matching the durability bar decision 31a4407c itself set for Task B. The build surfaced two real issues caught and fixed before landing, not left for a later session: (1) a /simplify pass found the save effect depended directly on the projects array, which now also carries never-persisted fields (activeTabId, gitStatusByTab), so a tab switch or a background git-status tick was triggering a full session save and atomic disk write that never happened in the original flat-state version; fixed by keying the effect on a string of exactly the persisted shape (JSON.stringify(projects.map(toPersistedProject))) instead of the raw array reference. (2) a two-axis code review (Standards axis DONE_WITH_CONCERNS, Spec axis DONE) flagged a redundant ref-mirror pair (tabsRef/activeTabIdRef duplicating what projectsRef/activeProjectIdRef already gave directly); fixed by adding a small findProject(projects, id) helper and removing the redundant pair. Both fixes are separate commits from the initial build, matching Task B's own established commit-per-concern pattern.</parameter>

## Alternatives Considered

Keeping gitStatusByTab and activeTabId out of the save effect's dependency by restructuring them into a wholly separate state slice outside ProjectState (considered, rejected): a much larger diff for the same outcome; deriving a persisted-only comparison key achieves identical correctness by touching only the save effect itself, consistent with the simplify skill's own "don't restructure more than needed" guidance. Resolving the git-status update by always writing to the active Project (considered, rejected): git status polling continues in background, non-active Projects per spec section 5.4, so the update has to find the tab's real owning Project rather than assume the active one, the one genuine exception to "everything in this file writes to the active Project's own slice."
