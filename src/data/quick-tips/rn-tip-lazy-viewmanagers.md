---
author: Yogesh Paliyal
pubDatetime: 2024-12-01T00:00:00
title: "React Native Tip #1 | Lazy load view managers in Android"
description: The startup time is the core metric in any app, in react-native there is additional overhead of react VM initialisation that increases the startup time of the app.
slug: rn-tip-lazy-viewmanagers-in-android
tags:
  - react-native
  - react-native-optimisation
  - react-native-startup
draft: false
featured: true
---

## 📜 Context

The startup time is the core metric in any app, in react-native there is additional overhead of react VM initialisation that increases the startup time of the app.

In React Native app startup time, some portion of VM initialisation time goes in creation of all View Managers.

The more the View Managers you're using more the benefits you will get.

## How to Measure

We can use react markers to get the infomation about the time taken by RN internals.
We can check time taken for `CREATE_MODULE_START ; UiManager` marker. This time is the time taken for creating of all view managers without lazy loading of view managers.

## 🔨 Implementation

### Modify Packages

Implement the `ViewManagerOnDemandReactPackage` on your package and override the functions `getModule` and `getViewManagerNames`.

Check this package for reference [MainReactPackage](https://github.com/facebook/react-native/blob/40c194cf47634e2ca803ae1f469f4091aeeadaf0/packages/react-native/ReactAndroid/src/main/java/com/facebook/react/shell/MainReactPackage.kt#L12)

### Enable lazy view managers

Enable the lazy view manager when creating the React Instance Builder.

```kotlin
val reactInstanceBuilder = ReactInstanceManager.builder()
                          // ...
                          .setLazyViewManagersEnabled(true)
                          .build()
```

## ⚠️ Things to keep in mind

1. We have to implement <> in all the packages that we are passing to our react-native.
2. In Js/ts if you are reading the View managers like `UiManager.MyViewManager` then you have to migrate that to `UiManager.getViewManagerConfig("MyViewManager")` else you will get _MyViewManager_ as undefined.
   To check if view manager present use `UiManager.hasViewManagerConfig("MyViewManager")` API.

## 📒 Conclusions

By enabling the lazy view manager on react native android app, we can reduce the startup time of our react native VM creation time.
