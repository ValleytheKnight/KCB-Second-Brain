---
id: "7428d22b-9783-436c-99e6-de613dc1d59c"
type: "learning"
date: "2026-08-07"
skill: "investigate"
learning-type: "pitfall"
key: "extracted-asar-can-be-stale-vs-running-process"
confidence: 8
trusted: false
source: "observed"
tags: ["knight-code", "learning", "investigate"]
---
# Learning: extracted-asar-can-be-stale-vs-running-process

## Insight

Extracting an Electron app's .asar from disk (e.g. obsidian.asar) to read its real source does not guarantee the content matches what the currently-running process actually has loaded in memory. A background auto-update can swap files on disk after a process already launched with an older (or newer) bundle. Confirmed directly: grepping the extracted app.css for a CSS class found via live DOM inspection returned zero matches, while document.styleSheets read from the live running app showed the real, different selector. When a static-file finding contradicts live DOM/CSSOM behavior, trust the live app's own document.styleSheets/computed styles over the extracted file, and treat the extracted file as unverified until cross-checked live.
