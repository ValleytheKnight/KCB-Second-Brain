---
id: "d860de18-0143-4ac9-83d3-972e668cda3c"
type: "learning"
date: "2026-09-03"
skill: "system-knight-blade"
learning-type: "pitfall"
key: "plasma-logout-hang"
confidence: 9
source: "user-stated"
tags: ["knight-code", "learning", "system-knight-blade"]
---
# Learning: plasma-logout-hang

## Insight

Knight-Blade KDE Plasma 6 logout hangs or does nothing when clicked. Two possible causes, check both: (1) systemd ordering cycle from waybar-autoreload.service — already fixed permanently by changing its WantedBy from graphical-session.target to waybar.service, should not recur. (2) Separate, NOT permanently fixed, recurring Plasma 6 bug: plasma-shutdown never releases the org.kde.Shutdown D-Bus name after running (success or failure), so the next logout attempt can't start (no greeter, or greeter with no effect). Also ksmserver can get stuck reporting isShuttingDown=true from a failed attempt and silently ignore new logout requests. FIX (manual, one-time each occurrence, not a permanent config fix): 1) find and kill the stale plasma-shutdown process (busctl status org.kde.Shutdown to find the PID holding the name, then kill it) to free org.kde.Shutdown. 2) if that alone doesn't work, clear ksmserver's stuck flag via its resetLogout D-Bus call. After both, logout works cleanly until it recurs (next Plasma update or long session). No lasting fix exists yet; go straight to steps 1-2 when Chris reports a logout issue, do not re-diagnose from scratch.
