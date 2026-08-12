---
id: "5c05ddc7-264b-4b74-be87-62130deb831f"
type: "learning"
date: "2026-08-07"
skill: "obsidian-cli"
learning-type: "operational"
key: "place-cli-driven-dom-test-content-at-document-top"
confidence: 7
trusted: false
source: "observed"
tags: ["knight-code", "learning", "obsidian-cli"]
---
# Learning: place-cli-driven-dom-test-content-at-document-top

## Insight

When inserting throwaway test content into a note via the obsidian CLI's eval command to check its rendered DOM structure, place it at line 0 (the very top), not appended to the end of a long document. Both CodeMirror's Live Preview viewport virtualization and Reading mode's lazy rendering can leave content elsewhere in a long note completely absent from the DOM for an eval query to find, and neither scrollDOM.scrollTop assignment nor Editor.scrollIntoView reliably forced a re-render within this session, since there is no active browser paint/rAF loop driving the update the way real user scrolling would. Content at the very top of the document renders immediately and avoids this whole class of false "not found" result.
