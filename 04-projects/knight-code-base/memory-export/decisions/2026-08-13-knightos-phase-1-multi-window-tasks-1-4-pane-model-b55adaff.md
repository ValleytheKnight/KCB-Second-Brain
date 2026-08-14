---
id: "b55adaff-c8c1-48b9-af5d-de08a19c1a6d"
type: "decision"
date: "2026-08-13"
scope: "repo"
source: "agent"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: KnightOS Phase 1 Multi-Window Tasks 1-4 (pane model generalization, tear-off proof-of-concept, mocku...

## Decision

KnightOS Phase 1 Multi-Window Tasks 1-4 (pane model generalization, tear-off proof-of-concept, mockup visual retheme, tab-strip/dialog/palette reshape) passed a two-axis code-review (knightcode-code-review) and a simplify pass (knightcode-simplify), had every real finding fixed, and are now committed as commit `45aab13` on `master` (4 tasks in one commit, see rationale), with the full verification suite re-confirmed green afterward: typecheck clean, 199/199 Vitest, 47/47 Playwright e2e (--workers=1).

## Rationale

Standards axis found a pervasive hygiene violation, comments narrating "Task N"/"Phase 1" history rather than explaining non-obvious why, across roughly a dozen locations in 8 new/touched files, plus two real Fowler-baseline simplifications (a redundant tornOffWindowIds Set duplicating what WindowRegistry already tracked, and the same lunaris hex color literals hardcoded independently in three places). Spec axis found Tasks 1-3 fully matched their spec sections and one real Task 4 defect: the command palette's input caret had been swapped from its original chevron to a Mac Command-key glyph, wrong for a Windows-only app, an unrequested change. All of these were fixed: comments rewritten to keep genuine mechanism-explaining WHY while dropping the history framing, the caret reverted to its original glyph, WindowRegistry gained an ids() method so the duplicate Set could be deleted, and a new src/shared/theme.ts centralizes the three hex constants for the two TypeScript call sites (CSS keeps its own copy, since CSS cannot import a TS module). One Standards-axis finding was overridden rather than fixed: it flagged the command palette's plain wording as violating DESIGN.md's workshop-metaphor framing, but that wording is Chris's own already-approved Task 4 outcome (decision `6f042a0d`); DESIGN.md was updated to record the exception instead of reverting the code. Tasks 1-4 were committed together in one commit rather than as four, because the work had accumulated fully uncommitted since commit cd2bea9 (August 5) with no incremental checkpoints, and Task 3/4's changes touch the exact same CSS rules and components Task 1/2 introduced or Task 3 itself retinted, so a faithful post-hoc split risked intermediate commits that don't compile or don't visually cohere. Alternative considered: splitting the accumulated diff into four separate per-task commits by file or hunk, matching this project's established one-commit-per-task convention. Rejected because Task 3 and Task 4 both rewrite the same CSS rules and component JSX, and Task 1 and Task 2 both touch the same lines in index.ts and App.tsx, with no real historical checkpoint to split from since nothing was ever committed incrementally; a mechanical hunk split would fabricate a false history and risk a non-compiling or visually incoherent intermediate commit.
