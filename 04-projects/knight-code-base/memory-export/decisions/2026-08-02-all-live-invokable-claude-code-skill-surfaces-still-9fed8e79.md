---
id: "9fed8e79-3a9a-4ffb-8e68-45135daebe7e"
type: "decision"
date: "2026-08-02"
scope: "repo"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: All live, invokable Claude Code skill surfaces still naming the source project ("jbrain"/"JBrain"/"J...

## Decision

All live, invokable Claude Code skill surfaces still naming the source project ("jbrain"/"JBrain"/"JBRAIN") are renamed to "knightbrain"/"Knightbrain"/"KNIGHTBRAIN". Concretely: removed the `~/.claude/skills/jbrain` symlink (it pointed directly at the real source project folder at `Documents/JBrain/jbrain-beta-v1.57.7.0`, exposing the raw unported tool under a live, directly-triggerable skill name; that real folder itself is untouched, only the skill-surface symlink is gone). Renamed three real skill directories: `_jbrain-command` -> `_knightbrain-command`, `jbrain-upgrade` -> `knightbrain-upgrade`, `open-jbrain-browser` -> `open-knightbrain-browser`. Mechanically replaced every remaining case-variant occurrence of "jbrain" (frontmatter `name`/`description`/`triggers`, env-var-style references like `JBRAIN_HOME`, body prose) across all 29 affected files, including 26 other skills whose descriptions carried a "(jbrain)" attribution tag (`benchmark`, `canary`, `careful`, `codex`, `guard`, `retro`, `pair-agent`, `land-and-deploy`, and others). Verified clean via a repo-wide case-insensitive grep sweep of `~/.claude/skills` afterward (zero remaining matches) and confirmed the live Skill-tool listing now shows "(knightbrain)" tags and the renamed skill names. Left untouched, deliberately: Chris's own real `Documents/JBrain/jbrain-beta-v1.57.7.0` folder (his file, not a Knight Code naming violation), and historical session/log/backup artifacts under `~/.claude/projects`, `~/.claude/_backups`, `~/.claude/daemon/roster.json`'s recorded `cwd` values, and `~/.claude/token-optimizer` checkpoints, since these are passive history/state referencing a real path that still exists, not live skill-naming surface, and rewriting history is a separate standing anti-pattern this project already avoids.

## Rationale

Chris asked directly, in response to a relayed question about the browse daemon fix, to "remove any jbrain name for knight code or knightbrain whatever fits" since "jbrain is a banned word/term," extending Knight Code's existing hard project-isolation rule (no file may reference the source project by name) to this global, machine-wide skill surface that sits outside the tracked Knight Code repo but is still live and invokable in every session. A mechanical, content-only rename (not a rewrite of each skill's actual functional behavior) was the safe, correct scope: it satisfies the literal ask (remove the banned name) without unilaterally judging any of these skills as redundant or deleting their real capability, a judgment call that belongs to Chris, not to this session.

## Alternatives Considered

Deleting the redundant-seeming skills entirely (jbrain-upgrade, _jbrain-command, both arguably superseded by the already-ported knightcode-browse) rather than renaming them (rejected: Chris asked to remove the name, not to judge and cut capability; renaming preserves his option to keep or later retire them himself). Leaving the `jbrain` symlink in place and only renaming its description (rejected: a symlink can't have its own frontmatter edited without mutating the real source project's own file, and a live skill invokable by the literal banned name pointing straight at unported original source code is the clearest violation of the standing rule, safely resolved by removing just the pointer). Rewriting historical session/backup/checkpoint files that still say "JBrain" (rejected: those are passive history, not live surface, and this project already treats rewriting logged history as its own anti-pattern).
