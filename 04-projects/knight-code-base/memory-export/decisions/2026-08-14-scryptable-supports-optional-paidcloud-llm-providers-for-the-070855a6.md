---
id: "070855a6-f57f-4519-b5dc-915380051189"
type: "decision"
date: "2026-08-14"
source: "user"
confidence: 7
tags: ["knight-code", "decision"]
---
# Decision: Scryptable supports optional paid/cloud LLM providers for the pluggable handoff step, via a dedicate...

## Decision

Scryptable supports optional paid/cloud LLM providers for the pluggable handoff step, via a dedicated "AI Provider" settings dialog: provider choice (None/export-only, Anthropic Claude API, OpenAI API, or a custom OpenAI-compatible endpoint covering local runners like Ollama/LM Studio too), an API key field, a model dropdown scoped to the chosen provider, and a plain-language cost disclaimer that charges go directly to the user's own account with that provider, not through Scryptable.

## Rationale

Chris asked whether paid LLM use is facilitated and what the GUI looks like. Building one client against the OpenAI-compatible request format covers OpenAI itself plus most local runners (Ollama, LM Studio, vLLM) that mimic that same API shape, so one integration path covers most of the market with the least code; a native Anthropic path is added separately since Chris's own ecosystem already centers on Claude. This keeps the earlier "runs with zero AI subscription required" decision intact, paid providers are opt-in and additive, never required for the mechanical pipeline or even for the handoff step (None/export-only stays a real option).
