---
id: "37f297f4-ff77-4107-8b09-1725bba7b648"
type: "learning"
date: "2026-08-08"
skill: "obsidian-cli"
learning-type: "pitfall"
key: "socket-json-crash-not-limited-to-bash-backtick"
confidence: 6
trusted: false
source: "observed"
tags: ["knight-code", "learning", "obsidian-cli"]
---
# Learning: socket-json-crash-not-limited-to-bash-backtick

## Insight

The obsidian CLI socket handler's JSON.parse crash (Socket.n, main.js:80:136, "Unexpected token ',' ... is not valid JSON") is not scoped to the single bash-backtick/command-substitution case logged earlier this session. A second crash with a different malformed tail ("...Test.md\",\"vault=Pl...") happened during a PowerShell-issued session, which has no backtick command-substitution mechanism, so that first fix (single-quote the bash string) addresses one triggering case, not the underlying class of bug. Not fully root-caused: the "obsidian" CLI binary at C:\Users\Chris Brown\AppData\Local\Programs\Obsidian\obsidian is a compiled PE32+ executable, not inspectable source, so the exact client-side serialization defect could not be confirmed by reading code this session, and re-invoking the CLI to reproduce/isolate it was off-limits for the rest of that dispatch per an explicit instruction to stop using the socket path after the second crash. Working hypothesis only, moderate confidence: both crashes involved an argument value (a content= or code= payload) containing characters that could corrupt shell-level argv splitting or the CLI's own message assembly before a proper JSON.stringify ever ran on it, in this second case plausibly a literal double-quote character embedded in markdown prose (e.g. "instrumented", "identical bytes") inside a content= value passed through PowerShell's own native-exe argument quoting. Until confirmed, treat any content=/code= value containing a literal " character as a real risk regardless of shell, and prefer the MCP/REST API or direct file read/write over the CLI's write commands (create/append/eval/property:set/plugin:reload etc.) for any content containing embedded double quotes. Read-only commands with simple, quote-free arguments (plugin, plugins, dev:errors) have not been observed to crash.
