---
id: "d8815d8b-19c6-4b34-a6f2-30b69ca74f0b"
type: "decision"
date: "2026-08-14"
source: "agent"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Scryptable consolidates all settings into a single tabbed Preferences screen (General, AI Provider, ...

## Decision

Scryptable consolidates all settings into a single tabbed Preferences screen (General, AI Provider, Transcription, Diarization, Transcript Assembly, Speaker Identities, About), reached from exactly two places: the nav rail's Preferences icon and File > Preferences. The Tools menu is removed entirely (its items fold into Preferences), the toolbar's leftover Settings gear icon is removed, and the nav rail drops its separate "Tools" icon.

## Rationale

A design critique pass this session found three separate entry points all named some variant of "Tools" or "Settings" (nav rail Tools icon, menu bar Tools dropdown, toolbar Settings gear), a genuine source of confusion with no clear distinction between them. One screen, two consistent entry points, fixes the naming collision and the redundancy at the same time. Badge/banner color contrast was also independently verified this session (hand-computed WCAG ratios: success 8.17:1, warning 6.10:1, error 6.83:1, info 14.86:1, all pass 4.5:1), closing that open item from the same critique pass.
