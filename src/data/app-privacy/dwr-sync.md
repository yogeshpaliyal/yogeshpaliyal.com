---
effectiveDate: 2026-11-19
---

DWR Sync is an unofficial Android app by Yogesh Paliyal that uploads your workouts to your own Devs Who Run account. In short: **the developer never receives your data. Workouts go only from your phone to the Devs Who Run site you configure, using a token you create.**

## What DWR Sync reads

With your permission, DWR Sync reads **exercise sessions and distance** from Health Connect, including past and background data if you allow it. It reads only from the apps you tick as sources.

## What it sends, and where

For each workout it uploads the title, sport, start time, duration, distance and a short note ("synced from Health Connect") to the Devs Who Run site address you entered. Activities are created as **private**. That data is then handled under Devs Who Run's own privacy policy.

Nothing is sent anywhere else.

## What it keeps on your phone

- your site address and agent token, stored with EncryptedSharedPreferences
- a sync history of up to 2,000 workouts (sport, times, distance, source app, status) so it doesn't upload anything twice
- your settings

App backups are disabled. Everything is deleted when you uninstall the app or clear its storage.

## Health Connect data

DWR Sync uses Health Connect data only to upload your workouts to the account you chose. It doesn't use it for advertising, doesn't sell it, and doesn't share it with anyone else.

## Analytics, ads and tracking

DWR Sync has no analytics, crash reporting, advertising or tracking code.

## Changes to this policy

If this policy changes, the new version will be posted here with a new effective date.
