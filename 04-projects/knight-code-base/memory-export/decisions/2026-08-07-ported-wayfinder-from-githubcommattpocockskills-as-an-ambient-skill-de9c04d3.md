---
id: "de9c04d3-0867-4dca-b5e3-72c24717c15c"
type: "decision"
date: "2026-08-07"
scope: "repo"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: Ported wayfinder from github.com/mattpocock/skills as an ambient skill (no disable-model-invocation)...

## Decision

Ported wayfinder from github.com/mattpocock/skills as an ambient skill (no disable-model-invocation), unlike the three prior mattpocock ports this session which all kept upstream's explicit-only default.

## Rationale

Chris explicitly asked to be able to invoke it himself and to let judgment decide when else it applies, not gate it behind an explicit trigger. Adapted three upstream dependencies that don't exist in Knight Code as named: its research ticket type now dispatches an Explore or general-purpose Agent instead of a nonexistent research subagent, its tracker setup step is replaced outright with this repo's existing gh-based GitHub Issues flow that knightcode-spec and knightcode-ship already use (no separate setup skill needed), and ticket resolutions that clear domain-modeling's hard-to-reverse/surprising/real-trade-off bar also get a decision_log entry, not just a line on the map, so a resolved decision surfaces later from decision_search regardless of which skill or session touches it next.
