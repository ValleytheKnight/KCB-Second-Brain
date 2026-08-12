---
id: "4e3898f9-ae28-48d9-8755-920786896a74"
type: "decision"
date: "2026-08-02"
scope: "repo"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: KnightOS's Project Tabs feature spec's five open questions (of seven, section 6) are locked: (1) sin...

## Decision

KnightOS's Project Tabs feature spec's five open questions (of seven, section 6) are locked: (1) single session file for all projects, not one file per project; (2) left-rail drag-reorder will be built, matching the top-strip pattern from Task 9; (3) a new Project's default name is the actual folder name of its root directory, not a generic placeholder; (4) Projects get their own color cap, the same swatch mechanism as channels, applied one tier up; (5) the four proposed keyboard shortcuts (Ctrl+Tab/Ctrl+Shift+Tab, Ctrl+Shift+N, Ctrl+Shift+W) are approved as proposed. Two questions remain open: project close-confirmation shape, and cross-project command palette. Still proposal-stage overall, no build work started, no go given yet.

## Rationale

Chris answered these five directly. Single-file persistence: Task 7's existing persistence already writes atomically (temp file + rename), so multi-project safety doesn't require separate files; Chris's "operate independently" requirement is about actions/state not leaking between projects at the logic level, not about physical file boundaries, and one file avoids needing a project-file index and keeps migration/backup simple. Default naming pulling from the folder name mirrors how a channel already derives its identity from its own bound directory, and has a real knock-on effect on Task E, the New-Project control now seeds one channel bound to a picked directory rather than creating a truly empty, unnamed Project. Extends decision 48032caa (the proposal document's own existence) rather than superseding it, the document's proposal status is unchanged, still pending Chris's explicit go before Task A starts.

## Alternatives Considered

One file per Project (rejected: introduces a multi-file transactional-consistency risk Task 7's atomic write doesn't have today, for no clear gain over a nested single-file structure that still gives full logical isolation). Generic numbered default names ("Project 1", "Project 2") (rejected in favor of real folder names, more informative and consistent with how channels already name themselves).
