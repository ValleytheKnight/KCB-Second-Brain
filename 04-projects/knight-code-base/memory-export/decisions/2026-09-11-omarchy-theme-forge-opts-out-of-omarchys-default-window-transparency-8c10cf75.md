---
id: "8c10cf75-015d-407a-b43e-67b998dcd2bf"
type: "decision"
date: "2026-09-11"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: omarchy-theme-forge opts out of Omarchy's default window transparency entirely, setting opacity to f...

## Decision

omarchy-theme-forge opts out of Omarchy's default window transparency entirely, setting opacity to fully opaque both focused and unfocused, rather than accepting the system default of 0.985 focused / 0.96 unfocused.

## Rationale

The app's core job is judging color: the live preview panel (Task 7) exists so a user can see whether a generated palette has usable contrast before saving it. Any wallpaper bleed-through behind that panel corrupts the exact judgment the panel is built to support, risking a palette approved in-app that looks wrong once applied. Verified the mechanism directly rather than guessing: /usr/share/omarchy/default/hypr/windows.lua tags every window with default-opacity and then applies opacity = "0.985 0.96" to that tag, with per-app opt-out done by removing the tag and setting opacity = "1 1" (the pattern Steam, RetroArch, DaVinci Resolve and Hermes already use in /usr/share/omarchy/default/hypr/apps/). Chris confirmed he wants the focused bleed cleaned up too, not just the unfocused case. Two surfaces need this: his own machine now for development, via a user rule appended to ~/.config/hypr/hyprland.lua, and the shipped Arch package (Task 18), which should carry the rule so every user gets an opaque window rather than having to discover this themselves.
