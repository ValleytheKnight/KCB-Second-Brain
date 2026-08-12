---
id: "e606cac6-5424-4f40-9f0e-231f963ca9db"
type: "learning"
date: "2026-08-07"
skill: "investigate"
learning-type: "pattern"
key: "css-float-hit-test-vs-later-block-siblings"
confidence: 8
trusted: false
source: "observed"
tags: ["knight-code", "learning", "investigate"]
---
# Learning: css-float-hit-test-vs-later-block-siblings

## Insight

A CSS-floated element's own bounding box does not win pointer hit-testing against a later, non-floated sibling block box that geometrically overlaps it, even though the floated element remains visually on top. In CodeMirror 6 specifically, each source line renders as its own full-width .cm-line block regardless of a preceding float (confirmed in an earlier risk test), so text wrapped beside/below a floated image is hit-tested as belonging to that later .cm-line, not the image, anywhere the two overlap below the point wrapping begins. Fix: give the floated element position:relative plus a positive z-index so it establishes its own stacking context and wins hit-testing across its full visual area; verified via document.elementFromPoint at multiple points, with no change to the real wrapped text's own clickability outside the image's rect.
