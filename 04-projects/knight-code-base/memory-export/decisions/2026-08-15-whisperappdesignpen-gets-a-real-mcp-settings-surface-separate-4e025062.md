---
id: "4e025062-de40-4523-aa70-aa40115c7764"
type: "decision"
date: "2026-08-15"
source: "agent"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: whisper_app_design.pen gets a real MCP settings surface, separate from the AI Provider dialog. Prefe...

## Decision

whisper_app_design.pen gets a real MCP settings surface, separate from the AI Provider dialog. Preferences' tab list gains a new "MCP" tab (between AI Provider and Transcription), and a new top-level frame "Preferences (MCP Tab)" (id jJY9n) shows its content: a Connected Servers list (name, status badge, remove action, an Add MCP Server button) and a "This App's MCP Server" section (an "allow external agents to connect" toggle plus a read-only server address field), separate from model/provider selection per Chris's explicit clarification that MCP is tool/context access, not model selection.

## Rationale

No MCP-specific settings/connections screen existed anywhere in the file before this session; the only existing MCP-related UI was a passive status readout in the LLM Handoff Session screen's McpStatusBar ("MCP: 2 tools connected"), which has no add/remove/configure affordance. This closes that real gap ahead of decision 13f0f8ea (Scryptable ships MCP client and server both directions free in v1). KnightOS's own mockup file was considered as a reference point per the coordinator's suggestion but not opened; the connection-manager pattern used here (name/status/remove rows plus an add action) is a standard, well-understood pattern that didn't need copying from another file to get right, and Scryptable already has its own established visual direction to stay consistent with.
