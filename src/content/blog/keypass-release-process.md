---
author: Yogesh Paliyal
pubDatetime: 2024-11-23T15:22:00Z
title: Automatic Release Process using Github Actions
featured: true
draft: "unlisted"
description: "test"
tags:
- Android
- Release
- Github-Action
- CI
---
The app release process is a repeatative process and take too much time to version bump, build and upload it to play store or other app stores.

To simplify the process I've automated this process in my project [KeyPass](https://github.com/yogeshpaliyal/KeyPass) using Github Actions.

```mermaid
flowchart LR
    A[Manually Initiate] --> | Pass Branch and Release notes | ide1
    subgraph ide1 [ ]
    direction TB
    B[Bump App Version] --> C
    X[Modify Release Notes files] --> C[Commit & Push to Master]
    C --> D[Create Github Tag]
    end
    ide1 -.-> ide2
    subgraph ide2 [ ]
    direction TB
    E[Generate AAB File]
    E --> F[Upload To Play Store]
    E --> G[Upload To Indus App Store]
    end
```

### Requirements
For most of the apps we have these requirements, there may be different requirements for your app.
1. **Bump type:** major/minor/patch.
1. **Release Notes:** Update the release note for each release.


