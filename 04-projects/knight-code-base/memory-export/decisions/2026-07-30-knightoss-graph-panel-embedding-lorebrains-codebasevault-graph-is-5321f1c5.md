---
id: "5321f1c5-ffba-48e0-806b-0cfbe4756afd"
type: "decision"
date: "2026-07-30"
scope: "repo"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: KnightOS's graph panel (embedding lorebrain's codebase/vault graph) is fully out of Milestone 1's sc...

## Decision

KnightOS's graph panel (embedding lorebrain's codebase/vault graph) is fully out of Milestone 1's scope, moved to its own later milestone that includes a real UI/UX overhaul pass before the embed itself gets built. Milestone 1 is now: tabbed shell, full-fidelity terminal, git status view, tab-close-confirmation behavior, no graph panel.

## Rationale

Chris resolved a conflict between two of his own answers (wanting a UI/UX overhaul on the graph panel, versus saying it could be pushed out of Milestone 1 entirely) by confirming explicitly: fully out for now. The feature needs its own design pass before it's worth building into KnightOS, and isn't needed to make Milestone 1 real and usable.
