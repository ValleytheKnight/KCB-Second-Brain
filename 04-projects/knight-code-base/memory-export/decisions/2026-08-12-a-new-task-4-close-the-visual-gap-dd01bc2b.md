---
id: "dd01bc2b-16b1-4e5d-a560-c78d21d27b14"
type: "decision"
date: "2026-08-12"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: A new Task 4 ("close the visual gap on existing surfaces") is inserted into the KnightOS Phase 1 Mul...

## Decision

A new Task 4 ("close the visual gap on existing surfaces") is inserted into the KnightOS Phase 1 Multi-Window System Feature Spec's task breakdown, sequenced right after Task 3 (apply approved mockup visual design) and before what was Task 4 (generalize multi-window routing, now Task 5). All subsequent tasks renumbered: old 4-13 become new 5-14, spec is now a 14-task plan.

## Rationale

A real gap assessment (screenshotting the built app and comparing directly against mockup reference images, not trusting the Task 3 token swap alone) found three concrete, fixable mismatches on surfaces that already exist: the channel/tag rail is still the vertical hanging-tag/cord shape instead of the mockup's horizontal tab strip, the close-confirmation dialog is missing the mockup's small-caps eyebrow label and uses an outline rather than solid destructive button, and the command palette is missing per-row icons and shortcut hints and still carries shop-vocabulary chrome (TOOL RACK label, reach/take up/put back footer) the mockup does not use. Distinct from a much larger set of gaps that are correctly not gaps yet: the mockup's ribbon bar, left workspace-tree sidebar, right agent sidebar, and chat-styled agent terminal don't exist in this codebase and stay deferred to Phase 2/3 and Milestone 6, not pulled into Phase 1. Chris approved closing only the fixable set as its own task before Task 5 (generalized routing), so routing gets built against final rather than still-changing chrome, same rationale as Task 3's own original insertion ahead of routing.
