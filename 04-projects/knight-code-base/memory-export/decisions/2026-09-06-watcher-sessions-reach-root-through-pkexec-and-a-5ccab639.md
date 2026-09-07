---
id: "5ccab639-da5c-48e0-943d-991a31faaf48"
type: "decision"
date: "2026-09-06"
source: "user"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Watcher sessions reach root through `pkexec` and a polkit authentication agent (`hyprpolkitagent`), ...

## Decision

Watcher sessions reach root through `pkexec` and a polkit authentication agent (`hyprpolkitagent`), not through exported log files and not through passwordless sudo. The root-only scan logs keep their existing ownership; nothing is exported and nothing is made passwordless.

## Rationale

A watcher session has no terminal attached, so `sudo` fails rather than prompting: it asks on the terminal it was started from, and there is none. `pkexec` routes through polkit, whose agent draws its own password dialog independent of any terminal, so it is the only route a prompt can reach the screen from these sessions. Omarchy ships no polkit agent and starts none, so this is a real added dependency; `knight-watch verify` checks for a running agent because without one every privileged action fails silently.

Alternatives weighed: (1) Export the full scan logs into `/var/log/knight-watch/` as 640 root:valleytheknight so no elevation is needed for reading. Rejected by Chris. My argument for it rested on a claim I had to retract: I said an exported log lets a 3am finding be diagnosed with the answer waiting by morning. That is false for what is built. The watchers are click-driven, so nothing runs until Chris clicks the notification, at which point he is already at the machine and a password dialog costs almost nothing. Chris spotted this. With the 3am argument gone, the only remaining case for exporting was least privilege (reading a file as the user rather than running the read as root), which he judged not worth a second mechanism. (2) A NOPASSWD sudoers allowlist. Rejected as a permanent privilege grant, and a `cat` rule that can be widened is a full root filesystem read.

Consequence worth keeping: this choice forecloses unattended diagnosis. A headless run has nobody to type a password. If auto-diagnose-at-3am is ever wanted, exporting comes back on the table, because polkit cannot serve that path at all.
