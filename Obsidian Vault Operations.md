# Obsidian Vault Operations

Authoritative operating doctrine for any Claude Code agent working in the Knight Code Base vault repo and its companion tooling repo. This file governs how an agent touches a live or on-disk Obsidian vault, and how it handles Obsidian community plugins. It does not replace the companion repo's own CLAUDE.md (repo scope, hooks, MCP servers) or the vault graph doctrine there; it is the plugin and vault operations layer neither of those covers.

## The standing default: act, don't narrate

When a task calls for changing something in the vault, an installed plugin, or that plugin's configuration, the default is to do it directly, not to describe the steps back and wait for a human to click through them. Only stop and hand a step to Chris when none of the avenues below actually cover what's needed, and say plainly why.

## Three avenues for touching a vault

Move fluidly between these based on what the job needs. Do not default to one out of habit.

**Avenue 1: MCP / REST API.** Requires Obsidian running with the Local REST API plugin enabled and the MCP connection configured. Covers `vault_read`/`write`/`patch`/`append`/`copy`/`move`/`delete`, `command_list`/`command_execute`, search, tag listing, active-file/open-file operations. `command_execute` can trigger any registered command, including individual QuickAdd macros (each registers as `quickadd:choice:<uuid>`, discoverable via `command_list`). Real limit: if the triggered command opens a live interactive modal (a QuickAdd prompt, a Templater cursor step), there is no way to type into that modal remotely from this surface; either use Avenue 3 or hand that one step to Chris. After any reconnect following downtime, re-verify with a real `vault_list` plus a content spot check before trusting it; a connection can report "Connected" while silently resolving to the wrong vault.

**Avenue 2: Direct file read/write.** The vault is a real folder of markdown, JSON, and canvas files. Plain file read/write/edit works whether or not Obsidian is running. Best for bulk edits, work while the app is closed, or any case where the exact content or frontmatter needed is already known. Real limit: this does not trigger a live plugin's own reaction (a Kanban board's auto archive, Dataview's reindex, a Templater prompt); that depends on Obsidian's own file watcher, and behaves differently from the same edit made through the real UI.

**Avenue 3: Direct plugin data manipulation, or replicating a plugin's own script logic.** Most plugins store config or state in `.obsidian/plugins/<plugin-id>/data.json` or similar. Rather than requiring a live interactive step, an agent can read and directly edit that data file to pre-seed configuration, or read an automation script's own source (a QuickAdd macro's `.js` file, a plugin's bundled `main.js`) to understand exactly what it produces and generate the equivalent output directly, skipping the interactive modal. This is the most powerful avenue and the one requiring the most care: read and understand the real script or plugin logic first, never guess or approximate what it would produce. A wrong guess here writes real files into a real vault.

## Never write a plugin config from memory or assumption

Before writing any value into a plugin's `data.json`, settings file, or any config that plugin will read, read that plugin's actual bundled source (typically a minified `main.js` under `.obsidian/plugins/<plugin-id>/`) for the real schema first. Do not infer a field name, a type, or a shape from a plugin's public documentation alone, from a similar plugin's convention, or from general familiarity with how plugins like this usually work. Obsidian plugin docs are frequently stale or wrong against the installed version, and a wrong guess here fails silently rather than erroring (a config in a shape the plugin does not recognize is typically just ignored, not rejected).

If a config driven feature silently does not work (no error, feature just does not fire), the first diagnostic step is reading that plugin's actual source for what it expects, not iterating on guessed field names a second or third time. Two speculative fixes in a row without new evidence, read from the real source or the real DOM/console output, is the signal to stop guessing and go get the diagnostic directly.

## Installing and updating plugins is this agent's job

Installing and updating Obsidian community plugins is something this agent does directly, not something deferred to Chris clicking through the in-app Community Plugins browser.

With Obsidian confirmed closed (no live process holding plugin files open):

1. Look up the plugin's `id` and `repo` in the official registry: `https://raw.githubusercontent.com/obsidianmd/obsidian-releases/master/community-plugins.json`.
2. Get the latest release assets from `https://api.github.com/repos/<repo>/releases/latest`; download `main.js`, `manifest.json`, and `styles.css` (if present) directly rather than reconstructing them by hand.
3. Place them at `.obsidian/plugins/<id>/` in the vault.
4. Add `<id>` to the array in `.obsidian/community-plugins.json` to enable it.
5. Verify `manifest.json` parses as real JSON with the expected `id`/`version` fields, confirming the download was not a 404 or error page saved as if it were the real file.

Always confirm Obsidian is closed before writing into `.obsidian/plugins/`, since writing plugin files while the app has them open risks a corrupt or partially written state. Editing a plugin's `data.json` directly does not take effect until the plugin reloads (toggle it off and on, or restart Obsidian).

When asked to touch a plugin already present, check its installed `version` in `manifest.json` against the registry's latest release and update it using the same method if behind.

## Debugging a live layout, rendering, or config bug

Get the actual diagnostic before proposing a fix, not a second guess. Click into an expandable error panel if one exists. Open dev tools (`Ctrl+Shift+I`; right click "Inspect Element" is disabled in Obsidian's Reading View) and read the real computed styles or DOM. Read the plugin's actual source if its docs are inconclusive or the behavior does not match what the docs describe. This is the same discipline that found the actual root cause of a real Kanban data loss bug in this vault by reading `.obsidian/plugins/obsidian-kanban/main.js` directly rather than guessing at the file format; the fix followed in one step once the real parser logic was read, after treating the symptom as a display bug first.

## Verifying a bulk or scripted vault edit

Check line count or general file structure before and after a scripted find-replace, not just whether the target pattern's count went to zero. A broken regex can collapse a multi-line file onto one line while a naive grep count still reports success. Prefer manual read/edit for anything where structure matters and the edit is small enough to do that way; reserve a scripted transform for genuinely repetitive changes, and verify harder specifically because a script bypasses the safety of a single confirmed diff per change. If a scripted edit touches more than one or two files, spot check real file structure, not just a match count, on at least one result before calling the batch done. When an edit runs near a base64 embedded value (an embedded image, a font), a naive scan for the first delimiter character can find a false match inside the encoded data itself; decode the actual bytes afterward and confirm they are intact, not just that a bracket or brace count still balances.

## Obsidian syntax and content skills

For any vault content work, reach for the installed skill rather than reasoning about Obsidian syntax from general training memory, which is unreliable for this API surface:

- `obsidian-markdown` for writing or editing any `.md` note bound for the vault (wikilinks, callouts, embeds, properties, frontmatter).
- `obsidian-bases` for creating or editing a `.base` file (database-like views, filters, formulas, summaries).
- `obsidian-cli` as a fourth avenue alongside the three above when the fastest path to a running vault is the `obsidian` CLI binary directly, particularly for a plugin reload, dev:errors, dev:screenshot, dev:dom, dev:console develop-test cycle the MCP/REST API and direct file avenues do not cover as directly.
- `json-canvas` for reading or writing a `.canvas` file (nodes, edges, groups, connections).
- `defuddle` for extracting clean markdown from a web page before it is turned into a vault note.

All five, from `github.com/kepano/obsidian-skills`, are installed in this vault and are the source of truth for its skill set. See the setup prompt that accompanied this file for the install step itself.

## The general rule

Pick whichever avenue actually fits the job. Use the MCP surface when it cleanly does the job or when live app state genuinely matters. Fall back to direct file read/write freely; it needs no live connection. When a live interactive modal would otherwise block a fully autonomous action, check first whether the underlying script's logic can be read and replicated directly before defaulting to "a human has to do this part." Only stop and hand off to Chris when none of the three avenues actually cover what is needed, not as a first resort.
