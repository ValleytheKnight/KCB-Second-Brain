---
id: "d67e52dd-d5c2-48f5-a2fb-7150a1e011f3"
type: "decision"
date: "2026-08-05"
scope: "repo"
source: "agent"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: skills:check verifies the shared runtime asset root (bin/, lib/, browse/dist, make-pdf/dist) but doe...

## Decision

skills:check verifies the shared runtime asset root (bin/, lib/, browse/dist, make-pdf/dist) but does not publish it. ./setup stays the only publisher, reading the same hosts/claude.ts runtimeRoot.globalSymlinks list the check reads.

## Rationale

One writer and one verifier over one list, rather than two writers that can disagree. The gap this closes: on Windows setup's _link_or_copy makes physical copies instead of symlinks (deliberate, so Developer Mode is not required), so an asset goes stale on any commit that lands without a re-run. Nothing checked it, and skills:check reported 62 skills installed and matching source while bin/knight-banned-language-check sat 3KB behind the repo copy, meaning skills invoking it from outside the repo ran an older ruleset. Vendored node_modules mirrors are checked for presence only, not content: their contents come from bun install, so a byte diff would report a dependency-tree question as a publish failure, and walking them costs seconds per quality-gate run.

## Alternatives Considered

Having install-skills.ts publish assets too, rejected because it duplicates setup's job and creates a second write path for the same files. Content-diffing the vendored mirrors, rejected as noisy and slow for no runtime benefit.
