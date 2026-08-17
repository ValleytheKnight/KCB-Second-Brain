---
type: "structure-overview"
date: "2026-08-16"
tags: ["knight-code", "structure", "skills"]
---
# Knight Code Skills

Knight Code installs 56 skills. Each entry below is pulled from the live skills knowledge graph (name, description, and its declared tools list); the tables that follow are copied from SKILL-CATALOG.md for the invoke method and any associated custom agent, which the graph does not model.
## Every installed skill

| Skill | Description | Declared tools |
|---|---|---|
| `impeccable` | Use when the user wants to design, redesign, shape, critique, audit, polish, clarify, distill, harden, optimize, adapt, animate, colorize, extract, or otherwise improve a frontend interface. Covers we | *), .claude/skills/impeccable/scripts/*), Bash(node, Bash(npx, impeccable |
| `knightcode-api-and-interface-design` | Guides stable API and interface design. | inherits session tools |
| `knightcode-autoplan` | Runs the CEO, design, and eng review skills sequentially and auto-decides on findings. | AskUserQuestion, Bash, Edit, Glob, Grep, Read, WebSearch, Write |
| `knightcode-browse` | Fast headless browser for QA testing and site dogfooding. | AskUserQuestion, Bash, Read |
| `knightcode-code-review` | Reviews a diff against repo coding standards and the originating spec. | inherits session tools |
| `knightcode-codebase-design` | Shared vocabulary for designing deep modules with small, testable interfaces. | inherits session tools |
| `knightcode-context-restore` | Restore working context saved earlier by /context-save. | AskUserQuestion, Bash, Glob, Grep, Read |
| `knightcode-context-save` | Save working context. | AskUserQuestion, Bash, Glob, Grep, Read, Write |
| `knightcode-cso` | Chief Security Officer mode. | Agent, AskUserQuestion, Bash, Glob, Grep, Read, WebSearch, Write |
| `knightcode-design-critique` | Critiques an existing, already-built frontend or UI against a fixed standard of UX, accessibility, and design-quality principles. | Bash, Glob, Grep, Read |
| `knightcode-design-impeccable` | A modern, graphic, editorial-poster aesthetic  -  warm and confident  -  built on alternating cream and burnt orange sections, an amber brand color. | inherits session tools |
| `knightcode-devex-review` | Live developer experience audit. | AskUserQuestion, Bash, Edit, Glob, Grep, Read, WebSearch |
| `knightcode-document-generate` | Generate missing documentation from scratch for a feature, module, or entire project. | AskUserQuestion, Bash, Edit, Glob, Grep, Read, Write |
| `knightcode-document-release` | Post-ship documentation update. | AskUserQuestion, Bash, Edit, Glob, Grep, Read, Write |
| `knightcode-domain-modeling` | Build and sharpen a project's domain model. | inherits session tools |
| `knightcode-doubt-driven-development` | Subjects every non-trivial decision to a fresh-context adversarial review before it stands. | inherits session tools |
| `knightcode-electron-build` | Scaffolds, packages, signs, and ships Electron desktop apps. | inherits session tools |
| `knightcode-fantasy-craft` | Master-level fantasy fiction craft system for structure, prose, and worldbuilding. | inherits session tools |
| `knightcode-formal-dev-workflow` | Enforces formal app-development workflow: CEO review, design review, eng review, task breakdown, incremental implementation per feature, with hard hook enforcement blocking implementation until planni | Agent, AskUserQuestion, Bash, Edit, Glob, Grep, Read, WebSearch, Write |
| `knightcode-frontend-design` | Create distinctive, production-grade frontend interfaces with high design quality. | inherits session tools |
| `knightcode-frontend-ui-engineering` | Builds accessible, responsive, production-quality user-facing UI. | inherits session tools |
| `knightcode-grill-me` | Interviews Chris round by round to find what he actually wants, not just his first ask. | inherits session tools |
| `knightcode-grill-with-docs` | A relentless interview to sharpen a plan while keeping the project's glossary and decision log current. | inherits session tools |
| `knightcode-health` | Code quality dashboard. | AskUserQuestion, Bash, Edit, Glob, Grep, Read, Write |
| `knightcode-impeccable` | Use to design, redesign, critique, audit, polish, harden, optimize, or extract a frontend interface: websites, dashboards, product UI, components, forms, onboarding, empty states. | *), .claude/skills/knightcode-impeccable/scripts/*), Bash(node, Bash(npx, impeccable |
| `knightcode-improve-codebase-architecture` | Scan a codebase for deepening opportunities, present them as a visual HTML report, then grill through whichever one you pick. | inherits session tools |
| `knightcode-incremental-implementation` | Delivers changes incrementally. | inherits session tools |
| `knightcode-investigate` | Systematic debugging with root cause investigation. | AskUserQuestion, Bash, Edit, Glob, Grep, Read, WebSearch, Write |
| `knightcode-master-copywriter` | World-class conversion copywriter and ruthless editor. | inherits session tools |
| `knightcode-mnemosyne-audit` | Audits recent Mnemosyne memory writes for routing mistakes and hygiene issues. | Bash, Read, mcp__knight-code-memory__learnings_log, mcp__knight-code-memory__learnings_search, mcp__knight-code-mnemosyne__mnemosyne_export, mcp__knight-code-mnemosyne__mnemosyne_hygiene_audit |
| `knightcode-observability-and-instrumentation` | Instruments code so production behavior is visible and diagnosable. | inherits session tools |
| `knightcode-obsidian-bases` | Create and edit Obsidian Bases (.base files) with views, filters, formulas, and summaries. | inherits session tools |
| `knightcode-obsidian-cli` | CLI to read, create, search, and manage vault content, or develop Obsidian plugins. | inherits session tools |
| `knightcode-obsidian-markdown` | Create and edit Obsidian Flavored Markdown with wikilinks, embeds, callouts, properties, and other Obsidian-specific syntax. | inherits session tools |
| `knightcode-office-hours` | Startup-mode forcing questions on demand reality, wedge, and future fit. | AskUserQuestion, Bash, Edit, Glob, Grep, Read, WebSearch, Write |
| `knightcode-performance-optimization` | Optimizes application performance across frontend, backend, queries, and databases. | inherits session tools |
| `knightcode-pick-ui-library` | Picks the right UI library for a frontend task from a curated list. | inherits session tools |
| `knightcode-plan-ceo-review` | CEO/founder-mode plan review. | AskUserQuestion, Bash, Glob, Grep, Read, WebSearch |
| `knightcode-plan-design-review` | Designer's eye plan review, interactive, like a CEO/eng review. | AskUserQuestion, Bash, Edit, Glob, Grep, Read |
| `knightcode-plan-eng-review` | Eng manager-mode plan review. | AskUserQuestion, Bash, Glob, Grep, Read, WebSearch, Write |
| `knightcode-planning-and-task-breakdown` | Decomposes a spec into ordered, sized tasks with acceptance criteria. | inherits session tools |
| `knightcode-powershell-windows` | PowerShell-specific pitfalls, operator syntax, and error handling patterns. | inherits session tools |
| `knightcode-prototype` | Builds multiple genuinely different UI versions behind a visual picker. | inherits session tools |
| `knightcode-pytest-testing` | Writes production-grade pytest tests: fixtures, parametrize, markers, mocking, and conftest patterns. | inherits session tools |
| `knightcode-python-performance` | Profiles and optimizes Python code: cProfile, memory/line profiling, and CPython-specific speedups. | inherits session tools |
| `knightcode-scrape` | Pull data from a web page. | AskUserQuestion, Bash, Read |
| `knightcode-security-and-hardening` | Hardens code against vulnerabilities while it is being written. | inherits session tools |
| `knightcode-setup-pre-commit` | Set up Husky pre-commit hooks with lint-staged (Prettier), type checking, and tests in the current repo. | inherits session tools |
| `knightcode-ship` | Ship workflow: detect + merge base branch, run tests, review diff, bump VERSION, update CHANGELOG, commit, push, create PR. | Agent, AskUserQuestion, Bash, Edit, Glob, Grep, Read, WebSearch, Write |
| `knightcode-simplify` | Simplifies code for clarity without changing behavior. | inherits session tools |
| `knightcode-spec` | Turn vague intent into a precise, executable spec in five phases. | AskUserQuestion, Bash, Glob, Grep, Read |
| `knightcode-test-driven-development` | Drives development with tests. | inherits session tools |
| `knightcode-wayfinder` | Plans oversized or foggy work as a shared map of GitHub Issue decision tickets. | inherits session tools |
| `knightcode-windows-shell-reliability` | Reliable command execution on Windows: paths, encoding, and common binary pitfalls. | inherits session tools |
| `knightcode-writing-great-skills` | Design principles for judging whether a skill is well-built. | inherits session tools |
| `knightcode-writing-skills` | Use when creating new skills, editing existing skills, or verifying skills work before deployment | inherits session tools |

## Invoke method and associated agent, by category

Copied directly from Knight Code's own SKILL-CATALOG.md.

| Skill (installed as) | Invoke | Associated agent |
|---|---|---|
| `investigate` (`knightcode-investigate`) | Skill tool, or trigger phrases: "debug this", "fix this bug", "why is this broken", "investigate this error", "root cause analysis". Ships three supporting technique files alongside `SKILL.md`: `reference-root-cause-tracing.md` (backward-tracing a deep-stack bug to its origin), `reference-defense-in-depth.md` (validating at every layer once root cause is found), `reference-condition-based-waiting.md` (replacing sleep-based test waits with condition polling, including `pytest-qt`) | None, general-purpose, any session or agent can invoke it |
| `context-save` (`knightcode-context-save`) | Skill tool, or trigger phrases: "save progress", "save state", "save my work", "context save" | None, pairs with `context-restore` |
| `context-restore` (`knightcode-context-restore`) | Skill tool, or trigger phrases: "resume", "restore context", "where was I", "pick up where I left off" | None, pairs with `context-save`, loads the most recent saved context across all branches by default |

| Skill (installed as) | Invoke | Associated agent |
|---|---|---|
| `master-copywriter` (`knightcode-master-copywriter`) | Skill tool, or trigger phrases: "improve the copy", "rewrite this", "make it sound less AI", "too many dashes", "sharpen the headline", "copy pass" | `Obsidian`, Obsidian Rules.md section 3/5 requires every finished plugin/theme README to be run through this skill directly before shipping, bypassing loremaster |
| `fantasy-craft` (`knightcode-fantasy-craft`) | Skill tool, or trigger phrases: "my novel", "my story", "write a scene/chapter", "worldbuilding", "magic system", "character arc", "plot help", "critique my writing", "outline my book", "revise my draft" | None documented, maintains its own `story-bible/` across sessions, standalone |
| `writing-skills` (`knightcode-writing-skills`) | Skill tool, invoked when creating, editing, or verifying a skill before deployment | None, a meta/discipline skill for building other skills |

| Skill (installed as) | Invoke | Associated agent |
|---|---|---|
| `impeccable` (`knightcode-impeccable`) | Skill tool, or `/impeccable <command> [target]` (23 commands, see the breakdown below) | None at the skill level, the real, separate `pbakaus/impeccable` open-source project, a standalone design-quality gate. Own PostToolUse/Stop hook wired into `.claude/settings.json` (automatic anti-pattern check after Edit/Write, deeper pass at session end). See "Impeccable command breakdown" and "Impeccable sub-agents" below |
| `design-impeccable` (`knightcode-design-impeccable`) | Skill tool, pairs with `impeccable`, picks the visual direction (warm editorial-poster aesthetic) while `impeccable` governs quality | None, not an agent pairing, a skill-to-skill pairing with `impeccable` above |
| `frontend-design` (`knightcode-frontend-design`) | Skill tool, invoked when building web components, pages, or applications | None |

| Skill (installed as) | Invoke | Associated agent |
|---|---|---|
| `pick-ui-library` (`knightcode-pick-ui-library`) | Skill tool, picking a frontend library (toasts, charts, drag and drop, state, styling, more) from a curated list | None |
| `prototype` (`knightcode-prototype`) | Skill tool, building several genuinely different UI variants behind a live visual picker | None |

| Skill (installed as) | Invoke | Associated agent |
|---|---|---|
| `incremental-implementation` (`knightcode-incremental-implementation`) | Skill tool, or any multi-file change, or a task too big to land in one step | None |
| `grill-me` (`knightcode-grill-me`) | Skill tool, or trigger phrases: "interview me", "grill me", "stress-test my thinking", "are we sure?". Needs an interactive session, refuses to run unattended | None. Its interview mechanism (map the ask as a branching decision tree, interview in rounds against the frontier of settled prerequisites) is ported from `grilling` in `github.com/mattpocock/skills` |
| `wayfinder` (`knightcode-wayfinder`) | Skill tool, judgment-based, no fixed trigger phrase. Chris invokes it directly, or Claude reaches for it when an idea is too big for one `grill-me` session, or when Chris points at an existing `wayfinder:map` GitHub issue | None. Ported from `github.com/mattpocock/skills`. Charts a huge, foggy effort as a `wayfinder:map` GitHub issue with `grill-me`-driven child "decision tickets" (research, prototype, grilling, task), worked one at a time across sessions until the frontier closes. Reuses `knightcode-spec`/`knightcode-ship`'s existing `gh`-based issue tracker rather than needing its own; ticket resolutions that clear `domain-modeling`'s bar also get a durable `decision_log` entry, not just a line on the map |
| `test-driven-development` (`knightcode-test-driven-development`) | Skill tool, or implementing logic, fixing a bug, changing behavior. Discovers the repo's own test commands before writing a test | None |
| `doubt-driven-development` (`knightcode-doubt-driven-development`) | Skill tool, main session only. Spawns a fresh-context adversarial reviewer per non-trivial decision; never listed in a custom agent's own definition | None at the skill level; Step 3 spawns a general-purpose or domain-matched subagent as the reviewer |
| `api-and-interface-design` (`knightcode-api-and-interface-design`) | Skill tool, designing an API, module boundary, type contract, or any public interface | None |
| `observability-and-instrumentation` (`knightcode-observability-and-instrumentation`) | Skill tool, adding logging/metrics/tracing/alerting, or a production issue that couldn't be diagnosed from available data | None |
| `performance-optimization` (`knightcode-performance-optimization`) | Skill tool, measured slowness: Core Web Vitals, N+1 queries, bundle size, suspected regression | None |
| `frontend-ui-engineering` (`knightcode-frontend-ui-engineering`) | Skill tool, building or fixing UI correctness: keyboard nav, focus management, ARIA, WCAG 2.1 AA, state placement, loading/error/empty states. The engineering half of frontend work; `frontend-design` and `impeccable` cover taste | None |
| `security-and-hardening` (`knightcode-security-and-hardening`) | Skill tool, writing security controls as code goes in: untrusted input, auth, sessions, secrets, uploads, SSRF, dependency changes, LLM output handling. Writes controls; `cso` is the read-only audit that grades them | None |
| `planning-and-task-breakdown` (`knightcode-planning-and-task-breakdown`) | Skill tool, decomposing a fresh spec with no plan yet: dependency graph, vertical slices, XS-to-XL sizing, acceptance criteria, checkpoints. Produces the plan the plan-review skills then grade | None |
| `simplify` (`knightcode-simplify`) | Skill tool, a behavior-preserving clarity pass over recently changed code: nesting, naming, duplication, dead code, over-engineering. Quality only, not a bug hunt; `review` covers correctness and `investigate` covers root cause. Ported from the source repo's `code-simplification`, renamed to `simplify` to match Knight Code's own naming | None |
| `codebase-design` (`knightcode-codebase-design`) | Skill tool, designing or improving a module's interface, finding deepening opportunities, deciding where a seam goes, or making code more testable | None. Ported from `github.com/mattpocock/skills`. Shared vocabulary for "deep modules" (small interface, a lot of implementation behind it, one clean seam); distinct from `api-and-interface-design`, which is about contract stability across a boundary rather than interface depth within one module. Its two reference files, `DEEPENING.md` (deepening a cluster given its dependencies) and `DESIGN-IT-TWICE.md` (parallel sub-agents design the same interface several ways, then compare), live alongside the skill's own `SKILL.md` |
| `domain-modeling` (`knightcode-domain-modeling`) | Skill tool, pinning down domain terminology, resolving a term that conflicts with what's already recorded in `CONTEXT.md`, or when `improve-codebase-architecture` needs the domain model kept current as a side effect | None. Ported from `github.com/mattpocock/skills`. Maintains `CONTEXT.md` (and `CONTEXT-MAP.md` for multi-context repos) as a project's domain glossary. Upstream's ADR half is adapted rather than ported as-is: this version calls `decision_log`/`decision_search` for hard-to-reverse, non-obvious, real-trade-off decisions instead of writing `docs/adr/` files, so architecture decisions don't end up split across two parallel record systems. Its reference file, `CONTEXT-FORMAT.md`, lives alongside the skill's own `SKILL.md` |
| `grill-with-docs` (`knightcode-grill-with-docs`) | `/knightcode-grill-with-docs` only, `disable-model-invocation: true`. Composes `grill-me` and `domain-modeling` under one deliberate trigger, for when Chris wants both running together on purpose rather than leaving the combination to be inferred mid-interview | None. Ported from `github.com/mattpocock/skills`. Has no process of its own beyond the composition; both skills it names already run standalone (`grill-me` explicit or ambient, `domain-modeling` ambient) |
| `improve-codebase-architecture` (`knightcode-improve-codebase-architecture`) | Skill tool, or `/improve-codebase-architecture`, `disable-model-invocation: true` by design (matches upstream), a full architecture scan is deliberate, not something to auto-trigger on a vague complaint | None. Ported from `github.com/mattpocock/skills`. Scans a codebase for deepening opportunities using `codebase-design`'s vocabulary, writes a self-contained Tailwind/Mermaid HTML report to the OS temp directory (never the repo) with before/after diagrams per candidate, then hands the picked candidate to `grill-me` to walk its decision tree and to `domain-modeling` to keep `CONTEXT.md` and any resulting decisions current. Its reference file, `HTML-REPORT.md` (scaffold, diagram patterns, styling and tone rules), lives alongside the skill's own `SKILL.md` |

| Skill (installed as) | Invoke | Associated agent |
|---|---|---|
| `pytest-testing` (`knightcode-pytest-testing`) | Skill tool, writing or reviewing pytest tests: fixtures, parametrize, markers, mocking, conftest patterns, including `pytest-qt` tests for PySide6 widgets. Distinct from `test-driven-development` (what to test, red-green-refactor) and `investigate` (why a test fails) | None |
| `python-performance` (`knightcode-python-performance`) | Skill tool, profiling or optimizing slow Python code: cProfile/line/memory profiling, CPython-specific speedups. Distinct from `performance-optimization`, which covers frontend/general slowness | None |

| Skill (installed as) | Invoke | Associated agent |
|---|---|---|
| `browse` (`knightcode-browse`) | Skill tool, or `/browse`, or the `$B <command>` binary directly | None, general headless-browser QA/dogfooding tool, any session or agent can invoke it |
| `scrape` (`knightcode-scrape`) | Skill tool, or trigger phrases: "scrape this page", "get data from", "pull from", "extract from" | None, read-only, match path via `$B skill run` or prototype path via raw `$B` primitives |

| Skill (installed as) | Invoke | Associated agent |
|---|---|---|
| `office-hours` (`knightcode-office-hours`) | Skill tool, or trigger phrases: "brainstorm this", "I have an idea", "help me think through this", "office hours", "is this worth building" | `devknight` uses this as the standing idea-stage step before `plan-ceo-review`, for any project still at the concept stage with no real plan to review yet. Startup mode (six forcing questions) or Builder mode (open-ended brainstorming), produces a design doc saved into the owning project's own planning folder, then an adversarial spec-review pass before approval. |

| Skill (installed as) | Invoke | Associated agent |
|---|---|---|
| `electron-build` (`knightcode-electron-build`) | Skill tool, or trigger phrases: starting a new Electron project, configuring `electron-builder`, code signing, `electron-updater` setup, Electron dev/debug/test loop | `devknight`'s Electron-track equivalent of the `winui-dev`/`win-dev-skills` toolchain for WinUI3. Scaffolding/packaging/signing/auto-update/state/dev-loop only, IPC and preload security is `docs/ELECTRON_SECURITY_CHECKLIST.md`, not this skill. |
| `setup-pre-commit` (`knightcode-setup-pre-commit`) | Skill tool, or trigger phrases: "add pre-commit hooks", "set up husky", "configure lint-staged" | None. Ported from `github.com/mattpocock/skills`, adapted to detect and use bun's own install/run syntax (the source assumed npm throughout even after detecting the real package manager) rather than assuming npm. An installer, not a reference skill, actually writes `.husky/`, `.lintstagedrc`, and a Prettier config into whichever repo it's run in |

| Skill (installed as) | Invoke | Associated agent |
|---|---|---|
| `obsidian-bases` (`knightcode-obsidian-bases`) | Skill tool, or working with `.base` files, database-like note views, filters, formulas, or summaries | None |
| `obsidian-markdown` (`knightcode-obsidian-markdown`) | Skill tool, or writing/editing `.md` notes with Obsidian-specific syntax: wikilinks, embeds, callouts, properties, comments | None |
| `obsidian-cli` (`knightcode-obsidian-cli`) | Skill tool, or reading/creating/searching vault content, or developing/debugging a plugin or theme from the command line, via the `obsidian` CLI binary. Requires Obsidian to be open | None; complements, does not replace, the `Obsidian` custom agent's own plugin-dev workflow |

| Skill (installed as) | Invoke | Associated agent |
|---|---|---|
| `windows-shell-reliability` (`knightcode-windows-shell-reliability`) | Skill tool, or a shell command that works on Linux/macOS but fails, hangs, or garbles output on Windows: paths, encoding, binary pitfalls | None |
| `powershell-windows` (`knightcode-powershell-windows`) | Skill tool, or writing/debugging PowerShell: comparison-operator syntax, string handling, try/catch behavior | None |

| Skill (installed as) | Invoke | Associated agent |
|---|---|---|
| `code-review` (`knightcode-code-review`) | Skill tool, or trigger phrases: "review since X", "review this branch" | None. Ported from `github.com/mattpocock/skills`. Two parallel sub-agents grade the diff against the repo's documented standards (plus a fixed Fowler code-smell baseline) and against the originating issue/spec, reported side by side rather than merged |
| `plan-design-review` (`knightcode-plan-design-review`) | Skill tool, or trigger phrases: "review the design plan", "design critique" | None, reviews a plan's UI/UX decisions before implementation, distinct from `impeccable`'s live-site audit |
| `plan-ceo-review` (`knightcode-plan-ceo-review`) | Skill tool, or trigger phrases: "think bigger", "expand scope", "strategy review", "rethink this plan" | None, four modes (scope expansion/selective/hold/reduction), persists scope decisions via `decision_log` |
| `plan-eng-review` (`knightcode-plan-eng-review`) | Skill tool, or trigger phrases: "review the architecture", "engineering review", "lock in the plan" | None, interactive architecture/code-quality/test/performance review, same review-family shape as `plan-ceo-review`/`plan-design-review` |
| `devex-review` (`knightcode-devex-review`) | Skill tool, or trigger phrases: "test the DX", "DX audit", "developer experience test", "try the onboarding" | None, live audit via the `browse` tool |
| `autoplan` (`knightcode-autoplan`) | Skill tool, or trigger phrases: "run all reviews", "automatic review pipeline", "auto plan review" | None, chains `plan-ceo-review` + `plan-design-review` (if UI scope) + `plan-eng-review` with auto-decisions via 6 principles, only 2 gates (premises, user challenges) stay interactive |

| Skill (installed as) | Invoke | Associated agent |
|---|---|---|
| `health` (`knightcode-health`) | Skill tool, or trigger phrases: "health check", "code quality", "how healthy is the codebase", "quality score" | None, wraps the project's own typecheck/lint/test/deadcode/shell tools, tracks trend history |

| Skill (installed as) | Invoke | Associated agent |
|---|---|---|
| `cso` (`knightcode-cso`) | Skill tool, or trigger phrases: "security audit", "threat model", "pentest review", "OWASP", "CSO review" | None, daily (8/10 confidence gate) and comprehensive (2/10 bar) modes, saves reports to `.knightcode/security-reports/` |

| Skill (installed as) | Invoke | Associated agent |
|---|---|---|
| `ship` (`knightcode-ship`) | Skill tool, or trigger phrases: "ship it", "create a pr", "push to main", "deploy this" | None, full CHANGELOG/VERSION ceremony (`bin/knight-version-bump`), automatic git tagging, PR creation |
| `spec` (`knightcode-spec`) | Skill tool, or trigger phrases: "spec this out", "file an issue", "write up a ticket", "make this a github issue", "turn this into a backlog item" | None, five-phase interrogation ending in a real `gh issue create`, redaction-gated; `ship` auto-closes the source issue on a delivering merge |

| Skill (installed as) | Invoke | Associated agent |
|---|---|---|
| `document-generate` (`knightcode-document-generate`) | Skill tool, or trigger phrases: "write docs for this", "generate documentation", "document this feature", "create a tutorial" | None, Diataxis-framework writer (tutorial/how-to/reference/explanation), standalone or called by `document-release` when it finds coverage gaps |
| `document-release` (`knightcode-document-release`) | Skill tool, or trigger phrases: "update docs after ship", "document what changed", "post-ship docs" | None, post-ship doc audit, coverage map, CHANGELOG voice polish; never auto-generates missing pages, suggests `document-generate` for that |

