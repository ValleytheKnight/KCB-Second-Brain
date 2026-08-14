---
name: vault-hygiene
description: On-demand structural health check for the vault against its established conventions (project completeness, task due dates, folder placement, knowledge base staleness)
roles: [all]
---

# Vault Hygiene Skill

## Purpose

Check the vault for drift against the structural conventions established during the 2026-08-14 review, and report findings. Read-only by default: report what's found, then offer to fix it, don't silently mutate the vault unless Chris confirms (the one exception is trivial, obviously-safe fixes he's already standing-approved, see each check below).

## When to Invoke

- Chris says "check the vault," "vault hygiene," "is the vault drifting," "clean up the vault," or similar.
- After a session that created new projects, tasks, or top-level files, if it seems worth a sanity check.
- Never run automatically or on a schedule; this is on-demand only (Chris deliberately chose this over a cloud routine to avoid unscheduled output).

## Checks

Run each check, collect findings, then report as one consolidated list (don't narrate check-by-check).

### 1. Project completeness
For every folder under `04-projects/*` that has a `PROJECT-OVERVIEW.md`:
- Confirm it's linked from `00-inbox/MY-PROFILE.md`'s Active Projects section. Flag any that aren't.
- Confirm `braindumps/`, `planning/`, `resources/` subfolders exist. Auto-create missing ones with `.gitkeep` (this matches what was just done vault-wide, safe to redo without asking).

### 2. Task due dates
Search all `04-projects/*/PROJECT-OVERVIEW.md`, `01-daily/**`, and `00-inbox/**` for `#task` checkboxes. Flag any `- [ ] ... #task` line missing a `📅 YYYY-MM-DD` due date. Don't auto-add dates (guessing a due date is a judgment call); report them and ask Chris what date to use, or propose one per item.

### 3. Root-level file placement
List files directly at vault root (not in a dated/numbered top-level folder). Flag anything that looks like a dated note, braindump, or brief that should live under `01-daily/`, `00-inbox/`, or a project folder instead. Cross-check `.obsidian/daily-notes.json` still has `"folder": "01-daily"`; flag if it's reverted to root/empty.

### 4. Knowledge base staleness
Check `05-knowledge/consolidated/` for content. If nothing has been added since the last hygiene check (compare file mtimes against recent braindumps in `00-inbox/` and `04-projects/*/braindumps/`), flag that recent braindumps may be worth distilling into a consolidated note. Don't auto-write one; that's a synthesis judgment call for the lead session, not a mechanical fix.

### 5. Plugin drift
Read `.obsidian/community-plugins.json` and diff against the installed-plugins list in the `vault-structure-conventions` memory. Note additions/removals since 2026-08-14 (informational only, not a problem to fix).

### 6. knight-code-base boundary
Spot check that nothing has been hand-written into `04-projects/knight-code-base/` outside of `memory-export/`, `structure-overview/`, `README.md`, and the pre-existing standalone design notes (`Dependency Update Backlog.md`, `KBV2 Design.md`, `Mnemosyne Memory Integration.md`). New files there suggest something got tracked in the wrong place; flag for Chris to confirm whether it should move to `04-projects/knight-code/`.

## Output

One consolidated report: what's clean, what's drifted, and a proposed fix for each drifted item. For anything not auto-fixed per the rules above, ask before mutating. If nothing is drifted, say so plainly and briefly, don't pad the report.

## Related

Update `vault-structure-conventions` memory (outside this vault, in the Claude Code memory system) if this check reveals the conventions themselves need to change, not just the vault.
