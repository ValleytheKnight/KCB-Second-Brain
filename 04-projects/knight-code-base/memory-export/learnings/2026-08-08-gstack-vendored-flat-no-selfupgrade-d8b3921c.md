---
id: "d8b3921c-df98-4054-b530-8c2d39826129"
type: "learning"
date: "2026-08-08"
skill: "knightbrain-upgrade"
learning-type: "pitfall"
key: "gstack-vendored-flat-no-selfupgrade"
confidence: 9
trusted: false
source: "observed"
tags: ["knight-code", "learning", "knightbrain-upgrade"]
---
# Learning: gstack-vendored-flat-no-selfupgrade

## Insight

The ~/.claude/skills/ "(knightbrain)"-tagged skills are a rebranded vendor copy of the real, public, actively-maintained github.com/garrytan/gstack (confirmed via GitHub API, 126k+ stars, MIT). They were installed flat with no .git and no gstack/ wrapper directory, so the bundled knightbrain-upgrade skill's own automated git-fetch/vendored-clone flow cannot run as written -- its install-type detection (Step 2) finds nothing and would exit with "ERROR: knightbrain not found." Its hardcoded vendored-install clone URL also pointed at a dead/nonexistent placeholder repo, not the real one. Any future update of this skill family has to be done manually: clone garrytan/gstack fresh, apply the existing gstack->knightbrain / GSTACK->KNIGHTBRAIN transform, diff and copy per-skill. Also still missing entirely: the shared ~/.claude/skills/knightbrain/bin/ helper scripts (knightbrain-config, knightbrain-update-check, knightbrain-telemetry-log, etc.) that every one of these skills' preambles call -- those calls are wrapped in `|| true` so they silently no-op rather than error, meaning auto-upgrade nudges, telemetry, and session tracking have never actually run locally.
