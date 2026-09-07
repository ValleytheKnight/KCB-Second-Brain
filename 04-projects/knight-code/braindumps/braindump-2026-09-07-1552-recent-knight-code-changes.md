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

## Content Analysis

### Main Themes
1. **DevKnight's scope expanded to Tauri**, two new skills wired into its routing table, first real user is the omarchy-image-theme project.
2. **`knight-watch` system watchers went live**, four watchers (crash, rkhunter, AIDE, ClamAV) turning system events into desktop notifications that open a session, replacing a package-owned Omarchy default that couldn't be safely customized in place.
3. **Codemode project closed out**, a full task sequence plus a 3-workflow demonstration.
4. **Vault/companion path breakage recurred**, same root cause as the Omarchy migration braindump, cross-referenced there.
5. **Agent self-reporting proved unreliable in a live case**, a "done" report was false, caught only by direct inspection.
6. **Formal-dev-workflow got its first end-to-end run**, and its phase-advance gate correctly caught a process gap (subagents can't call `AskUserQuestion` directly).

### Supporting Ideas
- Two real bugs in `knight-watch` were found only by running the chain, not by reading it: a mis-anchored grep pattern, and a polkit D-Bus timeout shorter than a human's response time.
- Notification-triggered sessions have no terminal, so `pkexec` is required over `sudo` wherever a watcher needs elevated access.

### Questions Raised
- Are there other Omarchy-package-owned files besides `omarchy-crash-watch` that Knight Code has silently overridden and that will revert on the next system update?
- Now that formal-dev-workflow has one full run under it, does the subagent/`AskUserQuestion` relay gap need a permanent structural fix, or was the one-time catch sufficient?

### Decisions Contemplated
- None explicitly framed as open decisions; this entry reads as a closed-out status roundup rather than a set of pending choices.

## Strategic Intelligence

### Key Insights
1. **"Done" reports from agents are claims, not facts.** The omarchy-image-theme mockup-cleanup incident is direct, concrete evidence: a dispatch reported work complete that a later direct canvas check proved wasn't done. This is the same lesson independently surfacing in [[braindump-2026-09-07-1552-omarchy-migration]] regarding path-hygiene sweeps, worth treating as a standing operating principle, not a one-off catch.
2. **Package-owned files are not safe override targets.** The `omarchy-crash-watch` replacement (rather than shadow) pattern should generalize to any future Omarchy-default override.
3. **The phase-advance gate is already earning its keep.** Catching the subagent/`AskUserQuestion` limitation on its very first full run validates the formal-dev-workflow investment.

### Pattern Recognition
- **Connection to Previous Thinking:** the vault/companion path-breakage item is the same incident documented in more depth in [[braindump-2026-09-07-1552-omarchy-migration]], this braindump captures it as one line in a larger roundup; that one is the fuller account.
- **Recurring Pattern:** this is the second explicit instance (in this same session's braindumps) of "verify the agent's claimed state directly instead of trusting the summary." Worth promoting to an explicit rule if it recurs a third time.
- **Evolution:** DevKnight's skill roster keeps growing by adding a new stack (Tauri) rather than replacing anything, consistent with how PySide6 support was added earlier per the Knight Code project overview.

### Strategic Implications
- Consider adding a lightweight "verify, don't trust" checklist step to any workflow where a subagent reports phase completion, since this has now bitten twice.
- `knight-watch` closing the AIDE/ClamAV notification gap is a real security-observability improvement worth reflecting in the Knight Code project overview's Current Status.

## Action Items

### Immediate (24-48 hours)
- [ ] Audit whether any other Omarchy-package-owned files have been shadowed rather than properly replaced, the same failure class as `omarchy-crash-watch` 📅 2026-09-09

### Short-term (1-2 weeks)
- [ ] Decide whether "verify agent-reported completion directly before closing a phase" should become an explicit rule in the formal-dev-workflow skill, given it has now been caught twice in unrelated contexts 📅 2026-09-14

### Strategic Considerations
- Refresh the Knight Code project overview's Current Status section, it doesn't yet mention Tauri/knightcode-linux-security skill additions, knight-watch, or the codemode close-out, all real since its last update on 2026-08-20.

## Connections
- **Related Braindumps:** [[braindump-2026-09-07-1552-omarchy-migration]], [[braindump-2026-09-07-1552-omarchy-image-theme-app]]
- **Relevant Projects:** [[04-projects/knight-code/PROJECT-OVERVIEW|Knight Code]], [[04-projects/omarchy-image-theme/PROJECT-OVERVIEW|Omarchy Image Theme]] (referenced, not yet created)

## Domain Classification
- **Primary Domain:** project-specific (Knight Code) (95%)
- **Reasoning:** every item is a Knight Code system/tooling change (devknight, knight-watch, codemode, formal-dev-workflow).
- **Cross-Domain Elements:** touches the omarchy-image-theme project as devknight's first Tauri user, but the change itself belongs to Knight Code.
- **Privacy Level:** private

## Processing Notes

### Emotional Context
- **Energy Level:** Medium, a dense factual roundup covering multiple workstreams.
- **Emotional Tone:** Neutral, status-report register throughout.
- **Implications:** Written for future-reference recall, not in-the-moment reflection; safe to treat every claim as a settled fact as of 2026-09-07.

### Confidence Assessment
- **Overall Analysis:** 90% - specific, technically detailed, internally consistent across five distinct workstreams.
- **Domain Classification:** 95% - unambiguously Knight Code system/tooling content.
- **Strategic Insights:** 85% - insights are directly evidenced; the "verify, don't trust" pattern is explicitly stated by the author, not inferred.
- **Areas Requiring Clarification:** whether the Security Review phase for omarchy-image-theme (mentioned as "next") has since started or completed is not covered here, see the dedicated project braindump.

---

*Processed by COG Brain Dump Analyst*
