---
id: "31a4407c-e120-4854-b3aa-04e14138eb8b"
type: "decision"
date: "2026-08-03"
scope: "repo"
source: "agent"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: KnightOS Project Tabs Task B (session schema v2, migration, crash-safe write) keeps loadSession()/sa...

## Decision

KnightOS Project Tabs Task B (session schema v2, migration, crash-safe write) keeps loadSession()/saveSession(tabs)/handleSessionSave's existing flat, IPC-facing shape unchanged. Internally, session.json is now a v2 PersistedProject-based file (src/shared/session.ts) with a real v1-to-v2 migration (migrateSessionFile) and a genuinely atomic write (temp file + rename, src/main/atomic-write.ts, replacing the previous direct writeFileSync that Task B's own spec review found was not crash-safe). loadSession derives its flat tabs list from the on-disk file's active Project; saveSession updates that Project's tabs in place (or creates one, or writes the empty zero-Projects shape) while leaving every other Project in the file untouched. Full multi-project exposure over IPC is deliberately left to Task C (renderer state restructuring), which depends on Task B.

## Rationale

Task B's own spec line is explicit: "Data layer only, no UI change, can be built and fully tested against the existing v1 file format before any rendering work depends on it." Changing loadSession/saveSession's IPC-facing shape now would force a matching change in preload/api.ts and App.tsx before Task C's renderer restructuring exists to consume it, which is a UI-layer change this task explicitly excludes, and would break every existing Milestone 1 Vitest/Playwright test that exercises the current flat contract. Keeping the boundary unchanged let every one of Task 4-9's existing e2e specs (26 total) and the pre-existing session-store unit tests pass unmodified, proving zero regression, while still landing the real schema/migration/atomicity work the spec's acceptance criteria asked for. An independent spec-fidelity review (dispatched via knightcode-code-review) checked this reasoning against the spec text directly and confirmed it holds, rather than being scope creep or an under-build.</parameter>

## Alternatives Considered

Changing loadSession/saveSession to expose full multi-project data over IPC now (rejected): would require touching preload/api.ts and App.tsx ahead of Task C, contradicting Task B's own "no UI change" scope and risking exactly the kind of premature renderer coupling Task C's isolation (as the riskiest, most invasive task in the sequence) is meant to avoid. Keeping the on-disk format at v1 and deferring migration entirely to Task C (rejected): would leave the real crash-safety gap Task B's spec review found (a direct writeFileSync with no temp file or rename) unfixed for another task cycle, and contradicts Task B's spec text naming the crash-safe write as its own scope, not Task C's.
