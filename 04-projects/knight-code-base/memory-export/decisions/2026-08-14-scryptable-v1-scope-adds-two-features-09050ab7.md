---
id: "09050ab7-a8cc-4181-be29-844848fb0bb7"
type: "decision"
date: "2026-08-14"
source: "user"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Scryptable v1 scope adds two features: Obsidian vault integration (write finished transcri...

## Decision

Scryptable v1 scope adds two features: Obsidian vault integration (write finished transcripts directly into a connected Obsidian vault) and a multi-format export path (txt, md, docs, docx, pdf, and more) for end users without Obsidian.

## Rationale

Chris asked for these directly during the design review's mockup pass. Obsidian integration matches Chris's own workflow (his campaign vault already receives transcripts via loremaster) and generalizes it for other users who use Obsidian; the multi-format export path is the fallback for users who don't, keeping the app useful without requiring any specific note-taking tool. Both are new functional scope beyond the CEO review's original wizard-plus-QA-review plan, need architecture treatment in the eng review (export format library choice, Obsidian REST API vs. direct vault file write, matching the "Operating a live Obsidian vault" pattern this project already uses elsewhere).
