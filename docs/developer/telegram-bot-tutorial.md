---
sidebar_position: 2
---

# Tutorial: Building a "New Mints" Telegram Bot for `postfun`

## Introduction: Bridging `postfun` and Your Community

`postfun` is a dynamic marketplace, with new Content Pools being minted constantly. As a developer or community manager, you might want to keep your audience updated in real-time. This tutorial will guide you through building a simple Python-based Telegram bot that monitors for new `postfun` mints and automatically posts them to your Telegram channel or group.

This is a great starting point for understanding how to interact with the `postfun` API and can be easily extended to track other events like Level-Ups, major trades, or graduations.

## Prerequisites

Before you begin, make sure you have the following:

*   **Python 3.8+:** Installed on your system.
*   **`requests` library:** For making HTTP requests to the `postfun` API.
*   **`python-telegram-bot` library:** A powerful and easy-to-use library for building Telegram bots. (We'll use `requests` for simplicity in this example, but for a full bot, this is recommended).
*   **A Telegram Bot Token:** You'll need to create a new bot via Telegram's BotFather (`@BotFather`).
*   **A Telegram Chat ID:** The ID of the group or channel where your bot will send messages. (You can get this by adding your bot to a group and sending `/my_id@YourBotName` in the group, or using a service like `@get_id_bot`).

## Step 1: Scaffolding the Bot and Configuration

Create a new Python file (e.g., `postfun_bot.py`) and set up your basic configurations.

```python
import requests
import time
import json
import os # For environment variables

# --- Bot Configuration ---
# Base URL for the postfun API
API_BASE_URL = "https://api.postfun.xyz" # Using the official API endpoint for the backend

# Telegram Bot Token (GET THIS FROM BOTFATHER)
# It's best practice to use environment variables for sensitive info
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "YOUR_TELEGRAM_BOT_TOKEN_HERE")
# Telegram Chat ID (Your group/channel ID)
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "YOUR_TELEGRAM_CHAT_ID_HERE")

# --- State Management ---
# File to store the ID of the last tweet we've seen to avoid re-sending old notifications
LAST_SEEN_FILE = "last_seen_tweet_id.txt"

# --- Polling Interval ---
# How often the bot will check for new mints (in seconds)
POLLING_INTERVAL_SECONDS = 300 # 5 minutes
```

## Step 2: Fetching the Latest Mints from `postfun` API

We'll define a function to call the `postfun` backend's `/tweets` endpoint. We'll sort by `"new"` to get the most recently minted pools.

```python
def get_latest_mints():
    """
    Fetches the latest minted tweets from the postfun API.
    """
    params = {
        "by": "new",  # Sort by newly minted
        "limit": 10   # Get a few recent ones to check for new additions
    }
    try:
        response = requests.get(f"{API_BASE_URL}/tweets", params=params, timeout=10)
        response.raise_for_status() # Raise an exception for bad status codes (4xx or 5xx)
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching latest mints: {e}")
        return [] # Return empty list on error
```

## Step 3: Managing Bot State - `last_seen_tweet_id`

To ensure your bot only sends notifications for *new* mints and doesn't spam your channel with old ones every time it runs, we need a way to store the ID of the last tweet it successfully processed.

```python
def get_last_seen_id():
    """
    Reads the last seen tweet ID from a local file.
    Returns None if the file doesn't exist or is empty.
    """
    try:
        with open(LAST_SEEN_FILE, 'r') as f:
            content = f.read().strip()
            return int(content) if content.isdigit() else None
    except FileNotFoundError:
        return None
    except Exception as e:
        print(f"Error reading last seen ID file: {e}")
        return None

def save_last_seen_id(tweet_id):
    """
    Saves the given tweet ID to a local file.
    """
    try:
        with open(LAST_SEEN_FILE, 'w') as f:
            f.write(str(tweet_id))
    except Exception as e:
        print(f"Error saving last seen ID file: {e}")
```

## Step 4: Formatting the Telegram Message

We need to format the data received from the `postfun` API into a user-friendly message for Telegram. Telegram supports Markdown for rich text formatting.

```python
def format_message(tweet_data):
    """
    Formats a single tweet's data into a Telegram Markdown message.
    """
    tweet_id = tweet_data.get('id', 'N/A')
    tweet_username = tweet_data.get('tweetUsername', 'N/A')
    # Truncate content for brevity
    tweet_content = tweet_data.get('description', 'No content available.')[:150] + "..." if len(tweet_data.get('description', '')) > 150 else tweet_data.get('description', 'No content available.')
    minter_npub = tweet_data.get('minterId', 'N/A')[:12] + "..." if len(tweet_data.get('minterId', '')) > 12 else tweet_data.get('minterId', 'N/A')

    # Basic stats for the mint
    current_price_sats = tweet_data.get('priceSatsPerToken', 'N/A') # Assuming API returns this
    volume_24h_sats = tweet_data.get('volume24H', 'N/A')
    liquidity_sats = tweet_data.get('liquidity', 'N/A')
    current_level = tweet_data.get('level', 'N/A')

    return f"""
🚨 *NEW MINT ALERT!* 🚨

*Content:* `{tweet_content}`
*From:* @{tweet_username}

*Minter:* `{minter_npub}`
*Current Level:* {current_level}

*Current Price:* {current_price_sats} sats/token
*24h Volume:* {volume_24h_sats} sats
*Liquidity:* {liquidity_sats} sats

[➡️ View on postfun.xyz](https://postfun.xyz/tweet/{tweet_id})

#postfun #newmint
"""
```

**Note:** The `tweet_data` dictionary structure in `format_message` assumes the `/tweets` API returns `id`, `tweetUsername`, `description`, `minterId`, `priceSatsPerToken`, `volume24H`, `liquidity`, and `level`. Adjust based on your actual API response.

## Step 5: Sending the Message to Telegram

This function handles the actual communication with the Telegram Bot API.

```python
def send_telegram_message(message):
    """
    Sends a formatted Markdown message to the specified Telegram chat.
    """
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        print("Telegram bot token or chat ID not configured. Skipping message.")
        return

    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": message,
        "parse_mode": "Markdown", # Use Markdown for formatting
        "disable_web_page_preview": False # Allow link previews
    }
    try:
        response = requests.post(url, json=payload, timeout=10)
        response.raise_for_status()
        print(f"Message sent to Telegram. Response: {response.json()}")
    except requests.exceptions.RequestException as e:
        print(f"Error sending message to Telegram: {e}")
```

## Step 6: The Main Bot Loop

This is where all the pieces come together to create a continuously running bot.

```python
def main_bot_loop():
    """
    The main loop of the bot. Continuously checks for new mints and sends notifications.
    """
    print("postfun Telegram Bot started...")
    while True:
        last_seen_id = get_last_seen_id()
        print(f"Checking for new mints (Last seen ID: {last_seen_id})...")

        new_mints = get_latest_mints()

        if new_mints:
            # Sort by ID to ensure we process in ascending order (oldest new mint first)
            # This is crucial for correctly updating last_seen_id
            new_mints.sort(key=lambda x: x.get('id', '')) # Assuming 'id' is comparable

            for tweet in new_mints:
                # Assuming 'id' is a string. If it's an integer, compare as int.
                # Here, we assume IDs are sequential or can be compared lexicographically.
                # For real tweet IDs, it's safer to use creation time or a numerical internal ID.
                if last_seen_id is None or tweet.get('id', '') > str(last_seen_id):
                    message = format_message(tweet)
                    send_telegram_message(message)
                    save_last_seen_id(tweet.get('id', '')) # Update last seen after successful send
        else:
            print("No new mints found or error occurred.")

        print(f"Next check in {POLLING_INTERVAL_SECONDS} seconds.")
        time.sleep(POLLING_INTERVAL_SECONDS)

if __name__ == "__main__":
    main_bot_loop()
```

## Running Your Bot

1.  **Save the code:** Save the entire script as `postfun_bot.py`.
2.  **Install dependencies:** `pip install requests`
3.  **Set environment variables:** Before running, set your `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` as environment variables:
    ```bash
    export TELEGRAM_BOT_TOKEN="YOUR_ACTUAL_BOT_TOKEN"
    export TELEGRAM_CHAT_ID="YOUR_ACTUAL_CHAT_ID"
    python postfun_bot.py
    ```
4.  **Run:** `python postfun_bot.py`

Your bot will now start polling the `postfun` API and sending notifications to your Telegram chat!

## Next Steps & Enhancements

This is a basic bot, but it can be significantly enhanced:

*   **Error Handling & Logging:** Add more robust logging (`logging` module) for debugging and monitoring, especially for API errors or network issues.
*   **Asynchronous Operations:** For more complex bots handling many users or real-time events, consider using `python-telegram-bot`'s built-in asynchronous features (e.g., `asyncio`).
*   **Interactive Commands:** Add Telegram commands like `/stats` to fetch current `postfun` platform statistics, or `/price [tweet_id]` to get the current price of a specific pool.
*   **Database for State:** For more persistent and reliable state management (especially if the bot is restarted frequently), use a small database (e.g., SQLite) instead of a text file for `last_seen_tweet_id`.
*   **Monitoring:** Set up basic monitoring to ensure your bot is always running.
*   **Deployment:** Deploy your bot to a cloud server (e.g., AWS EC2, DigitalOcean Droplet, Railway) to ensure it runs 24/7.