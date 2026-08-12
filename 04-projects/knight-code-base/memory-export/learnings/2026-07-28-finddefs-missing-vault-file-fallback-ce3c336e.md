---
id: "ce3c336e-9dfd-4248-a8bf-87925a79dd50"
type: "learning"
date: "2026-07-28"
skill: "lorebrain"
learning-type: "pitfall"
key: "finddefs-missing-vault-file-fallback"
confidence: 8
trusted: false
source: "observed"
tags: ["knight-code", "learning", "lorebrain"]
---
# Learning: finddefs-missing-vault-file-fallback

## Insight

findDefs() in query.ts only matched function/class/skill/tool node types, so lorebrain_def returned empty for vault entities (NPC/faction/location notes) whose only graph node is a file node. edgesTouching() had a separate, duplicated inline fallback that matched file nodes by name/stem/alias, so lorebrain_refs worked for these entities but lorebrain_def did not. Fix: extracted the fallback into findVaultFiles() and call it from inside findDefs() itself as a last resort, so both lookups share one path. Verified live post-fix: lorebrain_def("Thane Aldrus Ironforge") now resolves to NPC's/Baldur/Thane Aldrus Ironforge.md, and lorebrain_refs on the same symbol is unaffected (same targets, same edges) since it now reaches the identical fallback logic via findDefs instead of its own copy.
