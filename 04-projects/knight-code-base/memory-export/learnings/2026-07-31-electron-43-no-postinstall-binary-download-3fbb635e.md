---
id: "3fbb635e-d167-46e6-b68e-3ebeb28460db"
type: "learning"
date: "2026-07-31"
skill: "knightcode-incremental-implementation"
learning-type: "tool"
key: "electron-43-no-postinstall-binary-download"
confidence: 9
trusted: false
source: "observed"
tags: ["knight-code", "learning", "knightcode-incremental-implementation"]
---
# Learning: electron-43-no-postinstall-binary-download

## Insight

Electron 43 ships no postinstall script in its package.json (verified by reading node_modules/electron/package.json: the scripts field is absent entirely). The binary is NOT downloaded by npm install; it must be fetched explicitly via the package's own `install-electron` bin or `node node_modules/electron/install.js`. Symptom: node_modules/electron/dist/electron.exe missing after a apparently-successful install, and no error. Fix that verified working on a genuine clean checkout: add `"postinstall": "install-electron"` to the project's own package.json scripts (root-package scripts are not subject to npm 11's dependency allow-scripts gate). Separately, npm 11.16 gates dependency install scripts by default and prints an allow-scripts warning; esbuild does not actually need its blocked postinstall because the platform binary arrives via the @esbuild/&lt;platform&gt; optional dependency.
