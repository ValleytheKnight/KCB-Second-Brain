---
id: "0c60ec72-4670-42d1-82c6-f44e762bd86f"
type: "learning"
date: "2026-08-04"
skill: "devknight"
learning-type: "pitfall"
key: "kanban-cards-appended-after-settings-block-are-invisible-and-get-deleted"
confidence: 9
trusted: false
source: "observed"
tags: ["knight-code", "learning", "devknight"]
---
# Learning: kanban-cards-appended-after-settings-block-are-invisible-and-get-deleted

## Insight

When updating an Obsidian Kanban board by plain file write (Avenue 2, MCP down or otherwise), cards MUST be inserted inside the target lane's existing list, above the trailing `%% kanban:settings` block. A card appended to the end of the file, below that block, is invisible on the rendered board AND is silently deleted the next time anyone interacts with the board in Obsidian's UI. Verified against the plugin's own parser in `.obsidian/plugins/obsidian-kanban/main.js`, not assumed: the board builder (`B_`) walks forward from each `##` lane heading looking for the first `list` node, and its scan predicate returns false on both a following heading and any paragraph starting with `%% kanban:settings`, so the lane binds to the first list only and anything past the settings block never enters the parsed model. Because the serializer (`vk`) rebuilds the file from that parsed model and re-appends the settings block at the end, any UI-side board edit (dragging a card, checking a checkbox, adding a card) rewrites the file without the stranded text, so this is real data loss, not only a display bug. Found live in KnightOS: Milestone 1 Kanban stranded Tasks 7, 8, 9, 10 plus both ad hoc cards below its settings block (which sits mid-file at line 36 with Done-lane content continuing to line 53), and Project Tabs Kanban stranded Tasks C, D, E the same way, so both boards rendered as though work stopped at Task 6 / Task B respectively. This is a new mechanism of the exact recurring staleness decision `4dfdf041` diagnosed: that repair session genuinely wrote the Task 7-9 cards into the file, but appended them past the settings block, so the fix looked complete in the file and never reached the board. Verify a board repair by checking the settings block is the last content in the file, not merely that the card text exists somewhere in it.
