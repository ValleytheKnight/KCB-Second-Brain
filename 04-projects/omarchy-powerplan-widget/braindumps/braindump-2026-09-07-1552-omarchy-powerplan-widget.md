---
type: "braindump"
domain: "project-specific"
project: "omarchy-powerplan-widget"
date: "2026-09-07"
created: "2026-09-07 15:52"
themes: ["shipped-project", "hyprland-bar-plugin", "qml", "power-management", "open-source-fork"]
tags: ["#braindump", "#raw-thoughts", "#omarchy-powerplan-widget", "#shipped", "#new-project"]
status: "captured"
energy_level: "medium"
emotional_tone: "satisfied"
confidence: "high"
---

# Braindump: Power Plan (Omarchy Bar Widget)

## Raw Thoughts
Shipped project, new to the vault. Power Plan is a plugin for Omarchy's Quattro bar: sets screensaver, displays-off, auto-lock, sleep, hibernate, and lid-close behavior independently for plugged-in versus on-battery. Lives at `~/Documents/omarchy-powerplan`, remote `github.com/ValleytheKnight/omarchy-powerplan-widget`.

ORIGIN: started as a fork of Sandman (MIT licensed, `github.com/lgse/sandman`, original work by Pierre Berube). Kept the NOTICE.md/LICENSE crediting the fork relationship. Renamed `sandman.py`/`sandman-configure-hibernate` to `powerplan.py`/`powerplan-configure-hibernate` early on.

CORE REWORK FROM THE ORIGINAL: Sandman had single values per setting; this fork splits every idle/lock/lid/hibernate setting into an AC/battery pair. `Model.js` stores every setting as `{ac, battery}` instead of a bare value, resolved through `effectiveSeconds()`/`effectiveLidAction()`. Wired to Quickshell's `UPower.onBattery` signal, the same one Omarchy's own battery service uses, and the idle cycle rearms itself on every power-source change. Panel rebuilt as a two-column AC/battery layout, plus a Power Profile section (picks which Omarchy power profile applies on AC vs. battery).

SEVEN CONTROLS, each set independently per power state: lid close, screen saver, displays off, auto-lock, sleep, hibernate-after-sleep, power profile. Each timeout offers presets, Off, and a custom hours/minutes/seconds entry.

LID HANDLING, the trickiest part: lid controls only show up when UPower reports a laptop lid. Omarchy's default lid binding (`switch:on:Lid Switch` in Hyprland) locks the session immediately on lid close, before the widget can apply anything else, so Power Plan unbinds that default and installs its own managed block in `~/.config/hypr/bindings.lua`, keeping only Omarchy's clamshell monitor reconciliation. Selecting "System default" removes that managed block again, handing lid behavior back to logind. Managed lid actions use a low-level lid-switch inhibitor while the widget is running rather than touching system-wide logind config permanently.

REAL BUGS FOUND AND FIXED DURING BUILD, not just features:
- Screensaver-only timeouts never actually triggered, fixed.
- Custom timeout entry required pressing Enter to apply, and had guessed prefill defaults that didn't match reality, both fixed.
- Stale prefill value surviving on components created while the panel was already open, fixed.
- Trackpad scroll felt wrong: switched from `angleDelta` to `pixelDelta` to match real trackpad pixel counts, then added a sensitivity multiplier since 1:1 still felt too slow.
- Narrowed a lid-close sleep inhibitor from a standing block down to a brief race guard.
- Added a "Stay Awake" warning on the screensaver and auto-lock sections, so the widget doesn't silently do nothing while a separate stay-awake mechanism is holding idle off.

INSTALL: `omarchy plugin add https://github.com/ValleytheKnight/omarchy-powerplan-widget.git --enable`, plus a privileged helper installed manually via `sudo install` into `/usr/local/libexec/`, since the hibernate-config step needs root and the plugin itself runs unprivileged.

STATUS: shipped and daily-driven. README, NOTICE, demo GIF, and real screenshots (replacing the original Sandman preview images) all in place.
