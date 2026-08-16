---
id: "12b3e1b2-ee40-4062-8e85-129837e74c12"
type: "decision"
date: "2026-08-15"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: Security enforcement across devknight app development now spans three real mechanical layers, not ju...

## Decision

Security enforcement across devknight app development now spans three real mechanical layers, not just the Phase 3.5 planning gate built earlier: (1) a new PreToolUse hook (formal-workflow-push-gate.ts) blocks git push/gh pr create during a formal-dev-workflow feature's implementation phase unless a passing implementation-time cso scan marker exists; (2) setup-pre-commit now writes a gitleaks secret scan into the generated Husky pre-commit hook, real git-level enforcement independent of any Claude Code hook; (3) devknight's routing table (updated via update_agent, never a direct file edit) now names formal-dev-workflow as the mandatory entry point for all app-dev work rather than one planning option among several, and names all three enforcement layers explicitly in its Security row.

## Rationale

Chris explicitly rejected prose-only enforcement ("prose only directives are weak, i prefer hooks, gates, and tooling on top of prose") and stated all future app development runs through formal-dev-workflow by design. The earlier Phase 3.5 gate only covered the plan, before code exists; nothing re-checked code actually written during Phase 5 Implementation before it reached a push or PR. formal-dev-workflow/SKILL.md.tmpl's Phase 5 checklist now requires running cso and writing a scan marker before the phase can reach done, and the new hook makes that marker load-bearing rather than advisory, following the same phase-state-gating pattern formal-workflow-gate.ts already used and the same Bash-matcher git-command-interception pattern nested-repo-gate.ts and obsidian-release-version-gate.ts already used. Verified live end to end: three deliberate test scenarios (no marker denies, clean marker allows, marker with unresolved critical findings denies) all behaved correctly, including one case caught live on the agent's own real Bash tool call rather than only a simulated stdin test. Full regression suite run afterward: same 7 pre-existing unrelated failures as the baseline established earlier in this session, no new failures from any of today's changes.
