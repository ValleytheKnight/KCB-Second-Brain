---
type: "braindump"
domain: "project-specific"
project: "knight-code"
date: "2026-08-23"
created: "2026-08-23 16:09"
themes: ["platform-migration", "scheduling-rewrite", "cross-platform-config", "technical-debt-discovery", "close-out-discipline"]
tags: ["#braindump", "#raw-thoughts", "#knight-code", "#linux-migration", "#cachyos"]
status: "captured"
energy_level: "medium"
emotional_tone: "neutral"
confidence: "high"
---

# Braindump: Windows to CachyOS Migration of Knight Code Dev Setup

## Raw Thoughts
Braindump for my second brain: Windows to Linux (CachyOS) migration of my whole dev setup, including Knight Code. Log/organize as you see fit. Written 2026-08-23, covering work from roughly 2026-08-16 through 2026-08-22.

WHAT MOVED:
- Machine: old Windows box to new build, `Knight-Blade`, running CachyOS (Arch-based), KDE Plasma on Wayland, hybrid Intel UHD 630 + Nvidia GTX 1070 Mobile GPU.
- Every repo I own on GitHub, re-cloned to the same relative paths as Windows (Knight Code, KnightOS, Scryptable, five Obsidian plugin/theme repos, the Knight Code Companion).
- Everything git doesn't track, restored from a DATA-drive backup made during the move: SSH keys, `~/.claude` and `~/.claude.json`, `~/.knightcode` state, per-project `.env` files, all five Obsidian vaults, Pencil.dev's saved design files.
- Dependencies reinstalled fresh per project (never copied `node_modules`/venvs across, those are platform-specific binaries).

WHY A SEPARATE FIRST-RUN DOC:
Built `FIRST-RUN-LINUX-MIGRATION.md` as a one-time, ordered runbook, kept separate from the normal `FIRST-RUN.md` because that one assumes the repo's already on disk in the right place, which isn't true on a bare install. Ten numbered steps, each with a `[x]`/`[ ]` checkbox and a `migration-status.sh` script that parses them for a done/pending readout.

WHAT HAD TO BE ENGINEERED, NOT JUST REINSTALLED:
- Scheduling: Knight Code's `schedule_agent` MCP tool and loreGod's old orchestrator were both built directly on Windows Task Scheduler (`schtasks`). Rewrote both to detect platform and use systemd user timers on Linux (`systemctl --user`), keeping the schtasks path alive for when this same code runs inside a Windows VM later. Confirmed a real decision here: on Linux both `run_as: interactive` and `run_as: system` schedule types auto-register with no manual hand-off step, unlike Windows, where interactive tasks need a manually-captured credential Register-ScheduledTask requires. That constraint doesn't exist on Linux, so I chose full auto-register for both rather than keeping interactive manual for Windows-parity's own sake.
- loreGod's QA sweep itself already moved to a cloud RemoteTrigger routine before this migration, so it needed no porting. What did need it: the local email-poll pair that ships the finished report (`cloud-report-email-check.ps1`, `send-report-email.ps1`), which already branched on `$IsWindows` in pwsh, just needed the Linux side wired up (systemd timers instead of scheduled tasks, libsecret/`secret-tool` instead of DPAPI for the Gmail app password).
- Every hardcoded Windows path (`C:\Users\Chris Brown\...`) across agent definitions (devknight, loremaster, loreGod, Obsidian) and other live-read docs, rewritten to real Linux paths. Found and fixed in more than one pass, stale paths kept turning up after the "complete" migration commit (a vault-sync hook, freeze-check script, lorebrain's `--root` flag).
- `.mcp.json` moved to relative paths for cross-platform portability, merged in from a `linux-vm-fixes` branch pushed from a temporary Ubuntu VM used to stage fixes before the real machine existed.
- Custom agents moved from global `~/.claude/agents` to repo-local `.claude/agents`, matching Knight Code's own "one path only" rule for agent files.
- Registered two MCP knowledge graphs that hadn't survived the move: `knightbrain_scryptable`, `knightbrain_knightos`.
- `settings.json` rebuilt by hand rather than copied straight across: hook commands pointing at Windows node.exe and Windows agent-flow paths rewritten to bare `node` plus real Linux paths; the RTK hook line dropped or kept depending on whether a Linux RTK build existed; the WinUI plugin entry left in place inert, since that's Windows-only tooling that only matters again inside a future Windows VM.

WHAT STAYED OPEN, DELIBERATELY:
- Step 6, restoring the self-hosted Nextcloud server (Docker, personal cloud/file-sync, bind-mounted to Windows folders on the old box including a live bind into the Knight Code Base vault). Found live in Docker Desktop during the migration with zero prior record anywhere, so `FIRST-RUN-LINUX-MIGRATION.md` is now the only place documenting it exists at all. Deferred by explicit choice, not forgotten.
- WinUI3/WPF work has no Linux path at all (no MSVC/Windows SDK equivalent), so a future Windows VM (Phase 8 of the plan) is the intended home for it, kept in sync with the Linux host through normal git push/pull, not a shared folder.

CLOSE-OUT DISCIPLINE:
The runbook's own last step requires manually flipping every checkbox, re-running `migration-status.sh` to confirm all ten read done, and sending one final summary email before calling the migration finished, the one written record of what actually happened on migration day.

## Content Analysis

### Main Themes
1. **Full-stack platform migration:** Every layer of the dev environment (repos, secrets, config, scheduling, agent definitions) moved from Windows to CachyOS in one coordinated effort, not a piecemeal drift.
2. **Rewrite over reinstall for platform-coupled logic:** Scheduling (schtasks to systemd) and secret storage (DPAPI to libsecret) weren't copy-paste, they needed real platform-detection code, kept dual-path for a future Windows VM rather than deleting the Windows branch.
3. **Hidden technical debt surfaced by the move:** Hardcoded Windows paths and an undocumented Nextcloud server only became visible because the migration forced every assumption to be checked, not because anyone went looking for them.
4. **Deliberate scope control:** Two items (Nextcloud, WinUI3/WPF) explicitly deferred rather than force-fit onto Linux, with a stated reason each, not silently dropped.
5. **Process discipline over ad hoc migration:** A dedicated runbook with numbered steps, a status script, and a mandatory close-out step, treating the migration itself as a tracked piece of work with its own completion criteria.

### Supporting Ideas
- Staged fixes on a temporary Ubuntu VM (`linux-vm-fixes` branch) before the real hardware existed, decoupling "write the Linux-compatible code" from "have a Linux machine to test on."
- `.mcp.json` moved to relative paths, a portability fix that outlives this one migration.
- Agent definition files consolidated to repo-local `.claude/agents`, enforcing Knight Code's own single-source-of-truth rule that a Windows-era shortcut (global `~/.claude/agents`) had violated.

### Questions Raised
- When does the Nextcloud restoration (Step 6) actually get scheduled, and does the old live bind-mount into this vault get recreated identically, or redesigned now that it's documented for the first time?
- Is there a plan to prevent future stale-Windows-path regressions (the hook, freeze-check, lorebrain `--root` flag all had to be caught after the fact), e.g. a grep-based CI check for `C:\\` patterns?
- Is the Windows VM (Phase 8) scoped and scheduled, or still conceptual?

### Decisions Contemplated
- Scheduling auto-register behavior: chose full auto-register on Linux for both `run_as: interactive` and `run_as: system` rather than preserving Windows's manual-credential-capture step for parity, on the grounds that the constraint forcing that manual step doesn't exist on Linux. Already decided, not open.
- RTK hook line: kept or dropped per-project depending on Linux RTK build availability, an ongoing per-repo judgment call rather than a one-time global choice.

## Strategic Intelligence

### Key Insights
1. **Migrations are an effective forcing function for debt discovery.** The Nextcloud server and the scattered hardcoded paths had zero prior record anywhere; they only surfaced because the move required every assumption to be re-verified. Worth treating future migrations (or even a periodic non-migration audit) as intentional debt-surfacing exercises.
2. **Dual-path platform code (Windows branch kept alongside new Linux branch) was the right call given Phase 8 already exists as a planned Windows VM.** This isn't speculative future-proofing, it's building for a already-committed near-term destination.
3. **The separate runbook document pattern (FIRST-RUN-LINUX-MIGRATION.md vs FIRST-RUN.md) is reusable.** Any future one-time, order-dependent setup (new machine, new team member onboarding, disaster recovery) has a template to follow: numbered steps, checkbox state, a status-parsing script, mandatory close-out.

### Pattern Recognition
- **Connection to Previous Thinking:** Consistent with Knight Code's stated "one path only" doctrine for agent definitions (CLAUDE.md), this migration was used to actually enforce that rule (global to repo-local) rather than just state it.
- **Recurring Patterns:** "Found it, fixed it, then found another instance later" pattern with the hardcoded Windows paths mirrors how thorough sweeps often go, multi-pass discovery is normal for this kind of change, not a sign the first pass was sloppy.
- **Evolution:** The credential-storage audit from 2026-08-20 (noted in Knight Code's own PROJECT-OVERVIEW Next Steps) and this migration's libsecret/DPAPI swap are adjacent concerns, both are secret-handling hardening work in the same short window.

### Strategic Implications
- Knight Code's codebase now carries real cross-platform logic (scheduling, secret storage) rather than Windows-only assumptions, which was a precondition for ever running this on Linux at all and is now validated in production use on `Knight-Blade`.
- The deferred Nextcloud and WinUI3/WPF items are the two loose threads most likely to cause friction later if forgotten, worth a checkable Next Steps item rather than living only inside a runbook.

## Action Items

**Note:** Calculated from today's date, 2026-08-23.

### Immediate (24-48 hours)
- [ ] Finish flipping the remaining checkboxes in `FIRST-RUN-LINUX-MIGRATION.md`, confirm `migration-status.sh` reads all ten steps done, send the close-out summary email 📅 2026-08-25

### Short-term (1-2 weeks)
- [ ] Decide and schedule the Nextcloud server restoration (Step 6), including whether the old live bind-mount into this vault gets recreated or redesigned 📅 2026-08-30
- [ ] Add a Next Steps item to Knight Code's PROJECT-OVERVIEW tracking the two deliberately-deferred items (Nextcloud, WinUI3/WPF-to-Windows-VM) so they don't rely on the runbook alone for visibility 📅 2026-08-30

### Strategic Considerations
- Worth a lightweight, repeatable check (grep for `C:\\` / `Chris Brown` path patterns across the repo) to catch any remaining stale Windows references before they surface the same way the hook/freeze-check/lorebrain flag did.
- When Phase 8 (Windows VM for WinUI3/WPF) gets scoped, capture whether it reuses any of the schtasks code path already kept alive in the scheduling rewrite.

## Connections
- **Related Braindumps:** none found yet, this is the first Linux-migration braindump in the vault
- **Relevant Projects:** [[04-projects/knight-code/PROJECT-OVERVIEW|Knight Code]], [[04-projects/knightos/PROJECT-OVERVIEW|KnightOS]], [[04-projects/obsidian-plugins-themes/PROJECT-OVERVIEW|Obsidian Plugins & Themes]]
- **Knowledge Base:** none linked yet, candidate for a future consolidated note on Knight Code's cross-platform architecture decisions

## Domain Classification
- **Primary Domain:** project-specific, Knight Code (95%)
- **Reasoning:** Content is entirely about Knight Code's dev environment, tooling, and codebase migrating machines; KnightOS/Scryptable/Obsidian plugins are mentioned only as co-located repos that moved along with it, not as separate subjects of the dump.
- **Cross-Domain Elements:** Touches KnightOS and Obsidian Plugins & Themes projects tangentially (same repo move, same runbook), but the engineering decisions described are all Knight Code's own tooling (schedule_agent MCP tool, settings.json, agent definitions).
- **Privacy Level:** private (references local file paths, machine details, personal infrastructure)

## Processing Notes
### Emotional Context
- **Energy Level:** Medium. Dense, detailed, methodical recounting, no visible frustration or excitement markers, reads as a factual after-action log.
- **Emotional Tone:** Neutral. Written as documentation for the second brain, not as reflection on how the work felt.
- **Implications:** Treat as a reference record rather than something needing emotional follow-up.

### Confidence Assessment
- **Overall Analysis:** 90% - content was already well-structured and specific, low ambiguity in what happened or why.
- **Domain Classification:** 95% - unambiguously Knight Code project work.
- **Strategic Insights:** 85% - insights are grounded directly in stated facts; the "migrations as debt-discovery forcing function" framing is an inference, flagged as such rather than presented as the user's own words.
- **Areas Requiring Clarification:** Nextcloud restoration timeline and Windows VM (Phase 8) scheduling are open questions the user may want to resolve, not gaps in this analysis.

---

*Processed by COG Brain Dump Analyst*
