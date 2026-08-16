---
id: "0a3e0522-ab46-4c58-9591-3a3f9f076c6f"
type: "learning"
date: "2026-08-16"
skill: "devknight"
learning-type: "pitfall"
key: "promise-fulfill-success-not-reliable-evidence"
confidence: 9
source: "observed"
tags: ["knight-code", "learning", "devknight"]
---
# Learning: promise-fulfill-success-not-reliable-evidence

## Insight

promise_fulfill returning a success message ("Marked <id> fulfilled") is not reliable evidence the promise actually left the open set. Reproduced twice in one session against promise 65a0593e (Scryptable logo concept): called promise_fulfill with a real note both times, got a success response both times, then promise_search --all (which bypasses recency/query filters and should show every open promise) still listed 65a0593e as open, with its original text unchanged and no note applied. Do not treat a promise_fulfill success message alone as proof of state change; re-verify with promise_search afterward, and if the promise still shows as open after a second attempt, report this as a real tool discrepancy to the user rather than silently assuming the underlying work is unfinished or retrying indefinitely.
