---
id: "a9f1d941-fb50-4915-ad5d-e283258f99f2"
type: "decision"
date: "2026-08-14"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: Scryptable is scoped as a shippable product for other users, not a personal tool for Chris...

## Decision

Scryptable is scoped as a shippable product for other users, not a personal tool for Chris alone.

## Rationale

Chris's own workflow (workspace folder layout, file naming conventions, auto-detection of new Craig recordings) becomes the reference framework the app's behavior is built from, not a hardcoded assumption baked into the app. The mechanical pipeline (transcription, TASMAS merge, QA review) must run with zero AI subscription dependency. The loremaster handoff (the one LLM-driven step) becomes an optional, pluggable integration point an end user can wire up if they want it, not a required step. This changes downstream review sections: config/workspace-path handling, no hardcoded personal paths, and an installer/onboarding flow become real scope instead of out of scope.
