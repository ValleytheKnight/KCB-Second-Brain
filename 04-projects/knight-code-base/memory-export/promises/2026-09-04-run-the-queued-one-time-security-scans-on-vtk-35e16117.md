---
id: "35e16117-bd39-4b85-b678-e859b9a4c4d3"
type: "promise"
date: "2026-09-04"
source: "user"
tags: ["knight-code", "promise", "open", "abandoned"]
status: "abandoned"
---

# Promise: Run the queued one-time security scans on vtk: sudo rkhunter --update && sudo rkhunter --propupd && ...

## Promise

Run the queued one-time security scans on vtk: sudo rkhunter --update && sudo rkhunter --propupd && sudo rkhunter --check --sk; sudo chkrootkit; sudo freshclam && clamscan -r -i ~; sudo lynis audit system

## Context

Chris asked to defer running these until later, mid-migration/hardening pass on the new Omarchy machine. All 5 tools (rkhunter, chkrootkit, clamav, lynis, fail2ban) already installed; fail2ban's sshd jail was configured live. These are the one-time scans left to actually run.

## Resolution

Superseded by a fresh hardening pass on the Omarchy machine tonight (2026-09-05), since the tool set and decisions changed from what this promise assumed: rkhunter was fully configured (Arch WEB_CMD gotcha fixed, false-positive suppressions added, baseline scan clean) and given an ongoing weekly systemd timer with desktop notification, not just a one-time check. chkrootkit was deliberately removed (redundant with rkhunter) rather than run, contradicting this promise's literal text. This promise's claim that "fail2ban's sshd jail was configured live" turned out not to be true on this machine (checked live: fail2ban inactive, disabled, no jail.d config), so that part was never actually done despite being noted here. Replaced by a new, accurate promise for the real remaining items: fail2ban jail config, a lynis run, and clamav manual-scan setup.
