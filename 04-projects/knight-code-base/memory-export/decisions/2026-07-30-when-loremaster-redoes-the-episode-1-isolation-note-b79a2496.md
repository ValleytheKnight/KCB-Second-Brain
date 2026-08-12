---
id: "b79a2496-df5e-425a-be85-5af2bfbb1d3d"
type: "decision"
date: "2026-07-30"
scope: "repo"
source: "user"
confidence: 10
tags: ["knight-code", "decision"]
---
# Decision: When loremaster redoes the Episode 1 isolation note against the corrected (post-condition_on_previou...

## Decision

When loremaster redoes the Episode 1 isolation note against the corrected (post-condition_on_previous_text=False) transcript, it must fully delete and replace the existing isolation note at Campaign Hub\Session Recordings\Act 1 Session 1 Chapter 1 Episode 1.md in the ROTFG vault, not create a second note and not append to the existing one.

## Rationale

The existing isolation note was built from a transcript with significant hallucination loops (up to ~55 minutes of repeated phrases on some channels), so its conclusions are unreliable. Chris explicitly wants a clean redo, not a patch, so nothing from the flawed pass lingers or gets treated as still-valid baseline.
