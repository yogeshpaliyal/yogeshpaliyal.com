---
author: Yogesh Paliyal
pubDatetime: 2025-07-28T00:00:00
title: "Manage ADB Depplinks using terminal"
description: Manage ADB Depplinks using terminal
slug: adb-manage-deeplinks
tags:
  - adb
  - deeplinks
draft: true
featured: true
---

## 📜 Context
Have you ever faced the issue to keep all the deeplinks handy?


## Prequisites
1. Install [fzf](https://github.com/junegunn/fzf)

## Integrate
1. Copy the below code to `.zshrc` at the end.
```shell
adbl() {
    # Check if fzf is installed
    if ! command -v fzf &> /dev/null; then
        echo "Error: fzf is not installed. Please install it to use this function."
        echo "e.g., brew install fzf"
        return 1
    fi

    local HISTORY_FILE=~/.adbl_history
    # Create the history file if it doesn't exist
    touch "$HISTORY_FILE"

    local uri

    # If an argument is passed, use it directly.
    if [ -n "$1" ]; then
        uri="$1"
    else
        # Otherwise, show the fzf history selector.
        # --print-query prints the query and then the selection.
        # We take the last line of the output (`tail -n 1`), which is the selection
        # if one is made, or the query itself if the user just presses Enter.
        uri=$(fzf --tac --height 40% --border --prompt="Select or type a new deeplink > " \
            --header="[Enter] to select, [Esc] to cancel." \
            --print-query < "$HISTORY_FILE" | tail -n 1)
    fi

    # Exit if the user cancelled fzf or the URI is empty
    if [ -z "$uri" ]; then
        echo "No deeplink selected."
        return 1
    fi

    # Execute the adb command
    echo "Executing: adb shell am start -W -a android.intent.action.VIEW -d \"$uri\""
    adb shell am start -W -a android.intent.action.VIEW -d "$uri"

    # If the command was successful, save the URI to history (if it's not already there)
    if [ $? -eq 0 ]; then
        # Use grep to check if the exact line already exists
        if ! grep -q -F -x "$uri" "$HISTORY_FILE"; then
            echo "$uri" >> "$HISTORY_FILE"
        fi
    fi
}
```



## Future Plans
1. Handle multiple connected device.
2. 
