---
sidebar_position: 2
---

# Tutorial: Building a "New Mints" Telegram Bot

## Prerequisites

This tutorial assumes you have a basic understanding of Python, `requests`, and how to create a Telegram bot.

## Step 1: Scaffolding the Bot

Create a basic Python script structure:

```python
import requests
import time
import json

# Bot configuration
API_URL = "https://postfun.xyz/api/tweets"
TELEGRAM_BOT_TOKEN = "YOUR_BOT_TOKEN"
TELEGRAM_CHAT_ID = "YOUR_CHAT_ID"

# State management
LAST_SEEN_FILE = "last_seen.txt"
```

## Step 2: Polling the `/tweets` Endpoint

```python
def get_latest_mints():
    params = {
        "by": "new",
        "limit": 5
    }
    response = requests.get(API_URL, params=params)
    return response.json()
```

## Step 3: Managing State

```python
def get_last_seen_id():
    try:
        with open(LAST_SEEN_FILE, 'r') as f:
            return f.read().strip()
    except FileNotFoundError:
        return None

def save_last_seen_id(tweet_id):
    with open(LAST_SEEN_FILE, 'w') as f:
        f.write(tweet_id)
```

## Step 4: Formatting the Message

```python
def format_message(tweet):
    return f"""
🚨 NEW MINT ALERT 🚨

Content: {tweet['title'][:100]}...

Minter: {tweet['minter'][:12]}...

View on postfun: https://postfun.xyz/tweets/{tweet['id']}

#newmint
"""
```

## Step 5: Putting It All Together

```python
import requests
import time
import json

# Bot configuration
API_URL = "https://postfun.xyz/api/tweets"
TELEGRAM_BOT_TOKEN = "YOUR_BOT_TOKEN"
TELEGRAM_CHAT_ID = "YOUR_CHAT_ID"

# State management
LAST_SEEN_FILE = "last_seen.txt"

def get_latest_mints():
    params = {
        "by": "new",
        "limit": 5
    }
    response = requests.get(API_URL, params=params)
    return response.json()

def get_last_seen_id():
    try:
        with open(LAST_SEEN_FILE, 'r') as f:
            return f.read().strip()
    except FileNotFoundError:
        return None

def save_last_seen_id(tweet_id):
    with open(LAST_SEEN_FILE, 'w') as f:
        f.write(tweet_id)

def format_message(tweet):
    return f"""
🚨 NEW MINT ALERT 🚨

Content: {tweet['title'][:100]}...

Minter: {tweet['minter'][:12]}...

View on postfun: https://postfun.xyz/tweets/{tweet['id']}

#newmint
"""

def send_telegram_message(message):
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    data = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": message,
        "parse_mode": "Markdown"
    }
    requests.post(url, data=data)

def main():
    last_seen_id = get_last_seen_id()
    
    tweets = get_latest_mints()
    
    # Process tweets in reverse order (oldest first)
    for tweet in reversed(tweets):
        if last_seen_id is None or tweet['id'] > last_seen_id:
            message = format_message(tweet)
            send_telegram_message(message)
            save_last_seen_id(tweet['id'])
    
    print(f"Checked at {time.time()}. Last seen: {last_seen_id}")

if __name__ == "__main__":
    main()
```

## Next Steps

- Add more data to the messages (price, liquidity)
- Create a `/start` command for the bot
- Add error handling and logging
- Deploy to a server for continuous operation