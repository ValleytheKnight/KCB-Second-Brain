---
id: "382530bb-1374-4d88-86c8-2898b5a7db03"
type: "decision"
date: "2026-08-07"
scope: "branch"
source: "skill"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: CEO review (SELECTIVE EXPANSION): Mnemosyne memory integration plan holds at Knight Code only, with ...

## Decision

CEO review (SELECTIVE EXPANSION): Mnemosyne memory integration plan holds at Knight Code only, with 5 expansion candidates accepted (auto-recall, stats line, hygiene_audit second pass, learnings_log routing feedback, mnemosyne_hygiene_audit wiring) and 1 reversed after adversarial review (pluggable redaction generator, trimmed back to Mnemosyne-specific).

## Rationale

Two rounds of independent adversarial review against the real repo and Mnemosyne's actual source caught and corrected real errors (a config-directory ambiguity, a redaction pattern-portability gap, a missing injection-safety wrap, an overstated context-budget claim) while also rejecting two of the reviewer's own factually-wrong claims after direct source re-verification. Two implementation mechanisms (the get_context() bridge, the datamark() wrapping) remain open architecture questions, explicitly deferred to plan-eng-review rather than guessed at here.
