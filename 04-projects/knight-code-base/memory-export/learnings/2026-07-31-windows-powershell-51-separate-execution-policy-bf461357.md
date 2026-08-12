---
id: "bf461357-e783-4a46-afe1-acbee6bca86d"
type: "learning"
date: "2026-07-31"
skill: "devknight"
learning-type: "pitfall"
key: "windows-powershell-51-separate-execution-policy"
confidence: 9
trusted: false
source: "observed"
tags: ["knight-code", "learning", "devknight"]
---
# Learning: windows-powershell-51-separate-execution-policy

## Insight

Windows PowerShell 5.1 (powershell.exe) and PowerShell 7+ (pwsh.exe) store their execution policy in completely separate registry scopes. Running Set-ExecutionPolicy inside pwsh only changes pwsh's own policy, never Windows PowerShell 5.1's. On Chris's machine, pwsh's LocalMachine scope reads RemoteSigned but Windows PowerShell 5.1's scopes are all Undefined, which falls back to the engine's built-in Restricted default, producing the exact "running scripts is disabled on this system" PSSecurityException. Reproduced directly by running a real script (KnightOS's claude.ps1 npm shim) under powershell.exe -NoProfile. A Zone.Identifier mark-of-the-web check on the script itself is a separate, independent hypothesis and should still be checked, but ruled it out in this case. When diagnosing an execution-policy failure on a machine with both PowerShell versions installed, always check Get-ExecutionPolicy -List under the SAME engine that actually failed, not whichever engine the diagnostic happens to be run from.
