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
