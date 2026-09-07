---
type: "braindump"
domain: "project-specific"
project: "omarchy-image-theme"
date: "2026-09-07"
created: "2026-09-07 15:52"
themes: ["formal-dev-workflow", "tauri", "omarchy-theming", "scope-control", "design-review-discipline"]
tags: ["#braindump", "#raw-thoughts", "#omarchy-image-theme", "#tauri", "#new-project"]
status: "captured"
energy_level: "medium"
emotional_tone: "focused"
confidence: "high"
---

# Braindump: Omarchy Image Theme App

## Raw Thoughts
New project, first one run all the way through Knight Code's formal-dev-workflow (CEO review, Design review, Eng review, Security review, task breakdown, then implementation). Lives in DevPrograms and will get its own knowledge graph, same pattern as Scryptable/KnightOS.

WHAT THE APP DOES:
Turns a picked image into an Omarchy theme: shells out to `wallust` to generate a `colors.toml` from the image, writes it into a theme directory under `~/.config/omarchy/themes/<name>`, copies the source image into that theme's `backgrounds/`. This already exists as a hand-rolled shell script (`~/.local/bin/omarchy-theme-from-image`), the app is the GUI/UX layer on top of that same mechanism, built with Tauri (Rust backend, native WebView).

CEO REVIEW: approved 9/10 after 3 rounds. Full accepted-scope table lives in the CEO plan doc, not just the short approval summary.

DESIGN REVIEW, the long part:
Went through many rounds because I insisted on two things the design work kept drifting from:
1. Verify against BOTH the plan AND the real, currently-installed Omarchy theme system, not just internal consistency. At one point I had to stop everything and demand a full, independent read-through of the actual Omarchy scripts (`omarchy-theme-set`, `-switcher`, `-list`, `-install`, `-current`, `-dir`, `-remove`, `-color`, `-bg-set`, `-bg-install`) by both devknight and the coordinating session, compared side by side against the plan and the mockups, before any more changes landed.
2. Don't let scope creep in through vague language. A "screenshot" mention was just descriptive language for an already-accepted feature (the live desktop preview panel, a static fake-terminal + wallpaper thumbnail, CSS-recolored), not a new capability, but it exposed a mockup gap (that screen wasn't actually drawn yet) worth fixing regardless.

REAL DECISIONS THAT CAME OUT OF READING THE ACTUAL SYSTEM, not just the plan:
- Naming: on-disk theme names get normalized to lowercase-dash automatically; Omarchy's own picker separately derives a Title-Case display name from that directory name. The app must keep this invisible, user types whatever they want, it just always looks right.
- The app must never set light/dark mode itself. Omarchy has its own real fallback cascade for mode (`mode` key -> legacy `theme_type` -> `light.mode` marker -> background-luminance auto-detect -> default dark), the app should stay out of that decision entirely.
- Collision guard has to check both the user theme directory AND the official Omarchy theme directory, every single time a name is entered, no caching, since new official themes land from upstream Omarchy releases and stale data could miss a real collision.
- Wallpaper must never change on a color-only save. Found a real Omarchy behavior where re-applying an already-active theme advances the wallpaper to the next image in `backgrounds/` instead of reapplying the current one, directly dangerous for an in-place color edit if not handled deliberately.
- The general "edit an existing theme" flow got cut entirely to v2. It was accepted scope originally, but scope discipline won: the app should just do image-to-theme well for v1, not become a general theme editor.
- Wallust itself: MIT licensed, AUR-only (not in official Arch repos), upstream at codeberg.org/explosion-mental/wallust. Decided to bundle it rather than require a separate AUR install, since asking a user to `yay -S wallust` themselves before an image-to-theme app even works is a bad first-run experience.

MOCKUP CLEANUP ROUND: I did a full pass demanding fixes-in-parallel from 2 devknight agents (checking each other's work, since I wanted redundancy on a batch this size): missing-dependency screen updated for bundled wallust instead of deleted, edit-existing-theme screens clearly v2-labeled (that button appears on nearly every screen, all needed labeling), new mockups added for the live-preview mechanism and for what color editing actually looks like (color picker + hex + dropper, kept simple for v1), save-conflict screen's leftover edit-existing button fixed. One agent falsely reported this done before it actually was; the next dispatch caught it by directly inspecting the canvas instead of trusting the summary, real lesson: an agent's own "done" report isn't proof, verify state directly.

ENG REVIEW: wallust ships as a Tauri v2 sidecar binary (a bundled, separately-run program, not welded into the app's own code), keeps the two already-approved error-state screens (Missing Dependency, Apply Failed) valid as built, since those assume wallust runs as its own process with a pass/fail signal. Batch mode streams live per-image progress instead of a single end-of-run result. File access for user-picked images/folders goes through the Rust backend doing its own direct reads rather than Tauri's generic file-access permission layer, since a fixed permission scope can't cover "pick any folder on disk."

WHERE IT STANDS: Eng Review closed, state file shows CEO/Design/Eng phases complete, next is Security Review, then task breakdown, then actual implementation.

## Content Analysis

### Main Themes
1. **First project through formal-dev-workflow end to end**, CEO, Design, and Eng review phases all complete, Security review next.
2. **Design review discipline paid off**, insisting on cross-checking against the real installed Omarchy system (not just the plan) surfaced six concrete, load-bearing decisions that internal-consistency review alone would have missed.
3. **Deliberate scope control**, the general theme-editor flow was cut to v2 specifically to protect v1 quality, and a vague "screenshot" mention was confirmed as already-scoped rather than allowed to creep.
4. **Wallust bundling decision**, chosen for first-run experience over requiring a separate AUR install.
5. **Agent-verification failure caught mid-build**, a falsely-reported "done" mockup pass, caught by direct canvas inspection rather than trusting the summary.

### Supporting Ideas
- The app wraps an existing hand-rolled shell script (`omarchy-theme-from-image`) rather than reimplementing the mechanism from scratch.
- Six specific Omarchy-system behaviors had to be reverse-engineered by reading the actual scripts: name normalization, mode-detection cascade, collision-guard scope, wallpaper-advance-on-reapply, and the general theme-editor boundary.
- Wallust ships as a Tauri v2 sidecar binary, not compiled into the app itself, keeping the two already-approved error-state screens valid.

### Questions Raised
- Has Security Review, stated as "next," started yet? Not addressed in this braindump.
- Now that a general theme editor is deliberately deferred to v2, is there a tracked backlog item for it (matching how Obsidian Plugins & Themes tracks its own backlog ideas), or does it risk getting forgotten?

### Decisions Contemplated
- (All resolved by the time of writing) Bundle wallust vs. require separate AUR install, chosen: bundle. Edit-existing-theme in v1 vs. v2, chosen: v2. Sidecar binary vs. compiled-in wallust, chosen: sidecar.

## Strategic Intelligence

### Key Insights
1. **Verifying against the live system, not just the plan, is what surfaced the real decisions.** All six "REAL DECISIONS" in this braindump came from reading the actual Omarchy scripts side by side with the mockups, none would have surfaced from a plan-only design review. This validates the CLAUDE.md V-model instinct to verify against ground truth, not just internal consistency.
2. **Scope discipline under pressure held.** Cutting the theme-editor flow to v2 despite it being originally accepted scope shows the CEO-approved scope isn't treated as untouchable once a genuine build-quality tradeoff appears.
3. **The same agent-trust failure recurs here as in the parallel Knight Code changes braindump** ([[braindump-2026-09-07-1552-recent-knight-code-changes]]), a "done" report was false and only caught by direct inspection. Two independent instances in one session is a real signal, not noise.

### Pattern Recognition
- **Connection to Previous Thinking:** this is the first project to exercise Knight Code's formal-dev-workflow fully; its outcome (gate held, one process gap found and fixed) is direct validation data for that system, worth referencing when formal-dev-workflow itself gets reviewed.
- **Recurring Pattern:** "an agent's own completion report is a claim, not a fact" now appears twice in this session's braindumps (here and in the Knight Code changes roundup), see that file's Strategic Intelligence section for the cross-reference.
- **Evolution:** DevKnight's toolchain expanded specifically to support this project (Tauri v2, Linux security/sandboxing skills), per [[braindump-2026-09-07-1552-recent-knight-code-changes]], this project is the reason those skills exist now.

### Strategic Implications
- Security Review is the immediate next gate; no vault content yet reflects its outcome.
- The deferred general-theme-editor scope should be logged somewhere trackable (a backlog list, similar to how `obsidian-plugins-themes` tracks Spellcraft) so it isn't lost between now and any v2 planning.
- No `PROJECT-OVERVIEW.md` exists yet for this project (confirmed: only a `braindumps/` folder exists under `04-projects/omarchy-image-theme/`), meaning the wider vault currently has no single place tracking this project's status apart from these braindumps.

## Action Items

### Immediate (24-48 hours)
- [ ] Create `04-projects/omarchy-image-theme/PROJECT-OVERVIEW.md` so this project has a Next Steps/status home like every other active project 📅 2026-09-09

### Short-term (1-2 weeks)
- [ ] Confirm Security Review has started or completed, and log the outcome 📅 2026-09-14
- [ ] Log the deferred general-theme-editor scope as a tracked v2 backlog item rather than leaving it only in this braindump 📅 2026-09-14

### Strategic Considerations
- Once this project completes its full formal-dev-workflow run, it's worth a retro on the process itself (what the gate caught, what it missed), since it's the first full-cycle case study.

## Connections
- **Related Braindumps:** [[braindump-2026-09-07-1552-recent-knight-code-changes]], [[braindump-2026-09-07-1552-omarchy-migration]]
- **Relevant Projects:** [[04-projects/knight-code/PROJECT-OVERVIEW|Knight Code]] (DevKnight's Tauri support was built for this project)

## Domain Classification
- **Primary Domain:** project-specific (omarchy-image-theme) (95%)
- **Reasoning:** entirely about this specific app's design, review process, and technical decisions.
- **Cross-Domain Elements:** DevKnight's own capability expansion (Knight Code) is a side effect of this project's needs, cross-referenced above.
- **Privacy Level:** private

## Processing Notes

### Emotional Context
- **Energy Level:** Medium, a focused, detailed technical and process retrospective.
- **Emotional Tone:** Focused (per frontmatter), reads as exacting and insistent about verification discipline ("I had to stop everything and demand...").
- **Implications:** The strong emphasis on verifying against ground truth and catching scope creep reflects a deliberate standard for this project; future work on it should be held to the same bar rather than relaxed.

### Confidence Assessment
- **Overall Analysis:** 90% - highly detailed with specific script names, decisions, and outcomes.
- **Domain Classification:** 95% - unambiguously specific to this one app.
- **Strategic Insights:** 85% - insights are directly evidenced by stated events; the recommendation to create a PROJECT-OVERVIEW.md is based on a confirmed gap (checked directly, folder contains only `braindumps/`).
- **Areas Requiring Clarification:** current status of Security Review (not addressed in source content).

---

*Processed by COG Brain Dump Analyst*
