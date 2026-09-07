---
id: "ad6312fc-bcfb-41bc-b395-25526d3a634f"
type: "decision"
date: "2026-09-05"
tags: ["knight-code", "decision"]
---
# Decision: Created a jail config file for the sshd service under fail2ban's jail.d directory, setting a one hou...

## Decision

Created a jail config file for the sshd service under fail2ban's jail.d directory, setting a one hour ban time, a ten minute detection window, escalating repeat-offender bans, and pointing the jail at the systemd journal instead of a log file. Enabled and started the fail2ban service.

## Rationale

Arch logs authentication attempts to the systemd journal, not a flat text log file, so the jail had to be told to read the journal directly rather than use fail2ban's default log-file backend. Escalating ban time punishes repeat offenders more each time instead of resetting flat. Verified the running jail status showed it matched the correct journal filter for the ssh daemon, with zero failures and zero bans on a fresh start, confirming it reads the right source.
