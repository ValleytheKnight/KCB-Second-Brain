---
id: "2f1cb4fd-a3c0-43f5-ac8f-36ccf844080b"
type: "decision"
date: "2026-09-09"
scope: "repo"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: omarchy-image-theme Security Review (Phase 3.5): theme-name-derived write paths need a traversal gua...

## Decision

omarchy-image-theme Security Review (Phase 3.5): theme-name-derived write paths need a traversal guard before Task Breakdown. The reused theme-creation logic (~/.local/bin/omarchy-theme-from-image) only lowercases and dash-normalizes a theme name, never rejects "/" or a leading ".". Required fix: apply tauri-dev's safe_join canonicalize+bounds-check pattern to every Rust command that turns a theme name into a filesystem path (generate_theme, generate_theme_batch, save_theme, check_theme_name_collision), plus reject "/" and a leading "." before normalization, matching what the real omarchy-theme-set apply-side script already does.

## Rationale

Verified by reading the real on-disk omarchy-theme-from-image script directly: THEME_DIR="$HOME/.config/omarchy/themes/$NAME" with $NAME built only via tr lowercase + spaces-to-dashes, no slash/dot rejection. Contrast with the real /usr/share/omarchy/bin/omarchy-theme-set (a different script, used on apply), which does reject: [[ $THEME_NAME == .* || $THEME_NAME == */* ]]. Eng review's canonicalize/bounds-check decision (2531000a) only covers the read-side picked image/folder path, nothing locked covers the write-side theme-name-to-directory construction. No Chris decision needed, this is a concrete no-tradeoff fix that must become a Task Breakdown acceptance criterion.
