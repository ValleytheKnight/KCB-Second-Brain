---
id: "93546d95-60ce-4035-b951-5d92630fae38"
type: "decision"
date: "2026-07-31"
scope: "repo"
source: "agent"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: KnightOS's Milestone 1 Task 2 (node-pty in Electron proof of concept) is PASS, verified live end to ...

## Decision

KnightOS's Milestone 1 Task 2 (node-pty in Electron proof of concept) is PASS, verified live end to end, not just built/typechecked. node-pty spawns a real PowerShell process via ConPTY in the main process; a command typed into a temporary diagnostic hook in the renderer round-trips through Task 1's real preload/IPC bridge (contextIsolation, nodeIntegration, sandbox all unchanged) and the real shell output returns and renders. Verification method: node-pty 1.1.0 is built on node-addon-api (N-API), which is ABI-stable across Node/Electron versions, so the shipped prebuild loads directly in Electron 43.2.0 with no rebuild required; a forced `@electron/rebuild` source compile was attempted per the task's own instruction but fails on this machine on node-pty's legacy winpty backend (its `cd shared && GetCommitHash.bat` gyp step resolves to the wrong `shared` directory when winpty.gyp is parsed as an included dependency of node-pty's binding.gyp; reproduces identically under plain standalone Node with `--build-from-source`, so it is a real node-pty/node-gyp packaging bug, not an Electron-specific ABI problem). That backend is dead code on this machine regardless: node-pty selects ConPTY over winpty whenever the Windows build number is at least 18309, which Windows 11 always satisfies. ABI compatibility was instead proven by actually driving the real running Electron app (via CDP, typing a command into the renderer's diagnostic input and reading the shell's real response back out of the DOM), not by asserting compatibility from the N-API theory alone.

## Rationale

The task was an explicit go/no-go checkpoint requiring honest reporting of any deviation. The literal acceptance-criteria wording named `@electron/rebuild` as the verification method, but that specific narrow tool step fails here for reasons unrelated to Electron/node-pty ABI compatibility (the actual risk this task exists to catch). Rather than silently skip verification or force a workaround that abandons node-pty, the real question (does the module that will actually ship work inside Electron's actual runtime) was tested directly and empirically.

## Alternatives Considered

Treating the failed `@electron/rebuild` run as a hard FAIL (rejected: it fails identically on plain Node, proving it is not an Electron-ABI problem, and the legacy code path it fails on is never loaded on this machine). Patching node-pty's binding.gyp to drop the winpty target so a literal rebuild could succeed (rejected as disproportionate scope creep for a go/no-go POC given the real question was already answerable another way). Upgrading to node-pty 1.2.0-beta (confirmed via npm pack to have removed winpty entirely, so it would rebuild cleanly) (rejected: adopting a beta dependency is a real judgment call that should not be made silently, flagged instead).
