---
id: "c8e2a5b7-ada3-4139-a55b-23b6ae581421"
type: "learning"
date: "2026-08-08"
skill: "mnemosyne-integration"
learning-type: "pitfall"
key: "mnemosyne-config-set-no-cross-validation"
confidence: 9
trusted: false
source: "observed"
tags: ["knight-code", "learning", "mnemosyne-integration"]
---
# Learning: mnemosyne-config-set-no-cross-validation

## Insight

Mnemosyne's single-key config writer performs no cross-key consistency check. After applying the balanced profile and then changing only llm_enabled to false, two other profile flags stayed on (smart_compress, sleep_model_refresh_enabled), both dependent on llm_enabled per validate_profile rules 4 and 5 in mnemosyne/core/profiles.py. Direct call to validate_profile() against the written config.yaml returned two real errors in that state. Reading back llm_enabled alone showed no problem, it reported false correctly the whole time; the inconsistency was only visible by running validate_profile() against the entire config, not by checking the changed key. Errors cleared to an empty list after also disabling those two dependent flags.
