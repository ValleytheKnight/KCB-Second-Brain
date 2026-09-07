---
id: "ec13c87d-1742-4c2f-ad7f-f23396e4f0e4"
type: "decision"
date: "2026-09-05"
tags: ["knight-code", "decision"]
---
# Decision: Diffed the full old package list against everything currently installed (not just explicitly install...

## Decision

Diffed the full old package list against everything currently installed (not just explicitly installed, to avoid false positives from packages now pulled in as dependencies), classified roughly 180 apparent gaps as mostly structural CachyOS/KDE Plasma infrastructure with no direct port needed, then walked through the small set of genuinely real candidate apps one at a time. Installed GitHub Desktop, VLC (set as default media player, mpv kept as fallback), scrcpy, and cups-pdf. Removed Neovim and its bundled LazyVim config package after confirming Chris doesn't use it. Also went through a separate list of already-installed apps he could see in his launcher, identifying each one, checking for real overlap, and confirming none of them are wired into any built-in Omarchy workflow as a hard dependency.

## Rationale

A raw package-list diff would have been mostly noise, since most of the old machine's package list is desktop-shell infrastructure that doesn't carry over conceptually to a different compositor. Filtering to genuinely portable standalone applications made the actual decision list short and meaningful instead of over 150 items. Caught and corrected one real research gap mid-task: Neovim looked freely removable from a config-file check alone, but the actual pacman dependency graph showed Omarchy's own bundled LazyVim package depended on it, a check that should have been done the first time, not after a failed removal attempt.
