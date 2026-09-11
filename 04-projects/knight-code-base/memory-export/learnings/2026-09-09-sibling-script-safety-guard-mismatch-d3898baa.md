---
id: "d3898baa-5712-4c9d-aaec-628b909b16b4"
type: "learning"
date: "2026-09-09"
skill: "cso"
learning-type: "pattern"
key: "sibling-script-safety-guard-mismatch"
confidence: 8
tags: ["knight-code", "learning", "cso"]
---
# Learning: sibling-script-safety-guard-mismatch

## Insight

When a plan says "reuse existing script X's approach" for a security-relevant operation (here: theme-folder-write logic), verify the exact script named, don't assume it carries the same safety checks as a sibling script in the same system. Confirmed on omarchy-image-theme: the CEO plan names ~/.local/bin/omarchy-theme-from-image as reused write logic, whose name normalization (lowercase + spaces-to-dashes only) has no path-traversal guard, while a different, sibling script in the same real system (/usr/share/omarchy/bin/omarchy-theme-set, used on apply, not create) does reject a leading "." or an embedded "/". An eng review that validates the read-side path (picked image/folder) can still miss the write-side path (a name-derived directory) if it never independently re-checks the specific reused script's own logic against its sibling. Always diff the exact reused script's real behavior, not the family it belongs to.
