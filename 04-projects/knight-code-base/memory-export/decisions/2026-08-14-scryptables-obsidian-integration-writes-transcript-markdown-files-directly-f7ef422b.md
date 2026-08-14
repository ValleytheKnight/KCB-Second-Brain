---
id: "f7ef422b-c322-4604-ba7e-376b182d7233"
type: "decision"
date: "2026-08-14"
source: "user"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Scryptable's Obsidian integration writes transcript markdown files directly into the chosen vault fo...

## Decision

Scryptable's Obsidian integration writes transcript markdown files directly into the chosen vault folder; no companion Obsidian plugin gets built.

## Rationale

The actual need ("drop in transcripts") is satisfied by writing a plain markdown file into a folder Obsidian already watches, since a vault is just a folder on disk, Obsidian picks up new notes automatically with zero plugin involved. A companion plugin (real Obsidian REST API integration, matching this project's own vault-operations pattern) would add two-way live communication, but also a second piece of software the end user has to install and enable, for capability Scryptable doesn't need. Limit accepted: one-way only, no live vault-state read-back or Obsidian-side automation triggers.
