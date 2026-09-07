---
type: "braindump"
domain: "project-specific"
project: "knight-code"
date: "2026-09-07"
created: "2026-09-07 15:52"
themes: ["platform-migration", "distro-switch", "username-drift", "path-hygiene", "security-hardening"]
tags: ["#braindump", "#raw-thoughts", "#knight-code", "#omarchy-migration", "#hyprland"]
status: "captured"
energy_level: "medium"
emotional_tone: "neutral"
confidence: "high"
---

# Braindump: CachyOS to Omarchy Migration

## Raw Thoughts
Second migration braindump, follow-on to the earlier Windows-to-CachyOS one. This one moves the same machine from CachyOS (KDE Plasma) to Omarchy, an Arch-based distro built around Hyprland on Wayland. Same hardware: hybrid Intel UHD 630 + Nvidia GTX 1070 Mobile GPU. Fish shell throughout, `pacman`/`yay` for packages.

WHAT MOVED:
- Distro and desktop environment: CachyOS/KDE Plasma to Omarchy/Hyprland. Same physical machine, same hostname `vtk` originally.
- Hostname/username got renamed during the move, `vtk` to `valleytheknight`. This mismatch was NOT caught immediately, it had been silently wrong since before this migration even started (the earlier CachyOS work apparently typo'd the username as the hostname in places).

THE BIG RECURRING BUG: STALE `/home/vtk/` PATHS.
This has surfaced multiple times, not a one-shot fix:
- Repo-wide sweep (commit 8bf2c2e) found `/home/vtk/` hardcoded across dozens of files in the Knight Code repo, including the 4 custom agent definition files, fixed via `update_agent` (never hand-edited, since agent files are gated).
- Found again later, separately: the Knight Code Base Obsidian vault's own `.mcp.json` (vaultgraph MCP server command + vault-root arg) and its `.claude/settings.json` (4 hooks: vault-hygiene, agent-tool-allowlist, vault-graph-first, vault-graph-consulted-marker) were all still pointing at `/home/vtk/Documents/knight-code-base-companion/...`. Same for 4 files inside the companion repo itself (`knight-code-base-companion`): `stop-hook-authoring-gate.ts`, `vault-graph-first-gate.ts`, `vault-hygiene-gate.ts`, `export-knight-code-memory.ts`.
- Root cause each time is the same: the companion repo and the vault are two separate directories linked only by absolute path strings in config/hooks, no symlink, so a username rename breaks every reference silently until something actually tries to run and fails.
- Lesson worth keeping: after any hostname/username change, grep every repo AND every linked vault for the old `/home/<old-user>/` string, don't assume a repo-only sweep catches everything. The vault + companion pairing is a blind spot because neither repo's own tooling would ever flag the other.

MIGRATION-SPECIFIC BUILD WORK:
- `docs/OMARCHY_MIGRATION_BOOTSTRAP.md` and base-system reference docs added as the ordered runbook for this move (commit 3f0712e), same pattern as the earlier `FIRST-RUN-LINUX-MIGRATION.md` for the CachyOS move.
- Razer device management reinstall step added to the bootstrap (commit aa37729), Razer peripherals needed distro-specific reinstall steps, not a straight copy.
- Launch Board (the GUI/terminal reference pages) updated for the new machine: real Omarchy keybindings sourced from omarchy.org/manual (not guessed), `yay` instead of `paru`, current app inventory reflecting what's actually installed.
- Security hardening follow-ups section added to the migration bootstrap doc, covering steps that still need doing at the machine with sudo (machine-level, so investigate/diagnose only, Chris runs these himself per the standing "teach don't do" rule).
- `knight-watch` system watchers built (crash, rkhunter, AIDE, ClamAV), each turning a system event into a desktop notification that opens a Claude Code session. Had to replace Omarchy's own `omarchy-crash-watch` rather than reuse it, since that one routes through `--permission-mode auto` baked into a package-owned file that reverts on updates. Sessions reach root through `pkexec`, not `sudo`, since notification-triggered sessions have no terminal for a sudo password prompt.
- `omarchy-ac-stayawake-sync`: a udev rule on AC0 power-supply changes that flips Omarchy's idle behavior to stay-awake on mains, back to normal idle on battery.

STATUS: the distro/DE switch itself is done and daily-driven. Path-hygiene sweeps have happened twice and both times found real breakage; treat a third pass as likely needed rather than assuming it's now clean everywhere.
