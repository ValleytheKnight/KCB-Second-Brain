---
id: "c60ee461-3f2f-41e5-a10f-42fb9434fd33"
type: "decision"
date: "2026-08-09"
scope: "repo"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: KnightOS accent color is a 3-token palette: ko-ember #f97316 (primary/active state), ko-teal #2dd4bf...

## Decision

KnightOS accent color is a 3-token palette: ko-ember #f97316 (primary/active state), ko-teal #2dd4bf (secondary accent), ko-amber #f5c451 (tertiary accent).

## Rationale

knightos-mockup.pen (44 screens, confirmed by Chris as the current approved KnightOS design, superseding all prior design choices) uses all three tokens live across real screens. Supersedes decision aa573d58 (single ember accent only). The vault write-up's cited hex #FF8400 for ember does not match the file's real token value and is a documentation error to fix, not a live design conflict. Alternative considered: keep single-ember-only rule and treat teal/amber as unintentional drift in the mockup file, rejected because Chris confirmed the mockup wins on any conflict and the tokens are in deliberate, repeated use.
