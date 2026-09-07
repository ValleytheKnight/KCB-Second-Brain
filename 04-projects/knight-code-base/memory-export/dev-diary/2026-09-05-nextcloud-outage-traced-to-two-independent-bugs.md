---
type: "dev-diary"
date: "2026-09-05"
tags: ["knight-code", "dev-diary", "nextcloud"]
---
# Nextcloud outage traced to two independent bugs

A self-hosted service went offline mid-session. Two separate causes were stacked together. First, a startup timing problem: the container config binds to one specific network address instead of listening on all of them, and the containers start again automatically right as the VPN service reports itself active, before that specific address actually exists on the network interface yet, so the address binding fails quietly even though the containers appear to be running. Second, a leftover setting from before the service moved to HTTPS meant it kept advertising plain HTTP addresses to clients that had connected over HTTPS, and the desktop client treated that mismatch as a security downgrade and refused to proceed, correctly.  Both were resolved for tonight. The startup timing issue will return on every reboot until the underlying network binding approach changes, tracked separately as an open item.
