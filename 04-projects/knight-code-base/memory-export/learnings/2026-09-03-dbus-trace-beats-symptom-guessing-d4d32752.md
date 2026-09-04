---
id: "d4d32752-f405-4372-9737-9064bc713469"
type: "learning"
date: "2026-09-03"
skill: "knightcode-investigate"
learning-type: "investigation"
key: "dbus-trace-beats-symptom-guessing"
confidence: 9
source: "observed"
tags: ["knight-code", "learning", "knightcode-investigate"]
---
# Learning: dbus-trace-beats-symptom-guessing

## Insight

When a desktop action on Knight-Blade silently no-ops, trace it with `dbus-monitor --session` to a file, trigger the action, then find the method call that returned instantly or got no reply. On the waybar Logout bug this exposed the cause in one capture: ksmserver.closeSession returned true in 3ms after only setting KWin session state, because closeSession closes session-managed apps and never ends the session (that is plasma-shutdown's job via org.kde.LogoutPrompt). Several prior sessions instead treated the downstream symptoms (stale org.kde.Shutdown D-Bus name, stuck isShuttingDown=true) as the cause and applied a manual unstick, which hid the real bug for days. Corollary: verify D-Bus method names by introspecting the live service (`qdbus6 <service> <path>`), not from memory. Corollary 2: `pkill -f <pattern>` inside a Bash tool call matches the tool's own shell and kills it (exit 144); filter out the current PID and any `bash -c` match first.
