---
id: "ae12c6ac-d241-4b0d-959c-e0e5959b524b"
type: "decision"
date: "2026-08-02"
scope: "repo"
source: "agent"
tags: ["knight-code", "decision"]
---
# Decision: KnightOS's Milestone 1 plan does not need resequencing after the electron-build skill's audit. Code ...

## Decision

KnightOS's Milestone 1 plan does not need resequencing after the electron-build skill's audit. Code signing stays correctly scheduled at end of project (Task 10 builds and tests fully against unsigned local builds); the only real gap was that the certificate's calendar-time acquisition cost wasn't tracked anywhere, now added to TODOS.md as its own timing item, not a task move. Task 10 (auto-update and manual rollback) gained one concrete verification step: confirm the shipped electron-updater version stays at or above 6.3.0-alpha.6 (the CVE-2024-39698 floor) at ship time, checked directly, not assumed.

## Rationale

Chris asked DevKnight to check the plan itself against the newly built electron-build skill, not just the shipped code, specifically whether code-signing sequencing or auto-update/packaging changes anything. Checked against decision 50fe731e (KnightOS's distribution isn't committed to personal-use-only, so an unsigned final build's SmartScreen warning is a real risk, not cosmetic) and the skill's own explicit rationalization warning that cert acquisition takes real calendar time separate from engineering time. Concluded the actual signing timing call Chris already made is sound; the gap was purely that nothing tracked the acquisition lead time. No other planned task was found redundant or missing against the skill's checklist.
