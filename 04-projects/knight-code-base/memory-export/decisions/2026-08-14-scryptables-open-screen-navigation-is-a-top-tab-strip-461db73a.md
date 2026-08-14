---
id: "461db73a-80db-4644-8928-41859428d829"
type: "decision"
date: "2026-08-14"
source: "user"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Scryptable's open-screen navigation is a top tab strip (below the toolbar, above content), not a sec...

## Decision

Scryptable's open-screen navigation is a top tab strip (below the toolbar, above content), not a second sidebar.

## Rationale

Standard, familiar pattern (browsers, VS Code, most multi-document desktop apps), costs minimal fixed space (~36px), and scales to many open screens via scroll/truncation. A right-side panel would take real horizontal space away from every screen's content permanently, whether navigation is actually needed at that moment or not.
