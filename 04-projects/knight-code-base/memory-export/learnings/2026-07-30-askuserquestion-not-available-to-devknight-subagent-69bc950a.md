---
id: "69bc950a-e8bc-4858-ba9a-8641061c64ac"
type: "learning"
date: "2026-07-30"
skill: "devknight"
learning-type: "tool"
key: "askuserquestion-not-available-to-devknight-subagent"
confidence: 8
trusted: false
source: "observed"
tags: ["knight-code", "learning", "devknight"]
---
# Learning: askuserquestion-not-available-to-devknight-subagent

## Insight

Despite the devknight agent's own definition assuming it has AskUserQuestion access ("you have full tool access, including AskUserQuestion"), a ToolSearch for "select:AskUserQuestion" from inside a devknight subagent invocation returns no match, meaning the tool is not actually callable in that context. Root cause is architectural, not a bug to route around: devknight runs as a subagent dispatched by the primary Claude session, and the primary Claude is the one actually conversing with Chris per the activation model ("presenting its findings in Claude's own voice, no verbatim handoff"). Concretely: any open question that only Chris can answer must be surfaced as plain text in devknight's final report back to the primary agent, not asked directly via AskUserQuestion, since that tool is not present. This matches devknight's own documented subagent-fallback rule for AskUserQuestion failure ("pick the recommended option and keep moving" only applies when no human is watching; here a human is watching, just one layer up, so the right move is to stop and surface the question rather than guess on Chris's behalf).
