---
id: "652644e9-0175-4e87-b4d1-57a32ad4461d"
type: "promise"
date: "2026-09-03"
tags: ["knight-code", "promise", "open"]
---
# Promise: Build a native GTK4 + gtk4-layer-shell KDE Connect sidebar panel for Waybar, same class as nm-sideba...

## Promise

Build a native GTK4 + gtk4-layer-shell KDE Connect sidebar panel for Waybar, same class as nm-sidebar (battery, notifications, SMS, file share, ring, remote input) driven off org.kde.kdeconnect D-Bus, so the Waybar module doesn't just launch the separate kdeconnect-app window.

## Context

Chris wants full KDE Connect functionality inside Waybar as part of fully replacing the Plasma panel. 2026-09-03: shipped a stopgap custom/kdeconnect module (battery % via D-Bus, on-click opens kdeconnect-app) and deferred the real sidebar build for later.
