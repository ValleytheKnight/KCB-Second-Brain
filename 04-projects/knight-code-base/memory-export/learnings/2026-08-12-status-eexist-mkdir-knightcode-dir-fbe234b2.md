---
id: "fbe234b2-d170-48f5-ae08-a9c60f6ea6bf"
type: "learning"
date: "2026-08-12"
skill: "browse"
learning-type: "pitfall"
key: "status-eexist-mkdir-knightcode-dir"
confidence: 8
tags: ["knight-code", "learning", "browse"]
---
# Learning: status-eexist-mkdir-knightcode-dir

## Insight

Every browse command (even a plain `status`) fails with "EEXIST: file already exists, mkdir '<repo>\.knightcode'" when that state directory already exists from prior runs, live-confirmed 2026-08-12 in this repo. The mkdir call isn't using an exist-ok/recursive mode. Workaround used: skip browse entirely for one-off HTML-to-PDF rendering and call an installed Chromium browser directly (msedge --headless --disable-gpu --print-to-pdf=<out> <file-url>), faster and avoids the daemon entirely.
