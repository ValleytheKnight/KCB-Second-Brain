---
id: "55902365-63bc-442b-81df-25e89a549ca2"
type: "learning"
date: "2026-08-05"
skill: "devknight"
learning-type: "pitfall"
key: "sessionstart-context-truncation-ordering"
confidence: 9
trusted: false
source: "observed"
tags: ["knight-code", "learning", "devknight"]
---
# Learning: sessionstart-context-truncation-ordering

## Insight

A SessionStart hook's additionalContext is truncated for inline delivery, so position inside the payload decides whether an instruction is read at all. The host places roughly the first two kilobytes inline and writes the remainder to a file the session may never open. Measured on this project's memory hook: the payload is 10,270 characters, and an instruction appended last began at character 9,224, well outside the window, so it was delivered and never seen. Moving it first put its final character at 612. The rule: put the shortest, most actionable instruction first and let reference material take the truncation, because reference material can be looked up later and an instruction cannot be acted on if it was never visible. Diagnose this by measuring the payload and the offset of the section in question rather than by reading the hook's code, since the code looks correct either way and only the offset reveals the problem. A related tell: this payload already carried its own internal truncation notice on one section, so something upstream was aware of size pressure while the whole payload was still over budget.
