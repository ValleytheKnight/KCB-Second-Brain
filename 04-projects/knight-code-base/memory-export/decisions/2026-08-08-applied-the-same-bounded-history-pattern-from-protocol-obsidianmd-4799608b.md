---
id: "4799608b-bc68-4196-bfb5-99ef99c20827"
type: "decision"
date: "2026-08-08"
scope: "repo"
source: "agent"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Applied the same bounded-history pattern from Protocol Obsidian.md to loremaster's standing-knowledg...

## Decision

Applied the same bounded-history pattern from Protocol Obsidian.md to loremaster's standing-knowledge.md: kept NEXT SESSION PRIORITY plus exactly one current "Completed [date] (Nth pass)" entry live in the file (1391 lines cut to 47), moved every older pass entry verbatim into a new archive file (Standing Knowledge Pass History Archive.md), and changed the Goodnight Protocol so it rolls the outgoing pass entry into the top of that archive before writing the new one, rather than letting entries stack up. Also removed Wake-Up Step 5a's redundant second read of the same file already read in Step 1. Retention window (how many passes stay live before archiving) was Chris's explicit call: just the most recent pass, matching what Wake-Up's own Step 1 already said it wanted to read.

## Rationale

standing-knowledge.md had grown to 1391 lines of dense narrative (the first 193 lines alone measured 74,670 tokens, well past a single Read call's cap), via the same unbounded append-only pattern found and fixed in Protocol Obsidian.md's Session Resume section. Unlike that fix, loremaster's Wake-Up Step 1 already stated a narrower intent (read only NEXT SESSION PRIORITY plus the most recent pass entry), but a plain file read can't selectively fetch just that slice without knowing line numbers in advance, so the full file's token cost was paid on every Wake-Up regardless of stated intent, the growth still mattered even though the design was already more disciplined than Obsidian's had been. Reading standing-knowledge.md also surfaced that its own thirty-ninth pass entry (2026-08-02) had already found and flagged, but never fixed, the exact hygiene-gate collision fixed today: the comment-line detector matching a bare leading markdown asterisk, in loremaster's case the italic convention opening every pass ("*Last updated: ...*"), a distinct case from the bold-markdown collision found independently while reworking the Obsidian protocol. Both are now excluded by the same corrected regex.
