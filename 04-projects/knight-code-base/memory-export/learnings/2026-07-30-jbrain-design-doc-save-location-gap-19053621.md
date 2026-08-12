---
id: "19053621-7d56-451a-9438-55b07ffeb32e"
type: "learning"
date: "2026-07-30"
skill: "office-hours"
learning-type: "pitfall"
key: "jbrain-design-doc-save-location-gap"
confidence: 9
trusted: false
source: "observed"
tags: ["knight-code", "learning", "office-hours"]
---
# Learning: jbrain-design-doc-save-location-gap

## Insight

Design docs produced by office-hours save outside the DevKnight Workshop vault by default, in a fixed jbrain-internal location tied to the project slug. Checked the skill's own files and its settings script directly: there is no existing setting that changes just this save location, and the one environment variable that changes jbrain's broader state location would also move unrelated internal bookkeeping files, not a clean solution even if it worked here. A real, durable fix would need either editing the shared skill installation (which every project using it would inherit, with upgrade risk) or a new Knight Code side mechanism that relocates a finished design doc into its matching vault project automatically. Neither exists yet. Moving a design doc into the vault by hand after it is written remains the standing approach for now.
