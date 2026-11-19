---
name: DWR Sync
title: "DWR Sync – Sync Samsung Health & Health Connect Workouts to Devs Who Run"
tagline: Your workouts, synced to Devs Who Run automatically.
description: "DWR Sync is a free, open-source Android app that uploads workouts from Samsung Health, Google Fit and any Health Connect app to your Devs Who Run account, automatically in the background."
icon: /projects/dwr-sync/icon.png
ogImage: /projects/dwr-sync/banner.png
keywords:
  - devs who run
  - devswhorun sync
  - samsung health to devs who run
  - health connect sync
category: HealthApplication
downloadUrl: https://github.com/yogeshpaliyal/dwr-sync/releases/download/latest/dwr-sync.apk
downloadLabel: Download APK
githubUrl: https://github.com/yogeshpaliyal/dwr-sync
disclaimer: "DWR Sync is an unofficial, community-built app. It isn't made, endorsed or supported by Devs Who Run. It uses the site's public agent API with a token you create yourself."
screenshots:
  - src: /projects/dwr-sync/home.png
    alt: DWR Sync home screen with the last 7 days and the workout log
    caption: Last 7 days and your workout log
  - src: /projects/dwr-sync/settings.png
    alt: DWR Sync settings for account, syncing and workout apps
    caption: Settings
  - src: /projects/dwr-sync/import.png
    alt: Import older workouts by date range
    caption: Import older workouts
faq:
  - q: How do I sync Samsung Health to Devs Who Run?
    a: Install DWR Sync, grant Health Connect access, tick Samsung Health as a source and add an agent token from devswhorun.dev. New workouts then sync automatically in the background.
  - q: Which apps are supported?
    a: Any app that writes workouts to Health Connect, including Samsung Health, Google Fit and Health Sync.
  - q: Will it upload duplicates?
    a: No. If two apps record the same workout, DWR Sync uploads the copy from your highest-priority app and marks the rest as duplicates.
pubDatetime: 2026-11-19
---

## Workouts from any Health Connect app, synced automatically

DWR Sync reads the workouts your fitness apps record in Health Connect, like Samsung Health, Google Fit or Health Sync. It uploads them to your [Devs Who Run](https://devswhorun.dev) account in the background.

## Features

- **Auto-sync** in the background, with retries when you're offline
- **Pick your sources** and set their priority. Duplicates across apps are detected and skipped.
- **Import older workouts:** the last 7, 30 or 90 days, the last 12 months, or a custom date range
- **Workout log** grouped by day, showing what synced, what was skipped and why
- Your token is stored encrypted on the device

## Setup in five steps

1. **Welcome:** see what the app does.
2. **Health Connect:** allow access to Exercise and Distance.
3. **Sources:** tick the workout apps to sync and set their priority.
4. **Account:** paste an agent token (`activities:write`) from *Your agents* on devswhorun.dev.
5. **Older workouts:** choose how far back to import.
