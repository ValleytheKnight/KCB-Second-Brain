---
id: "f15d72cd-2ba0-410b-9e82-e0f7341c834b"
type: "learning"
date: "2026-08-04"
skill: "plan-design-review"
learning-type: "tool"
key: "knight-code-has-real-mockup-tools"
confidence: 9
trusted: true
source: "user-stated"
tags: ["knight-code", "learning", "plan-design-review"]
---
# Learning: knight-code-has-real-mockup-tools

## Insight

A ported skill's hardcoded "$D design binary not found" check does not mean Knight Code has no mockup capability, it means that specific binary path doesn't exist here. Knight Code has its own real, sanctioned mockup paths: the Artifact tool (with the artifact-design skill for guidance) and knightcode-impeccable (with its own polish/craft-floor references and a mechanical detect.mjs script). Before telling the user "no mockup tool is available," check whether this project has its own equivalent instead of trusting a ported skill's environment-specific fallback message. Chris corrected this directly during a plan-design-review session on KnightOS Milestone 6.
