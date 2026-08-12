---
id: "510aabff-d59a-4e4d-b66c-51ec357492f7"
type: "decision"
date: "2026-07-31"
scope: "repo"
source: "user"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: KnightOS's renderer UI framework is React, scaffolded via electron-vite's official react-ts template...

## Decision

KnightOS's renderer UI framework is React, scaffolded via electron-vite's official react-ts template, resolving the choice deliberately deferred at Task 1 (decision 6e6c18ae) until Task 3 where a real UI exists to judge it against.

## Rationale

xterm.js is framework-agnostic (it takes over a plain DOM element and manages its own internal rendering rather than existing as a React/Vue/Svelte component), so the terminal integration cost is effectively identical across all three candidates and was not the deciding factor. The real deciding factors: (1) React has the largest ecosystem of the three, which matters most for the dashboard/analytics milestone (decision 708229fb) still to come, not for Task 3 itself; (2) React has the deepest and most reliable AI-assisted-development coverage, a genuine practical advantage on a project where Claude is the primary build partner, since it reduces framework-specific dead ends during implementation. Svelte's main advantage (smaller compiled runtime, no framework overhead shipped to the browser) is much weaker for a desktop Electron app, which already bundles its own Chromium runtime, than it would be for a web app downloaded over a network. Presented as a real comparison to Chris (per the project's standing rule to give full context on genuine tradeoffs, not just a recommendation) rather than picked silently, since it was an explicitly flagged open decision. Chris confirmed React directly.

## Alternatives Considered

Vue (electron-vite also ships a first-class Vue template, Composition API is clean, but smaller ecosystem and fewer real-world Electron+xterm.js reference examples than React). Svelte (smallest runtime and no virtual-DOM overhead, but that specific advantage is muted in a bundled-Chromium desktop app, and it has the smallest ecosystem of the three).
