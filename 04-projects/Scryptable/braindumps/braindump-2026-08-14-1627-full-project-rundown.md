---
type: "braindump"
domain: "project-specific"
project: "scryptable"
date: "2026-08-14"
created: "2026-08-14 16:27"
themes: ["app-architecture", "transcription-pipeline", "ai-integration", "design-review", "product-naming"]
tags: ["#braindump", "#raw-thoughts", "#scryptable"]
status: "captured"
energy_level: "high"
emotional_tone: "excited"
confidence: "high"
---

# Braindump: Scryptable, Full Project Rundown (formerly Protocol Whisper App)

**Note on naming:** this project was previously tracked in this vault as "Protocol Whisper App"; its decision history lives at `04-projects/knight-code-base/memory-export/decisions/*protocol-whisper*`. As of this session it is officially renamed **Scryptable**. This is the first note filed under the new name; older decisions still carry the old name in their filenames/titles but describe the same project.

## Raw Thoughts

[Original user content preserved exactly as provided]

# Scryptable, full braindump

Everything decided and built for this app in one session, 2026-08-14. Formerly called "Protocol Whisper App." A PySide6 (Qt for Python) desktop app for Windows that wraps an existing, working D&D-session transcription pipeline into a real GUI, and ships as a real product to outside users, not just personal-use software.

## What it does, in one paragraph

A user records a multi-speaker session (D&D, a meeting, an interview) via Discord bot (Craig) or another recording setup, imports the audio into Scryptable, the app transcribes each speaker's track, merges everything into one chronological transcript, flags anything a human should double-check, lets the user fix speaker names and confirm the transcript, then exports it or hands it to an AI for a deeper narrative/continuity pass, optionally dropping the result straight into an Obsidian vault. Every mechanical step runs fully locally with zero AI subscription required; AI is opt-in for the last step only.

## Stack and core architecture

- **Language/framework**: PySide6 (Qt for Python). Chosen because the existing pipeline scripts (`transcribe_stems.py`, a TASMAS-derived merge tool) are already Python, so the app imports them as modules directly instead of shelling out to a subprocess: no cross-language boundary, no argument-serialization, real Python exceptions instead of parsing exit codes. Alternatives considered and rejected: WinUI3 (native but cross-language), Tauri (adds Rust+JS for no real gain here), Avalonia (cross-platform benefit wasted on a single-OS tool).
- **Long-running work**: transcription/merge runs on a background QThread/QRunnable worker so the UI never freezes; this is a correctness requirement, not a choice.
- **Crash recovery**: the episode/recording folder itself is the source of truth. A missing or corrupt state-tracking file gets rebuilt by scanning the folder, never blocks the user. If the app or PC crashes mid-transcription, the next launch detects the interrupted step from folder contents and offers to re-run just that step.
- **Packaging v1**: PyInstaller `--onefile`, simplest path to a giveable .exe. Later (once there are real outside users): PyInstaller `--onedir` plus an Inno Setup installer for faster startup and a proper Start Menu/uninstaller experience.

## Import: three real scenarios, one system

1. **Discord Bot Archive (Craig)**: multi-track zip, one file per speaker, the original supported path.
2. **Multi-Track Audio Files**: generic import for any setup that already outputs separate per-speaker files (not Craig-specific).
3. **Single Recording**: one mixed file. Gets automatic speaker diarization (splitting who-said-what) or is treated as true single-speaker.

Accepted formats: FLAC, WAV, MP3, M4A, OGG/Opus, AAC.

**Diarization** (for scenario 3): WhisperX, which bundles OpenAI's Whisper plus pyannote.audio and word-level alignment. Chosen after directly comparing it against NVIDIA NeMo and SpeechBrain: free, open source, runs fully locally, competitive accuracy (about 11 to 19 percent error rate, close to paid commercial services). One real catch: the best pretrained model weights are gated behind a free HuggingFace account and access token (not payment, just a one-time signup); an older, lower-accuracy ungated fallback model exists for anyone who won't create an account. Both options exposed in the Diarization settings.

## Transcription tuning (already proven in the real pipeline, now user-configurable)

- Voice Activity Detection (Silero), default ON, trims silence and stops the model from hallucinating filler words on quiet audio.
- Condition on Previous Text, default OFF, prevents a real bug found in testing: the model can lock onto a phrase and repeat it for a long stretch if this is left on.
- Timestamp refine precision, default 0.2.
- Custom vocabulary list, biases transcription toward correct spellings of proper nouns (character names, campaign-specific terms).

## Speaker identity system

One unified "Speaker Identities" table (not split by import type): maps either a Discord username or a plain track/file label to a real name, persists across recordings so it doesn't get redone every time. Fixing an unresolved name happens inline (click the cell, get a dropdown of known names plus "add new"), and the user can continue past an unresolved name with a warning rather than a hard block, by design: Chris wanted the flexibility to fix names later in the corrections step.

## The optional AI step

The one place AI touches this app: an "LLM Handoff Session," a real embedded chat, not a silent background call. Supports:
- **Anthropic Claude**: either OAuth sign-in (uses an existing Claude Pro/Max subscription's included usage, no separate billing) or a manual API key.
- **OpenAI**: API key only (OpenAI doesn't expose an OAuth grant that lets a third-party app spend ChatGPT subscription quota; that's a real platform limit, not a gap in the design).
- **Custom OpenAI-compatible endpoint**: covers local model runners like Ollama and LM Studio too.
- **None/export-only**: always a real, first-class option. Nothing about the app requires AI.

The chat shows its tool calls explicitly in the transcript (e.g. "Called scryptable.get_transcript(...)"), never hides automation behind a spinner. A visible "agent active" badge sits in the title bar whenever this is running, color-coded to match the connected provider's real brand color (Claude's actual orange, OpenAI's actual teal, Google's actual blue), defaulting to green if no brand color is known, turning red with an error toast if the connection drops.

**MCP** (Model Context Protocol, how AI tools connect to real capabilities): Scryptable is both an MCP client (its own chat can call real tools inside the app) and an MCP server (external tools like Claude Code can connect into Scryptable itself and drive it), both free, both working out of the box.

**A separate REST API** (for non-AI automation: scripts, webhooks, folder-watcher triggers, notification hooks, multi-machine setups) is deferred past v1 and will be Scryptable's first paid feature when it gets built, distinct from AI provider costs which always bill the user's own account directly, never marked up by Scryptable.

## File management, built in

The existing manual pipeline (watch for a new recording, unzip it, ask what to name it, build the folder structure) becomes real in-app automation:
- A toast appears the moment a new recording is detected in the watched folder ("Set Up Recording" / "Ignore," stays until acted on, doesn't vanish on a timer since it's a real decision).
- A setup screen confirms extraction, asks for a name, and shows a live preview of the exact folder structure about to be created before committing anything to disk.
- A real embedded file explorer browses the actual workspace directory the app manages.
- Drag-and-drop works two ways: dropped onto an open project, it adds a new recording to that workspace; dropped with nothing open, it's a one-time run that saves nothing to a project folder unless the user chooses to.

## Export and Obsidian

- **Export**: txt, md, docx, pdf as the main checklist, more formats (RTF, HTML, SRT/VTT subtitles) tucked in a dropdown so the main list doesn't get cluttered.
- **Obsidian**: writes the finished transcript as a plain markdown file directly into a chosen vault folder. No companion plugin: a vault is just a folder Obsidian already watches, so this was the simplest thing that actually satisfies "drop transcripts into Obsidian." Supports picking a vault, setting a default, and adding more than one vault.

## App structure (the shell every screen lives in)

- **Title bar**: app icon/name, the AI-connection status badge, window controls.
- **Menu bar**: File, Edit, View, Episode, Help.
- **Toolbar**: dedicated Import and Export buttons (visually prominent, outline style, not buried in a menu), Send to Obsidian, Theme/Help icons.
- **Tab strip**: every currently open screen shows as a closable tab, click to switch. Every screen that opens announces itself here, no exceptions.
- **Nav rail** (far left, narrow icon strip): Recordings, File Explorer, Preferences. This is the actual launcher, where every screen gets opened from in the first place.
- **Sidebar panel**: content changes based on which nav rail section is active. Default shows the recordings list plus a "Source Archives" section (original unedited files, kept as permanent backup, never modified, a real definition now shown directly in the UI).

## Naming and terminology

- **Product name**: Scryptable. Went through three rounds, checked each candidate against real existing products before settling (rejected names that collided with an existing Python-to-JS transpiler and other real tools).
- **"Episode" vs "Recording"**: the app's default term for a unit of work is "Recording" (generic, works for meetings/interviews/lectures too), customizable app-wide in Preferences. Chris's own workspace is set to "Episode."
- **No open-source tool names in the UI**: TASMAS, WhisperX, pyannote.audio, PySide6, etc. never appear in a setting label or dialog title; everything is named after what it does for the user ("Transcript Assembly Settings," not "TASMAS Merge Settings"). Full credit for every open-source dependency lives in one place: the About screen.

## Screens built (all mocked up in pen.dev, real rendered screenshots, not sketches)

Speaker Mapping wizard (with dark mode variant), Fresh Open empty state, Transcription In Progress (live progress plus streaming log), Status Banners (success/warning/error/complete), Connection Lost error toast, AI Provider settings (with OAuth), Transcription and Diarization Settings, Transcript Assembly Settings, Names/Corrections/Speaker Identities manager, Export dialog, Send to Obsidian dialog, LLM Handoff Session (chat), Import format-picker dropdown, New Recording Detected toast, New Recording Setup wizard, Workspace File Explorer, two drag-and-drop overlay states, First-Run Setup wizard, unified Preferences screen, About screen.

## Process notes worth remembering

- Went through Knight Code's formal dev workflow: CEO Review (scope/architecture) then Design Review (mockups plus UX), both APPROVED. The formal-dev-workflow skill itself got improved mid-session: Design Review now explicitly expects multiple rounds and won't hand off to Eng Review until a real "is scope stable" gate says yes, because this session proved how much real scope a proper mockup pass surfaces that a spec alone never would (diarization, multi-provider AI, MCP, the whole settings layer; none of that was in the original one-paragraph pitch).
- Two full design-critique passes ran against the mockups (a fixed UX/accessibility/design-quality rubric), every finding from both passes got fixed and re-verified, not just noted.
- Eng Review (architecture, tests, performance) was started and paused partway through at Chris's request to save progress; that's the next real work session's starting point.

## Where the real files live

- Vault: DevKnight Workshop, `Projects/Scryptable/` (renamed from `Projects/Protocol Whisper App/`).
- Design canvas: `whisper_app_design.pen` (Pencil/pen.dev file), Knight Code repo root.
- Decision history: Knight Code's `decision_log` MCP tool; everything above has a durable, timestamped, reasoned entry there.

## Content Analysis

### Main Themes
1. **Architecture lock-in:** PySide6 chosen for direct Python module import into the existing transcription pipeline, avoiding cross-language friction; background threading and folder-as-source-of-truth crash recovery are load-bearing decisions, not nice-to-haves.
2. **Three-scenario import unified under one system:** Discord/Craig archives, generic multi-track files, and single-file with diarization (WhisperX) all funnel into the same speaker-identity and transcription pipeline.
3. **AI kept strictly opt-in and transparent:** the LLM Handoff Session is the only AI touchpoint, supports multiple providers including local runners, and always shows its tool calls; export-only remains a fully first-class path with zero AI dependency.
4. **Product identity finalized:** renamed Protocol Whisper App to Scryptable; UI vocabulary deliberately hides every open-source dependency name from end users, crediting them only in one About screen.
5. **Formal workflow discipline paid off:** the CEO Review, Design Review, Eng Review pipeline (with two design-critique passes) surfaced real scope (diarization, multi-provider AI, MCP, settings layer) that the original one-paragraph pitch never would have.

### Supporting Ideas
- Speaker Identities table persists across recordings, decoupled from which import path was used.
- Drag-and-drop has two distinct behaviors depending on whether a project workspace is currently open.
- REST API deferred to post-v1, flagged as the first planned paid feature and distinct from AI provider costs, which are never marked up.
- MCP support runs both directions (Scryptable as client and as server) at no cost.

### Questions Raised
- Should the older `04-projects/knight-code-base/memory-export/decisions/*protocol-whisper*` files be relinked or retitled to the Scryptable name, or left as historical record under the old name? (Chris resolved the file-rename question directly, see Action Items.)

### Decisions Contemplated
- Packaging path: PyInstaller `--onefile` now, `--onedir` plus Inno Setup installer once there are real outside users.
- REST API timing: deliberately deferred past v1, positioned as the first paid feature.

## Strategic Intelligence

### Key Insights
1. **Mockup-first design review is de-risking scope, not just polishing UI.** The Design Review gate catching diarization, multi-provider AI, MCP, and the full settings layer before Eng Review started means those decisions get architected in from day one instead of retrofitted.
2. **The "no open-source names in the UI" rule is a durable product-quality bar**, not a one-off style choice; it will need enforcing on every future screen added to Scryptable.
3. **Zero-AI-required as a hard product boundary** protects the core value (mechanical transcription) from AI-subscription churn or provider outages, and is a real differentiator to state plainly in any future marketing/positioning.

### Pattern Recognition
- **Connection to Previous Thinking:** builds directly on the existing, already-working `transcribe_stems.py` / TASMAS-derived pipeline referenced in the 2026-08-03 decision on VAD/initial_prompt settings; this braindump is the GUI-wrapping phase of a pipeline that was already proven standalone.
- **Recurring Pattern:** repeated pattern in this session of "compare real alternatives, state why rejected" (WinUI3/Tauri/Avalonia; NeMo/SpeechBrain; naming collisions), a consistent decision-hygiene habit worth carrying into future architecture calls.

### Strategic Implications
- Eng Review is paused mid-pass; the next work session should resume there rather than re-litigating scope, since CEO and Design Review are both already APPROVED.
- The project now has one name (Scryptable) end to end in this vault; new content should file under `04-projects/scryptable/`, and old "Protocol Whisper App" decision files get renamed to match rather than left split across two names.

## Action Items

### Immediate (24-48 hours)
- [x] Resume Eng Review (architecture, tests, performance) where it was paused 📅 2026-08-15
- [ ] Rename the old "Protocol Whisper App" decision-log notes to Scryptable naming 📅 2026-08-15

### Short-term (1-2 weeks)
- [ ] Confirm no other vault content (project index, tags, dashboards) still refers to the app by the old name 📅 2026-08-21

### Strategic Considerations
- Once outside users are real, revisit packaging (`--onedir` plus Inno Setup) and the REST API as the first paid feature.

## Connections
- **Related Braindumps:** [[00-inbox/braindump-2026-08-12-1106-full-project-rundown]]
- **Relevant Projects:** [[04-projects/knight-code-base/memory-export/decisions]]
- **Knowledge Base:** none yet

## Domain Classification
- **Primary Domain:** project-specific, Scryptable (95%)
- **Reasoning:** Entire content is a structured project rundown for a single named product, its architecture, and its process history.
- **Cross-Domain Elements:** none of note.
- **Privacy Level:** private

## Processing Notes

### Emotional Context
- **Energy Level:** high; dense, wide-ranging, "everything decided and built... in one session" framing.
- **Emotional Tone:** excited; pride in process discipline (formal review gates) and product-naming resolution.
- **Implications:** momentum is strong; renaming the old notes closes out the last open thread from the naming change.

### Confidence Assessment
- **Overall Analysis:** 90%; content is unusually well-structured already (near publish-ready), low ambiguity.
- **Domain Classification:** 95%; single clear project.
- **Strategic Insights:** 85%; insights extracted directly from stated content, minimal inference.
- **Areas Requiring Clarification:** none outstanding; naming resolved by Chris directly.

---

*Processed by COG Brain Dump Analyst*
