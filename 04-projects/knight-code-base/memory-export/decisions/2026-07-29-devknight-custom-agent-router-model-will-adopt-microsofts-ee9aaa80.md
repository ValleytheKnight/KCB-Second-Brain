---
id: "ee9aaa80-44ed-4790-a199-d45074251e30"
type: "decision"
date: "2026-07-29"
scope: "repo"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: DevKnight (custom agent, router model) will adopt Microsoft's official win-dev-skills Claude Code pl...

## Decision

DevKnight (custom agent, router model) will adopt Microsoft's official win-dev-skills Claude Code plugin (winui-dev agent + 8 skills: winui-dev-workflow, winui-design, winui-code-review, winui-ui-testing, winui-packaging, winui-wpf-migration, winui-session-report, winui-setup) as a routing target for the mechanical WinUI3/WPF inner loop, rather than hand-building a custom FlaUI testing skill and impeccable-fallback design pipeline for that same ground.

## Rationale

win-dev-skills is Microsoft's own vendor-maintained, purpose-tuned solution for exactly this problem (shipped Build 2026), reportedly ~70% more token-efficient than an untuned agent doing the same work. Rebuilding it by hand would violate Knight Code's Search Before Building Layer-1 rule (don't reinvent a tried-and-true, framework-native solution). DevKnight remains Chris's own custom agent and stays in full control of when to route to it versus autoplan/health/cso/its own teaching mode; it is a routing target, not a replacement for DevKnight itself.

## Alternatives Considered

Build DevKnight's native-build/testing/design capability entirely by hand (FlaUI + impeccable shape + Artifact HTML mockup fallback) and ignore win-dev-skills as too new; pause and evaluate win-dev-skills standalone before deciding DevKnight's scope at all.
