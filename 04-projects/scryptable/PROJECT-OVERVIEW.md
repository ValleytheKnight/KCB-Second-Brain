---
type: project-overview
project: Scryptable
slug: scryptable
created: 2026-08-12
status: active
tags: ["#project", "#overview"]
---

# Scrow yptable

> [!tip] Status: Active

```button
name Promote Project
type command
action QuickAdd: Promote Project
```

## What is this project?
A PySide6 (Qt for Python) desktop app for Windows, shippable to real outside users, wrapping the existing, working Protocol Whisper pipeline (Craig Discord recording -> Whisper transcription -> TASMAS stem-merging -> loremaster handoff). Replaces today's manual, one-command-at-a-time Claude Code chat session with real dialog boxes for every human decision point, plus a QA review screen the manual pipeline doesn't have. AI (the loremaster handoff) is opt-in and pluggable; every mechanical step runs fully locally with zero AI subscription required.

The underlying Python pipeline is real and proven across two live episode runs. Implementation is underway: Task 3 (First-Run Setup wizard) is complete, verified, and pushed.

- Location: DevKnight Workshop vault, `Projects/Scryptable/` (renamed from `Projects/Protocol Whisper App/`), full 00-08 folder structure populated.
- Repo: local at `Documents\DevPrograms\Scryptable\` (git init, branch `master`, no commits yet); private GitHub at `github.com/ValleytheKnight/Scryptable`, `origin` wired, nothing pushed.

## Current Status
CEO review, design review, engineering review, and security review are all APPROVED. Task Breakdown is complete: 22 vertically-sliced tasks across 7 phases, with the four Phase 3.5 security findings folded in as real acceptance criteria. Project state is "implementation," build gate is open. Task 3 (First-Run Setup: two-question chromeless wizard for workspace folder and a customizable "unit of work" term, shown once) is complete, verified against real commits, cleaned up in a review/simplify pass, and pushed to master. Task 4 (Craig archive import, with zip-slip path-traversal containment per the security review) is next but not started, waiting on Chris's explicit go-ahead per standing project rule. See [[braindumps/braindump-2026-08-16-1418-task3-closeout|Task 3 closeout braindump]] for the full picture.

## Project Resources
- [[braindumps/|Project Braindumps]]
- [[improvements|Improvement Ideas]]

## Next Steps
- [x] Get Chris's go-ahead to start Task 4: Craig archive import (zip-slip containment) #task

---

*This overview helps COG organize your Protocol Whisper App-related thoughts and updates.*
