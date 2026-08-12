---
id: "04d1f021-5d01-4e02-93ac-4c89e517ce58"
type: "learning"
date: "2026-07-31"
skill: "knightcode-observability-and-instrumentation"
learning-type: "pitfall"
key: "electron-log-startcatching-double-logs-rejections"
confidence: 9
trusted: false
source: "observed"
tags: ["knight-code", "learning", "knightcode-observability-and-instrumentation"]
---
# Learning: electron-log-startcatching-double-logs-rejections

## Insight

electron-log v5's log.errorHandler.startCatching() already catches unhandled promise rejections in addition to uncaught exceptions. Adding a separate process.on('unhandledRejection', ...) alongside it writes every rejection to the disk log twice. Found by real evidence, not review: a deliberately thrown error in the Electron main process produced two adjacent log lines for one failure ("Unhandled rejection Error: ..." from electron-log's own catcher, then a duplicate from the hand-added listener). Rely on startCatching alone.
