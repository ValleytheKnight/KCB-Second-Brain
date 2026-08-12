---
id: "9361f372-c673-41c3-b36d-8b3031762f07"
type: "learning"
date: "2026-08-05"
skill: "context-restore"
learning-type: "operational"
key: "checkpoint-claims-need-reverification"
confidence: 9
trusted: false
source: "observed"
tags: ["knight-code", "learning", "context-restore"]
---
# Learning: checkpoint-claims-need-reverification

## Insight

Re-verify each checkpoint work item against the current tree before acting on it. A saved checkpoint records state at save time, and commits landing after it silently invalidate entries. Concrete: the checkpoint's item 4 (header wiring blocks missing from pretooluse-hygiene-gate.ts and question-log-hook.ts) was already fixed by commit ac1b6e1, which rewrote those wiring blocks in exec form and thereby added the .claude/settings.json reference the authoring gate checks for. Running the gate's four checks by hand showed all four passing on both files, so the item needed no work. Cost of checking: two greps. Cost of not checking: editing files that were already correct.
