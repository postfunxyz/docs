Of course. Providing clear, structured material is the key to empowering a technical writer to create excellent documentation. Here is a comprehensive brief, complete with structure, user flows, and concrete examples, formatted for a technical writer using Docusaurus.

---

### **Brief for Technical Writer: postfun Documentation**

**Project:** `postfun.xyz` Documentation
**Platform:** Docusaurus
**Goal:** To create a clear, engaging, and comprehensive guide for users of the `postfun` platform. The documentation should cater to a wide audience, from crypto-native "degens" to curious content creators who are new to the space. The tone should be enthusiastic, slightly playful, but always precise and trustworthy.

---

### **1. Docusaurus Site Structure**

Please organize the documentation into the following top-level categories in the Docusaurus sidebar:

*   **🚀 Getting Started** (Onboarding & Core Concepts)
*   **💹 Trading on postfun** (The Core User Loop)
*   **✍️ For Content Creators** (How to Benefit from Your Content)
*   ** chrome-extension's icon The postfun Extension** (Deep Dive on the Power Tool)
*   **💡 Advanced Topics** (Deeper Mechanics)
*   **❓ FAQ** (Frequently Asked Questions)

---

### **2. Content Outline & Material**

Here is the detailed breakdown of the content for each section.

#### **🚀 Getting Started**

*   **Page 1: What is postfun?**
    *   **Goal:** A high-level, exciting introduction.
    *   **Content:**
        *   Explain the core concept: `postfun` is a marketplace where any post on X.com can be turned into a tradable asset.
        *   Use an analogy: "Think of it like a stock market for memes, ideas, and cultural moments."
        *   **Example:** "Imagine when Elon Musk tweeted 'Use Signal.' That single tweet created immense value. With postfun, you could have *invested* in that moment. The first person to see its potential could have created a market for it, and anyone who believed in its impact could have bought in."
        *   Briefly introduce the key players: **Creators** (who make the content), **Minters** (who discover and launch the market), and **Traders** (who buy and sell).

*   **Page 2: Setting Up Your Wallet (The Key to postfun)**
    *   **Goal:** Guide users through the crucial first step.
    *   **Content:**
        *   Explain that `postfun` uses the Nostr protocol for identity, so a Nostr key (`nsec`) is their password and identity in one.
        *   **Primary Recommendation:** Guide them to install the official `postfun` Chrome Extension. This is the easiest and most secure way.
        *   **Step-by-step Guide (with screenshots/GIFs):**
            1.  Go to the Chrome Web Store and install the `postfun` extension.
            2.  Click the extension icon and choose "Create New Wallet."
            3.  **Crucial Step:** Show the "Backup Your Private Key" screen. Use bold, red text: **"WARNING: If you lose this key, you lose your funds forever. We cannot recover it for you. Write it down and store it somewhere safe."**
            4.  Show the main wallet view after creation. Explain that their `npub` is their public address.

#### **💹 Trading on postfun**

*   **Page 1: How to Mint a Post**
    *   **Goal:** Explain the role of the "Minter" and the process of creating a new market.
    *   **Content:**
        *   Explain that the first person to mint a post becomes the "Minter." They get a special share of fees and a massive bonus if the pool graduates.
        *   **User Flow (with screenshots):**
            1.  Find a tweet on X.com you believe in. Copy its URL.
            2.  Go to `postfun.xyz`.
            3.  Paste the URL into the "Mint a New Pool" box on the home page.
            4.  You'll be taken to the new pool page. A transaction will be prompted to pay the 1,000 sat minting fee.
            5.  Once confirmed, you are the Minter and the first token holder!
        *   **Example:** "Let's say you see a tweet from a visionary like Balaji Srinivasan predicting a new trend. You believe it's going to be hugely influential. By minting it on `postfun`, you're not just agreeing—you're making a verifiable, financial bet on its importance."

*   **Page 2: Buying & Selling Tokens**
    *   **Goal:** Explain the core trading interface.
    *   **Content:**
        *   Show a screenshot of the `TradeWidget` on a `Post Detail` page.
        *   Explain the inputs: You can either enter the amount of `sats` you want to spend or the number of `tokens` you want to buy. The other will calculate automatically.
        *   Explain "Price Impact": "Because `postfun` uses a dynamic pricing curve, larger trades will move the price. The UI will show you the potential impact before you confirm."
        *   Explain the process: Click "Buy," approve the transaction in your extension, and the tokens appear in your wallet. Selling is the same process in reverse.

*   **Page 3: The Pool Lifecycle: From Spark to Supernova**
    *   **Goal:** Explain the gamified levels and the ultimate goal of graduation.
    *   **Content:**
        *   Use a visual timeline or infographic.
        *   **Level 1 (Spark):** The beginning. Fee is 10%. Goal: 1M sats.
        *   **Level 2 (Bonfire):** Reached at 1M sats. **Big Event:** 50 million tokens are burned, increasing the price! Fee drops to 5%. Goal: 10M sats.
        *   **Level 3 (Inferno):** Reached at 10M sats. **Bigger Event:** 100 million more tokens are burned! Fee drops to 3%. Goal: 100M sats (1 BTC).
        *   **Level 4 (Graduation):** The endgame! Reached at 1 BTC.
            *   **The Supernova:** A final, massive burn of 150M tokens.
            *   **The Payout:** The 1 BTC is distributed to the platform (40%), the minter (10%), and the creator (5%).
            *   **The DEX Listing:** The remaining 45% of the BTC and all remaining tokens are used to create a permanent, publicly tradable market.

#### **✍️ For Content Creators**

*   **Page 1: How You Earn on postfun (Automatically!)**
    *   **Goal:** Directly address X.com users and explain why `postfun` is good for them.
    *   **Content:**
        *   "You focus on creating great content. We handle the rest."
        *   Explain that for every single trade (buy or sell) on a pool for their tweet, they automatically earn **15% of the fee**.
        *   Explain that if their post's pool "graduates" (reaches 1 BTC in trading), they receive a massive bonus of **5% of the entire pot** (5,000,000 sats!).
        *   **Example:** "When Elon Musk posts a popular meme about Dogecoin, thousands of people engage with it. On `postfun`, every time someone buys or sells the token for that meme, a portion of the fee goes directly to a wallet earmarked for him. His engagement is now directly monetized, moment by moment."

*   **Page 2: How to Claim Your Earnings**
    *   **Goal:** Guide a creator through the secure process of linking their account.
    *   **Content:**
        *   Explain the concept of TLS Notary: "To protect your privacy, you will create a cryptographic proof that you own your X account. You never share your password or cookies with us."
        *   **User Flow (with screenshots/GIFs):**
            1.  Navigate to your user page on `postfun.xyz/user/<your_username>`.
            2.  Click "Claim Earnings."
            3.  You will be guided to use the `postfun` extension to generate a proof of ownership. This involves a special browser session.
            4.  Once the proof is generated and submitted, your X account is securely linked to your `postfun` wallet.
            5.  You can now click "Claim" to sweep all your earned sats directly into your main wallet balance.

#### ** chrome-extension's icon The postfun Extension**

*   **Page 1: Your Command Center on X.com**
    *   **Goal:** Showcase the power and convenience of the browser extension.
    *   **Content:**
        *   **The Copilot:** Explain the context-aware nature of the "Copilot" tab. Show side-by-side screenshots of what it looks like on the Home timeline vs. a specific tweet.
        *   **One-Click Trading:** Emphasize that you can go from seeing a tweet to owning a piece of its market in seconds, without ever leaving X.com.
        *   **Seamless Login:** Explain how the extension provides secure, one-click login for the main `postfun.xyz` website.

#### **💡 Advanced Topics**

*   **Page 1: The CPMM and Price Impact**
    *   **Goal:** A brief, semi-technical explanation for curious users.
    *   **Content:**
        *   Explain that the price is not random; it's set by a mathematical formula called a Constant Product Market Maker.
        *   `virtual_reserve * token_reserve = constant`
        *   Explain that buying tokens adds sats to the real pool and removes tokens from the reserve, which pushes the price up along the curve. Selling does the opposite.
        *   Explain how token burns are so powerful: by drastically reducing the `token_reserve`, the `virtual_reserve` (and thus the price) *must* increase to keep the `constant` the same.

#### **❓ FAQ**

*   **Goal:** A quick-fire list of common questions.
*   **Content:**
    *   Is this gambling? (A: It's speculative trading...)
    *   Can I lose money? (A: Yes. The value of tokens can go down as well as up...)
    *   What are the fees? (A: List the tiered fees clearly).
    *   Why do I need the extension? (A: For security and the best user experience...).
    *   What is Nostr? Why do I need an `nsec`? (A: It's your decentralized login...).
    *   What happens if the creator never claims their earnings? (A: The funds remain in the earmarked wallet indefinitely...).
