---
id: "25da3a39-b58d-41cd-8719-7e0fe9a57c8e"
type: "decision"
date: "2026-08-06"
scope: "repo"
source: "agent"
confidence: 7
tags: ["knight-code", "decision"]
---
# Decision: disable-model-invocation correctly blocks Skill-tool invocation of grill-me for both a primary sessi...

## Decision

disable-model-invocation correctly blocks Skill-tool invocation of grill-me for both a primary session and a dispatched subagent. Treating the earlier E2E report's contrary finding as a false positive, not a real host gap.

## Rationale

Three consistent live tests refused the call with identical error text: primary session twice, a genuine dispatched Explore subagent once. One contrary claim from an earlier E2E test session. Most likely explanation for the discrepancy: that session read grill-me's SKILL.md file content directly rather than actually invoking it through the Skill tool, which would look like the skill ran without ever touching the real gate. Cannot fully confirm this without that session's own tool-call log, but three consistent real tests against one unverified claim is enough to close this as working as intended.
