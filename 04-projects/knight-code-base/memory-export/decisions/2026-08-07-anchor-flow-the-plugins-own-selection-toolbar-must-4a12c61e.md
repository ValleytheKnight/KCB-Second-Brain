---
id: "4a12c61e-182b-4e70-8b65-748515203582"
type: "decision"
date: "2026-08-07"
scope: "repo"
source: "user"
confidence: 10
tags: ["knight-code", "decision"]
---
# Decision: Anchor Flow: the plugin's own selection toolbar must never hide or replace Obsidian's native per-ima...

## Decision

Anchor Flow: the plugin's own selection toolbar must never hide or replace Obsidian's native per-image buttons (zoom, view code). Native buttons stay visible and usable whenever they'd normally show; the new toolbar has to coexist alongside them, not suppress them.

## Rationale

Chris's explicit call, made after the risk test's temporary fix (hiding native buttons via CSS on any plugin-managed image) worked but was flagged as an open design choice, not assumed. Reverses that risk-test workaround for the real build: the real plugin needs a positioning/layout solution that lets its toolbar sit alongside native controls rather than suppressing them.
