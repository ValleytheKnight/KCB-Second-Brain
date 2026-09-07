---
id: "9e7e95c7-72e2-43da-8ac6-71c25662f82a"
type: "decision"
date: "2026-09-07"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: omarchy-image-theme bundles a vendored wallust binary inside the app rather than requiring the user ...

## Decision

omarchy-image-theme bundles a vendored wallust binary inside the app rather than requiring the user to install it via AUR/yay.

## Rationale

wallust is MIT-licensed (confirmed via yay -Si), which permits redistributing the compiled binary with the license notice included. wallust is AUR-only (not in Arch's official pacman repos), so requiring the user to install it themselves means a real yay/AUR step, not a simple pacman install — real friction for a typical user. Bundling removes that friction and the dependency on wallust staying available in AUR; the missing-dependency startup screen already built (frame RuK3j) becomes a real fallback path rather than the expected first-run experience.
