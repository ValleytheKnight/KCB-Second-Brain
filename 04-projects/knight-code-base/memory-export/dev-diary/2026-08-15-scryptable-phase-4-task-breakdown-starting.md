---
type: "dev-diary"
date: "2026-08-15"
tags: ["knight-code", "dev-diary", "scryptable", "formal-dev-workflow", "task-breakdown", "phase-4"]
---
# Scryptable Phase 4 Task Breakdown starting

Chris authorized moving forward: starting formal-dev-workflow's Phase 4, Task Breakdown, for protocol-whisper-app now. Security review is closed (APPROVED_WITH_CONCERNS, decision 043c2c8b, 4 findings, no CRITICALs).  This phase decomposes the full approved scope (CEO review, design review, eng review, whisper_app_design.pen) into ordered, sized tasks with acceptance criteria, and must fold in all 4 security findings as real tasks or real acceptance criteria, not leave them as review-doc prose that implementation might miss: zip-slip containment in Craig archive import, MCP server default-off toggle plus local shared token, MCP client third-party tool-output flagging plus a confirm step, and the standing rule against ever setting the custom-endpoint field from imported content.  This is the phase that finally opens formal-workflow-gate.ts's enforcement hook once complete (phase bumps to "implementation"), so real Scryptable code can start after this. Logging the start now, before the task list is written, per the standing log-as-you-go practice for this project.
