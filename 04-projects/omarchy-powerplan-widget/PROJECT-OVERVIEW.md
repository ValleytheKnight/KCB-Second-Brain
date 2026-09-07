---
type: project-overview
project: Power Plan (Omarchy Bar Widget)
slug: omarchy-powerplan-widget
created: 2026-09-07
status: active
tags: ["#project", "#overview"]
---

# Power Plan (Omarchy Bar Widget)

> [!tip] Status: Shipped, daily-driven

```button
name Promote Project
type command
action QuickAdd: Promote Project
```

## What is this project?
A plugin for Omarchy's Quattro bar that sets screensaver, displays-off, auto-lock, sleep, hibernate, and lid-close behavior independently for plugged-in versus on-battery. Started as a fork of Sandman (MIT licensed, `github.com/lgse/sandman`, original work by Pierre Berube); NOTICE.md/LICENSE credit the fork relationship.

- Path: `~/Documents/omarchy-powerplan`
- GitHub: `github.com/ValleytheKnight/omarchy-powerplan-widget`

## Current Status
Shipped and daily-driven. Seven controls, each set independently per power state: lid close, screen saver, displays off, auto-lock, sleep, hibernate-after-sleep, power profile. Core rework from the original Sandman splits every setting into an AC/battery pair (`Model.js` stores `{ac, battery}`), wired to Quickshell's `UPower.onBattery` signal, the same source Omarchy's own battery service uses.

Lid handling is the trickiest piece: Power Plan unbinds Omarchy's default lid-close binding (which otherwise locks the session immediately) and installs its own managed block in `~/.config/hypr/bindings.lua`, with a clean removal path back to system default via a "System default" setting.

Six real bugs were found and fixed during build (non-triggering screensaver timeouts, custom-timeout entry requiring Enter, stale prefill values, wrong trackpad scroll delta, an overly broad lid-close sleep inhibitor, missing "Stay Awake" conflict warning). Install requires `omarchy plugin add ... --enable` plus a manually-installed privileged helper (`sudo install` into `/usr/local/libexec/`), since the hibernate-config step needs root while the plugin itself runs unprivileged.

See [[braindumps/braindump-2026-09-07-1552-omarchy-powerplan-widget|2026-09-07 session braindump]] for full detail.

## Project Resources
- [[braindumps/|Project Braindumps]]

## Next Steps
- [x] Confirm the README documents the manual privileged-helper install step clearly enough to follow cold #task

## Closing Notes
- 2026-09-08: Checked `~/Documents/omarchy-powerplan/README.md` directly. The privileged-helper install is already an explicit, separate numbered step under `## Install` (its own prose line plus the `sudo install` code block), with a `## Requirements` note explaining why: the helper must run as root, while `powerplan.py` itself never can since it loads from the user-owned plugin directory. No fix needed.

---

*This overview helps COG organize your Power Plan-related thoughts and updates.*
