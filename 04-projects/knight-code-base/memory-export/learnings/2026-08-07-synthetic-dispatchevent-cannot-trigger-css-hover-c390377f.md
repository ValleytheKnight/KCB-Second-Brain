---
id: "c390377f-b602-4973-a304-47da981f612a"
type: "learning"
date: "2026-08-07"
skill: "investigate"
learning-type: "pitfall"
key: "synthetic-dispatchevent-cannot-trigger-css-hover"
confidence: 9
trusted: false
source: "observed"
tags: ["knight-code", "learning", "investigate"]
---
# Learning: synthetic-dispatchevent-cannot-trigger-css-hover

## Insight

A synthetic MouseEvent dispatched via element.dispatchEvent(), no matter how complete the mousedown/mouseup/click sequence, cannot trigger CSS :hover pseudo-class matching, since :hover reflects real OS cursor position tracked by the rendering engine, not any dispatchable DOM event. An automated click-simulation test that reports success can be structurally incapable of exercising a :hover-gated code path, producing a false-positive pass a real user click then contradicts. Confirmed on Obsidian's own native embed toolbar (Anchor Flow risk test), where a hover-driven CSS rule coexisted with a click-driven one and only the click-driven half was ever suppressible or testable via dispatchEvent.
