---
id: "3e07267b-f567-41b5-bf26-329a2a5ad43d"
type: "decision"
date: "2026-08-06"
scope: "repo"
source: "agent"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: This infrastructure verification pass confirmed the skills-graph freshness check's deletion blind sp...

## Decision

This infrastructure verification pass confirmed the skills-graph freshness check's deletion blind spot is real and fixed it live, rather than just noting it as a finding, since it's the kind of gap that wouldn't have surfaced any other way, and it's exactly the failure class this whole audit exists to catch: a check that reports clean without having actually looked. The fix adds an input-file-count stamp alongside the existing newest-mtime comparison so a pure deletion can't hide behind an unmoved timestamp anymore.

## Rationale

The bug wasn't in how the graph was built, it was in how staleness got decided. The freshness check's whole design rests on one comparison: is anything newer than the graph's own build time. That's a fine test for an addition or an edit, since a changed file's mtime moves forward and trips it every time. It's a bad test for a deletion, because removing a file doesn't produce a timestamp at all, it just removes one from the pool the check is scanning. The newest mtime among whatever's left can only stay the same or go backward, never forward, so there's no signal a pure removal could ever generate under that comparison. It isn't a rare edge case either; it's the deletion path's only behavior, every time, with nothing probabilistic about it.  What made it worth fixing on the spot rather than writing it up as a "known gap" is that it wasn't hypothetical. I hit it by doing exactly what this audit's item 2 asked for: install a throwaway skill, confirm it resolves, prune it, confirm it's gone. It wasn't gone. The graph still resolved a SKILL.md file that didn't exist on disk anymore, and a fresh subagent's own ambient skill list said the same thing, which turned out to be a separate mechanism entirely (the CLI host's own listing, not anything this repo's code produces), coinciding rather than sharing a root cause. That distinction mattered enough to chase down properly instead of assuming the two symptoms were one bug wearing two faces.  The fix itself is small on purpose. Rather than hashing the full set of discovered file paths (which would also catch a same-count swap, one file gone and a different one added in the same window), I added a plain integer count, incremented inside the walk that already computes the newest mtime, so it costs nothing extra to gather. It won't catch that swap case, but that case was already covered by the mtime check on its own, since the addition half of it produces a timestamp the comparison already watches. A count catches exactly the shape of bug that was actually found, without changing the check's own stated cost profile ("cheap by construction," per its own doc comment), and old stored graphs simply don't carry the new field, so they mismatch automatically on the very next check and rebuild once, the same self-healing pattern the existing inputShape stamp already uses for its own blind spot.  I didn't take the fix on faith, either. Both regression tests were run against the reverted, pre-fix code first and confirmed they genuinely fail there, not just assumed to, then run again against the restored fix and confirmed they pass. That's the same discipline this whole session is applying to Knight Code's other checks, so it would've been strange not to hold my own fix to it.

## Alternatives Considered

Leaving it as a documented gap rather than fixing it now was the other option, since this session's brief was verification, not necessarily repair. But the task's own instructions were explicit that a real bug found during the pass should be fixed and proven, not just written down, and a stale skills graph is exactly the kind of silent-wrong-answer failure the whole audit is trying to root out elsewhere in the project, so leaving this one in place while reporting on others would've been inconsistent.
