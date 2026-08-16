---
id: "c1bdd9b5-bc35-42d6-b28a-a64a2443f8ce"
type: "decision"
date: "2026-08-15"
source: "agent"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: whisper_app_design.pen updated to match decision a0875546 (Anthropic OAuth removal). In the "AI Prov...

## Decision

whisper_app_design.pen updated to match decision a0875546 (Anthropic OAuth removal). In the "AI Provider Settings (Dialog)" frame (J3bA5): deleted the AuthMethodRow (OAuth toggle, "Sign in with Anthropic") and the OAuthNote text entirely; Anthropic now shows the same API Key field pattern as OpenAI, no auth-method choice. The provider options note now reads "None (export only), Anthropic Claude API, OpenAI API, Local or custom model (any OpenAI-compatible server you run yourself)". A new top-level frame, "AI Provider Settings (Local or Custom Model)" (id q43wpL), shows that provider selected with a real Endpoint URL field, an optional Model Name field, and a plain-language note ("Works with any locally-run or self-hosted model server that speaks the OpenAI API format, for example Ollama or LM Studio, or a custom setup of your own.") presented clearly as its own labeled state, not an unlabeled afterthought. All states screenshotted and verified rendering cleanly (initial screenshots caught two text-wrapping bugs, fixed by setting textGrowth: fixed-width on the long descriptive text nodes).

## Rationale

Direct design follow-through on decision a0875546, done in the same file and style as the rest of Scryptable's mockups per Chris's explicit request, rather than only updating prose docs. get_guidelines (Design System, Web App) loaded first per this project's standing process; the no-OSS-tool-naming UI copy rule (decision d2eb656d) was respected, Ollama/LM Studio are named only as recognizable examples of the local-runner category in a descriptive note, the same pattern the file already used before this session touched it, not as Scryptable's own wrapped dependencies.
