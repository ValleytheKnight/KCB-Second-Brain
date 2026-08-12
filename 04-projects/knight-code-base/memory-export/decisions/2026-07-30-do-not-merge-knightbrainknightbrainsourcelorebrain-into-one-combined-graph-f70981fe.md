---
id: "f70981fe-5c5a-4a93-bbe0-3ed45673de59"
type: "decision"
date: "2026-07-30"
scope: "repo"
source: "user"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Do not merge knightbrain/knightbrain_source/lorebrain into one combined graph. They already share th...

## Decision

Do not merge knightbrain/knightbrain_source/lorebrain into one combined graph. They already share the identical lorebrain engine codebase; the only differences are --root and --tool-prefix per MCP registration. Keep them as separately-indexed roots (Knight Code, the old source project, the ROTFG campaign vault) since they're unrelated content domains, but any engine improvement (e.g. language coverage) benefits all three automatically.

## Rationale

Chris asked whether the three should be unified into "one brain," assuming they might be separate systems. Verified via ~/.claude.json that all three run the exact same `bun lorebrain/src/cli.ts mcp` command with only --root and --tool-prefix differing. Combining the codebase is moot since it's already shared; combining the actual graph data would mix unrelated domains (a coding tool vs. personal D&D campaign lore) and likely reduce query relevance without a stated need for cross-domain queries.
