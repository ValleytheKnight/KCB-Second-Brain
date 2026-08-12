---
id: "7bb010bc-edcb-4ae5-9c70-bb4fc2e118cd"
type: "learning"
date: "2026-08-08"
skill: "mnemosyne-integration"
learning-type: "pitfall"
key: "mnemosyne-windows-config-encoding"
confidence: 9
trusted: false
source: "observed"
tags: ["knight-code", "learning", "mnemosyne-integration"]
---
# Learning: mnemosyne-windows-config-encoding

## Insight

On Chris's Windows machine (non-UTF8 default locale), mnemosyne-memory 3.15.1's first-run config.yaml seeder (mnemosyne/core/config.py L410) opens the file with plain open(path, "w") with no encoding, so the em dash in its header comment gets written as cp1252 byte 0x97. A later legacy-defaults check (L432) explicitly reads that same file with encoding="utf-8" and throws a UnicodeDecodeError on every single mnemosyne invocation (store/recall/stats/etc), caught and logged as a stderr warning each time, "Failed to inspect legacy provider defaults: 'utf-8' codec can't decode byte 0x97 in position 19: invalid start byte". Confirmed non-fatal (stdout stays clean, command still succeeds) but permanent unless fixed. Root-cause fix, not a workaround: set PYTHONUTF8=1 in the environment before any mnemosyne invocation (CLI, MCP server process, or the get_context() bridge script), which forces Python's default text I/O encoding to UTF-8 regardless of Windows locale, so the seeder writes correctly and the warning never appears. Verified live: reproduced without the env var, wiped the data dir, reseeded with PYTHONUTF8=1 set, warning gone.
