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

In React Native app startup time, some portion of VM initialisation time goes in creation of all View Managers.

The more the View Managers you're using more the benefits you will get.

## 🔨 Implementation
### Modify Packages

### Enable lazy view managers

## ⚠️Things to keep in mind
1. We have to implement <> in all the packages that we are passing to our react-native.
2. In Js/ts if you are reading the View managers like `UiManager.MyViewManager` then you have to migrate that to `UiManager.getViewManagerConfig("MyViewManager")` else you will get *MyViewManager* as undefined.
To check if view manager present use `UiManager.hasViewManagerConfig("MyViewManager")` API.

## 📒 Conclusions 