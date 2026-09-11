---
id: "6e017361-1ab3-4695-b151-ce7d8f3ce109"
type: "learning"
date: "2026-09-11"
skill: "formal-dev-workflow"
learning-type: "pitfall"
key: "task-breakdown-reference-paths-go-stale"
confidence: 9
source: "observed"
tags: ["knight-code", "learning", "formal-dev-workflow"]
---
# Learning: task-breakdown-reference-paths-go-stale

## Insight

A file path written into a locked task breakdown is a snapshot of another repo at breakdown-writing time, and nothing re-verifies it before the task runs. omarchy-theme-forge Task 3 instructed reusing omarchy-powerplan's scripts/install-privileged-helper and .github/workflows/verify-helper-digest.yml as the proven pattern. Neither path existed: the repo has no scripts/ directory at all, and the workflow is named verify-privileged-helper.yml. The script had been real and was then removed by commit 34dada1, which replaced the in-checkout installer with an AUR PKGBUILD carrying the pin in sha256sums. The original was still fully readable at `git show 25ce61f:scripts/install-privileged-helper` and supplied the error style and pinned-constant comment convention the task actually wanted. Rule: when a task breakdown names a reference file that is missing, search the named repo's git history (git log --all --diff-filter=A --name-only, then git show <commit>:<path>) before concluding the pattern was never built or inventing a replacement. A missing path is evidence about the path, not about the pattern.
