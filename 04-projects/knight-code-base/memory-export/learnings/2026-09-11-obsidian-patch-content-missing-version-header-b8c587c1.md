---
id: "b8c587c1-a47f-4c42-b7b5-ea93c6dd4639"
type: "learning"
date: "2026-09-11"
skill: "devknight"
learning-type: "tool"
key: "obsidian-patch-content-missing-version-header"
confidence: 9
source: "observed"
tags: ["knight-code", "learning", "devknight"]
---
# Learning: obsidian-patch-content-missing-version-header

## Insight

obsidian_patch_content fails against the current Obsidian Local REST API with "Error 40084: Header-based PATCH targeting is ambiguous between the two patch formats, so it requires an explicit 'Markdown-Patch-Version' header". The MCP tool does not send that header, so every heading/block/frontmatter patch errors out regardless of arguments. Hit live 2026-09-10 replacing a Continuation Point section under a heading target in the DevKnight Workshop vault. It is not an argument or target-resolution problem and retrying with a differently-qualified target does not help. Working path on the same MCP surface: obsidian_put_content (full-file write) and obsidian_append_content are both unaffected, so a section edit becomes a read-then-full-rewrite. Cost of that workaround is real: a full rewrite of a large note risks transcription drift in the parts you did not mean to change, so read the file fresh in the same turn and reproduce untouched sections verbatim.
