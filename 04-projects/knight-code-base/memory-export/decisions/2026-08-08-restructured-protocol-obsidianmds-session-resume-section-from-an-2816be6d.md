---
id: "2816be6d-c4e0-4c32-9eab-ecbfd87b620c"
type: "decision"
date: "2026-08-08"
scope: "repo"
source: "agent"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Restructured Protocol Obsidian.md's Session Resume section from an unbounded, append-only chronologi...

## Decision

Restructured Protocol Obsidian.md's Session Resume section from an unbounded, append-only chronological log into a bounded rolling snapshot (one block per active build thread, replaced in place on every "deactivate obsidian"), with full session narrative routed to dev_diary_log/decision_log/learnings_log instead of accumulating in the file itself. Prior history preserved verbatim in a new archive file, Protocol Obsidian Session History Archive.md.

## Rationale

The section had grown past 1400 lines of stacked dated checkpoints with no pruning mechanism, so every "activate obsidian" orientation read got strictly more expensive than the last, forever, unlike devknight's and loremaster's own orientation protocols which read a bounded snapshot (a Continuation Point, standing-knowledge.md's top section). Much of the accumulated content already duplicated what dev_diary_log/decision_log/learnings_log exist to capture, later checkpoints were already calling those tools for exactly this kind of content. A prior pass in this same session considered caching the four large reference files (Rules.md, Lessons.md, Ideas Backlog.md, Shipped and Roadmaps.md) behind a Mnemosyne semantic-recall digest to cut activation read cost, but that was rejected on reflection: Rules.md and Lessons.md are load-bearing hygiene/API gates, and a lossy cached digest silently standing in for them on every activation would reintroduce the exact failure mode, a summary substituting for ground truth on a decision that matters, that loremaster's and devknight's own full-orientation protocols were explicitly built to prevent (real incidents: a placeholder mockup SVG shipped as KnightOS's logo, a retired "civil war" framing surviving several live campaign edits). The bounded-snapshot-plus-typed-tools fix addresses the actual growth driver (unbounded history, much of it redundant) without introducing that accuracy risk.
