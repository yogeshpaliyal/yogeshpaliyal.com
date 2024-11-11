---
author: Yogesh Paliyal
pubDatetime: 2024-11-10T08:59:00
modDatetime: 2024-11-10T08:59:00
title: Android Fast Networking with Kotlin Coroutines
description: Adding AFN and Kotlin Coroutines to the project
slug: android-fast-networking-with-kotlin-coroutines
tags:
  - android
  - networking
  - kotlin-coroutines
draft: false
featured: true
---
Android Fast Networking is a great library for networking I am using since 2016, It has many features that are not available in similar networking libraries.

AFN provides direct support for RxJava but not for Coroutines, so we create by ourself

Adding AFN and Kotlin Coroutines to the project

```shell
// GSON
implementation 'com.google.code.gson:gson:2.8.6'

// Android Fast Networking
implementation 'com.amitshekhar.android:android-networking:1.0.2'

// Coroutines
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.9'
```

In this project, we are using the State Management approach class Resource

The resource is a wrapper class that contains status (Loading, Success, Error), message, Data

%[https://gist.github.com/yogeshpaliyal/1c44e55d3852cecdce0a1caf68eb77ce] 

Creating a BaseCaller, every API call will be going through this class, this is the class where the magic happens.

%[https://gist.github.com/yogeshpaliyal/9dd0839cb00349be1e1c88dee2a951cc] 

BaseApiModel is an API structure that is used for all APIs like, change as per requirements

```json
{
  "status" : 200,
  "message" : "Api hit success",
  "data" : {
      "name" : "Yogesh Paliyal"
  }
}
```