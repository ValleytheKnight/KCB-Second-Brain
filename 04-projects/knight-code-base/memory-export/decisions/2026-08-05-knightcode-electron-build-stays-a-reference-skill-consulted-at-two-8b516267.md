---
id: "8b516267-9184-411f-8ffa-5a00909b2af7"
type: "decision"
date: "2026-08-05"
scope: "repo"
source: "agent"
tags: ["knight-code", "decision"]
---
# Decision: knightcode-electron-build stays a reference skill consulted at two named stages, Windows code-signin...

## Decision

knightcode-electron-build stays a reference skill consulted at two named stages, Windows code-signing and any future cross-platform target. It does not become the primary Electron route and changes nothing about the electron-vite plus electron-builder toolchain settled in decision 0c6d4004. Reasoning: it is a document with example config and no scripts, so unlike the winui-dev agent it cannot own a build loop, and the gap is the missing agent rather than the guidance. Its value on KnightOS is already banked, it was run there on 2026-08-02 against both code and plan, found one real gap (a missing VS Code main-process debug config, since added), moved no task, and its flagship packaging-allowlist warning was investigated and closed as a false positive against the real packed archive. KnightOS is ahead of it on every stage still live, update hosting, manual rollback, session-schema versioning, native-module ABI, and the sandboxed-preload module-format constraint, none of which it covers. It is relevant to one of four remaining known work items. Rejected alternatives: making it primary like winui-dev, on structural mismatch; leaving the agent definition's claim that no Electron skill exists, since that was true when written and is now false, the same drift class as a stale skill name pointing the other way; and rerouting KnightOS mid-milestone, which was a category error because there is nothing to migrate.
