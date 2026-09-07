---
id: "c908a7f7-9368-4185-89e1-ddd1cfa6fa58"
type: "promise"
date: "2026-09-05"
tags: ["knight-code", "promise", "open"]
---
# Promise: Finish the remaining security-hardening items on vtk: configure fail2ban's sshd jail (backend=system...

## Promise

Finish the remaining security-hardening items on vtk: configure fail2ban's sshd jail (backend=systemd, since Arch logs to journald not a flat auth.log; planned config already agreed and written in local-notes/machine-hardening-and-services.md), run lynis for a baseline audit report, and set up clamav for manual/scheduled scans (not the always-on clamd daemon, to avoid its idle memory cost on a laptop).

## Context

Agreed 2026-09-05 during the post-Omarchy-migration hardening pass, right after AppArmor and firewalld were finished and rkhunter was fully configured and scheduled. Chris explicitly asked to do these three next.
