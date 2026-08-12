---
id: "d3ab26c6-1070-4b5c-bcd4-2edd3358bd78"
type: "learning"
date: "2026-07-29"
skill: "plan-ceo-review"
learning-type: "tool"
key: "win-dev-skills-official-winui-plugin"
confidence: 8
trusted: false
source: "observed"
tags: ["knight-code", "learning", "plan-ceo-review"]
---
# Learning: win-dev-skills-official-winui-plugin

## Insight

Microsoft ships an official Claude Code plugin, microsoft/win-dev-skills (winui@win-dev-skills), covering the full WinUI3/WPF inner loop: a winui-dev agent plus 8 skills (winui-dev-workflow, winui-design, winui-code-review, winui-ui-testing, winui-packaging, winui-wpf-migration, winui-session-report, winui-setup). As of this check it's pre-1.0 with no SemVer stability guarantee, so any Knight Code agent routing to it needs a skill-list presence check, not just a plugin-installed check, to catch a silent upstream rename. Before building any custom native-Windows dev tooling in Claude Code, check this plugin first per Search Before Building Layer 1.
