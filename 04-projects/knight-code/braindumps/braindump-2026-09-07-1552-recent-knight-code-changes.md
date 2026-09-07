---
type: "braindump"
domain: "project-specific"
project: "knight-code"
date: "2026-09-07"
created: "2026-09-07 15:52"
themes: ["knight-watch", "tauri-support", "codemode", "agent-reliability", "vault-companion-hygiene"]
tags: ["#braindump", "#raw-thoughts", "#knight-code", "#recent-changes"]
status: "captured"
energy_level: "medium"
emotional_tone: "neutral"
confidence: "high"
---

# Braindump: Recent Knight Code Changes

## Raw Thoughts
Roundup of what's landed in Knight Code recently, roughly the last two weeks of commits plus this session's own fixes.

DEVKNIGHT NOW COVERS TAURI: added `knightcode-tauri-dev` and `knightcode-linux-security` skills, wired into devknight's routing table and session-start toolchain check. Covers Tauri v2 setup, the Rust/WebView trust boundary, capability permissions, Linux packaging, and Arch-specific sandboxing (AppArmor, bubblewrap, seccomp, linux-hardened). Devknight was WinUI3/WPF/Electron/PySide6 before this, now also the entry point for Tauri desktop apps, first real user is the omarchy-image-theme project.

KNIGHT-WATCH SYSTEM WATCHERS: four watchers (crash, rkhunter, AIDE, ClamAV) that turn a system event into a desktop notification opening a Claude Code session. AIDE and ClamAV had no notification path at all before this. Had to replace Omarchy's own `omarchy-crash-watch` rather than reuse it, since that one bakes in `--permission-mode auto` from a package file that reverts on updates; shadowing it from `~/.local/bin` doesn't work either since notification clicks resolve PATH with `/usr/share/omarchy/bin` first, so every watcher call uses absolute paths instead. Sessions escalate through `pkexec`, not `sudo`, since a notification-triggered session has no terminal for a password prompt. Two real bugs found by actually running the chain rather than reading it: the rkhunter summary grep was anchored wrong and could never match its own timestamped log lines, and `knight-watch scan` used a bare `systemctl start` whose polkit D-Bus request times out in 25 seconds, before a human can answer the dialog.

CODEMODE PROJECT CLOSED OUT: a full task sequence (audit-logging every run with estimated savings, fixing a daemon idle-timeout race, fixing an MCP orphan-process leak, generic Obsidian-server routing, `.installignore` gap in skill installation), finished with a 3-workflow demonstration and closed.

VAULT/COMPANION PATH BREAKAGE, found and fixed twice now: the CachyOS-to-Omarchy hostname/username rename (`vtk` to `valleytheknight`) broke hardcoded `/home/vtk/` paths first inside the Knight Code repo itself (dozens of files, including all 4 custom agent definitions, fixed via `update_agent` not hand-editing), then again separately in the Knight Code Base Obsidian vault's `.mcp.json` and `.claude/settings.json`, plus 4 files inside the companion repo (`knight-code-base-companion`). The vault and companion repo are two separate directories linked only by absolute path strings, no symlink, so a rename anywhere breaks the link silently until something tries to run. Real lesson: after a hostname change, a repo-only path sweep isn't enough, check every linked vault too.

AGENT-REPORTING RELIABILITY, a live example: during the omarchy-image-theme mockup cleanup, one devknight dispatch reported a batch of V2-labeling and frame-deletion work as done. The next dispatch, closing out the same phase, didn't trust that summary, checked the canvas directly, and found the labeling wasn't applied anywhere and the obsolete frames were still sitting on canvas, undecorated. Fixed on the spot. Worth remembering generally: an agent's own "done" report is a claim, not a fact, verify state directly before treating a phase as closed.

FORMAL-DEV-WORKFLOW got its first real full run: omarchy-image-theme is the first project to go through CEO review, Design review, and Eng review end to end under this system, currently sitting at Security review next. The phase-advance gate (no bumping `phase` without an explicit human sign-off via `AskUserQuestion`) held up correctly every time, including catching that a subagent can't call `AskUserQuestion` itself, it has to hand the exact gate question back to the coordinating session to relay.
