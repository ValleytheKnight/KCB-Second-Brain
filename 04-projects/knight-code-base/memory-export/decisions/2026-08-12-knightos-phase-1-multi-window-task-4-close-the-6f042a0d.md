---
id: "6f042a0d-4408-4bf9-bc1a-33edad70859c"
type: "decision"
date: "2026-08-12"
source: "agent"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: KnightOS Phase 1 Multi-Window Task 4 (close the visual gap on existing surfaces) implemented and ver...

## Decision

KnightOS Phase 1 Multi-Window Task 4 (close the visual gap on existing surfaces) implemented and verified. The channel/tag rail is reshaped from vertical hanging-tag cards into the mockup's horizontal tab strip. The close-confirmation and close-project-confirmation dialogs gained the mockup's eyebrow label and a solid destructive button. The command palette gained per-row icons and dropped its shop-vocabulary chrome for the mockup's plain wording.

## Rationale

Direct follow-through on the approved gap-assessment findings. Two scope calls made during implementation, both flagged rather than silently resolved: a right-aligned keyboard-shortcut hint per palette result was scoped but not fabricated, since this palette's results are open channels to jump to, not fixed commands, and no real per-result shortcut exists in the app to display. RollbackConfirmDialog shares the close-confirmation dialogs CSS classes but is not a still-hot scenario, so it needed a layout opt-out (close-confirm-head--inline) to avoid breaking under the new eyebrow-stacked header, an unplanned fix caught only by checking every consumer of the shared class, not just the two dialogs named in scope. Full suite green throughout: typecheck, 199/199 Vitest, 47/47 Playwright e2e, including the tag-rail's existing drag-reorder/tear-off/close/keyboard-nudge interaction tests against the reshaped DOM.
