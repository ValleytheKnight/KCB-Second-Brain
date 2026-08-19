---
id: "7006dc4d-72b3-46de-9364-d19954f22573"
type: "decision"
date: "2026-08-17"
source: "user"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: KnightOS will borrow infinite-canvas / pan-zoom-tile UX patterns from the third-party app "Collabora...

## Decision

KnightOS will borrow infinite-canvas / pan-zoom-tile UX patterns from the third-party app "Collaborator" (github.com/collabs-inc/collab-public), used meanwhile as a stopgap terminal manager while KnightOS is being built. KnightOS is expected to end up doing more than Collaborator, not be replaced by it.

## Rationale

Chris wants Collaborator's infinite-canvas interaction model (pan/zoom, tile placement) folded into KnightOS's existing canvas, which already has a channel-strip + Project-rail + xterm.js terminal-pane system (decision 819cae54) and its own forge/workshop visual language (decision aa573d58). This is additive to the existing canvas engine, not a from-scratch canvas build or a reason to drop KnightOS in favor of the third-party tool.
