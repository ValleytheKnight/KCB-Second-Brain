---
id: "aa7daed2-ffe0-4884-9bb1-f94b3b66bd98"
type: "learning"
date: "2026-08-07"
skill: "investigate"
learning-type: "pitfall"
key: "ambiguous-empty-classname-selector-false-match"
confidence: 7
trusted: false
source: "observed"
tags: ["knight-code", "learning", "investigate"]
---
# Learning: ambiguous-empty-classname-selector-false-match

## Insight

A DOM query filtering for "the element with no class" (e.g. imgs.find(i => !i.className)) is a real false-match risk whenever more than one element in the document can legitimately have an empty className. Confirmed directly: a test image inserted specifically to check whether an unfloated raw img tag gets a native wrapper accidentally matched a completely different, pre-existing embed image elsewhere in the same note, since both happened to have empty classNames, producing a wrong conclusion that only surfaced once a properly marker-classed control test contradicted it. Always give a test element a unique marker class before querying for it, even for a quick throwaway check, rather than relying on absence-of-class as an identifying trait.
