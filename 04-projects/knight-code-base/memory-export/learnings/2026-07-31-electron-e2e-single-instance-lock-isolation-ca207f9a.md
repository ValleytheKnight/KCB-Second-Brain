---
id: "ca207f9a-6e94-4842-97b8-16e1a475cbcb"
type: "learning"
date: "2026-07-31"
skill: "devknight"
learning-type: "pattern"
key: "electron-e2e-single-instance-lock-isolation"
confidence: 9
trusted: false
source: "observed"
tags: ["knight-code", "learning", "devknight"]
---
# Learning: electron-e2e-single-instance-lock-isolation

## Insight

Electron's app.requestSingleInstanceLock() is scoped to the app's userData path, which defaults to the same directory for every launch. Two Playwright/_electron.launch test processes for the same app therefore share one OS-level lock namespace and can race if launched close together, one gets rejected as "already running" even though it's a distinct test process. A fixed sleep after app.close() is a symptom mitigation, not a fix, and stayed intermittent even at 2.5s in KnightOS's own suite. The structural fix: read an env var early in the main process (before requestSingleInstanceLock() is called) and call app.setPath('userData', envValue) if present, then have each e2e spec launch with its own unique temp directory for that env var. This removes the shared resource entirely rather than timing around it. Verified clean across 4 consecutive back-to-back single-worker runs in KnightOS after applying this, versus prior intermittent failures.
