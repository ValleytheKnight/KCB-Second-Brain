---
id: "fe09a07f-9486-4eff-aace-00e82a16ead5"
type: "decision"
date: "2026-07-29"
scope: "repo"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: DevKnight's build spec is complete (devknight/devknight-design-spec.md). Both pre-build gates from t...

## Decision

DevKnight's build spec is complete (devknight/devknight-design-spec.md). Both pre-build gates from the original plan were run live, not from research: gate 1 (toolchain) confirmed exact match to the plan's claimed versions; gate 2 (win-dev-skills) confirmed by actually installing microsoft/win-dev-skills and inspecting its real contents. Two new findings changed scope: (1) winui-ui-testing does not use FlaUI at all, it drives UI Automation via a first-party winapp CLI tool, resolving the FlaUI-WinUI3-support question by making it moot; (2) the originally planned custom native-build skill (dotnet build/test/publish wrapper) is redundant, winui-dev-workflow's BuildAndRun.ps1 and winui-packaging already cover it, dropped from scope. Also settled: DevKnight's design workflow always runs a concept-mockup step before winui-design produces real WinUI3 XAML, never skipped even for small changes.

## Rationale

Live verification is what the original plan's gates required, not a repeat of prior web research. Both findings reduce DevKnight's build scope (one fewer skill to build, one open risk resolved as moot) rather than expanding it, consistent with the router-model philosophy of not rebuilding what a vendor tool already does well.
