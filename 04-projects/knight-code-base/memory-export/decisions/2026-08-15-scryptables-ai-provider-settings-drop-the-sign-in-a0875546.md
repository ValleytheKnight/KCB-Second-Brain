---
id: "a0875546-a207-4831-8751-e9dcf2b15d54"
type: "decision"
date: "2026-08-15"
source: "user"
confidence: 10
tags: ["knight-code", "decision"]
---
# Decision: Scryptable's AI Provider settings drop the "Sign in with Anthropic" OAuth toggle entirely. Anthropic...

## Decision

Scryptable's AI Provider settings drop the "Sign in with Anthropic" OAuth toggle entirely. Anthropic becomes API-key-only, matching OpenAI and custom endpoints. Local/custom model routing (Ollama, LM Studio, vLLM, or any other local runner) is NOT new architecture, it is already covered by the existing "custom OpenAI-compatible endpoint" provider option (decision 070855a6), since most local runners mimic the OpenAI API shape. That option gets labeled and presented in the AI Provider settings UI as the generic "run it locally" path, not left as an unlabeled afterthought. This supersedes decision 085a69e9.

## Rationale

Eng review found decision 085a69e9's OAuth design infeasible: Anthropic's own 2026 policy change bans third-party OAuth use of a Claude Pro/Max subscription's included usage, verified via WebSearch, not assumed. Chris confirmed directly (via the coordinator) that OAuth should simply be dropped rather than pursuing options B or C from the eng review doc (a sanctioned-alternative search, or routing through a local Claude Code install). Chris also asked whether MCP tooling was a substitute mechanism for local-model routing; clarified that MCP is tool/context access for whichever model is active, not model selection, so it doesn't address this. He confirmed the already-existing custom OpenAI-compatible endpoint option is the right mechanism for local/custom runners generically, not a new build. This closes eng review's open item 1 without any new architecture, only a UI-labeling clarification and one fewer auth path to build.
