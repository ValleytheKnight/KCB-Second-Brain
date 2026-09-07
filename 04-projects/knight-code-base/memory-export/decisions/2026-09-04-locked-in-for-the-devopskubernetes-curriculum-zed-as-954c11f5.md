---
id: "954c11f5-fa7c-4871-9585-e05419ca6648"
type: "decision"
date: "2026-09-04"
source: "user"
tags: ["knight-code", "decision"]
---
# Decision: Locked in for the DevOps/Kubernetes curriculum: Zed as the code editor, Argo CD as the GitOps tool f...

## Decision

Locked in for the DevOps/Kubernetes curriculum: Zed as the code editor, Argo CD as the GitOps tool for Phase 3.

## Rationale

Zed is a native Linux app (not Electron), avoiding the already-logged Electron/Wayland fractional-scale clipping bug on this Hyprland setup, at the cost of a less mature Kubernetes extension and Go debugger than VS Code. Argo CD chosen over Flux for its web UI, giving visual feedback on cluster sync state, more useful than Flux's lighter CLI-only footprint for a first GitOps setup.
