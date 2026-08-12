---
id: "0c6d4004-e20d-4251-8030-cecdc49dbd64"
type: "decision"
date: "2026-07-30"
scope: "repo"
source: "user"
confidence: 7
tags: ["knight-code", "decision"]
---
# Decision: DevKnight's Electron toolchain standardizes on electron-vite (dev-server/build layer, correctly sepa...

## Decision

DevKnight's Electron toolchain standardizes on electron-vite (dev-server/build layer, correctly separates main/preload/renderer) paired with electron-builder (packaging, code-signing, auto-update via electron-updater), not Electron Forge and not electron-builder alone with a hand-built dev setup. This applies to KnightOS and any future Electron work DevKnight routes.

## Rationale

Researched via WebSearch (2026 sources): electron-vite is the recommended starting point for new Electron projects for its fast dev feedback loop and clean process separation, but it is a dev-server layer, not a packager, so it needs pairing with a real packaging tool. electron-builder has more mature, more flexible code-signing and auto-update support (via electron-updater, which also supports Linux and validates signatures on macOS/Windows) than Electron Forge's Squirrel.Windows-based maker approach, which matters given decision 50fe731e (KnightOS's distribution plan is not committed to personal-use-only, Chris flagged a real possibility of sharing it with others later).

## Alternatives Considered

Electron Forge alone (single integrated official toolchain, simpler but less flexible packaging/signing); electron-builder alone with a hand-configured dev pipeline (mature packaging but loses electron-vite's fast, correctly-structured dev experience).
