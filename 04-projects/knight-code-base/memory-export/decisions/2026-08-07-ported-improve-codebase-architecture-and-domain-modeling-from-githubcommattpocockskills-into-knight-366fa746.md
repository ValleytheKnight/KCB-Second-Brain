---
id: "366fa746-92dd-4e3f-9250-d6fa45a5966a"
type: "decision"
date: "2026-08-07"
scope: "repo"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: Ported improve-codebase-architecture and domain-modeling from github.com/mattpocock/skills into Knig...

## Decision

Ported improve-codebase-architecture and domain-modeling from github.com/mattpocock/skills into Knight Code, both explicit-only for improve-codebase-architecture (disable-model-invocation: true, matches upstream) and ambient for domain-modeling.

## Rationale

improve-codebase-architecture depends on codebase-design (already ported) and grilling (now grill-me) directly, plus domain-modeling for a CONTEXT.md glossary and ADR recording, neither of which existed in Knight Code. Chris chose to port domain-modeling alongside it rather than stub those steps out. domain-modeling's ADR half (writing docs/adr/*.md files) duplicates what decision_log/decision_search already do in this project, so per the "Knight Code First" rule that half was adapted rather than ported as-is: the skill now calls decision_log for hard-to-reverse, non-obvious, real-trade-off decisions instead of writing a second, parallel, file-based decision record. The CONTEXT.md glossary half is genuinely new capability and was ported faithfully. Also dropped both skills' agents/openai.yaml (Codex-specific agent configs), out of scope for Knight Code's single-host Claude Code adapter. Renamed "leverage" to "payoff" throughout to match the term codebase-design's own ported glossary actually uses (leverage is also banned AI-tell language here).
