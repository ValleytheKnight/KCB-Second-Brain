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

## Content Analysis

### Main Themes
1. **Distro/DE migration:** CachyOS/KDE Plasma to Omarchy/Hyprland on the same physical machine, same hardware. Complete and daily-driven.
2. **Recurring stale-path bug:** a hostname/username rename (`vtk` to `valleytheknight`) that predates this migration broke hardcoded `/home/vtk/` paths twice, in two separate sweeps, in two separate places (Knight Code repo, then the vault plus its companion repo).
3. **Migration-specific build work:** ordered bootstrap runbook, Razer reinstall step, Launch Board refresh, `knight-watch` system watchers, AC/battery idle-behavior sync.
4. **Security hardening follow-ups:** machine-level steps deferred to Chris, investigate-only per the standing teach-don't-do rule.

### Supporting Ideas
- Fish shell and `pacman`/`yay` used throughout, no shell or package-manager change this move.
- The username mismatch (hostname typo'd as username, or vice versa) had been silently wrong since before this migration started, not introduced by it.
- `knight-watch` replaced Omarchy's own `omarchy-crash-watch` rather than wrapping it, because the package-owned file bakes in an unsafe permission mode that reverts on update.

### Questions Raised
- Has a genuine third path-hygiene sweep been run yet, or is "probably clean now" still an assumption?
- Are there other linked vaults or companion repos (beyond Knight Code Base) carrying the same `/home/vtk/` string that haven't been checked?

### Decisions Contemplated
- Whether the vault-companion pairing should move from path-string linking to something structurally safer (a symlink, or a single source of truth for the path) so a future rename can't silently break it again.

## Strategic Intelligence

### Key Insights
1. **The vault-companion pairing is a real blind spot.** Neither repo's own tooling can flag breakage in the other, since each considers itself self-contained. A repo-only grep sweep after a rename will always miss this class of bug.
2. **Agent "done" reports need direct verification, not trust**, this same lesson shows up independently in [[braindump-2026-09-07-1552-recent-knight-code-changes]] (the mockup-cleanup false-completion incident), suggesting it's a pattern worth codifying rather than a one-off.
3. **Package-owned files silently revert overrides.** Any customization of an Omarchy-shipped script needs to live outside that package's file path, not overwrite it in place.

### Pattern Recognition
- **Connection to Previous Thinking:** direct sequel to the 2026-08-23 Windows-to-CachyOS migration braindump; reuses the same "separate ordered bootstrap doc" pattern (`FIRST-RUN-LINUX-MIGRATION.md` then `OMARCHY_MIGRATION_BOOTSTRAP.md`).
- **Recurring Pattern:** this is the second time a hostname/username change has caused silent, delayed breakage across the Knight Code ecosystem. Worth treating as a known risk class, not a surprise each time.
- **Evolution:** the migration-runbook approach (ordered checklist doc plus a status-parsing script) is now proven across two full OS migrations, mature enough to generalize into a template.

### Strategic Implications
- A third, deliberate path-hygiene sweep (repo plus every linked vault/companion) should happen before this is called closed.
- The migration-runbook pattern is worth extracting into a reusable template now that it's been used twice.

## Action Items

### Immediate (24-48 hours)
- [ ] Run a third `/home/vtk/` grep sweep across the Knight Code repo, this vault, and the companion repo 📅 2026-09-09

### Short-term (1-2 weeks)
- [ ] Decide whether to symlink or otherwise structurally fix the vault-companion path pairing so a future rename can't silently break it 📅 2026-09-14

### Strategic Considerations
- Extract the ordered-bootstrap-doc-plus-status-script migration pattern into a reusable template for any future OS/hardware move.

## Connections
- **Related Braindumps:** [[braindump-2026-08-23-1609-linux-migration]], [[braindump-2026-09-07-1552-recent-knight-code-changes]]
- **Relevant Projects:** [[04-projects/knight-code/PROJECT-OVERVIEW|Knight Code]]

## Domain Classification
- **Primary Domain:** project-specific (Knight Code) (95%)
- **Reasoning:** entirely about Knight Code's own dev-machine environment, tooling, and repo/vault path integrity.
- **Cross-Domain Elements:** the security-hardening follow-ups touch personal machine ownership (teach-don't-do territory) but are logged here since they're part of the same migration effort.
- **Privacy Level:** private

## Processing Notes

### Emotional Context
- **Energy Level:** Medium, a detailed technical retrospective, not a high-energy brainstorm.
- **Emotional Tone:** Neutral, matter-of-fact accounting of what broke and what got fixed.
- **Implications:** Written as a lessons-learned log rather than an in-the-moment reaction; treat its "lesson worth keeping" lines as considered conclusions, not raw venting.

### Confidence Assessment
- **Overall Analysis:** 90% - content is detailed, specific (commit references, exact file paths), and internally consistent.
- **Domain Classification:** 95% - unambiguously project-specific to Knight Code.
- **Strategic Insights:** 85% - insights are directly evidenced by the text; the "third sweep needed" recommendation is the author's own stated conclusion, not an inference.
- **Areas Requiring Clarification:** whether a third path-hygiene sweep has since been run (not stated one way or the other in this braindump).

---

*Processed by COG Brain Dump Analyst*
