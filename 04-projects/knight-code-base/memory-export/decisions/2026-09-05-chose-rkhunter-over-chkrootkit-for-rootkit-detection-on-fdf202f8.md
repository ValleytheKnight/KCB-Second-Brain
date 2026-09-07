---
id: "fdf202f8-c85e-426d-a61b-3d97fc9696b0"
type: "decision"
date: "2026-09-05"
source: "user"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Chose rkhunter over chkrootkit for rootkit detection on vtk; chkrootkit was removed entirely rather ...

## Decision

Chose rkhunter over chkrootkit for rootkit detection on vtk; chkrootkit was removed entirely rather than kept as a secondary scanner.

## Rationale

rkhunter checks a broader surface (backdoors, suspicious kernel module strings, anomalous network behavior, not just known rootkit signatures) and keeps a real log file. Advice to run both for extra coverage found during research came mostly from low-quality content-farm pages, not real security engineering consensus, and running both would just double alert noise for overlapping signature families. chkrootkit had no dependents, so removing it outright was safe. Considered and rejected: keeping chkrootkit installed but unscheduled, dropped once Chris asked to actually remove it rather than leave inert dead weight.
