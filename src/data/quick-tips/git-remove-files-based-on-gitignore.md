---
author: Yogesh Paliyal
pubDatetime: 2021-08-5T00:00:00
modDatetime: 2021-08-5T00:00:00
title: Remove files from git based on .gitignore
description: Sometimes we want to remove the files from git that is already being pushed.
slug: git-remove-files-based-on-gitignore
tags:
  - git
draft: false
featured: true
---

Sometimes we want to remove the files from git that is already being pushed. but we don't want to remove it from our local system.

Here are the commands to do the magic. 🪄 ✨

```shell
git rm -r --cached .
git add .
git commit -m "Drop files from .gitignore"
```

You basically remove and re-add all files, but `git add` will ignore the ones in `.gitignore`.

Using the `--cached` option will keep files in your filesystem, so you won't be removing files from your disk.

Note:
Some pointed out in the comments that you will lose the history of all your files. I tested this with git 2.27.0 on MacOS and it is _not_ the case. If you want to check what is happening, check your `git diff HEAD~1` before you push your commit.
