---
id: "82d300ba-b12f-433f-8ae5-630214d6f48b"
type: "learning"
date: "2026-07-31"
skill: "knightcode-browse"
learning-type: "pitfall"
key: "sharp-detect-libc-missing"
confidence: 9
trusted: false
source: "observed"
tags: ["knight-code", "learning", "knightcode-browse"]
---
# Learning: sharp-detect-libc-missing

## Insight

Correction to the earlier entry: do NOT run npm install (targeted or bare) inside C:\Users\Chris Brown\.claude\skills\knight-code to fix the "Cannot find package detect-libc" sharp error. There is no package.json anywhere under that skill directory (verified via recursive glob), so npm has no manifest to anchor against; a targeted install there silently pruned other node_modules packages ("removed 8 packages") and a follow-up rm -rf + bare npm install fails outright (ENOENT, no package.json). This is a bundled/prebuilt skill (dist/browse binary), not a normal npm project, real repair requires finding and rerunning whatever original packaging/install step produced its node_modules, not ad hoc npm commands from inside the deployed skill folder. Until that's found, treat the browse skill's screenshot/sharp-dependent commands as broken and get screenshots another way.
