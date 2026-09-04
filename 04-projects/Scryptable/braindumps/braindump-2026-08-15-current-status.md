---
type: "braindump"
domain: "project-specific"
project: "scryptable"
date: "2026-08-15"
created: "2026-08-15"
themes: ["status-update", "task-breakdown", "security-review", "implementation-readiness"]
tags: ["#braindump", "#scryptable"]
status: "captured"
confidence: "high"
---

# Braindump: Scryptable, Current Status

Synthesized from the DevKnight Workshop vault's `Projects/Scryptable/` folder (00 Overview through 08 Security), which is the authoritative build record. This note replaces [[braindump-2026-08-14-1627-full-project-rundown|the prior full rundown]] as the live status pointer; that note stays as the deep architecture reference, this one tracks where the project actually stands.

## Where things stand

The whole formal-dev-workflow gate sequence has now run: CEO review, design review, engineering review, and security review are all **APPROVED** (security: APPROVED_WITH_CONCERNS, no CRITICAL findings). Task Breakdown, the planning phase, is also complete: **22 vertically-sliced tasks across 7 phases**, each with acceptance criteria, a verification method, and dependencies mapped out. Completing that phase is what flips the project's internal state to "implementation" and opens the enforcement hook that had been blocking real source code until now.

**No implementation code exists yet.** That gate opening is a mechanical consequence of finishing planning, not a decision to start building. Every phase transition on this project has needed Chris's own explicit go-ahead, and Task 1 (app shell scaffold) is no exception, it's next in line, waiting.

The repo is live but empty: local at `Documents\DevPrograms\Scryptable\` (git init, branch `master`, no commits), private GitHub at `github.com/ValleytheKnight/Scryptable`, `origin` wired. Nothing pushed.

## The 22-task shape

Seven phases, each ending in a checkpoint that gates the next:

1. **Foundation** (Tasks 1-3): app shell, episode-state core (folder-is-truth model), first-run setup.
2. **Import and core pipeline** (Tasks 4-8): Craig archive import, multi-track/single-file import, transcription, diarization, speaker identities.
3. **Assembly, review, export, Obsidian** (Tasks 9-13): transcript assembly, corrections manager, QA review screen, export, Obsidian write.
4. **AI provider and LLM handoff** (Tasks 14-16): provider settings, the embedded handoff chat, GPU acceleration upgrade paths.
5. **MCP with security hardening** (Tasks 17-19): client, server, preferences tab.
6. **Preferences and accessibility** (Tasks 20-21): the consolidated 8-tab screen, the 5 named accessibility gaps.
7. **Packaging** (Task 22): PyInstaller CPU and CUDA builds.

All 22 sit in Backlog on the project's kanban board. Nothing started, nothing blocked.

## Security review folded into the build, not bolted on

The Phase 3.5 security pass found four real issues against the planned architecture (no code existed to scan yet, so this reviewed spec against threat models). Each one is now a literal acceptance criterion on a specific task rather than a separate cleanup pass:

- **Zip-slip path traversal** in Craig archive import (HIGH): Task 4 must reject any zip entry resolving outside the extraction directory, verified by a crafted malicious test archive.
- **MCP server needs secure-by-default** (MEDIUM-HIGH): Task 18, connections-in toggle defaults OFF, binds `127.0.0.1` only, requires a locally-generated shared token, the same pattern Jupyter uses for the same threat model.
- **MCP client tool output as a prompt-injection surface** (MEDIUM): Task 17, first-party vs third-party tool calls visually distinguished, any third-party-triggered disk write, paid-API call, or outbound request needs an explicit confirm step.
- **Custom endpoint field, forward-looking guardrail** (LOW, informational): Task 14, the endpoint URL can only ever be set by direct user input or explicit confirm, never silently from an imported file or MCP suggestion.

This is the same discipline the project has used throughout: real review passes, findings turned into testable criteria, not left as prose a future implementer might skim past.

## What's still genuinely open

- **The flagged-window adjudication question**: whether telling a real multi-voice moment (a player voicing arguing NPCs) apart from a Whisper hallucination loop becomes a new narrow agent or an earlier loremaster call. Not decided; if a new agent gets built for it, it has to go through Knight Code's `create_agent` MCP tool, never hand-authored, the project's own protocol note exists specifically to repeat that rule here.
- **WhisperX GPU/CPU build detection at install or first run**: the architecture decision (two-tier CUDA/CPU distribution) is made, but the actual detection-and-selection mechanism isn't built. Real scope now, inside Task 16.
- **The old QA-layer design** (mechanical repetition scanner plus optional adjudication step plus VAD pre-trimming) is explicitly superseded by Task 11's simpler manual QA review screen for v1. Kept as a real future-feature idea, not current scope. The two Whisper failure modes it was designed around (long hallucination loops, short filler-phrase bursts) are both confirmed real and already fixed or scoped: the loop bug via `condition_on_previous_text=False`, already shipped in the underlying pipeline; the short-burst bug still open, VAD-trimming is the likely fix, not yet built.

## Why this matters going forward

The project has now run every planning gate a shippable product needs before code: scope, UX, engineering soundness, security. That's unusual thoroughness for a personal-project-turned-product, and it's paying off in concrete ways: the security findings exist as tests to write, not warnings to remember; the task list has real dependency ordering, not a flat backlog. The only thing between here and real code is Chris saying "go" on Task 1.

## Connections

- [[../PROJECT-OVERVIEW|Project Overview]] (updated alongside this note to drop the stale WinUI3/idea-stage framing)
- [[braindump-2026-08-14-1627-full-project-rundown|Prior full architecture rundown]], deep reference, still accurate on stack/design detail
- [[../improvements|Improvement Ideas]], tutorial/help-doc overlay idea, still open
- Source: DevKnight Workshop vault, `Projects/Scryptable/00 Overview.md` and its full folder tree (read-only source for this note)
