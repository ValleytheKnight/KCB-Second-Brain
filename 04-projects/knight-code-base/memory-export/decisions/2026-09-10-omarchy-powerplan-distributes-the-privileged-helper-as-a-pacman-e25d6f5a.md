---
id: "e25d6f5a-4d04-40b3-b0c7-f5e46b654017"
type: "decision"
date: "2026-09-10"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: omarchy-powerplan distributes the privileged helper as a pacman package built from an in-repo PKGBUI...

## Decision

omarchy-powerplan distributes the privileged helper as a pacman package built from an in-repo PKGBUILD (packaging/aur/PKGBUILD), installed via `makepkg -si`, not published to AUR.

## Rationale

AUR registration is temporarily closed (upstream, no ETA), which would have blocked decision 01224ae3-3a6b-4e16-aba7-cfc8925b9fa4 indefinitely. Re-read HANCORE-linux's actual wording: the requirement was "a trust anchor outside the mutable checkout (for example, a signed package/root-owned verifier)", signing given only as an example, not the requirement itself. pacman already satisfies this without AUR or GPG signing: pacman only ever installs from a package it built and tracks in its own database, and makepkg checks the helper against a pinned SHA-256 before that package exists, so root's pacman -U step never opens or interprets checkout-resident bytes. Publishing to AUR later remains available once registration reopens, purely for install-line convenience, and needs no rework of the PKGBUILD already committed.
