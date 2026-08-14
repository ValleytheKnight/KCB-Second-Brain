---
id: "08b7e3ec-4d78-4356-9ffb-ec223165eef9"
type: "decision"
date: "2026-08-14"
source: "agent"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Resolved the three new critique findings: Preferences and About now appear as real tabs in the tab s...

## Decision

Resolved the three new critique findings: Preferences and About now appear as real tabs in the tab strip (previously opened silently with no tab strip entry); New Recording Detected toast no longer auto-dismisses, since it requires an actual decision (Set Up vs Ignore), not just a passive notice, matching Connection Lost's already-correct no-auto-dismiss behavior; First-Run Setup intentionally stays chromeless (no title bar/menu bar), a deliberate choice for a screen shown before the main app window exists, matching the standard installer/welcome-screen pattern, not an oversight.

## Rationale

Verified via a re-critique pass after the first fix round. Missing tab-strip entries broke the explicit rule Chris set earlier, the tab strip must reflect everything currently open. Auto-dismissing a decision-required toast risked the option vanishing before the user chose, an anti-pattern (silent-failure-adjacent). The chromeless first-run screen was ambiguous, not wrong, so it gets a real decision instead of staying an unstated assumption.
