---
id: "1eafa834-c36a-44e2-9a48-ecf9c0cc40b5"
type: "learning"
date: "2026-08-08"
skill: "mnemosyne-integration"
learning-type: "pitfall"
key: "mnemosyne-forget-and-get-context-give-false-clean-signal"
confidence: 9
trusted: false
source: "observed"
tags: ["knight-code", "learning", "mnemosyne-integration"]
---
# Learning: mnemosyne-forget-and-get-context-give-false-clean-signal

## Insight

Two separate ways a Mnemosyne cleanup can look successful while leaving rows behind, both confirmed live during this integration's build. First: the module-level forget(memory_id, bank=...) convenience function deletes from the legacy memories table with a SQL WHERE clause scoped to an auto-generated session_id (core/memory.py's forget(), "DELETE FROM memories WHERE id = ? AND session_id = ?"), but a memory stored through the MCP server used a different session_id (f"mcp_{bank}") than the one a standalone script's default instance construction produces, so the delete silently matched zero rows in that table while the separate working-memory delete on the same call succeeded, no error, no signal anything was incomplete. Second: get_context() applies its own filter predicates (valid_until, superseded_by, consolidated_at) when reading working_memory, so a row that still physically exists in the table can read as gone through get_context() while still being present at the storage layer and still showing up in mnemosyne_export or a direct hygiene_audit table count. Confirmed by direct SQL: get_context() reported zero results for a bank while a raw SELECT COUNT(*) FROM working_memory for that same bank's db file still returned 1. The only fully reliable way to confirm a memory is actually gone is a direct query against the bank's own sqlite file (~/.knightcode/mnemosyne/data/banks/<bank>/mnemosyne.db), not forget()'s return value and not a get_context()/recall() read coming back empty.
