---
id: "35ad1e66-77dc-4520-b0b7-835c907380cf"
type: "decision"
date: "2026-08-15"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: Scryptable's repo is created: local git repo at Documents\DevPrograms\Scryptable\ (git init, branch ...

## Decision

Scryptable's repo is created: local git repo at Documents\DevPrograms\Scryptable\ (git init, branch master), private GitHub repo at https://github.com/ValleytheKnight/Scryptable created under the ValleytheKnight account, remote "origin" wired to it. No commits pushed yet. This supersedes the unconfirmed proposal in decision f7692ba9, now confirmed by Chris directly rather than DevKnight's own recommendation.

## Rationale

Chris confirmed all three open items directly via the coordinator: repo location, GitHub repo creation under ValleytheKnight, and resuming Eng Review. Checked for a name collision first (gh repo view ValleytheKnight/Scryptable returned "could not resolve," confirming no existing repo of that name) before creating. No initial commit was pushed: writing even a plain README.md/.gitignore into the new repo directory was blocked by hosts/claude/hooks/formal-workflow-gate.ts, since protocol-whisper-app's workflow state (now active again after being un-parked) sits at phase "eng," not "implementation" or "done." This is the gate correctly doing its job rather than a bug, so the repo is left as an empty shell (directory + git init + GitHub repo + remote, no content) until Eng Review, the Phase 3.5 Security Review, and task breakdown complete, or Chris explicitly says he wants the gate bypassed for pure non-code scaffolding like a README.
