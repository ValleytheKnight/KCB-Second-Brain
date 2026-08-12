---
id: "9191a69f-2ee3-4b00-b105-4be57fd0ee35"
type: "learning"
date: "2026-08-03"
skill: "loreGod"
learning-type: "pitfall"
key: "sanity-check-header-format-mismatch"
confidence: 9
trusted: false
source: "observed"
tags: ["knight-code", "learning", "loreGod"]
---
# Learning: sanity-check-header-format-mismatch

## Insight

orchestrator.ps1's Test-ReportSanity requires the literal strings "Section A"/"Section B"/"Section C"/"Section D" in loreGod's final response before it's accepted as a valid report. loreGod.md's own Report Structure section previously described headings as "(A) Story and Design" (compressed label, no literal word "Section"), while loreGod-directive.md consistently used "Section A" phrasing. This mismatch caused two consecutive scheduled runs (2026-07-30, 2026-08-03) to produce real, well-formed reports (7-10k chars, exit code 0) that still got discarded at the gate, silently skipping loremaster handoff, archiving, and email. Fixed by updating loreGod.md's Report Structure section to mandate literal "Section A"/"Section B"/etc headings, matching directive.md and the one run that happened to pass. Any future edit to loreGod's report-structure wording must keep the literal "Section X" heading text, or update Test-ReportSanity in lockstep, since the two are only informally in sync.
