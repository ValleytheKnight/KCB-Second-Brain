---
id: "e37f08fc-87ba-4fb3-8337-d5be94997428"
type: "decision"
date: "2026-09-05"
tags: ["knight-code", "decision"]
---
# Decision: Enabled the always-on scanning daemon and its on-access companion, scoped to the home directory, wit...

## Decision

Enabled the always-on scanning daemon and its on-access companion, scoped to the home directory, with actual access-blocking turned on rather than detect-after-the-fact, and the scanner's own service account excluded to prevent a self-scan loop. Measured real RSS on this machine before deciding to keep it running.

## Rationale

Chris wanted to try genuine live protection rather than the scheduled scan alone, on the condition of seeing the actual memory cost on this machine rather than trusting general research numbers. Measured about 1GB resident, in line with the earlier research range, and decided to keep it since available memory stayed healthy. Enabling the blocking mode rather than notify-only was a deliberate choice: the on-access daemon's own documentation states that some of its safety exclusions are not reliable without blocking mode enabled, so leaving it off would have made the setup partially unreliable. Hit and fixed one real startup failure: the on-access companion refuses to start unless the scanning daemon's own service account is excluded from being scanned, a built-in guard against the daemon triggering an infinite loop scanning itself.
