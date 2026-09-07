---
id: "b0439759-ddee-4a72-9a55-2e779dd6ba95"
type: "decision"
date: "2026-09-07"
scope: "repo"
source: "user"
confidence: 10
tags: ["knight-code", "decision"]
---
# Decision: omarchy-image-theme: the entire edit-existing-theme flow (opening and editing any pre-existing Omarc...

## Decision

omarchy-image-theme: the entire edit-existing-theme flow (opening and editing any pre-existing Omarchy theme) is cut from v1 to v2. This reverses the earlier CEO-review acceptance of item #7, "General theme editor" (decision b0f0cda9), which is now v2 scope in full, not partially.

## Rationale

Chris's direct call, made live during Phase 2 design review. Supersedes the narrower prior scope trim (671c335f, which kept the flow in v1 but limited it to sparse themes only) with a full removal of the flow from v1. Alternative considered: keeping the sparse-themes-only version in v1 (the 671c335f trim); Chris chose to cut the whole flow instead.
