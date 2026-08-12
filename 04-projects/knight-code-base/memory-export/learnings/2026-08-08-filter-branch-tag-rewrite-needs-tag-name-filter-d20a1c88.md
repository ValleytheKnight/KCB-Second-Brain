---
id: "d20a1c88-b379-4078-80b9-e8c3f1d2806b"
type: "learning"
date: "2026-08-08"
skill: "general"
learning-type: "pitfall"
key: "filter-branch-tag-rewrite-needs-tag-name-filter"
confidence: 9
trusted: false
source: "observed"
tags: ["knight-code", "learning", "general"]
---
# Learning: filter-branch-tag-rewrite-needs-tag-name-filter

## Insight

git filter-branch --msg-filter with -- branch --tags rewrites commits reachable from a tag, but by default leaves the tag ref itself pointing at the OLD unrewritten commit, it silently creates a new tag object that still targets the old commit hash. Confirmed live during a co-author-trailer removal across 4 repos: the Knight Code main repo's v1.0.0 tag stayed pointed at the pre-rewrite commit (still carrying the old message) even though filter-branch reported the tag as "rewritten", requiring a manual remap (pairing old/new history by position via git rev-list --reverse, then git tag -a -f with preserved tagger/date). Passing --tag-name-filter cat up front avoids this entirely, confirmed on a second repo (obsidian-canvas-positioning-toolkit) where the tag correctly repointed with no manual fix needed. Always pass --tag-name-filter cat (or equivalent) whenever filter-branch needs to touch a repo with real tags, never assume --tags alone is sufficient.
