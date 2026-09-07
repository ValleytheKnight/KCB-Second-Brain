---
type: project-overview
project: Omarchy Image Theme
slug: omarchy-image-theme
created: 2026-09-07
status: active
tags: ["#project", "#overview"]
---

# Omarchy Image Theme

> [!tip] Status: Active

```button
name Promote Project
type command
action QuickAdd: Promote Project
```

## What is this project?
A Tauri v2 desktop app (Rust backend, native WebView) that turns a picked image into a full Omarchy theme. Shells out to `wallust` to generate a `colors.toml` from the image, writes it into a theme directory under `~/.config/omarchy/themes/<name>`, and copies the source image into that theme's `backgrounds/`. Wraps an existing hand-rolled shell script (`~/.local/bin/omarchy-theme-from-image`) with a proper GUI/UX layer rather than reimplementing the mechanism. Lives in DevPrograms and will get its own knowledge graph, same pattern as Scryptable/KnightOS.

## Current Status
First project to run all the way through Knight Code's formal-dev-workflow (CEO review, Design review, Eng review, Security review, task breakdown, then implementation).

- **CEO Review:** Approved 9/10 after 3 rounds.
- **Design Review:** Closed after extensive back-and-forth verifying the plan against the real, currently-installed Omarchy theme system (not just internal consistency), surfacing 6 concrete decisions: on-disk name normalization stays invisible to the user, the app never sets light/dark mode itself (Omarchy owns that fallback cascade), the collision guard checks both the user and official theme directories with no caching, a color-only save must never trigger Omarchy's wallpaper-advance-on-reapply behavior, and the general "edit an existing theme" flow was deliberately cut to v2 to protect v1 quality.
- **Eng Review:** Closed. Wallust ships as a Tauri v2 sidecar binary (bundled, not compiled in), batch mode streams live per-image progress, and file access for user-picked images/folders goes through the Rust backend's own direct reads rather than Tauri's generic file-access permission layer.
- **Security Review:** Paused here as of 2026-09-07. Not yet started/completed.

See [[braindumps/braindump-2026-09-07-1552-omarchy-image-theme-app|2026-09-07 session braindump]] for full detail.

## Project Resources
- [[braindumps/|Project Braindumps]]

## Next Steps
- [ ] Resume and complete Security Review 📅 2026-09-09 #task
- [ ] Run task breakdown once Security Review closes #task
- [ ] Log the deferred general-theme-editor flow as a tracked v2 backlog item, so it isn't lost between now and any v2 planning #task

---

*This overview helps COG organize your Omarchy Image Theme-related thoughts and updates.*
