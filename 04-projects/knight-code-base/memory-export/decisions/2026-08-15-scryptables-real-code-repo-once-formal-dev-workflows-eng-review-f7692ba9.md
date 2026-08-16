---
id: "f7692ba9-ca07-4066-9d5e-47f7b69cc617"
type: "decision"
date: "2026-08-15"
source: "agent"
confidence: 6
tags: ["knight-code", "decision", "superseded"]
status: "superseded"
---

# Decision: Scryptable's real code repo, once formal-dev-workflow's Eng Review, Security Review, and task breakd...

## Decision

Scryptable's real code repo, once formal-dev-workflow's Eng Review, Security Review, and task breakdown phases complete, is proposed to live at Documents\DevPrograms\Scryptable\, matching the convention already established for KnightOS (decision 5bbd15bc), the only other project currently under Documents\DevPrograms\.

## Rationale

This is DevKnight's own recommendation, not yet confirmed by Chris. Proposed because Documents\DevPrograms\ is already the standing, real convention this project uses for tracked dev-project repos paired with the DevKnight Workshop vault, and Scryptable is a PySide6 desktop app of the same general shape as KnightOS (a real, shippable Windows application under DevKnight's router scope). No repo exists yet; formal-dev-workflow's own gate (protocol-whisper-app.json, phase "eng") blocks real implementation until Eng Review, the Phase 3.5 Security Review, and task breakdown are done, so this decision only fixes where the repo will go once that gate clears, not a decision to start building now. Alternative considered: leaving the location undecided until eng review, rejected, since the whole reason this project went undiscoverable this session is that no real record of its intended location existed anywhere; logging a proposed location now, even unconfirmed, gives a future session something concrete to check against rather than re-deriving it from scratch or defaulting to an inconsistent path.
