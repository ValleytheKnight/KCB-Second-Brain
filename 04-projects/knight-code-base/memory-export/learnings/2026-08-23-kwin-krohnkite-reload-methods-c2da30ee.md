---
id: "c2da30ee-1908-4bc4-b6fc-c9d822ea0aae"
type: "learning"
date: "2026-08-23"
skill: "knightcode-context-save"
learning-type: "operational"
key: "kwin-krohnkite-reload-methods"
confidence: 8
source: "observed"
tags: ["knight-code", "learning", "knightcode-context-save"]
---
# Learning: kwin-krohnkite-reload-methods

## Insight

On this machine (CachyOS/KWin Wayland), reloading the Krohnkite tiling script safely (no compositor restart) has two D-Bus methods and only one is reliable. Toggling `kwriteconfig6 --file kwinrc --group Plugins --key krohnkiteEnabled false/true` plus `qdbus6 org.kde.KWin /KWin org.kde.KWin.reconfigure` sometimes leaves stale internal window tracking (observed: two windows overlapping full-screen after this method). The correct method is `qdbus6 org.kde.KWin /Scripting org.kde.kwin.Scripting.unloadScript "krohnkite"` followed by `qdbus6 org.kde.KWin /Scripting org.kde.kwin.Scripting.start`, verified via `isScriptLoaded` toggling false then true, which is a genuine unload/reinit of the script's JS engine. Separately, `kglobalshortcutsrc` edits (custom keybinds) are owned by the `kglobalaccel` daemon, not KWin's reconfigure signal; a raw file edit does not take live effect, confirmed via `qdbus6 org.kde.kglobalaccel /component/kwin ... allShortcutInfos` showing an empty live keycode. Binding a new global shortcut reliably requires the System Settings Shortcuts GUI. Also: `qdbus6` is the correct binary on this system, not `qdbus`/`qdbus5`.
