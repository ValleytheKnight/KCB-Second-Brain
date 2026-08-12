---
id: "9a028030-b849-4761-93f8-a671dd1733fd"
type: "learning"
date: "2026-07-31"
skill: "devknight"
learning-type: "pitfall"
key: "no-paraphrase-attributed-as-chris-quote"
confidence: 7
trusted: false
source: "observed"
tags: ["knight-code", "learning", "devknight"]
---
# Learning: no-paraphrase-attributed-as-chris-quote

## Insight

Do not present an agent's own paraphrase or synthesis as something Chris said directly, and do not let that misattribution inflate a logged decision's confidence. Caught during KnightOS planning: a decision recorded at confidence 10/10 on the strength of being stated directly by Chris, when the wording was actually the agent's own framing of his intent. Confidence 10/10 and the phrase "Chris stated this directly" are load-bearing signals that a future session will trust without re-verifying, so a misattribution there is not cosmetic, it launders a hypothesis into a settled fact. Quote Chris only where there are real words to quote; otherwise mark it as the agent's reading of what he meant and set confidence accordingly.
