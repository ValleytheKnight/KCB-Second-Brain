---
id: "70afd8c5-ab2c-4c41-afac-b27dc70bebc4"
type: "decision"
date: "2026-08-16"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Scryptable's Task 1 (app shell scaffold) is complete: a frameless PySide6 shell (custom title bar, m...

## Decision

Scryptable's Task 1 (app shell scaffold) is complete: a frameless PySide6 shell (custom title bar, menu bar, toolbar, nav rail, sidebar panel, tab strip, zero-recordings empty state), all interactive, verified by a 6-test pytest-qt suite plus a real launch/interaction smoke test. Committed locally at a421cab (not pushed, per the standing push-gate). Menu/copy text uses "Recording" (decision 0bd4977e) via a shared terminology.py module rather than the design review doc's original "Episode" wording.

## Rationale

Chris approved starting Task 1 via the coordinator. Built directly against the approved vault design record (02 Design/README.md, the Design Review doc's Window chrome/Navigation architecture/Terminology sections), never opening whisper_app_design.pen directly per the standing mockup-sourcing rule. One real open gap carried forward: the design record only ever specified the background as "warm cream" descriptively, no exact hex was ever decision-logged, so theme.py ships a placeholder light/dark neutral palette pending a real, decision-logged value (PRIMARY #FF8400, the two font families, and the 16px corner radius are locked and used as recorded). A stray dead-code artifact from drafting (a no-op ternary in main_window.py's nav-rail signal connection) was caught and fixed before commit.
