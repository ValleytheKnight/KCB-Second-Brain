---
type: "braindump"
domain: "project-specific"
project: "omarchy-powerplan-widget"
date: "2026-09-07"
created: "2026-09-07 15:52"
themes: ["shipped-project", "hyprland-bar-plugin", "qml", "power-management", "open-source-fork"]
tags: ["#braindump", "#raw-thoughts", "#omarchy-powerplan-widget", "#shipped", "#new-project"]
status: "captured"
energy_level: "medium"
emotional_tone: "satisfied"
confidence: "high"
---

# Braindump: Power Plan (Omarchy Bar Widget)

## Raw Thoughts
Shipped project, new to the vault. Power Plan is a plugin for Omarchy's Quattro bar: sets screensaver, displays-off, auto-lock, sleep, hibernate, and lid-close behavior independently for plugged-in versus on-battery. Lives at `~/Documents/omarchy-powerplan`, remote `github.com/ValleytheKnight/omarchy-powerplan-widget`.

ORIGIN: started as a fork of Sandman (MIT licensed, `github.com/lgse/sandman`, original work by Pierre Berube). Kept the NOTICE.md/LICENSE crediting the fork relationship. Renamed `sandman.py`/`sandman-configure-hibernate` to `powerplan.py`/`powerplan-configure-hibernate` early on.

CORE REWORK FROM THE ORIGINAL: Sandman had single values per setting; this fork splits every idle/lock/lid/hibernate setting into an AC/battery pair. `Model.js` stores every setting as `{ac, battery}` instead of a bare value, resolved through `effectiveSeconds()`/`effectiveLidAction()`. Wired to Quickshell's `UPower.onBattery` signal, the same one Omarchy's own battery service uses, and the idle cycle rearms itself on every power-source change. Panel rebuilt as a two-column AC/battery layout, plus a Power Profile section (picks which Omarchy power profile applies on AC vs. battery).

SEVEN CONTROLS, each set independently per power state: lid close, screen saver, displays off, auto-lock, sleep, hibernate-after-sleep, power profile. Each timeout offers presets, Off, and a custom hours/minutes/seconds entry.

LID HANDLING, the trickiest part: lid controls only show up when UPower reports a laptop lid. Omarchy's default lid binding (`switch:on:Lid Switch` in Hyprland) locks the session immediately on lid close, before the widget can apply anything else, so Power Plan unbinds that default and installs its own managed block in `~/.config/hypr/bindings.lua`, keeping only Omarchy's clamshell monitor reconciliation. Selecting "System default" removes that managed block again, handing lid behavior back to logind. Managed lid actions use a low-level lid-switch inhibitor while the widget is running rather than touching system-wide logind config permanently.

REAL BUGS FOUND AND FIXED DURING BUILD, not just features:
- Screensaver-only timeouts never actually triggered, fixed.
- Custom timeout entry required pressing Enter to apply, and had guessed prefill defaults that didn't match reality, both fixed.
- Stale prefill value surviving on components created while the panel was already open, fixed.
- Trackpad scroll felt wrong: switched from `angleDelta` to `pixelDelta` to match real trackpad pixel counts, then added a sensitivity multiplier since 1:1 still felt too slow.
- Narrowed a lid-close sleep inhibitor from a standing block down to a brief race guard.
- Added a "Stay Awake" warning on the screensaver and auto-lock sections, so the widget doesn't silently do nothing while a separate stay-awake mechanism is holding idle off.

INSTALL: `omarchy plugin add https://github.com/ValleytheKnight/omarchy-powerplan-widget.git --enable`, plus a privileged helper installed manually via `sudo install` into `/usr/local/libexec/`, since the hibernate-config step needs root and the plugin itself runs unprivileged.

STATUS: shipped and daily-driven. README, NOTICE, demo GIF, and real screenshots (replacing the original Sandman preview images) all in place.

## Content Analysis

### Main Themes
1. **Shipped, daily-driven fork with a real architectural rework**, not a cosmetic fork: every setting moved from a single value to an AC/battery pair, a genuine model change (`Model.js`), not just new UI.
2. **Lid-close handling was the hardest problem**, required unbinding Omarchy's own default Hyprland lid binding and installing a managed replacement block, with a clean removal path back to system default.
3. **Six concrete bugs found and fixed during build**, spanning timeout logic, UI prefill state, and trackpad scroll feel.
4. **Proper open-source fork hygiene**, NOTICE/LICENSE preserved, file renames done early, credit to the original author kept.
5. **Install requires a manually-installed privileged helper**, a real deviation from the plugin's otherwise-unprivileged install path.

### Supporting Ideas
- Wired to Quickshell's `UPower.onBattery` signal, the same source Omarchy's own battery service uses, keeping the widget consistent with system-level power-state detection rather than polling independently.
- The "Stay Awake" warning is a deliberate UX safeguard against a silent conflict with a separate stay-awake mechanism.

### Questions Raised
- Since install requires a manual `sudo install` step for the privileged helper (not fully covered by `omarchy plugin add`), is that documented clearly enough in the README for another user (or future-you on a fresh machine) to reproduce, or is it tribal knowledge right now?
- Has this shipped widget been added to the `obsidian-plugins-themes` "Shipped" table pattern, or does it need its own equivalent tracking now that it's a live, daily-driven project outside that vault section?

### Decisions Contemplated
- (Resolved) Standing lid-inhibitor block vs. brief race guard, narrowed to the latter after testing.
- (Resolved) `angleDelta` vs. `pixelDelta` for trackpad scroll, switched to pixel-based with an added sensitivity multiplier.

## Strategic Intelligence

### Key Insights
1. **This fork's core value-add is the AC/battery split, not new features.** Every one of Sandman's original single-value settings became a pair; that's the actual differentiator from the upstream project, worth stating clearly in any future README/marketing copy for the widget.
2. **The lid-handling implementation is the riskiest, most bespoke part of this codebase.** It unbinds and reinstalls a Hyprland binding and manages an inhibitor lifecycle, this is exactly the kind of code that will need re-verification after any future Omarchy or Hyprland update changes lid-binding conventions.
3. **The privileged-helper install step is a real onboarding friction point.** It's the one part of setup that isn't handled by the standard `omarchy plugin add` flow, worth flagging for anyone else who installs this.

### Pattern Recognition
- **Connection to Previous Thinking:** this is Chris's second Omarchy-ecosystem project shipped this week alongside the omarchy-image-theme app (still in review), suggesting an active push into Omarchy-specific tooling following the recent CachyOS-to-Omarchy migration.
- **Recurring Pattern:** "find real bugs by running the thing, not just reading the code" appears here too (six bugs found during build), the same discipline shown in the `knight-watch` watchers work described in [[braindump-2026-09-07-1552-recent-knight-code-changes]].
- **Evolution:** unlike the `obsidian-plugins-themes` projects (which live nested inside the Knight Code repo), this is a standalone repo (`omarchy-powerplan-widget`) with its own GitHub remote, a different project-organization pattern worth being intentional about going forward.

### Strategic Implications
- Since this is shipped and daily-driven, it's a candidate for the kind of "Shipped" status table `obsidian-plugins-themes/PROJECT-OVERVIEW.md` uses; right now this project has no `PROJECT-OVERVIEW.md` at all (confirmed: only a `braindumps/` folder exists), so it has no tracked Next Steps despite being live software.
- The lid-handling and privileged-helper install are the two areas most likely to need future maintenance attention if Omarchy or Hyprland's own conventions shift.

## Action Items

### Immediate (24-48 hours)
- [ ] Create `04-projects/omarchy-powerplan-widget/PROJECT-OVERVIEW.md` so this shipped project has a tracked status and Next Steps home 📅 2026-09-09

### Short-term (1-2 weeks)
- [ ] Confirm the README documents the manual privileged-helper install step clearly enough to follow cold 📅 2026-09-14

### Strategic Considerations
- If more standalone (non-nested) Omarchy-ecosystem projects follow this one and the image-theme app, worth deciding whether they need a shared parent grouping in the vault (similar to how plugin/theme work nests under Knight Code) or stay independent top-level projects.

## Connections
- **Related Braindumps:** [[braindump-2026-09-07-1552-omarchy-migration]], [[braindump-2026-09-07-1552-omarchy-image-theme-app]]
- **Relevant Projects:** none yet tracked, this project currently has no `PROJECT-OVERVIEW.md` (see Action Items)

## Domain Classification
- **Primary Domain:** project-specific (omarchy-powerplan-widget) (95%)
- **Reasoning:** entirely about this specific shipped widget's architecture, bugs, and install process.
- **Cross-Domain Elements:** part of the same broader Omarchy-ecosystem push as the migration and image-theme braindumps, cross-referenced above.
- **Privacy Level:** private

## Processing Notes

### Emotional Context
- **Energy Level:** Medium, a satisfied, detailed post-ship retrospective.
- **Emotional Tone:** Satisfied (per frontmatter), reads as genuinely proud of the AC/battery rework and the bug-fixing thoroughness.
- **Implications:** Written after shipping, not during active development; safe to treat "STATUS: shipped and daily-driven" as current fact as of 2026-09-07.

### Confidence Assessment
- **Overall Analysis:** 90% - highly specific technical detail (file names, signal names, exact bug descriptions).
- **Domain Classification:** 95% - unambiguously specific to this one widget.
- **Strategic Insights:** 85% - insights directly evidenced by stated architecture and events; the PROJECT-OVERVIEW.md gap is a confirmed fact, not an inference.
- **Areas Requiring Clarification:** whether the README's privileged-helper install instructions have actually been tested by following them cold (not addressed in source content).

---

*Processed by COG Brain Dump Analyst*
