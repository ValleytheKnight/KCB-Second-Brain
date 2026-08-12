# Design: Mnemosyne Memory Integration

Branch: master
Status: Complete. All 15 implementation tasks (T1-T15) built and verified live, including post-build code review (3 real findings fixed and reverified) and the T11 audit-skill live testing pass. 22 resolved decisions, 0 open questions, 0 outstanding tasks.
Mode: Implemented and verified, no further build work planned
CEO plan doc: `~/.knightcode/projects/ValleytheKnight-knight-code/ceo-plans/2026-08-07-mnemosyne-memory-integration.md`

## Execution Protocol (read this first, in a new session)

1. **Re-verify freshness before touching code.** This plan cites specific facts about the third-party `mnemosyne-oss/mnemosyne` package (tool names, config keys, file structure) confirmed live on 2026-08-07. That repo ships frequent point releases (confirmed during verification: `main` already read a version ahead of its last tag). If it's been more than a couple weeks, spot-check the claims in "Independent Ground-Truth Verification" below against the live repo before building on them, don't assume they still hold.
2. **Read the "Implementation Tasks" section** (T1-T15) and the "Worktree Parallelization Strategy" table right above it. Start with T1-T3 (install, config, MCP wiring), sequential, blocking everything else.
3. **After T1-T3 land**, T4-T5 (redaction), T6-T7 (auto-recall bridge), and T8 (the injection-safety proxy) are independent, run them in parallel worktrees if convenient. T9-T11 (routing rule, advisory hook, audit skill) waits on T8 specifically, everything else doesn't.
4. **T2 and T4 close two CRITICAL GAPs** (config validation, redaction-pattern self-compile) named in the Failure Modes Registry, don't skip their verify steps even under time pressure.
5. **Nothing here needs re-deciding.** If something in the plan looks wrong once you're actually building it, that's real new information, fix it and note the correction inline (this doc has a track record of doing that honestly, see the several "corrected during review" notes throughout), don't silently deviate without updating the doc.

## Why Mnemosyne

Chris asked for a deep read of two candidate memory systems for Claude Code: `mnemosyne-oss/mnemosyne` and `vectorize-io/hindsight`. Both were cloned and read at the source level, not just their READMEs. Conclusion, confirmed with Chris: Mnemosyne, not Hindsight.

Mnemosyne is a pure-Python, SQLite-backed memory library. No server process, no Postgres, no mandatory LLM call on every write. Recall is hybrid (vector similarity plus FTS5 keyword plus importance) computed inside SQLite. Its MCP server (`mnemosyne mcp`, stdio) registers exactly like every other MCP server already wired into this setup.

Hindsight is a client/server system backed by Postgres (even its "embedded" mode runs a server), and its `retain` operation always makes an LLM call to extract structured facts before writing anything, meaning a recurring API cost or a local Ollama/LM Studio setup just to store a memory. It benchmarks higher on BEAM (73.4% vs Mnemosyne's 65.2% at 100K scale, though the two runs used different judge models, not a clean comparison), but that accuracy is bought with infrastructure and cost that fits a multi-user/enterprise deployment better than a single-operator coding setup.

Knight Code already has a memory layer: `mcp/memory-server`'s typed, lifecycle-tracked event stores (decisions, promises, dev-diary, learnings, preferences, questions, reviews), and a separate hand-curated auto-memory index injected at session start. Neither does semantic search; `dev-diary-store.ts`'s `searchEntries` (and the equivalent in the other stores) is keyword substring matching. The one real capability gap either candidate would fill is semantic recall over unstructured memory, and Mnemosyne fills it without adding a server process or a recurring LLM bill.

## Resolved decisions

Reached via a 6-round grill-me interview, 2026-08-07. Each item below was a real branch in the decision tree; none defaulted by omission. Two answers went against the stated recommendation, both toward doing the fuller version rather than the narrower one, noted where relevant.

### 1. Routing rule (the load-bearing decision)
Typed, lifecycle-bearing facts (a decision, a promise, a preference, a dev-diary entry) keep going to the existing `mcp/memory-server` tools exactly as today, unchanged. `mnemosyne_remember`/`mnemosyne_recall` are reserved for open-ended, free-form context that doesn't fit those shapes, the kind of thing recalled later by rough meaning, not exact keyword. Content with a clear relationship/assignment shape and a "true as of" quality (e.g. "X is assigned to Y") becomes a structured triple via `mnemosyne_triple_add` instead, Claude decides inline which shape fits, no separate command needed.

**Enforcement is three-part**, chosen deliberately after ruling out a hard-blocking hook (the classification is a semantic judgment call, not something a `PreToolUse` hook can mechanically verify without its own LLM call, which would be a false guarantee):
1. This rule written directly into `CLAUDE.md` as standing behavior, the same way promise discipline and question-log discipline already live there, always in effect, no invocation needed.
2. An advisory (non-blocking) `PreToolUse` hook fires a reminder whenever a Mnemosyne tool is called. Visibility, not a gate, tagged `ADVISORY BY DESIGN` per this project's own hook-authoring standard, since the trigger condition is human judgment.
3. A manually-invokable skill for on-demand audits: "check my recent memory writes, did anything land in the wrong place."

### 2. Bank scoping and MCP registration (corrected from the original framing)
`mnemosyne_remember`/`mnemosyne_recall` have no per-call bank parameter (verified directly in `mcp_tools.py`/`tool_schemas.py`), bank is fixed for a server process's entire life via a `--bank` startup flag or `MNEMOSYNE_MCP_BANK` env var. A single global `~/.claude.json` entry could therefore only ever point at one bank for every project at once, which would have silently defeated per-project scoping. The actual mechanism: a `.mcp.json` entry added to each project (Knight Code first), each with its own `--bank <project-slug>` argument, mirroring exactly how `knight-code-memory` is already registered in this repo. Transport is stdio, matching every other MCP server here.

### 3. Project scope
Knight Code only. Not a staged rollout with other projects implicitly queued next, corrected during CEO review after Chris pushed back on that framing: KnightOS and Protocol Whisper App are DevKnight's own native-app builds, tracked through the DevKnight Workshop vault's own project system (Continuation Points, kanban, decision trail). The actual case for Mnemosyne, semantic recall over free-form architectural conversation, is specific to Knight Code itself, where this kind of discussion happens. Extending elsewhere is a genuinely separate decision for if and when a real need shows up there, not an assumed next step.

### 4. Install footprint and config profile
`pip install "mnemosyne-memory[mcp,embeddings]"`, no `[llm]` extra (matches item 5). Of the 8 built-in config profiles, none cleanly matches "embeddings on, LLM off" for a normal desktop (only `minimal` and `embedded` turn the LLM off at all; `minimal` also turns embeddings off, defeating the point; `embedded` fits but its `bit`-type vectors are tuned for Raspberry Pi-class hardware, not a desktop). Resolution: apply the `balanced` profile (the "just works" default, `int8` vectors, sensible weights, `auto_sleep` already off) and override just `llm_enabled` to `false`. Needs verifying against the profile system's own validation rules during actual setup, since a couple of settings require `llm_enabled` and may need explicit disabling too.

### 5. LLM-backed features
Off for v1. No `extract=True` fact extraction, no `sleep` consolidation. Working memory just accumulates until a later decision to enable either. Direct consequence: the persona tier (`mnemosyne_persona_promote/demote/list/reinforce`) is also blocked, since `persona_enabled` requires `llm_enabled`. Revisit both once there's real usage to judge by.

### 6. Redaction and hygiene (went against the original recommendation, toward the fuller build; corrected during plan-ceo-review's system audit)
Not a one-time seed, and not a new canonical file either. `mcp/memory-server/src/lib/redact-guard.ts` already imports `scan` from `lib/redact-engine.ts`, which already reads the mature, tiered (HIGH/MEDIUM/LOW) taxonomy in `lib/redact-patterns.ts` (validators for Luhn/entropy/IP classification, ReDoS-linted, its own test suite). That taxonomy is the real canonical source, no extraction from `redact-guard.ts` needed. The corrected scope: a generator script that reads `PATTERNS` from `lib/redact-patterns.ts` and emits Mnemosyne's `config.yaml` `ignore_patterns` regex list, plus a drift check added to the existing quality-gate script, the same shape this project already uses for skill install drift (`bun run skills:check`). Same outcome as originally decided, one real source of truth, checked automatically, at a fraction of the originally scoped work.

### 7. Knowledge graph (went against the original recommendation, toward using it now)
Wired in from day one alongside plain remember/recall (`mnemosyne_triple_add/_end/_query`, `mnemosyne_graph_query/_graph_link`), not deferred. Routing folded into item 1.

### 8. Storage location
Redirect `MNEMOSYNE_DATA_DIR` off its Hermes-oriented default (`~/.hermes/mnemosyne/data`) to fit Knight Code's own `~/.knightcode/` state convention. Add a new line to `docs/STATE_AND_CONFIG_LOCATIONS.md` once implemented.

### 9. Update and versioning
Pin the installed version. Upgrade deliberately, after checking what changed, never automatically. **Sharpened during independent verification**: pin to a specific released PyPI tag (e.g. `mnemosyne-memory==3.15.1`), not an unpinned install that could resolve whatever `main` currently reads. Confirmed live: the repo's own `main` branch already reads a version ahead of its latest tag, this project ships frequent point releases.

### 10. Windows verification
Not a decision, a required implementation step. No Mnemosyne doc specifically confirms Windows support; `sqlite-vec`, `fastembed`, and the `mcp` extra all generally ship Windows wheels, but that's general knowledge of those packages, not a confirmed fact about this specific repo. A real install-and-smoke-test pass on Chris's machine happens before anything further gets built on top of it.

### 11. Sync (multi-device)
Out of scope for v1. Single-machine setup today; revisit only if a second machine enters the picture.

### 12. Not used
`mnemosyne_shared_remember/_recall/_forget/_stats` (the cross-agent shared-surface memory tools): these exist for multi-agent/swarm setups. Knight Code is explicitly single-operator, so this whole tool family stays unused.

## CEO review, SELECTIVE EXPANSION additions

Run 2026-08-07, HOLD SCOPE recommended, Chris chose SELECTIVE EXPANSION. Five expansion candidates surfaced, all five accepted, then adjusted after an adversarial second review of the resulting CEO plan document.

### 13. Auto-recall at session start
`get_context()` (Mnemosyne's own proactive-context function) wired into the existing `hosts/claude/hooks/session-start-memory-hook.ts`, not a second hook. **Two rounds of adversarial review found real issues here.** Round 1: that file already documents its injected payload running past the host's ~9,200-character inline-read budget, today, before this change. Resolution: auto-recall results capped tightly (top 1-2, short) and placed first in the injection, ahead of the existing memory index, matching the file's own stated principle (shortest/most-actionable content first). This controls *what* gets truncated (the memory index, not auto-recall or the toolkit), it does not mean the payload fits inside the budget, it doesn't. Round 2: `get_context()` is a Python library function; the hook is a standalone Bun/TypeScript script with no existing bridge into Mnemosyne's Python code (no CLI subcommand to shell out to). The actual invocation mechanism is unresolved, an open question for plan-eng-review, not a scope question.

### 14. Memory stats line
A one-line count ("N free-form memories, M knowledge-graph facts tracked") appended to the same session-start injection. Subject to the same ordering/budget discipline as item 13.

### 15. `knightcode-mnemosyne-audit` skill, expanded
The manual audit skill from item 1's enforcement plan gets a real name and two extra jobs beyond the routing check it was already scoped for: it also runs Mnemosyne's `hygiene_audit` (deterministic, no LLM, confirmed via direct source read of `mnemosyne/core/hygiene.py` to be noise/secret scoring, not database integrity) as a second safety pass beyond the redaction generator, and logs a `learnings_log` entry (operational type) whenever it finds a real misroute, building a searchable record of routing-rule blind spots over time instead of silently correcting and forgetting them.

### 16. Redaction generator scope, reversed
A sixth candidate (build the generator from item 6 as a reusable, pluggable utility for future external-tool integrations) was accepted, then reversed after the adversarial review named it as speculative generality: flexibility for a second consumer that doesn't exist yet. Chris agreed on reflection. Item 6 stays exactly as originally resolved: Mnemosyne-specific, generalize later only if a second real consumer shows up.

### 17. Data directory, pinned exact path
Decision 8 said "redirect to fit Knight Code's convention" without pinning a path. Resolved during temporal interrogation: one shared `MNEMOSYNE_DATA_DIR` at `~/.knightcode/mnemosyne/data`, not a directory per project. Mnemosyne's own bank mechanism already creates a subfolder per bank under one shared data directory (confirmed in `banks.py`), so per-project isolation comes from the `--bank <project-slug>` argument (decision 2), not a second, redundant Knight-Code-side directory-per-project layered on top.

### 18. Redaction generator, pattern subset
Mnemosyne's `ignore_patterns` only supports plain regex via Python's `re.search()`, no post-match validator hook. Several patterns in `lib/redact-patterns.ts` need one (credit-card numbers need a Luhn checksum, env-style secrets need entropy scoring) or they'd false-positive constantly, e.g. blocking harmless 13-19 digit numbers as "credit cards." Resolved: the generator ports only the HIGH-tier, pure-regex patterns with no validator dependency (AWS keys, GitHub tokens, Anthropic/OpenAI keys, Stripe secrets, Slack tokens, PEM blocks, and similar). Validator-dependent patterns stay uncaught by Mnemosyne's own filter specifically, still caught wherever Knight Code's own `redact-guard.ts` already applies elsewhere.

### 19. Injection safety on recall (found during Section 3, security review)
`redact-guard.ts`'s `datamark()` function neutralizes control characters, code fences, and chat role/turn markers (`system:`, `<user>`, etc.) on write, so a stored memory can't later read as fake instructions when it resurfaces in Claude's context. It only runs on `mcp/memory-server`'s own tools today; Mnemosyne's remember/recall path bypasses it entirely. Real risk: if Claude ever stores something read from an untrusted source (a webpage, a file, command output) into Mnemosyne, that content re-enters Claude's context on recall completely unneutralized. Resolved in principle: wrap Mnemosyne's remember and recall calls with the same `datamark()` treatment the existing stores already use. **Mechanism not yet resolved, honestly, on the same footing as item 13's bridge question**: Mnemosyne is a third-party external MCP server, not Knight Code's own code, so there's no inline call site the way `redact-guard.ts` has for its own stores. Real candidate mechanisms for plan-eng-review to choose between: a thin proxy MCP server Knight Code writes that wraps Mnemosyne's tools and applies `datamark()` on the way through (real complexity, a new service); a `PreToolUse` hook that rewrites tool-call arguments in place, if Claude Code's hook system actually supports that (unverified); or a `CLAUDE.md` instruction relying on Claude's own discipline to datamark before storing and after recalling (weakest, no structural guarantee).

### Adversarial review notes
An independent reviewer (fresh context, no visibility into this session) checked the CEO plan document against the real repo and Mnemosyne's actual docs. Two of its most serious claims didn't survive re-verification: it claimed `hygiene_audit` is a database-integrity tool (conflated with the separate, unrelated `mnemosyne doctor` command) and that no `balanced` profile exists in Mnemosyne's docs (it does, `docs/profiles.md`, confirmed by direct re-read). Both were rejected after checking primary sources. The context-budget conflict (item 13) was real and is reflected above. Full CEO plan document with the complete scope table: `~/.knightcode/projects/ValleytheKnight-knight-code/ceo-plans/2026-08-07-mnemosyne-memory-integration.md`.

## Eng Review, Architecture Resolutions

Run 2026-08-07, resolving the two mechanisms CEO review explicitly deferred rather than guessed at.

### 20. get_context() bridge, resolved (closes item 13's open question)
A small Python wrapper script Knight Code owns: imports `mnemosyne`, calls `get_context()`, prints JSON to stdout. Invoked via a subprocess spawn from `session-start-memory-hook.ts` (`execFileSync`), the same pattern the hook already uses for its own `knight-slug` call. Rejected: an HTTP/SSE bridge to a persistent Mnemosyne server, since that would mean running Mnemosyne as a continuously-running background service, undercutting the reason Mnemosyne got chosen over Hindsight in the first place (no persistent service). `mnemosyne recall(query)` was also considered and rejected: it needs a query string, `get_context()` doesn't, it's a genuinely different function (current hot working-memory context, not a search).

### 21. datamark() wrapping, resolved (closes item 19's open question)
A thin proxy MCP server Knight Code owns and registers instead of connecting to `mnemosyne mcp` directly. Claude connects to the proxy; the proxy forwards every call to the real Mnemosyne MCP server as a client, applying `datamark()` on the way through. Rejected: a `PreToolUse` hook that rewrites tool-call arguments, since every existing hook in this repo (`skill-graph-first-gate.ts`, `vault-agent-gate.ts`, and others) only allows or denies, none mutate arguments, and there's no documented capability to do so. Also rejected: a `CLAUDE.md` instruction relying on Claude's own discipline, since that provides no structural guarantee for something security-relevant, directly conflicting with this project's own stated hook philosophy ("default to enforcement, not guidance").

**Proxy surface, also resolved**: the proxy wraps every Mnemosyne tool uniformly (remember, recall, the triple tools, `hygiene_audit`, everything), not just the free-form ones. `datamark()` is applied selectively per-field (free-form text fields like `content` get it, numeric fields like `importance` or `limit` pass through untouched). Rejected: a narrower proxy wrapping only remember/recall/triples, leaving `hygiene_audit` on a direct connection, since that means two connection paths to Mnemosyne existing side by side, more to keep in sync as either evolves.

**Consequence for item 2/T3**: the per-project `.mcp.json` entry now registers Knight Code's own proxy server, not `mnemosyne mcp` directly. The proxy itself is what receives the `--bank <project-slug>` argument and passes it through to the real Mnemosyne process it wraps.

## Independent Ground-Truth Verification

Run 2026-08-07, per Chris's standing request: an independent agent, fresh context, no visibility into this plan's own development, checked every checkable claim about Mnemosyne itself against the live `mnemosyne-oss/mnemosyne` GitHub repo (not a cached clone) and PyPI. All 9 checked claims (transport, install extras, profiles, ignore_patterns semantics, bank scoping, hygiene_audit's real nature, get_context()'s signature, Windows wheel availability, sync as a separate feature) came back CONFIRMED against real source. One new, real finding surfaced in the process, folded in below.

### 22. Bank isolation has a real gap the schema doesn't show
`mnemosyne_remember`/`mnemosyne_recall`'s tool schema has no `bank` parameter, confirming item 2's "bank is fixed at server startup" model, but the actual handler code (`mcp_tools.py`) resolves bank as `arguments.get("bank") or os.environ.get("MNEMOSYNE_MCP_BANK") or "default"`. A tool call that includes an undocumented `bank` key in its arguments silently overrides the server's fixed bank. Nothing in the protocol blocks this, only the schema's silence does. Given the whole per-project isolation model (item 2, 21) depends on bank actually staying fixed per server instance, this needs a real guard, not just an assumption: the proxy (item 21) must strip or reject any `bank` key from incoming call arguments before forwarding to Mnemosyne, so cross-project bank leakage can't happen even if something upstream ever sends one. Added to T8/T15.

### Additional risk notes from verification (not scope changes, just sharper eyes on existing tasks)
- `hygiene_audit`/`hygiene_clean` received a same-day bug fix (commit `7254509`, 2026-08-07) to how audit results unwrap before cleaning, in the exact path item 15/T11 builds on. T11 needs a smoke test against the actually-installed version, not just trust in the docs.
- Mnemosyne migrated its own MCP SDK from 1.x to 2.x nine days before this plan was drafted, changing the tool-registration contract the proxy (item 21/T8) has to target. T13's proxy-resync language should cover SDK/transport protocol changes, not just tool-schema drift.
- The repo's `__init__.py` on `main` already reads a version ahead of the last tagged release. Item 9's "pin the installed version" needs to mean pinning to a released tag specifically, not whatever `pip install` happens to resolve from a moving branch.

## CEO Review, Required Outputs

### NOT in scope
- Sync (multi-device), item 11: single-machine setup today.
- The persona tier: blocked as a direct consequence of item 5 (LLM off).
- The shared/cross-agent memory tools (`mnemosyne_shared_*`), item 12: single-operator setup has no use for multi-agent surface memory.
- LLM-backed fact extraction and sleep consolidation, item 5.
- Rolling out to other projects (KnightOS, Protocol Whisper App): not queued, not assumed, a separate decision if a real need shows up there (corrected under item 3 above).
- A pluggable/reusable redaction-generator abstraction, item 16: reversed after adversarial review named it as speculative generality.

### What already exists (reused, not rebuilt)
- `mcp/memory-server`'s typed lifecycle stores: untouched, still the home for decisions/promises/preferences/diary/learnings.
- `lib/redact-patterns.ts` + `lib/redact-engine.ts`: the canonical redaction taxonomy the generator reads from (items 6/18), not a new one built from scratch.
- `mcp/memory-server/src/lib/slug.ts`'s `resolveSlug` pattern: the model for Mnemosyne's own `--bank` scoping (item 2).
- The existing advisory-hook style (`vault-sync-nudge-hook.ts` and siblings): the template for the new routing-reminder hook.
- `scripts/knight-quality-gate.ts`'s drift-check pattern (the same shape `skills:check` already uses): the template for the new redaction-pattern drift check.
- `hosts/claude/hooks/session-start-memory-hook.ts`: extended in place for auto-recall (item 13), not duplicated.
- `mcp/memory-server/src/lib/redact-guard.ts`'s `datamark()`: reused directly for Mnemosyne's own remember/recall (item 19).

### Dream state delta
```
  CURRENT STATE                       THIS PLAN                            12-MONTH IDEAL
  Typed lifecycle memory,       -->   Mnemosyne adds project-scoped   -->   Every durable piece of
  keyword-only search.                semantic recall (call-only +          context Chris has given
  Hand-curated MEMORY.md              a tightly-capped auto-recall           Claude, across every
  loaded wholesale at                 at session start) and a               project, recallable by
  session start. Free-form            temporal knowledge graph, both        meaning without
  context lost or forced              redacted through Knight Code's        re-explaining it. Typed
  into an oversized note.             own pattern taxonomy and               facts still precisely
                                       datamarked against injection.         tracked. The same
                                       Three-part routing enforcement        per-project pattern
                                       (CLAUDE.md, advisory hook,            proven here, extended
                                       audit skill).                         elsewhere only if a
                                                                             real need shows up.
```

### Error & Rescue Registry
```
  METHOD/CODEPATH                          | WHAT CAN GO WRONG                              | EXCEPTION CLASS
  ------------------------------------------|-------------------------------------------------|------------------
  Mnemosyne MCP server startup               | Windows wheel install fails (sqlite-vec/       | install/startup
  (per-project .mcp.json)                    | fastembed)                                     | failure
  Mnemosyne config setup                     | balanced+llm_enabled=false override fails      | config validation
                                              | one of the 13 profile-validation rules         | error
  get_context() bridge call                  | Python subprocess fails, times out, or the     | bridge failure
  (session-start-memory-hook.ts)             | Mnemosyne DB is locked                         |
  mnemosyne_remember / mnemosyne_recall       | MCP server not running / disconnected          | tool-call error
  (Claude-invoked)                           |                                                 | (Claude Code's own)
  redaction generator                        | A ported lib/redact-patterns.ts regex doesn't  | invalid pattern
                                              | compile under Python's re module               |
  quality-gate drift check                   | Mnemosyne's ignore_patterns hand-edited out    | drift detected
                                              | of sync with the generator's output            | (intentional, loud)
  knightcode-mnemosyne-audit skill           | hygiene_audit call fails (schema mismatch,     | tool-call error
                                              | version drift)                                 |

  EXCEPTION CLASS         | RESCUED? | RESCUE ACTION                                  | USER SEES
  --------------------------|----------|-------------------------------------------------|------------------
  install/startup failure   | N/A      | Caught by the decision-10 smoke-test gate,     | Setup blocked
                             |          | before any session ever runs this code          | until fixed
  config validation error   | GAP      | Must validate config applies cleanly before    | Currently: silent
                             |          | wiring the .mcp.json entry (implementation task)| misconfiguration
  bridge failure             | Y        | Log to hook-errors.log, inject nothing extra,  | Session starts
                             |          | preserve the hook's existing invariant          | normally, no recall
  tool-call error (MCP)      | Y        | Claude Code's own generic tool-error surface   | "tool unavailable"
  invalid pattern            | GAP      | Generator must self-test-compile each pattern  | Currently: a
                             |          | before writing config.yaml (implementation task)| silently-broken
                             |          |                                                   | filter, false safety
  drift detected              | Y        | Quality-gate fails loud, exactly as designed    | CI/gate failure
  audit skill tool error      | Y        | Skill reports failure clearly, does not crash  | Clear error message
```

### Failure Modes Registry
```
  CODEPATH                    | FAILURE MODE                    | RESCUED? | TEST? | USER SEES        | LOGGED?
  ------------------------------|----------------------------------|----------|-------|-------------------|--------
  Windows install                | Missing native wheel             | N/A      | Y     | Setup blocked     | Y (smoke test)
  Config apply (balanced+off)    | Validation rule silently violated| GAP      | N     | Nothing (silent)  | N, **CRITICAL GAP until the implementation task below lands**
  get_context() bridge           | Subprocess timeout/crash         | Y        | N     | Nothing (degrades)| Y (hook-errors.log)
  Redaction generator            | Broken regex ported silently     | GAP      | N     | Nothing (silent)  | N, **CRITICAL GAP until the implementation task below lands**
  Quality-gate drift check       | Config hand-edited out of sync   | Y        | Y     | Gate failure      | Y
  Audit skill                    | hygiene_audit call fails         | Y        | N     | Error message     | Y
```
Both CRITICAL GAP rows are closed by concrete implementation tasks below (config validation before wiring the MCP entry, generator self-test on every ported pattern), not left open.

### Diagrams

**System architecture (updated after eng review resolved T6/T8):**
```
  Claude Code (this repo, Knight Code)
       |
       |-- .mcp.json (per-project) --> Knight Code's own proxy MCP server (stdio, new)
       |                                     |    (wraps every Mnemosyne tool, datamark()s
       |                                     |     free-form text fields per-call)
       |                                     v
       |                               Mnemosyne MCP server (stdio, external process)
       |                                     |
       |                                     +-- SQLite DB, ~/.knightcode/mnemosyne/data
       |                                          (bank folders = per-project isolation)
       |
       |-- SessionStart hook (session-start-memory-hook.ts, extended)
       |        |-- existing: MEMORY.md index injection
       |        +-- new: capped auto-recall, via a subprocess call to a small Python
       |                 wrapper script (get_context() bridge), placed first in payload
       |
       |-- PreToolUse hook (new, advisory): fires on mnemosyne_* tool calls, reminder only
       |
       +-- knightcode-mnemosyne-audit skill (new, manual invoke)
                |-- routing-mistake check --> learnings_log
                +-- hygiene_audit pass, through the proxy like every other call

  lib/redact-patterns.ts --> [redaction generator, new script] --> Mnemosyne config.yaml ignore_patterns
                                        ^
                                        |
                            scripts/knight-quality-gate.ts (drift check, new)
```

**Data flow, auto-recall (the one new data flow this plan adds):**
```
  SESSION START
       |
       v
  [call get_context() via bridge] --> nil/no result? --> inject nothing extra, continue normally
       |                          --> bridge error/timeout? --> log to hook-errors.log, inject nothing extra
       |                          --> empty result set? --> inject nothing extra
       v
  [got 1-2 results]
       |
       v
  [datamark() each result] (item 19, injection safety)
       |
       v
  [inject, capped, FIRST in payload] --> existing MEMORY.md index follows --> stats line (item 14) last
```

### Worktree Parallelization Strategy

T1-T3 (install, config, base MCP wiring) is a blocking foundation, has to land first. After that, three genuinely independent workstreams open up.

| Step | Modules touched | Depends on |
|------|-----------------|------------|
| T1-T3, foundation | Mnemosyne install, `.mcp.json` | none |
| T4-T5, redaction | `lib/redact-patterns.ts` (read-only), new generator script, `scripts/knight-quality-gate.ts` | T1-T3 |
| T6-T7, auto-recall | `hosts/claude/hooks/session-start-memory-hook.ts`, new Python bridge script | T1-T3 |
| T8, proxy | New `mcp/mnemosyne-proxy/` directory | T1-T3 |
| T9-T11, routing/audit | `CLAUDE.md`, new advisory hook file, new `knightcode-mnemosyne-audit` skill | T1-T3, and T8 (the audit skill calls through the proxy) |
| T12-T15, docs/tests | `docs/STATE_AND_CONFIG_LOCATIONS.md`, rollback checklist, all tests | Everything above |

**Lanes**: Lane A: T4-T5 (redaction, independent). Lane B: T6-T7 (auto-recall, independent). Lane C: T8 (proxy, independent), then T9-T11 (routing/audit, depends on C's own output). Lane D: T12-T15 (docs/tests, waits on all others).

**Execution order**: T1-T3 lands first, sequentially. Then launch Lanes A, B, and C in parallel (three worktrees, no shared modules between them). Lane C continues into T9-T11 once T8 is done. Lane D waits for A, B, and C to all finish.

**Conflict flags**: none. No two lanes touch the same module directory.

### Stale Diagram Audit
No existing ASCII diagrams live in any file this plan touches (`session-start-memory-hook.ts`, `redact-guard.ts`, `decision-store.ts` carry prose comments, not diagrams). Nothing to audit for staleness.

## Implementation Tasks

**Post-build code review, same session (`/code-review high`, parallel subagents against the full uncommitted diff).** Chris asked for this explicitly after T1-T15 landed. Four findings came back; three were real and in scope, fixed and reverified, one was a pre-existing file this plan never touched (`hosts/claude/hooks/obsidian-release-version-gate.ts`), correctly left alone and flagged to Chris rather than fixed under this plan's banner.

1. **`scripts/knight-quality-gate.ts`'s "mnemosyne not installed" skip never actually fired.** The generator's own `--check` mode, when `mnemosyne` isn't on PATH, doesn't print any "not found"/ENOENT text, its inner `config get` call returns empty stdout, which reads as a genuine mismatch against the 13 generated patterns and exits 1 with a "drift detected" message. The quality-gate's text-pattern skip check never matched that, so the gate reported not-clean on any machine without Mnemosyne installed, exactly contradicting its own stated intent. Fixed in both places: the generator's `--check` now explicitly detects ENOENT and reports it as "mnemosyne not found" rather than falling through to the drift message, and the quality-gate check now tests `mnemosyne`'s presence directly (the same `mnemosyneAvailable()` shape the test suite already used) instead of parsing the generator's output text at all.
2. **The proxy's bank-slug resolution could silently diverge from the SessionStart hook's.** `mcp/mnemosyne-proxy` originally imported `resolveSlug` from `mcp/memory-server/src/lib/slug.ts`, which always does a fresh, uncached git-remote lookup. `hosts/claude/hooks/session-start-memory-hook.ts` resolves the same conceptual slug via `bin/knight-slug`, which prefers a cached value under `~/.knightcode/slug-cache/`. If the cache ever went stale relative to a fresh lookup (a renamed/re-forked remote), the proxy and the hook could resolve to different banks, memories written through `mnemosyne_remember` disappearing from auto-recall with no error anywhere. Fixed: the proxy now shells out to `bin/knight-slug` directly, the same mechanism the hook already uses, guaranteeing both resolve identically rather than merely resolving the same by coincidence on this one repo today.
3. **A comment in `mcp/mnemosyne-proxy/src/server.ts` violated CLAUDE.md's "no dev-diary comments" rule**, naming a specific installed version and narrating a build-time discovery rather than stating durable why. Reworded to state the actual, still-true-going-forward reason for dynamic tool discovery, with the version-pinned narrative removed (the underlying finding is preserved in this document instead, which is where build-history narrative belongs).

All three fixes reverified: `bunx tsc --noEmit` clean, all 21 Mnemosyne tests passing (one test's own PATH-restriction had to be adjusted to match the new, earlier failure point introduced by fix 2, a real and correct behavior change, not a regression), quality-gate's mnemosyne section clean.

**T9-T11 built and verified, continuing the same session.** The CLAUDE.md routing rule (T9, a new "Mnemosyne memory routing" section extending the existing "Persistent memory index" boundary to include Mnemosyne as a third surface, since decision 1 only drew the line against the typed MCP tools and left the memory-index overlap unaddressed), the advisory PreToolUse hook (T10, matcher `mcp__knight-code-mnemosyne__.*`, tested against a matching call, a non-matching call, and malformed stdin, never denies in any case), and the `knightcode-mnemosyne-audit` skill (T11) all landed.

**T11 caught two real bugs before they could ship broken, both fixed and verified live rather than assumed:**
1. `mnemosyne_export` is a file-write tool (`output_path` is a required argument), not a query-and-return tool; the skill's first draft called it with no arguments and got `{"error":"output_path is required"}`. Fixed: compute a scratch path in bash, call export against it, `Read` the file back, delete it after.
2. That scratch path then failed a second way: Mnemosyne is a Python/Windows process and cannot open the POSIX-style path Git Bash itself uses (`/c/Users/...`), confirmed live (`[Errno 2] No such file or directory` until converted). Fixed with `cygpath -w` before passing the path to the tool call. Both fixes are now the documented mechanism in the skill's own Step 1, not a one-off workaround.

**A related, real finding surfaced while cleaning up test data from T8's live proxy test**, worth recording since it will recur for anyone testing against Mnemosyne directly: the module-level `forget(id, bank=...)` convenience function deletes from the legacy `memories` table scoped by an auto-generated `session_id`, which does not match the `session_id` a memory gets when stored through the MCP server (`mcp_<bank>`), so a `forget()` call from a standalone script can silently delete zero rows in that table while still reporting success. Separately, `get_context()` applies its own filter predicates when reading `working_memory`, so a row can read as gone through `get_context()` while still physically present in the table (confirmed: `get_context()` returned empty while a direct `SELECT COUNT(*)` on the same bank's db file returned 1). The only fully reliable verification is a direct query against the bank's own sqlite file, not `forget()`'s return value or a `get_context()`/`recall()` read coming back empty. Full detail: `learnings_log` entries `mnemosyne-forget-and-get-context-give-false-clean-signal` and the export-path fix folded into the skill itself.

**T4-T8 built and verified live, same session.** All five landed: the redaction generator (T4, 13 ported patterns, self-compile plus real-fixture-match verify, both passing), its quality-gate drift check (T5, confirmed it both detects a hand-edit and clears after resync), the get_context()/stats bridge (T6/T7, one combined Python subprocess call, wired into session-start-memory-hook.ts in the order the plan's data-flow diagram specifies: toolkit, auto-recall, memory index, stats line last), and the injection-safety proxy (T8).

**Correction to the T4-T8 pre-build note above: the persona_* tools and a separate triple_end tool do exist.** That note said they were absent based on a static grep of literal tool-name strings in `mcp_tools.py`. Once T8's proxy was actually built and driven with a real MCP client through a live `listTools()` call, the true tool surface came back as 36 tools, including `mnemosyne_persona_promote/demote/list/reinforce`, `mnemosyne_triple_end`, and `mnemosyne_sync_push/pull/status`, none of which the static grep had found; they're evidently registered through a different code path than the plain string literals that grep matched. This is now itself a live-confirmed argument for the earlier correction, not just a theoretical one: T8's proxy discovers tools dynamically via `listTools()` specifically because a hardcoded list would have missed 3 real tool families, and this session's own pre-build source grep independently made exactly that mistake.

**T8 proven end-to-end with a real MCP client, not just unit-level:** connected an actual `@modelcontextprotocol/sdk` `Client` to the running proxy over stdio and drove two live calls. (1) Called `mnemosyne_remember` with `bank: "attacker-bank"` in the arguments; the response confirmed the memory landed in `ValleytheKnight-knight-code` (the proxy's own spawn-time `--bank`), not the attacker-supplied value, closing item 22 for real rather than by inspection. (2) Stored content containing `system:`, triple backticks, and a dash-run (an injection-shaped payload); both the store response's `content_preview` and a full `mnemosyne_recall` response came back with `system:` zero-width-space-broken, backticks replaced with `'''`, and the dash run replaced with `===`, confirming datamark() actually runs on both the request and response path, not just the request path item 21's original text focused on.

**T4-T8 pre-build verification, same session.** Checked against the actually-installed `mnemosyne-memory==3.15.1` source (`core/filters.py`, `mcp_tools.py`) before writing any code, per Chris's request.

- **T4 correction (real, changes the implementation):** `ignore_patterns` in `config.yaml` is a single newline-separated string, not a YAML list. `core/filters.py`'s own docstring is explicit about why: regex quantifiers like `a{2,4}` contain commas, so the parser splits only on `\n`. The generator must join its ported patterns with `\n` into one string value, not build a YAML list. Confirmed `ignore_patterns` is a real recognized key (`ENV_VAR_MAP["ignore_patterns"] = "MNEMOSYNE_IGNORE_PATTERNS"`), so it won't get flagged by validate_profile's typo rule (14).
- **T4 side note, not a scope change:** Mnemosyne ships its own default secret/noise patterns (`SECRET_LABELED_PATTERNS`, `DEFAULT_NOISE_PATTERNS` in `core/filters.py`) as a second, independent layer, but they only run when `MNEMOSYNE_WRITE_CLASSIFIER` is `warn` or `strict` (default `off`). The plain `ignore_patterns` check item 6 chose runs regardless of that mode, confirmed by reading `should_remember`'s off-mode branch, so T2's config needs no further change for item 6 to work. Worth knowing this second layer exists for later, not something to turn on now.
- **T8, tool surface is bigger and drifted from the plan's list:** grepped the real tool names in `mcp_tools.py`. Present: `mnemosyne_remember`, `recall`, `sleep`, `scratchpad_read/write/clear`, `stats`, `batch`, `shared_remember/recall/forget/stats`, `invalidate`, `validate`, `get`, `triple_add`, `triple_query`, `remember_canonical`, `recall_canonical`, `export`, `update`, `forget`, `import`, `diagnose`, `graph_query`, `graph_link`, `hygiene_audit`, `hygiene_clean`. Not present at all: any `mnemosyne_persona_*` tool (not gated behind config, just absent from this version's registration table) and `mnemosyne_triple_end` (only `triple_add`/`triple_query` exist; a triple's validity end appears to be a parameter, not a separate tool). Consequence for T8: the proxy cannot hardcode the plan's illustrative tool-name list, it must enumerate whatever the real `mnemosyne mcp` process reports via its own `list_tools` response at connect time and wrap each one generically, or it will silently miss real tools (`export`/`import`/`diagnose`/`batch`/etc.) or wrap tools that no longer exist. Item 12's "persona tools, not used" is moot for this version since they're not there to begin with, not a scope decision to revisit.
- **T8, datamark() scope needs to cover response fields, not just request fields:** read `_handle_remember` and `_handle_recall` directly. `mnemosyne_remember`'s own response includes `content_preview` (a 100-char slice of the raw stored content) returned immediately in the tool result, and `mnemosyne_recall`'s response returns full stored content for every match. Both flow back into Claude's context on the same call, so datamark() has to run on these response fields too, not only on `content` before it's written. Also: `mnemosyne_remember`'s `metadata` argument is an arbitrary dict, free-form values could live inside it same as `content`; the proxy needs a decision on whether metadata values get recursively datamarked or are treated as opaque/Knight-Code-controlled only, the original plan didn't address this field specifically.
- **T6/T8 environment:** confirmed `get_context(limit=10, bank=None)` at module level takes no query string (matches decision 20), but defaults to `limit=10`; T6's bridge script needs to pass `limit=2` explicitly to get the "top 1-2" cap decision 13 wants rather than relying on the default. `PYTHONUTF8=1` (see T1/T2 findings above) needs to be in the child-process env for both the T6 bridge subprocess and whatever process T8 spawns for the real Mnemosyne server.
- **T8, matches existing repo convention:** confirmed `@modelcontextprotocol/sdk` (`^1.29.0`) is already a root-level dependency, and every existing `mcp/*` server (`mcp/memory-server/src/server.ts`) is a Bun/TypeScript stdio server using `McpServer`/`StdioServerTransport` from that same SDK. The SDK also ships client-side `Client`/`StdioClientTransport` classes for exactly this proxy-to-child-process shape, so T8 needs no new dependency and should follow the same file layout/pattern as `mcp/memory-server`, not a Python-side proxy.
- **Item 22 (bank leakage) reconfirmed on this exact installed version**, not just the plan's GitHub source check: `mcp_tools.py`'s `_resolve_bank` reads `arguments.get("bank") or os.environ.get("MNEMOSYNE_MCP_BANK") or "default"`, byte-for-byte as the plan described.

**Correction found during the build session, 2026-08-07 (same day as this plan).** T3's own task text says to register `.mcp.json` pointing at "the new proxy server (item 21)," but the proxy is T8's output and did not exist yet when T3 came up in execution order. The worktree table lists T8 as depending on T1-T3, not the reverse, so this is a real internal contradiction, not a misreading. Wiring the raw `mnemosyne mcp` server live in the interim would mean tool calls bypass `datamark()` entirely, exactly the two-connection-path problem item 21 rejected on purpose. Resolution: T3 splits into two parts. The environment-prep half (install, `MNEMOSYNE_DATA_DIR`, `balanced` profile with `llm_enabled=false` validated clean via `validate_profile()`) has no dependency on the proxy and is done. The live `.mcp.json` registration half is deferred until T8's proxy exists, then completed as the last step of T8 rather than as part of T3. T4-T7 are unaffected, none of them need a live MCP connection, only the installed library and config.yaml.

Also confirmed live during T1/T2: `mnemosyne-memory==3.15.1` (item 9's example version was in fact the real latest release, no drift), `sqlite-vec`/`fastembed`/`mcp` all install cleanly from win_amd64 wheels (closes decision 10's Windows-support open question), semantic recall works (paraphrase-with-keyword-overlap queries return correct results, e.g. "cross project isolation" against stored text ending "...isolation leaks"; fully cross-domain paraphrases with zero keyword overlap scored below the default relevance cutoff and returned nothing, a real tuning limit of the default hybrid weights worth knowing about, not a bug), a real Windows-only encoding bug was found and fixed (`PYTHONUTF8=1` must be set on every Mnemosyne invocation, including T6's bridge script and T8's proxy, or the config seeder's em dash write breaks every subsequent command with a caught-but-noisy stderr warning), and applying `balanced` then separately overriding `llm_enabled` left two dependent flags (`smart_compress`, `sleep_model_refresh_enabled`) silently violating validation rules 4 and 5 until both were also disabled, exactly the CRITICAL GAP this plan's Failure Modes Registry named for T2. Full detail on both findings: `learnings_log` entries `mnemosyne-windows-config-encoding` and `mnemosyne-config-set-no-cross-validation`.

Synthesized from every finding across grill-me and both CEO-review rounds. Two tasks (T6, T8) carry a real, currently-unresolved mechanism question for plan-eng-review to settle, not just execute; everything else is a concrete build step.

- [x] **T1 (P1, human: ~30min / CC: ~10min), install** Install `mnemosyne-memory[mcp,embeddings]` on Chris's machine, confirm `sqlite-vec`/`fastembed`/`mcp` all install cleanly, run a basic remember/recall round-trip. Blocks everything else (item 10).
  - Verify: a stored memory is recallable by rough meaning, not just exact text.
- [x] **T2 (P1, human: ~30min / CC: ~10min), config** Apply the `balanced` profile, override `llm_enabled` to `false`, validate against the profile system's 13 validation rules, confirm no silent rule violation before wiring anything further.
  - Verify: `mnemosyne config get llm_enabled` reads `false`; no validation warning on apply.
- [x] **T3 (P1, human: ~30min / CC: ~10min), MCP wiring** Set `MNEMOSYNE_DATA_DIR=~/.knightcode/mnemosyne/data` (item 17), register a per-project `.mcp.json` entry for Knight Code pointing at the new proxy server (item 21), not `mnemosyne mcp` directly, with `--bank <project-slug>` passed through to it. Confirm an MCP reconnect exposes the tools.
  - Verify: `mnemosyne_remember`/`mnemosyne_recall` appear in the tool list after reconnect, served through the proxy.
- [x] **T4 (P1, human: ~3h / CC: ~30min), redaction generator** Build the generator: read `lib/redact-patterns.ts`, port only pure-regex HIGH-tier patterns with no validator dependency (item 18), self-test-compile each ported pattern under Python's `re` module before writing, write to Mnemosyne's `config.yaml` `ignore_patterns`. Closes the invalid-pattern CRITICAL GAP.
  - Verify: every ported pattern actually matches a known-bad test string in Mnemosyne's real regex engine, not just at generation time.
- [x] **T5 (P2, human: ~1h / CC: ~15min), drift check** Add a check to `scripts/knight-quality-gate.ts` comparing the generated `ignore_patterns` against current `lib/redact-patterns.ts` output.
  - Verify: editing `lib/redact-patterns.ts` without re-running the generator fails the gate.
- [x] **T6 (P1, human: ~2h / CC: ~20min), auto-recall bridge** Build the small Python wrapper script (item 20) that imports `mnemosyne` and calls `get_context()`, invoked via `execFileSync` from `session-start-memory-hook.ts`, same pattern as the hook's existing `knight-slug` spawn. Wire capped (top 1-2, short) auto-recall placed first in the injection ahead of the memory index. Preserve the hook's existing "always exit 0, degrade silently" invariant.
  - Verify: a Mnemosyne outage or bridge timeout does not block session start; auto-recall content appears before the memory index in the injected payload.
- [x] **T7 (P2, human: ~20min / CC: ~5min), stats line** Add the one-line memory-stats count (item 14) to the same injection, after auto-recall, subject to the same budget discipline.
- [x] **T8 (P1, human: ~1 day / CC: ~1.5h), injection safety proxy** Build the thin proxy MCP server (item 21): wraps every Mnemosyne tool uniformly, forwards to the real Mnemosyne server as a client, applies `datamark()` per-field on free-form text fields only (`content`, not `importance`/`limit`/etc.). Strips or rejects any `bank` key present in incoming call arguments before forwarding (item 22): the underlying handler honors an undocumented `bank` argument even though the schema doesn't expose one, so the proxy is the only real enforcement point for the per-project isolation model.
  - Verify: a stored memory containing a fake `system:` marker reads as neutralized text on recall, not as a role marker, for every tool the proxy wraps. A call that includes a `bank` argument does not change which bank actually gets used.
- [x] **T9 (P2, human: ~20min / CC: ~5min), routing rule** Write the `CLAUDE.md` standing rule (item 1): typed facts stay in the existing tools, Mnemosyne is free-form only, relationship-shaped facts become triples.
- [x] **T10 (P2, human: ~1h / CC: ~15min), advisory hook** Write the new `PreToolUse` hook, tagged `ADVISORY BY DESIGN` per this project's hook-authoring standard, firing a non-blocking reminder on `mnemosyne_*` tool calls.
  - Verify: the hook never denies a call, only annotates.
- [x] **T11 (P2, human: ~2h / CC: ~20min), audit skill** Build `knightcode-mnemosyne-audit` (item 15): routing-mistake check, `learnings_log` entry on a real misroute, `hygiene_audit` pass. Through the normal skill source-then-install pipeline (`bun run skills:install`), not a raw drop-in.
  - Verify: runs cleanly with zero stored memories (fresh-install case).
- [x] **T12 (P2, human: ~10min / CC: ~2min), docs** Add a line to `docs/STATE_AND_CONFIG_LOCATIONS.md` documenting Mnemosyne's data directory.
- [x] **T13 (P3, human: ~45min / CC: ~15min), rollback checklist** Write a simple uninstall path: remove the `.mcp.json` entry, `pip uninstall`, delete the data directory, remove the hook/skill/proxy files, revert the `CLAUDE.md` section. Documents two resync steps for whenever item 9's deliberate version upgrade happens: re-check the proxy's declared tool schemas against Mnemosyne's real ones for drift, and re-check the proxy's own MCP client code against whatever SDK/transport version Mnemosyne pins (it migrated 1.x to 2.x nine days before this plan, changing the tool-registration contract once already).
- [x] **T14 (P2, human: ~2h / CC: ~20min), tests** Cover: the generator's self-compile check (T4), the drift check firing correctly (T5), the advisory hook never blocking (T10), the audit skill's zero-memories case (T11) smoke-tested against the actually-installed `hygiene_audit` (which received a same-day bug fix during this plan's own verification pass, don't trust docs alone here), and `datamark()` neutralizing a fake `system:` marker on both write and recall paths, across every tool the proxy wraps, not just remember/recall (T8).
- [x] **T15 (P1, human: ~1h / CC: ~15min), proxy tests** The proxy (T8) forwards every Mnemosyne tool call correctly with only the intended fields datamarked; degrades with a clear error (not a hang) if the real Mnemosyne process fails to start; a call carrying a `bank` argument does not override the server-configured bank (item 22).

## Obsidian vault MCP setup, done this session

While setting up this note, also wired a live MCP connection for this vault itself (it had none before): Local REST API plugin, server name `knight-code-base`, connecting over plain HTTP on port 27127 (the plugin's `insecurePort`, matching how the other two vaults are already wired, both plain HTTP rather than the plugin's HTTPS listener to avoid self-signed cert trust issues), registered in `~/.claude.json`. The plugin's HTTPS port is separately set to 27125 but unused by this setup. Chris needs to set `insecurePort` to 27127 in the plugin settings, and restart Claude Code (or otherwise reconnect MCP servers) for the connection to go live.
