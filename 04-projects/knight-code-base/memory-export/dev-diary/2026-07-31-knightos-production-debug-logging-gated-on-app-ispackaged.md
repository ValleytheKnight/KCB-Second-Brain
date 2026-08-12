---
type: "dev-diary"
date: "2026-07-31"
tags: ["knight-code", "dev-diary", "knightos", "electron", "security", "simplify"]
---
# KnightOS production debug logging gated on app.isPackaged

The /simplify efficiency pass over KnightOS Tasks 1-4 flagged that `src/main/logging.ts` set `log.transports.console.level = 'debug'` unconditionally, meaning a packaged production build still paid the console-transport formatting cost on every debug-level call and could leak verbose logging past what a shipped app should surface. Fixed in KnightOS commit `6d1f50f`: the console transport level is now gated on `!app.isPackaged`, so production builds skip it while the file transport (what Chris actually reads a packaged build's real logs from) is untouched. Logged here because the Electron security checklist's production-hardening section references this fix as a concrete example and a search for it turned up nothing, it had only been recorded in the KnightOS vault's Lessons Learned note, not in this tool.
