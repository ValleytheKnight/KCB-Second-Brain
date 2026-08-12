---
id: "52d7d96d-c52e-4e16-aae5-dc1f6a531db5"
type: "learning"
date: "2026-07-31"
skill: "devknight"
learning-type: "pitfall"
key: "no-fabricated-urgency-in-tradeoffs"
confidence: 9
trusted: true
source: "user-stated"
tags: ["knight-code", "learning", "devknight"]
---
# Learning: no-fabricated-urgency-in-tradeoffs

## Insight

Never introduce speed-to-usable, deadline pressure, or time-to-value as a constraint Chris has to weigh unless Chris himself stated it. During KnightOS planning, a reviewing agent recommended a thinner first-cut terminal (basic passthrough plus copy-paste) framed around reaching a usable state sooner. Chris directly corrected this: he has no deadline on KnightOS and does not want a rushed thinner version. The urgency framing had been introduced by the reviewing agent, not by him, and it nearly cut real scope on a false premise (decision 2866ea40, which reversed it to a full-fidelity terminal from day one at confidence 10/10). Because Chris has no dev background, an invented constraint presented alongside real ones is indistinguishable to him from a real one, so it silently steers his decision. State only constraints with a real source, and name that source.
