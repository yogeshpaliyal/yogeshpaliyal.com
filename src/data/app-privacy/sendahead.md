---
effectiveDate: 2026-11-19
---

Sendahead is an Android app by Yogesh Paliyal for scheduling WhatsApp messages. In short: **Sendahead has no internet permission, no account and no server. Your messages and files never leave your phone through Sendahead.** They are only handed to WhatsApp on your phone at the time you choose.

Sendahead is an independent project and is not affiliated with WhatsApp or Meta.

## What Sendahead keeps on your phone

- your scheduled messages: the recipient number or chat name, the message text, attachments and the scheduled time
- copies of the files you attach, until they are sent or deleted
- your settings, and, only if you turn on auto-unlock, your lock-screen PIN or password, encrypted with AES-GCM using a key held in the Android Keystore

App backups are disabled, so this data isn't included in Android's cloud backup. It is deleted when you uninstall the app or clear its storage.

## Permissions and why Sendahead needs them

| Permission | What Sendahead uses it for |
| --- | --- |
| Accessibility service | Only to tap WhatsApp's Send button at the scheduled time, find a chat by name when you send to a group or contact, and, if you turned on auto-unlock, type your PIN on the lock screen. It only looks at WhatsApp's screen to find these controls, and doesn't save or send anything it sees. |
| Alarms & reminders | Fires an exact alarm so messages go out on time. |
| Display over other apps / wake lock | Turns the screen on and brings WhatsApp up when a message is due. |
| Run at startup | Re-schedules pending messages after your phone restarts. |
| Ignore battery optimisations | Keeps scheduled sends from being killed by battery savers. |
| Notifications | Tells you whether each message was sent or failed. |

## Analytics, ads and tracking

Sendahead has no analytics, crash reporting, advertising or tracking code.

## Children

Sendahead isn't directed at children and collects no data from anyone, including children.

## Changes to this policy

If this policy changes, the new version will be posted here with a new effective date.
