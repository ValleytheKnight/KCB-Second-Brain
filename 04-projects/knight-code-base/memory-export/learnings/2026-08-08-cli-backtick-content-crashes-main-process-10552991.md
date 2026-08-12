---
id: "10552991-433c-4abb-8f40-c1e8278e4e89"
type: "learning"
date: "2026-08-08"
skill: "obsidian-cli"
learning-type: "pitfall"
key: "cli-backtick-content-crashes-main-process"
confidence: 9
trusted: false
source: "observed"
tags: ["knight-code", "learning", "obsidian-cli"]
---
# Learning: cli-backtick-content-crashes-main-process

## Insight

Passing a `content=`/`code=` value to the `obsidian` CLI (Obsidian.com binary) via a bash DOUBLE-quoted string is unsafe when that value contains backticks (e.g. markdown code spans like `` `vault.on('create')` ``). Bash treats backticks inside a double-quoted string as command substitution, silently running each backtick-wrapped span as a shell command and replacing it with that command's (empty, since the "command" is nonsense) stdout, confirmed live: `content="line with a \`code span\` inside it"` landed in the vault note as "line with a  inside it" with no bash error surfaced. A single stripped span is silent but harmless; a long, prose-heavy, multi-backtick payload sent this way once produced a genuinely malformed argument that crashed Obsidian's own main process with "Uncaught Exception: SyntaxError ... is not valid JSON, at JSON.parse, at Socket.n" — a real, unguarded `JSON.parse(g)` inside the CLI socket server's newline-delimited data handler in the running app's actual bundle (`%APPDATA%\obsidian\obsidian-1.13.4.asar\main.js`, extracted live; the static `resources\app.asar` in the install directory was a stale, differently-versioned copy and did not contain the crashing line, the same stale-asar trap already documented for CSS investigation). The app's renderer survived (eval/dev:errors kept responding, vault/plugin state was intact afterward), so this is not fatal, but it is a real, reproducible way to pop a main-process crash dialog on the user's screen. Fix: use a single-quoted bash string for any CLI `content=`/`code=` value containing backticks (single quotes suppress all bash expansion, confirmed live: the same payload via `content='...`code span`...'` preserved the backticks verbatim and appended cleanly), or better, avoid the CLI entirely for multi-paragraph prose and use direct file Read/Write instead, reserving the CLI for short, plain-string commands.
