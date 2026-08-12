---
id: "7fb5a6ef-1ef2-4c51-b1d7-7557a759b91a"
type: "learning"
date: "2026-07-28"
skill: "lorebrain"
learning-type: "operational"
key: "def-excludes-vault-file-nodes"
confidence: 8
trusted: false
source: "observed"
tags: ["knight-code", "learning", "lorebrain"]
---
# Learning: def-excludes-vault-file-nodes

## Insight

lorebrain_def's findDefs() (lorebrain/src/query.ts) filtered only to node types function/class/skill/tool, so it could never resolve a vault entity (an NPC, faction, or location note) by name, even though its own tool description promises that. Confirmed live: lorebrain_def("Thane Aldrus Ironforge") returned nothing against a note that lorebrain_search found instantly. Root cause: the note's own file node (type "file") was invisible to findDefs's type filter. Fixed by extracting the vault basename/alias-matching fallback that edgesTouching already had into a shared findVaultFiles() helper and using it as findDefs's own fallback when no code-symbol match exists. Verified directly against the real stored graph.json before and after: before, findDefs returned []; after, it returns the note's file node. No regression: findDefs("Aldrus Ironforge") (not the note's exact title, file basename, or a listed alias) correctly still returns [].  Correction to an earlier hypothesis from the same investigation: lorebrain_refs was NOT actually broken. It was suspected of only returning outgoing links, but that was a misreading of the results, edge direction just wasn't checked carefully enough. Direct inspection of the stored graph confirmed a real incoming "links-to" edge (Campaign Hub/Alliance Stakes.md:61, a genuine [[Thane Aldrus Ironforge|Ironforge]] wikilink) was already present in lorebrain_refs's original output. Lesson: when a graph tool's result looks wrong, check the actual edge source/target direction against the real underlying file content before concluding the tool is broken.  Separate, unresolved, and NOT fixed here: lorebrain_refs's own tool description claims it returns notes that "wikilinks to or mentions" an entity, but grepping the entire lorebrain source confirms no plain-text "mentions" resolution exists anywhere, only real [[wikilink]] edges. Several genuine plain-text mentions of Thane Aldrus Ironforge (Rathgar/Rathgar.md, Rathgar/Baldur.md, Loremaster's Act 1 Idea.md) never surfaced via lorebrain_refs because they were never real wikilinks. This is a real gap between advertised and actual behavior, but it's a design decision (implement substring-mention scanning vs. correct the description), not a mechanical bug, left open rather than silently resolved one way.
