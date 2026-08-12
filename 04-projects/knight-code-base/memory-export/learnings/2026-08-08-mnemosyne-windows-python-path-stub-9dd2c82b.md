---
id: "9dd2c82b-fbd3-45a8-87b3-83b9d2efce8b"
type: "learning"
date: "2026-08-08"
skill: "mnemosyne-integration"
learning-type: "pitfall"
key: "mnemosyne-windows-python-path-stub"
confidence: 9
trusted: false
source: "observed"
tags: ["knight-code", "learning", "mnemosyne-integration"]
---
# Learning: mnemosyne-windows-python-path-stub

## Insight

On Chris's Windows machine, a bare `execFileSync('python', ...)` / `spawnSync('python', ...)` fails even though a real interpreter is installed. The raw Windows PATH a plain spawned process searches (not an interactive Git Bash session, which injects its own PATH order) lists `%LOCALAPPDATA%\Microsoft\WindowsApps` before the real install dirs (`...\Programs\Python\Python312\`, `\Python313\`). That folder holds Windows' auto-registered "App execution alias" stubs for python.exe and python3.exe, which just print "Python was not found; run without arguments to install from the Microsoft Store..." and exit non-zero, since Python was installed via the python.org installer rather than the Store. Confirmed live in hook-errors.log: session-start-memory-hook's getMnemosyneSessionContext() hit this and silently degraded, so no `Mnemosyne:` stats line appeared at session start. Root-cause fix: py.exe (the official launcher) has no such stub. lib/mnemosyne-env.ts now exports resolvePythonExecutable() (checks well-known py.exe install paths, then a bare `py` PATH lookup, falling back to bare `python` only as a last resort) and both hosts/claude/hooks/session-start-memory-hook.ts and scripts/gen-mnemosyne-redaction.ts use it instead of a hardcoded 'python' string. Verified live: Mnemosyne stats line now appears in a fresh session's SessionStart context, and gen-mnemosyne-redaction.ts --check runs clean. Same shape as the analogous bash-on-Windows-PATH bug fixed in lib/knight-slug.ts (resolveBashExecutable).
