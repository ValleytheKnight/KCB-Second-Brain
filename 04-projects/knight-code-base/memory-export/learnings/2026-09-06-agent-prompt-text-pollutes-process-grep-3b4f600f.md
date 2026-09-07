---
id: "3b4f600f-05c4-4b05-b8bc-437ac13c77e5"
type: "learning"
date: "2026-09-06"
skill: "knightcode-investigate"
learning-type: "pitfall"
key: "agent-prompt-text-pollutes-process-grep"
confidence: 9
source: "user-stated"
tags: ["knight-code", "learning", "knightcode-investigate"]
---
# Learning: agent-prompt-text-pollutes-process-grep

## Insight

A Claude Code session launched with an inline prompt carries that entire prompt in its process arguments, so `pgrep -af <term>` matches any session whose PROMPT merely mentions the term, not just processes actually running it. Observed live: `pgrep -af pkexec` returned two claude sessions as hits because the knight-watch security prompt instructs the session to use pkexec. The false hits read exactly like real ones and nearly supported a wrong conclusion that two pkexec calls were hung. This bites hardest when diagnosing the very tooling whose prompts name the tools being grepped for. Defend by matching the executable rather than the full command line (`pgrep -x`, or `pgrep -af '^/usr/bin/pkexec'`), or by checking the real artifact instead: for pkexec, look for `polkit-agent-helper-1` processes and `hyprctl clients` for an actual dialog window. Related trap in the same run: `pgrep -a <pattern>` silently returns zero matches when the pattern exceeds 15 characters, because it matches against the truncated process name; it warns on stderr, which is easy to miss when the command is part of a larger pipeline.
