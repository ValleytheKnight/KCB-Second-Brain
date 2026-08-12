---
id: "26da92f9-25e0-420a-85fd-dd16d64ef5eb"
type: "learning"
date: "2026-08-06"
skill: "writing-skills"
learning-type: "pitfall"
key: "agent-manager-crlf-parse-failure"
confidence: 9
trusted: false
source: "observed"
tags: ["knight-code", "learning", "writing-skills"]
---
# Learning: agent-manager-crlf-parse-failure

## Insight

Any .claude/agents/*.md file materialized fresh by git on Windows (checkout, stash pop, reset) can flip to CRLF line endings, and mcp/agent-manager's parseAgent() required an exact LF-only "===\n" prefix, so the agent silently vanished from list_agents and update_agent/get_agent reported "does not exist" with zero error surfaced. Confirmed live: devknight.md, 51KB, fully valid and git-committed, disappeared this way after a git stash pop mid-session. Fixed in mcp/agent-manager/src/lib/agent-file.ts by normalizing CRLF to LF at the top of parseAgent before any check runs. Regression coverage: test/agent-file-crlf.test.ts.
