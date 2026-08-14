---
id: "15bf27e5-125a-4e13-a146-d44afa6b9ae8"
type: "decision"
date: "2026-08-14"
source: "user"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Scryptable's speaker-mapping screen: unresolved 'Needs review' rows are edited inline (cli...

## Decision

Scryptable's speaker-mapping screen: unresolved 'Needs review' rows are edited inline (click the name cell, get a dropdown of names-master.json entries plus 'Add new name'), and Continue is NOT blocked by unresolved rows, clicking with unresolved rows shows a confirmation dialog instead of a hard block.

## Rationale

Surfaced during the design review's mockup pass (pen.dev screen: Episode Wizard - Speaker Mapping). Inline dropdown editing keeps the fix exactly where the problem is shown, no popup/context switch. Chris chose the warning-dialog path over hard-blocking Continue, preferring flexibility to fix names later in the corrections step over a forced stop at this screen.
