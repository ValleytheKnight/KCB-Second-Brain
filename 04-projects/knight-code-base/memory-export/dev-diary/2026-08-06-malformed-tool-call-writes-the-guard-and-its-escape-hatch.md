---
type: "dev-diary"
date: "2026-08-06"
tags: ["knight-code", "dev-diary", "hygiene", "memory-server", "verified-live"]
---
# Malformed tool-call writes, the guard and its escape hatch

A malformed tool call collapses later parameters into an earlier one and leaves its own separators behind as literal text, so a stored record carries its rationale unreadable inside another field. Twenty-one decision records were repaired from exactly that shape, and the write path accepting it in silence is why they accumulated unnoticed. The guard rejects any content carrying <parameter name="rationale"> on sight.  That created a second problem: the diary could not describe its own subject matter, because naming the marker was itself grounds for rejection. dev_diary_log now takes allow_tool_call_markers, which relaxes the boundary check alone. Secret and injection scanning are untouched, since nothing about writing on this topic requires either.  Why a caller-set boolean rather than a heuristic: a genuinely malformed call carries whatever parameters the caller passed and never an extra flag it did not. So the escape hatch cannot be reached by accident, only on purpose. This entry is the first write to use it, and it demonstrates the case it exists for.  Confirmed live in the same session it was built: the call without the flag was rejected, the identical call with it stored this entry.
