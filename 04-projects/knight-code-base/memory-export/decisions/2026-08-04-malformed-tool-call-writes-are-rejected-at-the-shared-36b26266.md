---
id: "36b26266-b053-4268-8d47-233cb12f52a5"
type: "decision"
date: "2026-08-04"
scope: "repo"
source: "agent"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: Malformed tool-call writes are rejected at the shared validateFreeText gate rather than sanitized or...

## Decision

Malformed tool-call writes are rejected at the shared validateFreeText gate rather than sanitized or accepted, and the 21 already-corrupted decision records were repaired in the append-only event log rather than via supersede events.

## Rationale

A malformed call collapses later parameters into an earlier field and leaves its separators as literal text. Stored unchecked, the record keeps its rationale and alternatives unreadable inside another field with no separate fields written, which is invisible until someone reads that record closely. Placing the check in validateFreeText covers all six stores in the family with one rule instead of six.  Rejecting rather than auto-splitting at write time is deliberate: a split is a guess about author intent, and a rejected call can simply be re-issued correctly, so the cheap correct path stays available and no store ever holds a record whose shape was inferred.  Repairing the event log rather than the snapshot was forced by the architecture: the snapshot is recomputed from the log, so a snapshot-only repair would be silently reverted on the next rebuild. Verified after writing rather than trusting the success message, which caught one record with two independently corrupted fields that a single pass had missed.

## Alternatives Considered

Rejected: appending supersede events carrying corrected content. It is the event-sourced idiom, but it would assert those decisions changed when only their storage was malformed, so the audit trail would record a falsehood.  Rejected: auto-splitting malformed input at write time instead of rejecting it. The separators are unambiguous enough to make this technically possible, but it would silently store a record whose field boundaries were inferred rather than stated, and a rejected call costs one retry.  Rejected: repairing the computed snapshot only. Cheaper and leaves the append-only log untouched, but the snapshot rebuilds from that log, so the repair would vanish with no warning.  Rejected: a broad match on any angle-bracket tag. It would reject ordinary prose discussing XML or HTML; the check instead requires either a parameter-name opener or a closing tag naming one of this family's own fields.</parameter>
