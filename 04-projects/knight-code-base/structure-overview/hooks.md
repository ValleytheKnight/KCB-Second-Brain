---
type: "structure-overview"
date: "2026-08-12"
tags: ["knight-code", "structure", "hooks"]
---
# Knight Code Hooks

Knight Code wires 21 hooks into Claude Code's own lifecycle events (PreToolUse, PostToolUse, SessionStart, SubagentStart, Stop). Every write-time action passes through the relevant hygiene or structural check automatically, rather than depending on a session remembering to run it. Each entry below is that hook file's own header doc-comment, copied verbatim.

## `agent-registry-gate.ts`

PreToolUse hook (Claude Code) on Edit/Write/MultiEdit. Blocks any direct
edit of a file under `.claude/agents/`, the project's agent registry.

CLAUDE.md's standing rule: the only sanctioned way to create, read, update,
or schedule an agent is the `create_agent` / `list_agents` / `update_agent`
/ `get_agent` / `schedule_agent` MCP tools, and a registry file must never
be hand-authored or hand-edited. That rule existed only as prose, which is
exactly the weaker form this project already learned not to trust: a
written policy is not a control boundary if the prohibited action is still
reachable with the tools at hand.

Blocking the Edit/Write path costs nothing legitimate. The agent-manager
MCP server writes these files through its own code, not through the host's
file-editing tools, so the sanctioned path is untouched and only the
forbidden one fails.

Triggered by .claude/settings.json:
  {
    "hooks": {
      "PreToolUse": [
        {
          "matcher": "Edit|Write|MultiEdit",
          "hooks": [
            { "type": "command",
              "command": "bun",
              "args": ["run", "${CLAUDE_PROJECT_DIR}/hosts/claude/hooks/agent-registry-gate.ts"] }
          ]
        }
      ]
    }
  }

Invariants:
  - Denies only edits whose target resolves inside `<repo>/.claude/agents/`.
    Everything else allows, including any internal error (fail open); a
    broken hook must never block unrelated edits.
  - A real block logs one line to ~/.knightcode/hook-invocations.log.
  - Errors land in ~/.knightcode/hook-errors.log.

## `bash-output-budget-hook.ts`

PostToolUse hook (Claude Code) on Bash. Never blocks: always allows, but
strips ANSI escape codes and truncates oversized stdout/stderr before it
reaches Claude's context, the same tool-output-budget idea caveman-code
(github.com/JuliusBrussee/caveman-code) uses to cut token cost on noisy
shell output (build logs, npm installs, long git diffs).

Scoped to Bash only, not Read/Grep: Bash has no built-in output cap, while
Read already defaults to a 2000-line window and Grep already has its own
head_limit, and this project has no confirmed PostToolUse tool_response
schema for either to safely rewrite (the Claude Code hooks doc only
documents Bash's {stdout, stderr, interrupted, isImage} shape for
updatedToolOutput; a wrong shape for another tool is silently ignored per
the doc, but silently ignored also means silently wasted maintenance).

Truncation keeps the first 200 and last 100 lines (matches caveman-code's
own split), since a command's setup/config output and its final result
are usually the two parts worth keeping, with the noisy middle (test
loops, install progress) the safest to drop. Combined output is also
hard-capped in characters, since Claude Code's own updatedToolOutput
payload is capped at 10,000 characters project-wide; this hook stays
comfortably under that regardless of line count.

Triggered by .claude/settings.json:
  {
    "hooks": {
      "PostToolUse": [
        {
          "matcher": "Bash",
          "hooks": [
            { "type": "command",
              "command": "bun",
              "args": ["run", "${CLAUDE_PROJECT_DIR}/hosts/claude/hooks/bash-output-budget-hook.ts"] }
          ]
        }
      ]
    }
  }

Invariants:
  - Always allows. Any internal error also allows (fail open); a broken
    hook must never block or corrupt a Bash tool result.
  - Only rewrites when something actually needs stripping/truncating; a
    clean, small output is passed through untouched (no updatedToolOutput
    field at all) rather than round-tripped for no reason.
  - Errors land in ~/.knightcode/hook-errors.log.

## `devknight-orientation-hook.ts`

SubagentStart hook (Claude Code), matched to agent_type "devknight" only.
Never blocks: always allows, but injects the same rules every time
devknight starts, since each was prose-only in its own agent definition
before this hook existed, and prose alone already failed to prevent the
real incident(s) this hook is built from.

Real incident: devknight wrote real production code for KnightOS's
Task 3 by copying an SVG shape straight out of a locked mockup file and
shipping it as "the logo," without first checking the vault's actual
approved design records. The real chosen asset was a specific PNG on
record elsewhere in the vault; the mockup's SVG was one of several
hand-traced attempts already documented as abandoned. Chris: "this is
why i dont like things appended and why devknight is suppose to do a
full orientation of a project before begining work," and "many mockups
will be made before one is chosen. devknight shouldnt be able to go to
canned mockups and just choose, it should pull from approved design
choices in the vault."

Second real incident, added later: on its first live run under the new
"activate devknight" dispatch-on-activation protocol, devknight skipped
the bare-activation project picker written into its own agent body
(read Projects/_index.md, surface the open-project list for primary
Claude to relay via AskUserQuestion) and just asked "what are we
working on" in plain text instead. Same failure shape as the first
incident: a real rule sitting only in body prose, with nothing forcing
it at the moment devknight actually starts. Rule 3 below is the fix.

This hook cannot verify devknight actually does any of these things,
only a live tool-use audit could confirm that. It is a reminder
injected at the one point guaranteed to fire before devknight does
anything else, the same enforced-nudge pattern as
vault-sync-nudge-hook.ts, not a hard gate.

Triggered by .claude/settings.json:
  {
    "hooks": {
      "SubagentStart": [
        {
          "matcher": "devknight",
          "hooks": [
            { "type": "command",
              "command": "bun",
              "args": ["run", "${CLAUDE_PROJECT_DIR}/hosts/claude/hooks/devknight-orientation-hook.ts"],
              "timeout": 5 }
          ]
        }
      ]
    }
  }
This is a separate matcher entry from the generic "*" SubagentStart
hook (subagent-hygiene-hook.ts), which deliberately never branches on
agent_type. Keeping this content in its own file/matcher, rather than
bolting devknight-specific text onto that generic hook, preserves that
hook's own documented invariant.

Invariants:
  - Always exits 0. A failing hook MUST NOT block a subagent from starting.
    Errors land in ~/.knightcode/hook-errors.log for postmortem.
  - Every successful run appends one line to ~/.knightcode/hook-invocations.log.

ADVISORY BY DESIGN: SubagentStart injects orientation into a subagent as it
begins. There is no action to deny and no turn to block at this event.

## `electron-best-practices-nudge-hook.ts`

PreToolUse hook (Claude Code) on Edit/Write/MultiEdit. Never blocks:
always allows, but injects a reminder to consult
`docs/ELECTRON_SECURITY_CHECKLIST.md` before writing content that touches
Electron's IPC/preload/BrowserWindow security surface (main-to-renderer
bridge code, webPreferences, contextBridge, node-pty wiring).

Real incident this closes: DevKnight wrote KnightOS's Task 6 IPC surface
(a new `git.onChange` channel, a shape-validated payload) by pattern-
matching existing preload/IPC code rather than opening
ELECTRON_SECURITY_CHECKLIST.md while writing it. The code turned out to
conform when checked afterward, but that check only happened because
Chris asked for it directly, not because anything forced it at write time.
A conventions doc referenced only in devknight.md's own routing-table
prose is the same class of gap devknight-orientation-hook.ts and
post-commit-simplify-nudge-hook.ts already exist to close for other rules:
a real rule with nothing forcing it at the moment code actually gets
written.

This hook cannot verify the checklist actually gets read, only a live
tool-use audit could confirm that, same limitation as
devknight-orientation-hook.ts. It's an enforced nudge at the one point
guaranteed to fire before Electron security-relevant code is written, not
a hard gate: blocking here would false-positive on every edit that
already had the checklist open earlier in the same task.

Triggered by .claude/settings.json:
  {
    "hooks": {
      "PreToolUse": [
        {
          "matcher": "Edit|Write|MultiEdit",
          "hooks": [
            { "type": "command",
              "command": "bun",
              "args": ["run", "${CLAUDE_PROJECT_DIR}/hosts/claude/hooks/electron-best-practices-nudge-hook.ts"] }
          ]
        }
      ]
    }
  }

Invariants:
  - Always allows. Any internal error also allows (fail open); a broken
    hook must never block an Edit/Write/MultiEdit from completing.
  - Errors land in ~/.knightcode/hook-errors.log. A real match also logs
    one line to ~/.knightcode/hook-invocations.log.

ADVISORY BY DESIGN: the trigger is a regex over IPC/preload-shaped code, a
heuristic guess about whether an edit really touches Electron's security
surface. A false deny would block legitimate work with no clean way through,
which produces workarounds rather than compliance. Gates need exact
conditions; this one cannot have them.

## `formal-workflow-gate.ts`

PreToolUse hook (Claude Code) on Edit/Write/MultiEdit. DENIES edits to source
files when a formal development workflow is active and still in planning phases
(ceo/design/eng/planning), before task breakdown is complete.

Why a deny and not a nudge. Editing implementation before the plan is done is
the exact behavior this hook is meant to prevent. An advisory would be read as
"just reminding you" and skipped by agents eager to start building. Real enforcement
requires a hard gate, not guidance.

Why order rather than prohibition. Edits to the state root and to orchestrator-owned
spec files must remain allowed, or the orchestrator itself locks itself out. What
must not happen is changes to the application codebase before the plan (reviews plus
task breakdown) is on disk and marked complete. So the gate allows:
  - Anything under ~/.knightcode/ (state root, needed for phase transitions)
  - Plan/spec files the orchestrator itself creates for this feature
  - Any edits once phase reaches "implementation" or "done"

Default-open. Most edits in the repo are unrelated to an in-flight formal workflow.
No active feature pointer, no deny.

Fails open, in three ways that each prevent a deadlock:
  - No active workflow (active.json does not exist): allow.
  - KNIGHTCODE_FORMAL_WORKFLOW_GATE=off: explicit operator override.
  - Any internal error: allow.

Triggered by .claude/settings.json:
  {
    "hooks": {
      "PreToolUse": [
        {
          "matcher": "Edit|Write|MultiEdit",
          "hooks": [
            { "type": "command",
              "command": "bun",
              "args": ["run", "${CLAUDE_PROJECT_DIR}/hosts/claude/hooks/formal-workflow-gate.ts"] }
          ]
        }
      ]
    }
  }

## `graph-consulted-marker-hook.ts`

PostToolUse hook (Claude Code) on the knowledge-graph MCP tools. Records
that this session actually queried the skills-mode graph, which is what
`skill-graph-first-gate.ts` requires before it will allow a read of the
hand-maintained skill/agent catalogs.

Split into its own hook rather than folded into the gate because the two
run on opposite events: this one fires after a graph query succeeds, the
gate fires before a catalog read is attempted. The marker file is the only
thing they share.

Marker is per session id, so consulting the graph in one session has no
effect on a later one. Markers older than a week are pruned on write, since
a session id is never reused and stale files serve nothing.

Triggered by .claude/settings.json:
  {
    "hooks": {
      "PostToolUse": [
        {
          "matcher": "mcp__knightbrain__.*",
          "hooks": [
            { "type": "command",
              "command": "bun",
              "args": ["run", "${CLAUDE_PROJECT_DIR}/hosts/claude/hooks/graph-consulted-marker-hook.ts"] }
          ]
        }
      ]
    }
  }

Invariants:
  - Always allows, and never blocks. Any internal error also allows.
  - Writes a marker only for a skills-mode query. A code-mode query says
    nothing about whether the skill/agent graph was consulted.

## `knight-code-vault-sync-hook.ts`

PostToolUse hook (Claude Code). Mirrors a Knight Code memory event into
the Knight Code Base vault the moment it happens, so the vault stays a
live view into Knight Code's memory rather than a stale snapshot from
whenever scripts/export-knight-code-memory.ts was last run by hand.

Fires on the seven memory MCP tools that create or change a record:
decision_log, decision_supersede, promise_log, promise_fulfill,
promise_abandon, dev_diary_log, learnings_log. A create event writes a
new note; a lifecycle event (supersede/fulfill/abandon) finds the note
already written for that id and updates its status in place, it does not
delete the note, matching this project's own "add/replace, never delete"
export convention.

The MCP tool_response shape used here (a plain array of content blocks,
`[{type:"text", text:"..."}]`, not wrapped in a `content` object) was
confirmed empirically before this was written, by wiring a throwaway
diagnostic hook to a real decision_search call and reading the captured
payload. This is undocumented in the official Claude Code hooks
reference, so if a future Claude Code version changes this shape, the
regex extraction below will simply find nothing and this hook no-ops,
per its fail-open design, rather than writing malformed notes.

Deliberately writes with plain fs calls, not through any tool this
project's own hygiene gate watches: these are historical records being
mirrored close to verbatim, not new prose someone is actively
authoring, matching the same reasoning already applied to
scripts/export-knight-code-memory.ts in the companion repo.

Rendering logic (frontmatter shape, filename convention, section layout)
intentionally duplicates scripts/export-knight-code-memory.ts in
C:\Users\Chris Brown\Documents\knight-code-base-companion rather than
importing across repos: this hook must stay a single self-contained
file, the same pattern every other hook in this directory follows.
If the export script's format ever changes, update both by hand.

Triggered by .claude/settings.json:
  {
    "hooks": {
      "PostToolUse": [
        {
          "matcher": "mcp__knight-code-memory__decision_log|mcp__knight-code-memory__decision_supersede|mcp__knight-code-memory__promise_log|mcp__knight-code-memory__promise_fulfill|mcp__knight-code-memory__promise_abandon|mcp__knight-code-memory__dev_diary_log|mcp__knight-code-memory__learnings_log",
          "hooks": [
            { "type": "command",
              "command": "bun",
              "args": ["run", "${CLAUDE_PROJECT_DIR}/hosts/claude/hooks/knight-code-vault-sync-hook.ts"] }
          ]
        }
      ]
    }
  }

Invariants:
  - Always allows, never blocks: PostToolUse cannot deny anything, and
    this hook has nothing to deny even in principle, it only performs a
    side-effect write.
  - Fail open. Any internal error (bad JSON, missing fields, vault
    unreachable) exits 0 with no output rather than surfacing to the
    agent. Errors land in ~/.knightcode/hook-errors.log.
  - A "Rejected: ..." tool response (the memory server's own validation
    failure text) is a no-op here, since nothing was actually logged.

## `mnemosyne-routing-advisory-hook.ts`

PreToolUse hook (Claude Code) on every tool the mnemosyne proxy exposes.
Never blocks: always allows, but injects a reminder of the routing rule
whenever a `mnemosyne_*` tool gets called, so the classification in
CLAUDE.md's "Mnemosyne memory routing" section is visible at the one
moment it actually matters, not just something to remember unprompted.

This is the second leg of that section's three-part enforcement (the
CLAUDE.md rule itself, this hook, and the knightcode-mnemosyne-audit
skill for on-demand review). Deliberately advisory: whether a given piece
of content is "typed and lifecycle-bearing" vs "open-ended free-form" vs
"relationship-shaped enough for a triple" is a semantic judgment about the
content itself, not something this hook can verify mechanically without
running its own LLM call, which would be a false guarantee dressed up as
a real one.

Triggered by .claude/settings.json:
  {
    "hooks": {
      "PreToolUse": [
        {
          "matcher": "mcp__knight-code-mnemosyne__.*",
          "hooks": [
            { "type": "command",
              "command": "bun",
              "args": ["run", "${CLAUDE_PROJECT_DIR}/hosts/claude/hooks/mnemosyne-routing-advisory-hook.ts"] }
          ]
        }
      ]
    }
  }

Invariants:
  - Always allows. Any internal error also allows (fail open); a broken
    hook must never block a mnemosyne_* call from completing.
  - Errors land in ~/.knightcode/hook-errors.log. A real match also logs
    one line to ~/.knightcode/hook-invocations.log.

ADVISORY BY DESIGN: the condition is whether the content being written
actually fits Mnemosyne's shape rather than a typed MCP tool's or the
memory index's, which is a semantic judgment about meaning, not a file or
schema comparison a hook can decide mechanically.

## `nested-repo-gate.ts`

PreToolUse hook (Claude Code) on Bash. Denies a `git add` or
`git commit -a`/`--all` BEFORE it runs if the working tree contains any
untracked directory that is itself a git repository (has its own .git)
and is not yet covered by .gitignore.

Built after a real incident: obsidian-linked-text-styles/ (a separate
cloned repo, github.com/ValleytheKnight/Linked-Text-Styles) sat
untracked and ungitignored in this repo's tree for a session before
being caught by hand. A static .gitignore list depends on someone
remembering to check it every time a new project gets cloned in; this
gate makes the check structural instead, matching the project's own
standing rule that hygiene checks pass automatically, not by
convention. It generalizes to any future nested repo by name, not just
the ones known today.

Detection: `git status --porcelain` already collapses an untracked
directory that is itself a git repo into a single `?? path/` line
(git will not enumerate files inside another repo's working tree). Each
such candidate directory is checked for a real `.git` entry, then
checked against `git check-ignore` to see if it is already covered.
A `git add`/`git commit -a` is only denied if at least one nested repo
is BOTH present and NOT yet ignored, staging an already-ignored nested
repo is a no-op for git and never at risk.

Deliberately conservative: denies on ANY qualifying command
(`git add ...`, `git commit -a`/`--all`) regardless of what specific
paths it names, rather than trying to determine whether that exact
invocation would actually touch the nested repo. The fix (add one line
to .gitignore) is trivial, so a false positive costs one retry, while a
false negative risks a broken gitlink entering history.

Invariants:
  - Fail open. Any internal error (git not found, scan failure, no git
    repo at all) exits 0 with no output so a broken hook can never
    block real git usage.
  - Each denial appends one line to ~/.knightcode/hook-invocations.log.
  - Invoked as `bun run <file>.ts`, never a bare shebang script: hook
    commands run through Git Bash on Windows (PowerShell if absent), and in exec form through no shell at all; either way Windows cannot execute an
    extension-less script.

Triggered by .claude/settings.json:
  {
    "hooks": {
      "PreToolUse": [
        {
          "matcher": "Bash",
          "hooks": [
            { "type": "command",
              "command": "bun",
              "args": ["run", "${CLAUDE_PROJECT_DIR}/hosts/claude/hooks/nested-repo-gate.ts"] }
          ]
        }
      ]
    }
  }

## `obsidian-release-version-gate.ts`

PreToolUse hook (Claude Code) on Bash. Denies a `git tag` (creation form)
or `gh release create` run inside an Obsidian plugin repo BEFORE it runs,
if the tag name does not exactly match that repo's `manifest.json`
`version` field, or if either one carries a leading "v".

Obsidian's community plugin registry resolves an update by fetching the
GitHub release whose tag name is byte-identical to `manifest.json`'s
`version` field, no leading "v", no other prefix. A tag of `v1.0.0`
against a manifest version of `1.0.0` is a real, silent failure mode:
the plugin still builds and the tag still pushes, but Obsidian's client
cannot resolve the release, so real users never see the update. A
written rule catches this only if someone remembers to check it by
hand every release; this gate makes the check structural instead,
matching this project's own standing rule that hygiene checks pass
automatically, not by convention (see nested-repo-gate.ts for the same
reasoning applied to a different failure mode).

Scope: only fires inside a repo whose root contains `manifest.json` with
a `version` field, the Obsidian plugin signature. A theme repo (no
manifest.json, registered by `theme.css` + a community-css-themes.json
entry instead) or an unrelated repo never matches and is unaffected.

Triggered by .claude/settings.json:
  {
    "hooks": {
      "PreToolUse": [
        {
          "matcher": "Bash",
          "hooks": [
            { "type": "command",
              "command": "bun",
              "args": ["run", "${CLAUDE_PROJECT_DIR}/hosts/claude/hooks/obsidian-release-version-gate.ts"] }
          ]
        }
      ]
    }
  }

Invariants:
  - Fail open. Any internal error (git not found, no manifest.json,
    unparsable command) exits 0 with no output so a broken hook can
    never block real git usage.
  - Only matches tag-creation forms of `git tag` / `gh release create`;
    `git tag -d`/`--delete` and `git tag -l`/`--list` never match.
  - Each denial appends one line to ~/.knightcode/hook-invocations.log.
  - Errors land in ~/.knightcode/hook-errors.log.

## `post-commit-simplify-nudge-hook.ts`

PostToolUse hook (Claude Code) on Bash. Never blocks: always allows, but
injects a reminder to run the `simplify` and `code-review` skills when a
`git commit` just landed real code changes in a dev project the DevKnight
Workshop vault tracks (currently anything under Documents/DevPrograms/,
same convention as vault-sync-nudge-hook.ts).

Chris's standing instruction: every devknight task that required new code
or code changes should get a /simplify pass AND a /code-review pass
(standards-conformance and spec-fidelity) before it counts as done, not only when he
remembers to ask for one by name. A prose rule in devknight's own agent
body can't guarantee this fires every time (the same shape of gap
subagent-hygiene-hook.ts and devknight-orientation-hook.ts already exist
to close for other rules), so this is the enforced nudge instead.

Deliberately a nudge, not a hard gate: this hook cannot know whether a
/simplify pass already ran earlier in the same task before this commit,
only that a commit touching code just landed. Blocking here would false-
positive on every commit that already had its own review pass. Injecting
additionalContext lets the agent judge whether this specific commit still
needs one.

Reuses the same cwd-then-cd-prefix project-root detection as
vault-sync-nudge-hook.ts (a dispatched subagent's Bash tool reports its
own cwd as wherever the agent started, not the project directory it
actually ran `cd` into), but keeps its own copy rather than importing from
that file, matching this project's existing one-hook-one-file convention.

Triggered by .claude/settings.json:
  {
    "hooks": {
      "PostToolUse": [
        {
          "matcher": "Bash",
          "hooks": [
            { "type": "command",
              "command": "bun",
              "args": ["run", "${CLAUDE_PROJECT_DIR}/hosts/claude/hooks/post-commit-simplify-nudge-hook.ts"] }
          ]
        }
      ]
    }
  }

Invariants:
  - Always allows. Any internal error also allows (fail open); a broken
    hook must never block a git command from completing.
  - Errors land in ~/.knightcode/hook-errors.log. A real match also logs
    one line to ~/.knightcode/hook-invocations.log.

ADVISORY BY DESIGN: nothing records whether a simplify or code-review pass
actually ran, so "was this commit reviewed" is not a question a machine can
answer. Gating on an unanswerable condition would block every code commit.

## `pretooluse-hygiene-gate.ts`

PreToolUse hygiene gate (Claude Code). Denies an Edit/Write/MultiEdit, a
`git commit` (its -m message or heredoc body), or a vault/dev-diary MCP
write (obsidian-workshop vault_write/vault_append/vault_patch,
knight-code-memory dev_diary_log) BEFORE it lands when the added text
would introduce banned language (scripts/banned-language.json: word
list, em dash, or a project-isolation term) or a dev-diary comment
pattern (ISO dates or narrative-history phrases on comment lines).

The Bash and MCP paths exist because a banned word reached a committed
git log and several vault notes despite the file-edit gate never firing:
`git commit -m "..."` never touches Edit/Write/MultiEdit, and an MCP
vault write is a different tool entirely with its own field names
(`path`+`content`, or `title`+`body` for dev_diary_log). Extending the
same gate to those tool shapes closes that gap at its actual source
rather than adding a second, parallel checker.

Two separate scope tiers, not one:
  - banned_words / em dash / dev-diary patterns: code AND prose files, by
    extension (see CODE_EXTENSIONS below, includes tmpl/md/mdx). Plain
    JSON is still out of scope for this tier (data files, not authored
    prose or code).
  - banned_terms_all_files: EVERY file extension, no exceptions. This is
    the project-isolation rule (no file anywhere may reference the source
    project this codebase was derived from) and it must not have any
    extension blind spot, since a project ledger or config file is
    exactly where that kind of reference leaks.

Scoping is exact by construction, never diff-approximated:
  - Edit/MultiEdit: scan only lines of new_string absent from old_string.
    Context lines an edit repeats can never trip the gate.
  - Write: scan only lines of content absent from the current on-disk
    file. A brand-new file is scanned in full.

Em-dash carve-out (accurate quotation of a real name): an em dash inside
a quoted span whose content looks like a file path (contains a slash,
backslash, or file extension) is exempt. This carve-out applies ONLY to
the em-dash check, never to banned_terms_all_files, which has no
quoted-name exception.

Wiring (.claude/settings.json):
  PreToolUse  matcher: "Edit|Write|MultiEdit"
  PreToolUse  matcher: "Bash"
  PreToolUse  matcher: "mcp__obsidian-workshop__vault_write|mcp__obsidian-workshop__vault_append|
              mcp__obsidian-workshop__vault_patch|mcp__knight-code-memory__dev_diary_log"

Invariants:
  - Fail open. Any internal error exits 0 with no output so a broken
    hook can never block real work. Errors land in
    ~/.knightcode/hook-errors.log.
  - Each denial appends one line to ~/.knightcode/hook-invocations.log so
    a quiet gate can be told apart from a dead one. Allowed writes are
    not logged (Edit/Write fire constantly; logging every allow would
    flood the file).
  - Invoked as `bun run <file>.ts`, never a bare shebang script: hook
    commands run through Git Bash on Windows (PowerShell if absent), and
    in exec form through no shell at all; either way Windows cannot execute
    an extension-less script.

## `question-log-hook.ts`

question-log hook (Claude Code). PreToolUse + PostToolUse on
matcher: "AskUserQuestion". Confirmed live before this file was written
(see docs/question-log-design-spec.md's "known technical risk" section):
both events fire for this tool, tool_input.questions[] carries the
question set, PostToolUse's tool_response.answers is keyed by question
text, and a PreToolUse deny genuinely suppresses the question before
Chris ever sees it (confirmed directly with Chris, not inferred from
Claude's own side of the call).

PreToolUse: if every question in the call resolves to an active,
two-way-tiered standing preference, log each as auto_answered and deny
with a reason describing the standing answers, so Claude proceeds
without ever surfacing the question. If any question in the call lacks
an eligible match, allow unmodified, partial auto-answering inside one
multi-question call is out of scope.

PostToolUse: log every question Chris actually answered as `asked`.

Imports the same store modules the MCP tools use
(question-log-store.ts, preference-store.ts, question-safety-registry.ts)
rather than re-implementing JSON parsing, so the state-mutation code
path is identical whether a human conversation or this hook triggered it.

Wiring (.claude/settings.json):
  PreToolUse   matcher: "AskUserQuestion"
    command: bun, args: ["run", "${CLAUDE_PROJECT_DIR}/hosts/claude/hooks/question-log-hook.ts"]
  PostToolUse  matcher: "AskUserQuestion"
    command: bun, args: ["run", "${CLAUDE_PROJECT_DIR}/hosts/claude/hooks/question-log-hook.ts"]

Invariants, same as every other hook in this project:
  - Fail open. Any internal error exits 0 with no denial/output, logged
    to ~/.knightcode/hook-errors.log. A broken hook must never block a
    real question from reaching Chris.
  - Each fire that results in an actual log append writes one line to
    ~/.knightcode/hook-invocations.log (allow-through-unmodified doesn't
    count, same convention as the hygiene gate not logging every allow).
  - Invoked as `bun run <file>.ts`, never a bare shebang: hook commands run
    through Git Bash on Windows (PowerShell if absent), and in exec form
    through no shell at all; either way Windows cannot execute an
    extension-less script.

## `session-start-memory-hook.ts`

SessionStart hook (Claude Code). Auto-loads Knight Code's own persistent,
cross-session memory index at the start of every Knight-Code-rooted
session, the same shape as this interface's own native auto-memory
system (individual typed notes plus a MEMORY.md index), but backed by
Knight Code's own per-project state directory instead of a
Claude-Code-managed location, since that native system is specific to
the interface running it and its exact hook/loading mechanism isn't
Knight Code's to inherit.

Triggered by .claude/settings.json:
  {
    "hooks": {
      "SessionStart": [
        {
          "matcher": "startup|resume|clear",
          "hooks": [
            { "type": "command",
              "command": "bun",
              "args": ["run", "${CLAUDE_PROJECT_DIR}/hosts/claude/hooks/session-start-memory-hook.ts"],
              "timeout": 10 }
          ]
        }
      ]
    }
  }

Invoked as `bun run <this file>`, not via a bash wrapper: Claude Code
runs hook commands through Git Bash on Windows (PowerShell if absent), and in exec form through no shell at all; either way Windows cannot execute
a shebang script with no file extension.

Storage: ~/.knightcode/projects/<slug>/memory/*.md (one file per note,
frontmatter: name/description/metadata.type) plus memory/MEMORY.md (the
index, one line per note). Slug is computed the same way every other
per-project state directory in this repo already is, via bin/knight-slug,
so this reuses the existing convention rather than inventing a parallel one.

Invariants:
  - Always exits 0. A failing hook MUST NOT block a session from starting.
    Errors land in ~/.knightcode/hook-errors.log for postmortem.
  - No memory directory yet (fresh project) is not an error, inject the
    taxonomy/instructions only, so the system starts building memories
    from this session forward instead of silently doing nothing.
  - MEMORY.md content is capped; a runaway index degrades to a truncation
    notice rather than blowing up context on every future session start.
  - Every successful run appends one line to ~/.knightcode/hook-invocations.log,
    same positive-signal convention as the SubagentStart hygiene hook.

Also injects the exact ToolSearch line that loads this project's
verification tools in one call. Those MCP tools arrive with deferred
schemas, so a structural check costs a schema fetch plus the call itself
unless the whole set is loaded up front. CLAUDE.md's verify-first rule
assumes a real check is one call away; without this, it is two, and the
cheap path stops being the default one.

ADVISORY BY DESIGN: SessionStart injects the memory index at session open.
There is no tool call to gate and no turn to block, so injection is the only
mechanism available.

## `skill-graph-first-gate.ts`

PreToolUse hook (Claude Code) on Grep/Glob/Read. DENIES a read of the
hand-maintained skill/agent catalogs until the skills-mode knowledge graph
has actually been queried in this session.

Why a deny and not a nudge. The advisory form of this rule (injected
`additionalContext` saying "consider querying the graph first") was
measured against real behavior and failed: it fires, it reads as
boilerplate, and the agent proceeds with the text search anyway. Observed
repeatedly in real sessions, including by the agent that wrote this file.
Guidance that can be skipped is not a control boundary, it is a
suggestion, and this project's own standing position is that a written
policy is not enforcement if the prohibited action stays reachable.

Why order rather than prohibition. Those catalogs have real uses the graph
does not model: exact wording, table ordering, the build-queue and persona
sections, explanatory prose. Banning them outright would be wrong. What
must not happen is answering "which skill or agent handles X", "does this
already exist", or "who owns this" from prose that drifts, without ever
consulting the structural data. So the gate enforces sequence: query the
graph once, then the catalogs are open for the rest of the session. The
cost of compliance is a single tool call, and there is no state the agent
can talk itself into where the prose is simply unreachable.

The denial names the schema-fetch step as well as the graph call, because
the graph tools arrive deferred. Left unstated, a denial that names only
tools the agent cannot yet call is a dead end, and the likeliest escape
from a dead end is the text search this gate exists to defer.

Deliberately narrow. Only reads of SKILL-CATALOG.md and AGENTS.md, and
searches aimed at the agent registry, are gated. A Grep over SKILL.md
bodies is left alone: full body text is exactly what the graph does not
hold, so gating it would obstruct a legitimate need with no alternative.

Fails open, in three ways that each prevent a deadlock:
  - No skills graph on disk for this root: nothing to query, so allow.
  - KNIGHTCODE_GRAPH_GATE=off: explicit operator override.
  - Any internal error: allow.

Triggered by .claude/settings.json:
  {
    "hooks": {
      "PreToolUse": [
        {
          "matcher": "Grep|Glob|Read",
          "hooks": [
            { "type": "command",
              "command": "bun",
              "args": ["run", "${CLAUDE_PROJECT_DIR}/hosts/claude/hooks/skill-graph-first-gate.ts"] }
          ]
        }
      ]
    }
  }

## `skill-install-nudge-hook.ts`

PostToolUse hook (Claude Code) on Edit/Write/MultiEdit. Never blocks: always
allows, but when a skill's source was just edited and the installed copy no
longer matches it, injects an instruction to publish it in the same turn.

The gap this closes: a skill's source lives in this repo, and the copy the
host actually loads lives in the user skill directory. Nothing about editing
the source updates that copy. Edit a skill, forget `skills:install`, and the
version running in every other project on this machine is silently the old
one, indefinitely. `skills:check` already detects this, but only runs inside
`quality-gate`, which nothing triggers automatically, so detection depended
on someone remembering to look.

Deliberately a nudge rather than a hook that copies the files itself: a
half-written or broken edit would otherwise publish instantly to every
project, with no moment to catch it. Routing through the agent keeps a
checkpoint in the loop while still making the publish happen in the same
turn rather than whenever someone next remembers.

Triggered by .claude/settings.json:
  {
    "hooks": {
      "PostToolUse": [
        {
          "matcher": "Edit|Write|MultiEdit",
          "hooks": [
            { "type": "command",
              "command": "bun",
              "args": ["run", "${CLAUDE_PROJECT_DIR}/hosts/claude/hooks/skill-install-nudge-hook.ts"] }
          ]
        }
      ]
    }
  }

Invariants:
  - Always allows. Any internal error also allows (fail open).
  - Only speaks when a SKILL.md or SKILL.md.tmpl under this repo was the
    file edited AND `skills:check` actually reports drift. An edit that
    leaves source and install matching says nothing.
  - Errors land in ~/.knightcode/hook-errors.log.

ADVISORY BY DESIGN: a PostToolUse hook cannot deny, the tool has already
run, so this event can only inject text. Enforcement for this exact
condition lives in `stop-skill-install-gate.ts`, which refuses to let the
turn end while a skill is stale. This hook exists for immediacy, surfacing
the drift at the moment it is caused rather than at the end of the turn,
and is safe to be advisory only because the gate behind it is not.

## `stop-hook-authoring-gate.ts`

Stop hook (Claude Code). Refuses to let a turn end when a hook in this
project was written or changed and does not meet the standard every hook
here is held to.

This is the hook that governs writing hooks. It exists because the failure
it prevents already happened: hooks kept getting authored in the advisory
form (inject `additionalContext` and allow), which reads as guidance and
gets skipped. A rule that can be skipped is not enforcement, and a project
whose enforcement layer is itself unenforced drifts exactly the way the
hand-maintained catalogs did.

Four checks, each on something a machine can actually decide:

  1. Registered. The file is referenced by a command in
     `.claude/settings.json`. An unregistered hook is dead code that reads
     as protection.
  2. Fails open. There is a top-level `main().catch(...)`, so an internal
     error lets work proceed instead of trapping the session.
  3. Documents its wiring. The header shows the `.claude/settings.json`
     entry that triggers it, so the file explains how it is reached.
  4. Enforces, or says why it does not. The file either denies
     (`permissionDecision: 'deny'`), blocks a turn (`decision: 'block'`),
     rewrites output (`updatedToolOutput`), or carries an explicit
     `ADVISORY BY DESIGN:` line stating why enforcement is not possible
     here.

Check 4 is the point. Advisory is sometimes correct: a condition resting on
a heuristic (is this edit really touching Electron IPC?) or on human
judgment (were the project docs updated appropriately?) cannot be gated,
because a gate whose condition is a guess produces workarounds rather than
compliance. What must not happen is choosing advisory silently. The marker
forces the reason to be written down where the next author will read it.

Scope is the working tree: only hook files git reports as modified or
untracked are checked, so this fires while hooks are being authored and
costs nothing otherwise.

Triggered by .claude/settings.json:
  {
    "hooks": {
      "Stop": [
        {
          "hooks": [
            { "type": "command",
              "command": "bun",
              "args": ["run", "${CLAUDE_PROJECT_DIR}/hosts/claude/hooks/stop-hook-authoring-gate.ts"] }
          ]
        }
      ]
    }
  }

Fails open: unreadable settings, no git, or any internal error lets the
turn end. KNIGHTCODE_HOOK_AUTHORING_GATE=off disables it.

## `stop-skill-install-gate.ts`

Stop hook (Claude Code). Refuses to let a turn end while a skill's source
and its installed copy disagree.

This is the enforcement half of the skill-install rule. The PostToolUse
nudge that fires on the edit itself is useful for immediacy, but a
PostToolUse hook cannot deny anything: the tool has already run, so all it
can do is inject text the agent is free to read and move past. Measured
against real behavior, advisory text does get moved past.

A Stop hook is the only mechanism that makes an after-the-fact condition
unignorable, because it blocks the one thing the agent always wants to do,
finish. The turn cannot end while the installed copy is stale, so "I will
publish it later" stops being available.

Blocks at most once per turn. `stop_hook_active` is set when the current
continuation was itself caused by a stop hook block; blocking again in that
state would loop forever with no way out. One forced correction cycle is
the whole point, an unbreakable loop is a hang.

Triggered by .claude/settings.json:
  {
    "hooks": {
      "Stop": [
        {
          "hooks": [
            { "type": "command",
              "command": "bun",
              "args": ["run", "${CLAUDE_PROJECT_DIR}/hosts/claude/hooks/stop-skill-install-gate.ts"] }
          ]
        }
      ]
    }
  }

Fails open: no skill sources, a check that cannot run, or any internal
error all let the turn end. A broken gate must never trap a session.
KNIGHTCODE_SKILL_STOP_GATE=off disables it outright.

## `subagent-hygiene-hook.ts`

SubagentStart hook (Claude Code). Closes the reach gap for Knight
Code-wide rules that only otherwise inject into a session that reads a
Knight Code SKILL.md: the Code Hygiene directive (banned-language rules,
see scripts/banned-language.json) and the memory-tool-usage reminder (the
promise/dev-diary MCP tools exist as real, callable functions, not just
prompt-level instructions). A subagent spawned via the Task/Agent tool
without going through a skill never saw either. This hook fires on every
subagent spawn Claude Code routes to it and injects both directly.

Triggered by .claude/settings.json:
  {
    "hooks": {
      "SubagentStart": [
        {
          "matcher": "*",
          "hooks": [
            { "type": "command",
              "command": "bun",
              "args": ["run", "${CLAUDE_PROJECT_DIR}/hosts/claude/hooks/subagent-hygiene-hook.ts"],
              "timeout": 5 }
          ]
        }
      ]
    }
  }

Invoked as `bun run <this file>`, not via a bash wrapper: Claude Code
runs hook commands through Git Bash on Windows (PowerShell if absent), and in exec form through no shell at all; either way Windows cannot execute
a shebang script with no file extension. `bun` is a real executable on
every platform, so calling it directly is the portable form.

Invariants:
  - Always exits 0. A failing hook MUST NOT block a subagent from starting.
    Errors land in ~/.knightcode/hook-errors.log for postmortem.
  - Stdin (session_id, transcript_path, cwd, hook_event_name, agent_id,
    agent_type) is parsed best-effort for logging only, never branched on;
    the directive applies to every subagent this hook is routed to,
    regardless of type.
  - Every successful run appends one line to ~/.knightcode/hook-invocations.log
    (timestamp, agent_type, agent_id, session_id). An empty error log is
    ambiguous between "fired cleanly" and "never invoked at all"; this
    log is the positive signal that distinguishes the two.

ADVISORY BY DESIGN: SubagentStart injects context into a subagent as it
begins. There is no action to deny and no turn to block, so context
injection is the only mechanism this event offers.

## `vault-agent-gate.ts`

PreToolUse gate (Claude Code), matched to the Task/Agent dispatch tool.
Denies BEFORE spawn, not after, in either of two cases:

  1. subagent_type is "loremaster" (case-insensitive), full stop. The
     loremaster agent's own Wake-Up Protocol (`.claude/agents/loremaster.md`)
     is explicit: "this conversation IS loremaster for the session, no
     subagent, no relay." Chris rejected the subagent-relay design once
     already (standing-knowledge.md's thirty-seventh pass); dispatching
     loremaster via Task/Agent recreates the exact design he already
     overturned, regardless of how the dispatch prompt is worded.

  2. subagent_type is anything other than "loreGod" AND the dispatch
     prompt/description references the campaign vault (its path, the
     campaign's own name, or the loremaster tasking-file root). Chris's
     standing rule: loremaster (this conversation, never a spawned
     instance) and loreGod (a real, sanctioned read-only QA subagent) are
     the only two agents allowed to operate in that vault. A
     general-purpose or Explore dispatch doing vault work bypasses every
     protocol, label rule, and Iron Rule check loremaster/loreGod carry,
     the same blast radius as case 1 even when subagent_type isn't
     literally "loremaster".

Real incident this closes: a live session dispatched
`Agent({subagent_type: "loremaster", ...})` to process a recorded
session's transcript, in direct violation of the Wake-Up Protocol's own
"no subagent, no relay" instruction, and touched vault-adjacent tasking
files before Chris caught it. The agent's own body text already said not
to do this; a PreToolUse gate is the fix because prose alone already
failed to prevent it once.

Deliberately does NOT deny loreGod dispatches (a real, sanctioned
subagent, scheduled via `loreGod/orchestrator.ps1` and also invocable
live) and does NOT deny non-vault work by any other agent type.

Triggered by .claude/settings.json:
  {
    "hooks": {
      "PreToolUse": [
        {
          "matcher": "Task|Agent",
          "hooks": [
            { "type": "command",
              "command": "bun",
              "args": ["run", "${CLAUDE_PROJECT_DIR}/hosts/claude/hooks/vault-agent-gate.ts"] }
          ]
        }
      ]
    }
  }
Matcher covers both names since different Claude Code builds have
surfaced this dispatch tool as either "Task" or "Agent"; an unmatched
name costs nothing, a missed match defeats the whole gate.

Invariants:
  - Fail open. Any internal error (bad JSON, missing fields) exits 0 with
    no output rather than blocking a legitimate dispatch. Errors land in
    ~/.knightcode/hook-errors.log.
  - Every denial appends one line to ~/.knightcode/hook-invocations.log.
  - Invoked as `bun run <file>.ts`, never a bare shebang script: hook
    commands run through Git Bash on Windows (PowerShell if absent), and in exec form through no shell at all; either way Windows cannot execute an
    extension-less script.

## `vault-sync-nudge-hook.ts`

PostToolUse hook (Claude Code) on Bash. Never blocks: always allows,
but injects a reminder when a git/gh command that changes real repo
state (commit, push, a new repo) runs against a dev project the
DevKnight Workshop Obsidian vault tracks, currently anything under
Documents/DevPrograms/, the convention established for KnightOS.

Closes a real gap found live: DevKnight's own "keep the vault current"
rule only fires when DevKnight itself is reasoning through a turn.
Primary Claude can run these same git commands directly via Bash,
bypassing DevKnight entirely, and the vault goes stale with nothing
watching. This hook is the enforced backstop for exactly that case,
per this project's own standing rule that "whenever X happens"
behavior needs a real hook, not an agent remembering.

No project-root marker file convention exists elsewhere in this repo
to key off instead, so this matches on the DevPrograms folder name.
If dev projects ever live somewhere else, extend the match here.

Matches on the Bash tool's own reported cwd first, then falls back to
a leading `cd "<path>" && ...` prefix parsed off the command itself.
The fallback exists because a dispatched subagent's Bash tool reports
its own cwd as wherever the agent started (this repo's root) for every
call it makes, even when the actual command reaches a tracked project
via an inline `cd` rather than a standing directory change, confirmed
live: DevKnight's own git push against KnightOS used exactly this
pattern and the cwd-only check missed it entirely. The fallback only
ever parses a `cd` anchored to the start of the command, real shell
syntax naming where the rest of the command runs, never a scan of the
full command text, so it does not reopen the false-positive risk the
cwd-only design was built to avoid.

Triggered by .claude/settings.json:
  {
    "hooks": {
      "PostToolUse": [
        {
          "matcher": "Bash",
          "hooks": [
            { "type": "command",
              "command": "bun",
              "args": ["run", "${CLAUDE_PROJECT_DIR}/hosts/claude/hooks/vault-sync-nudge-hook.ts"] }
          ]
        }
      ]
    }
  }

Invariants:
  - Always allows. Any internal error also allows (fail open); a broken
    hook must never block a git command from completing.
  - Errors land in ~/.knightcode/hook-errors.log. A real match also logs
    one line to ~/.knightcode/hook-invocations.log, same convention as
    the other hooks in this project (allow-through-unmodified doesn't
    count).

ADVISORY BY DESIGN: the condition is whether the vault's project docs still
reflect what a commit actually did, which is human judgment, not a file
comparison. A gate here would either fire on every commit or never, so it
would carry no information either way.
