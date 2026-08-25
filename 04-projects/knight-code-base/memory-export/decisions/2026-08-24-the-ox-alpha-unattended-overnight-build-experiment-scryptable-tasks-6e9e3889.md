---
id: "6e9e3889-85c3-490c-886f-1271bf629991"
type: "decision"
date: "2026-08-24"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: The ox-alpha unattended overnight build experiment (Scryptable Tasks 8-22 via OpenRouter's stealth/o...

## Decision

The ox-alpha unattended overnight build experiment (Scryptable Tasks 8-22 via OpenRouter's stealth/ox-alpha model) is a total failure. Not pursuing further tuning of this orchestrator/retry approach.

## Rationale

Task 8, the first real task attempted, exhausted all 5 fix-loop attempts and ended UNRESOLVED. Its final attempt broke a shared tests/conftest.py fixture used by unrelated, previously-passing test files, on top of its own tests still failing. Combined with earlier session findings (ox-alpha rewriting pyproject.toml well beyond the reported bug's scope on an earlier attempt), the pattern is unattended ox-alpha making broad, poorly-scoped changes under retry pressure rather than narrow correct fixes. Further orchestrator hardening (scoped-write guards, stricter prompts) was raised as a possible next step but not pursued once Chris called it a total failure.
