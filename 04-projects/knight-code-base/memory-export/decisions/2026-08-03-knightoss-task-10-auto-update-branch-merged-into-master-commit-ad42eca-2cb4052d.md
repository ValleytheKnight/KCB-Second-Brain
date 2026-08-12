---
id: "2cb4052d-53b8-4823-9496-07d2fd720017"
type: "decision"
date: "2026-08-03"
scope: "repo"
source: "agent"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: KnightOS's task-10-auto-update branch merged into master (commit ad42eca), reconciling Task 10's ele...

## Decision

KnightOS's task-10-auto-update branch merged into master (commit ad42eca), reconciling Task 10's electron-updater/rollback IPC surface with Project Tabs Task C's per-Project renderer state restructuring. In the 3 files with real conflicts (src/main/index.ts, src/preload/api.ts, src/renderer/src/App.tsx), Task C's newer state model won on every shape disagreement: session.save keeps Task C's SessionFile-object signature rather than Task 10's older PersistedTab[] array signature, and App.tsx's now-superseded flat-tab imports/helpers from Task 10 (toPersistedTab, PersistedTab, GitStatusPayload, ClosedTabRecord, popMostRecentClosedTab, recordClosedTab) were dropped in favor of Task C's per-Project equivalents already in HEAD's import block. Task 10's own additions (update/rollback IPC handlers, sendUpdateStatus broadcaster, UpdateStatusPayload type) were kept and added alongside Task C's state, not replaced.

## Rationale

Task 10 was branched off master before Task C existed, so its session-handling code was necessarily built against the old flat-tab shape; that shape was already fully superseded on master by the time of the merge. Reconciling toward the newer, still-current architecture rather than the older branch's snapshot avoids reintroducing a shape session.load/session.save had already moved past, and keeps a single source of truth for the renderer's state model rather than two competing ones. Verified this was safe, not just convenient: full typecheck, 171/171 Vitest (one unrelated git-status timeout flake confirmed passing in isolation), and 31/31 Playwright e2e all green post-merge, including the terminal folder-label spec that only failed in Task 10's isolated worktree due to that worktree's own directory name.

## Alternatives Considered

Keeping Task 10's PersistedTab[]-based session.save signature and adapting Task C's call sites to it: rejected, since it would mean reverting Task C's own deliberate architecture decision (full multi-project exposure over IPC, decision 9c19d9f9) purely to avoid a small merge-time reconciliation, a worse outcome for a smaller diff.
