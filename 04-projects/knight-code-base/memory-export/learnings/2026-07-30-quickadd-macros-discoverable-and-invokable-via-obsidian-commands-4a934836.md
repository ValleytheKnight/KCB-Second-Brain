---
id: "4a934836-bd07-4bd3-81d7-cf9c155d7958"
type: "learning"
date: "2026-07-30"
skill: "devknight"
learning-type: "tool"
key: "quickadd-macros-discoverable-and-invokable-via-obsidian-commands"
confidence: 9
trusted: false
source: "observed"
tags: ["knight-code", "learning", "devknight"]
---
# Learning: quickadd-macros-discoverable-and-invokable-via-obsidian-commands

## Insight

Any QuickAdd macro/choice in an Obsidian vault registers as its own individually invokable Obsidian command, discoverable via the Local REST API's command_list tool under the display name "QuickAdd: <macro name>", and directly runnable via command_execute using that exact commandId, no live GUI click needed to start the macro. Confirmed live against the DevKnight Workshop vault: the New Project macro shows up in command_list as commandId quickadd:choice:8125661f-c10e-4467-b031-3e21b1154093, name "QuickAdd: New Project". Do not assume a QuickAdd macro needs a human at the Obsidian GUI to trigger, that assumption was wrong and got corrected. Real limit that still holds: if the macro itself opens an interactive modal (e.g. prompting for text fields), command_execute starts the macro but cannot type into that live modal, since no tool on this MCP surface reaches into a running modal's input fields. So invocation is remote, but filling in an interactive prompt inside the triggered macro still needs a human at the live app.
