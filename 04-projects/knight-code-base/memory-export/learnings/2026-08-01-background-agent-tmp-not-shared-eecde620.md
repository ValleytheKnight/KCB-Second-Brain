---
id: "eecde620-2149-419a-83d5-3ffbc61e75fc"
type: "learning"
date: "2026-08-01"
skill: "token-optimizer"
learning-type: "pitfall"
key: "background-agent-tmp-not-shared"
confidence: 8
trusted: false
source: "observed"
tags: ["knight-code", "learning", "token-optimizer"]
---
# Learning: background-agent-tmp-not-shared

## Insight

Background subagents (Agent tool, run_in_background:true, subagent_type=general-purpose) do not share a real filesystem view with the main session for coordination-folder patterns that write to /tmp or mktemp-generated paths. During a Token Optimizer run, 6 subagents each reported "file written successfully" to a shared /tmp/token-optimizer-XXXXXXXXXX coordination folder (the skill's own documented pattern), but the main session found that folder genuinely empty afterward, confirmed against the real physical Windows temp directory (C:\Users\<​user>\AppData\Local\Temp), not a path-resolution artifact. This happened with built-in general-purpose agents, unrelated to custom persona-file location (ruled out project-vs-global agent-definition migration as a cause by checking none of the failing agents used a migrated custom persona). Any skill or workflow that assumes subagents can hand off work via a shared temp file (rather than returning results directly in their final text/structured output) will silently lose that data on this setup, with agents self-reporting false success.
