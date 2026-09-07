---
id: "32cb843d-669c-49aa-adb9-12581f48801e"
type: "learning"
date: "2026-09-06"
skill: "knightcode-investigate"
learning-type: "pitfall"
key: "rkhunter-log-warning-prefix"
confidence: 9
source: "observed"
tags: ["knight-code", "learning", "knightcode-investigate"]
---
# Learning: rkhunter-log-warning-prefix

## Insight

rkhunter prefixes every line in /var/log/rkhunter.log with a "[HH:MM:SS] " timestamp, so an anchored `grep "^Warning:"` matches nothing and silently yields an empty result. Use an unanchored `grep -i "warning:"` instead. Evidence: a real scan exited 1 with 125KB of log and one genuine warning; the anchored grep returned 0 matches and the unanchored one returned 1. The bug survived unnoticed in /usr/local/bin/rkhunter-scan-run because the weekly timer had never reached its first run, so the notification chain had never fired even once. General lesson beyond rkhunter: a log-parsing filter that has never run against real output is untested regardless of how correct it reads, and the failure mode is an empty result rather than an error.
