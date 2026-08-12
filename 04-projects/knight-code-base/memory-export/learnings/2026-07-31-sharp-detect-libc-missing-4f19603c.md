---
id: "4f19603c-8fb4-46b8-9c35-56f5a85ed6bc"
type: "learning"
date: "2026-07-31"
skill: "knightcode-browse"
learning-type: "pitfall"
key: "sharp-detect-libc-missing"
confidence: 7
trusted: false
source: "observed"
tags: ["knight-code", "learning", "knightcode-browse"]
---
# Learning: sharp-detect-libc-missing

## Insight

The browse daemon's screenshot command fails with "Cannot find package 'detect-libc'" (a missing transitive dependency of the sharp image library at C:\Users\Chris Brown\.claude\skills\knight-code\node_modules\sharp). Running `npm install detect-libc --no-save` in that skill directory resolves the import error but then leaves the daemon unable to restart ("Server failed to start within 15s" on every subsequent goto/stop). A real reinstall (delete node_modules, fresh npm install from the skill's own lockfile) is the fix to try next time, not a targeted single-package patch, which appears to destabilize whatever version pinning the daemon relies on.
