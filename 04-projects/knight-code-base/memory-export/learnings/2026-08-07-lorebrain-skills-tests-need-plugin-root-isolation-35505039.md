---
id: "35505039-db45-4467-aec0-8c122b98b67e"
type: "learning"
date: "2026-08-07"
skill: "investigate"
learning-type: "pitfall"
key: "lorebrain-skills-tests-need-plugin-root-isolation"
confidence: 9
trusted: false
source: "observed"
tags: ["knight-code", "learning", "investigate"]
---
# Learning: lorebrain-skills-tests-need-plugin-root-isolation

## Insight

Any lorebrain test that calls indexSkills()/indexCode --skills or spawns the CLI in skills mode must isolate all three env knobs together, not just LOREBRAIN_USER_SKILLS: LOREBRAIN_USER_SKILLS, LOREBRAIN_PLUGIN_ROOT (or the equivalent userSkillsDir/pluginRoot opts), and repoRoot's own .claude/skills if relevant. Isolating only userSkillsDir looks complete but still leaks the real machine's installed_plugins.json (~/.claude/plugins) into the graph, since discoverPluginInstalls() is resolved independently of which root is being indexed. Confirmed by direct reproduction: overriding pluginRoot alone flipped a fixture's filesIndexed from 17 to the expected 2.
