---
id: "08fd53c6-8eab-4754-bd2a-7b6c56462f96"
type: "decision"
date: "2026-07-31"
scope: "repo"
source: "agent"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: DevKnight's activation is now a real dispatch trigger, not just a routing-switch acknowledgment. Say...

## Decision

DevKnight's activation is now a real dispatch trigger, not just a routing-switch acknowledgment. Saying "activate devknight" (bare, or with a task named) causes primary Claude to dispatch the devknight subagent via the Agent tool immediately, so SubagentStart fires. Bare activation reads the DevKnight Workshop vault's Projects/_index.md for open projects, surfaces the list as a question for primary Claude to relay via AskUserQuestion, then resumes with Chris's pick. A named task/project skips the picker and self-locates per the existing no-pre-research rule. Either way, once a project is selected, devknight runs session-start verification and full project orientation (which also fires the vault plugin sweep as its first vault touch), then reports real current standing before either waiting (bare activation) or proceeding straight into named work.

## Rationale

Chris caught live that a prior "activate devknight" turn was answered as plain acknowledgment in primary Claude's own voice, with no Agent-tool dispatch, so SubagentStart never fired and none of devknight's session-start verification, orientation, or vault-sweep logic ran. He clarified this did not match how he remembers designing it: activation itself should always cause a real dispatch, present an open-project picker when no project is named, and always run verification plus orientation before any work resumes. Checked decision_search and dev_diary_search first per this project's verify-don't-guess rule; found no prior decision covering the bare-activation case specifically, only a first-live-activation diary entry where a task was given in the same breath as the activation phrase, and a separate feedback memory (devknight-activation-no-research) about not pre-researching a named task before dispatch, which this design is consistent with rather than in tension with.

## Alternatives Considered

Leaving activation as a silent routing-switch (rejected, that is the exact gap Chris just caught, hooks and orientation never fire until some later devknight-shaped request happens to come in). Making devknight itself call AskUserQuestion for the project picker (rejected, confirmed live in a prior session that AskUserQuestion is not callable from inside a dispatched subagent; the existing debug-escalation pattern of surface-then-relay-via-primary is reused instead, not a new mechanism).
