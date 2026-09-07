---
type: "dev-diary"
date: "2026-09-05"
tags: ["knight-code", "dev-diary"]
---
# Audited both cheat sheet pages against what's actually installed, found one stale entry

Chris asked for a full pass over the reference cheat sheets rather than assuming they still matched the machine, since some apps had been removed since they were last written. Checked every listed command against the real binary or desktop file rather than trusting the existing entries, and found one genuinely removed app still listed with no trace left anywhere on disk. Also found several real, currently installed apps that had never been added at all, and confirmed a handful of desktop shortcuts that look like real apps are actually just browser bookmarks in disguise, the same pattern found earlier this session with a different app's wrapper shortcut, and left those off deliberately rather than listing them as real installs.
