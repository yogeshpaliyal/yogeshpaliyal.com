---
author: Yogesh Paliyal
pubDatetime: 2024-11-25T00:00:00
title: "React Native Tip #1 | Lazy load view managers"
description: The app start up time is the core metric in any app, in react native there is a cold start time, to improve that we can use lazy view manager
slug: rn-tip-lazy-viewmanagers
tags:
  - react-native
draft: unlisted
featured: true
---

## 📜 Context 
The startup time is the core metric in any app, in react-native there is additional overhead of react VM initialisation that increases the startup time of the app.

In React Native app startup time, some portion of VM initialisation time goes in creation of all View Managers