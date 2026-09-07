---
id: "9b998e4d-4dbd-45cc-b43d-15d01cf96688"
type: "decision"
date: "2026-09-06"
source: "user"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Knight Code owns the whole notification-to-agent chain for system watchers (crash, rkhunter, AIDE, C...

## Decision

Knight Code owns the whole notification-to-agent chain for system watchers (crash, rkhunter, AIDE, ClamAV) rather than reusing Omarchy's `omarchy-agent`. Every click routes through one launcher, `~/.local/bin/knight-agent-run`, which is the single place `claude --dangerously-skip-permissions` appears. Sources live in `system/watchers/`, registry in `docs/SYSTEM_WATCHERS.md`, inspection and testing via the `knight-watch` command.

## Rationale

Chris wanted both the crash-diagnosis session and the malicious-activity session to start with permission checks bypassed. Omarchy's chain launches `claude --permission-mode auto`, which is not full bypass, and the flag is hardcoded inside `/usr/bin/omarchy-agent`, a file the `omarchy` package owns and an update reverts. Owning the watcher is what makes the flag survive an omarchy update. Every `--exec` in these scripts uses an absolute path as a result.

Alternatives weighed: (1) Edit `/usr/bin/omarchy-agent`'s claude case with sudo. One line, keeps the upstream watcher, and would also fix the menu/keybinding agent launch, but every omarchy package update silently reverts it. (2) Shadow `omarchy-agent` or `omarchy-agent-crash` from `~/.local/bin`. No system files touched, but disproven by measurement rather than assumption: quickshell, which executes notification clicks from its own `omarchy-exec-argv` hint, carries `/usr/share/omarchy/bin` ahead of `~/.local/bin` on PATH, so the packaged script always wins. (3) Set a permission default in Claude settings.json, which an explicit `--permission-mode` flag on the command line overrides, so it cannot win.

Tradeoff accepted: the crash watcher is now a local adaptation of upstream's, so upstream improvements to it are not inherited. `omarchy-crash-watch.service` is disabled rather than removed, so one `systemctl --user enable --now` restores packaged behavior.
