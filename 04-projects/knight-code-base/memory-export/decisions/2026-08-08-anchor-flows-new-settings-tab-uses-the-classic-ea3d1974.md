---
id: "ea3d1974-9f9b-4cc1-8aa7-743f72e06195"
type: "decision"
date: "2026-08-08"
scope: "repo"
source: "agent"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Anchor Flow's new settings tab uses the classic PluginSettingTab.display() API, not the newer declar...

## Decision

Anchor Flow's new settings tab uses the classic PluginSettingTab.display() API, not the newer declarative getSettingDefinitions() API, and manifest.json's minAppVersion stays at 1.7.0.

## Rationale

The declarative settings API needs minAppVersion >= 1.13.0 (shipped 2026-05-28, genuinely recent), and eslint-plugin-obsidianmd hard-blocks referencing it below that floor with no disable-comment escape hatch, confirmed against the rule source per docs/LESSONS_FROM_OBSIDIAN.md. Raising the floor to adopt the new API would exclude any user not yet on a release that was in early access two months ago. Kept the same choice already made for Linked Text Styles (same 1.7.0 floor, same display() API), for consistency across this account's plugins rather than a per-project split. Surfaced to Chris as a real, live trade-off point rather than picked silently, per the standing rule in Obsidian Rules.md; the lint warning (obsidianmd/settings-tab/prefer-setting-definitions) stays open as an accepted, understood trade-off, not an oversight. Alternative considered: adopting getSettingDefinitions() and raising minAppVersion to 1.13.0+, which would drop compatibility for pre-1.13 users and lose eslint's no-unsupported-api coverage below that floor. Rejected given how recent 1.13.0 is and no evidence this plugin's install base auto-updates aggressively enough to justify it.
