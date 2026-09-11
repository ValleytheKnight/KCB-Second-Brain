---
id: "ce2e9ca2-52f0-4da8-be22-d4671d10081c"
type: "decision"
date: "2026-09-11"
source: "agent"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: omarchy-theme-forge pins wallust at exact version 3.5.2, verified by two SHA256 digests: the Codeber...

## Decision

omarchy-theme-forge pins wallust at exact version 3.5.2, verified by two SHA256 digests: the Codeberg release asset wallust-3.5.2-x86_64-unknown-linux-musl.tar.gz at 92e11a841827ea6c2af28290d2cf4908db07dff4aee8dec1b7f1133cbf72c6e2, and the binary extracted from it at fc7de8a7082a918213e734226042be45f3e61a3e24879a37a3b5bb7f46fd4e77. Both are pinned in scripts/fetch-wallust-sidecar and re-checked by .github/workflows/verify-wallust-digest.yml.

## Rationale

Implements Task 3 and closes Security Review finding 2 (MEDIUM-HIGH, supply chain), under the existing bundled-sidecar decision 4f4f09aa and exact-version-pin decision 1a3eb3cc. Two digests rather than one because the upstream release asset is a tarball holding a single member, not a bare binary: the asset digest is what CI can re-download and compare against real upstream bytes, and the binary digest is what lets an already-installed sidecar be re-verified without a network round trip, which makes the fetch script idempotent. The asset digest is checked before anything is extracted or placed, so a swapped or tampered asset leaves src-tauri/binaries/ untouched. Task 16 needs the version string for its MIT license notice and gets it from one place, WALLUST_VERSION in the fetch script. Alternatives weighed: pinning only the tarball digest (simpler, but gives a re-run nothing to compare an installed sidecar against, forcing a re-download every build); pinning only the extracted binary digest (loses CI's ability to check the real upstream asset without extracting); requiring a user AUR install plus a PATH lookup, and embedding wallust as a Cargo library dependency, both already rejected by decision 4f4f09aa.
