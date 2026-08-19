---
id: "3ccfe84a-3eb4-45e0-9072-af1e2d434a88"
type: "promise"
date: "2026-08-17"
source: "agent"
tags: ["knight-code", "promise", "open"]
---
# Promise: Finish installing Uno Platform Hot Design (live runtime XAML visual designer for WinUI3/WPF apps) pr...

## Promise

Finish installing Uno Platform Hot Design (live runtime XAML visual designer for WinUI3/WPF apps) properly, using the official Uno Platform CLI/template path rather than the unofficial H.Uno.Templates community package. Includes: getting a project on Uno.Sdk 6.0+/.NET 9+ that supports Hot Design, signing in with a free Uno Platform account, and creating a desktop shortcut once it's running.

## Context

2026-08-17. Chris asked to expand devknight's visual-GUI-builder capability beyond PySide6, into native-Windows/C# options too. pyside6-designer installed and shortcut created successfully. Hot Design setup stalled because the official Uno.ProjectTemplates.Dotnet package only offers net6.0/net7.0 targets in this environment, below what Hot Design needs; the quick unofficial workaround was rejected in favor of doing it properly later. Trial project currently sits at C:\Users\Chris Brown\Documents\GUI Builder Trials\HotDesignTrial on the old template and will need to be regenerated.
