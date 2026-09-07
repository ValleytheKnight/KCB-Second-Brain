---
type: "dev-diary"
date: "2026-09-05"
tags: ["knight-code", "dev-diary"]
---
# Ran a hardening audit tool and skipped its suggestions that would break real workflows

Ran a general system hardening audit and worked through its findings one at a time rather than applying the list wholesale. Two suggestions looked reasonable in isolation but would have broken things already relied on: one would have disabled the data this machine's own crash-diagnosis pipeline reads, the other would have blocked the normal account from using its compiler, which is needed constantly for community package builds on this machine. Applied the suggestions that had no such conflict, and explicitly recorded the two skips with the reasoning rather than silently ignoring them.
