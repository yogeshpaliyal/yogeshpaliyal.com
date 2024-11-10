---
author: Yogesh Paliyal
pubDatetime: 2024-03-03T00:00:00Z
modDatetime: 2024-03-03T00:00:00Z
title: Automating Indus App Store Uploads with GitHub Actions
slug: automating-indus-app-store-uploads-with-github-actions
featured: true
draft: false
ogImage: https://github.com/user-attachments/assets/5d455567-d315-44f0-89de-de48775e319f
tags:
  - indus-app-store
  - github-actions
description: This blog post delves into leveraging GitHub Actions to automate the process of uploading Android App Bundles (AAB) to the Indus App Store.
---

In the realm of software development, automation plays a pivotal role in enhancing efficiency and reducing manual errors. GitHub Actions, a versatile automation tool, empowers developers to automate various workflows, including continuous integration and deployment. This blog post delves into leveraging GitHub Actions to automate the process of uploading Android App Bundles (AAB) to the Indus App Store.

## Table of contents

## The Problem

Manual uploading of Android AAB files to the Indus App Store can be cumbersome and error-prone, involving multiple intricate steps such as creating releases and uploading files. This manual process is not only time-consuming but also prone to inconsistencies.

## The Solution: GitHub Actions for Indus App Store

Introducing the [`Upload-Indus-AppStore`](https://github.com/marketplace/actions/upload-indus-appstore) GitHub Action available on the GitHub Marketplace. This action simplifies the upload process by automating the deployment of Android AAB files to the Indus App Store. Key parameters for this action include:

\- `apiKey`: API Key for Indus App Store.

\- `aabFilePath`: Path to the AAB file.

\- `packageName`: Package Name of the App.

\- `signingKeyBase64`: Base64 encoded signing key file (.jks).

\- `keyPassword`, `keystoreAlias`, `keystorePassword`: Signing key details.

### How It Works

The workflow involves defining a YAML file in your repository's `.github/workflows` directory, setting up triggers for pull requests or new tags, creating jobs for building and uploading AAB files, and utilizing the [`Upload-Indus-AppStore`](https://github.com/marketplace/actions/upload-indus-appstore) action with relevant parameters.

### Benefits and Conclusion

By automating the upload process with GitHub Actions, developers can save time, ensure consistency, and enhance efficiency in deploying Android apps to the Indus App Store. This automation not only streamlines workflows but also fosters a more robust development environment.

Feel free to explore this powerful automation tool on GitHub Marketplace and streamline your app deployment process effortlessly! 🚀📱
