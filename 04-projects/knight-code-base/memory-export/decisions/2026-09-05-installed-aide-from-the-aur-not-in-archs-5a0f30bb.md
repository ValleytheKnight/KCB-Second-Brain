---
id: "5a0f30bb-6f18-415c-978e-402802b5c476"
type: "decision"
date: "2026-09-05"
tags: ["knight-code", "decision"]
---
# Decision: Installed AIDE from the AUR (not in Arch's official repos, corrected after an initial wrong assumpti...

## Decision

Installed AIDE from the AUR (not in Arch's official repos, corrected after an initial wrong assumption). Built the baseline hash database, confirmed a clean first check, enabled the package's own daily systemd timer.

## Rationale

Lynis flagged file integrity monitoring as missing. AIDE hashes system files at baseline and flags unexpected changes on each scheduled check, catching tampering, bad updates, or malware modifying a binary. Confirmed the AUR build ships a working systemd timer before enabling it rather than assuming, since AUR packaging varies from the official Debian and Ubuntu builds this tool is more commonly documented for.
