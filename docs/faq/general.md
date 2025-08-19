---
sidebar_position: 1
---

# Frequently Asked Questions (FAQ): Your Guide to `postfun`

Welcome to the `postfun` FAQ! Here, we address the most common questions about our platform, from fundamental concepts to specific operational details. Our goal is to provide clear, comprehensive answers that empower you to navigate the `postfun` ecosystem with confidence.

---

## 1. Is `postfun` gambling? What are the risks?

`postfun` operates as a **speculative trading platform** rather than a gambling platform. While both involve risk and potential gain, the core difference lies in the underlying mechanics and the basis of value.

*   **Gambling:** Typically relies on pure chance (e.g., dice rolls, card draws) where outcomes are independent of market forces or user actions.
*   **`postfun`:** The value of Content Pool tokens is derived from real-world social engagement, cultural relevance, and market dynamics (supply and demand, driven by our CPMM and token burn mechanics). Users are making a financial bet on the *perceived future value or virality* of a piece of content.

**Can I lose money?**
**Yes. Absolutely.** Trading on `postfun` involves **significant risk**, and you could lose some or all of your initial capital. Prices are highly volatile and can fluctuate dramatically based on market sentiment, new content, and the success (or failure) of a pool to reach its next level or graduation. Always trade responsibly and never invest more than you can afford to lose. We strongly encourage you to understand the [CPMM and Price Impact](/docs/advanced/cpmm-price-impact) and the [Platform's Economic Engine](/docs/mechanics/economic-engine) before trading.

---

## 2. What are the fees on `postfun`? How are they distributed?

`postfun` employs a transparent, tiered fee structure that decreases as a Content Pool gains traction and progresses through its levels. This incentivizes participation and volume in more mature markets.

**Swap Fees (Applied to every Buy and Sell transaction):**

*   **Level 1 (Spark):** A **10%** fee is applied to the value of the transaction. This higher initial fee helps to bootstrap the ecosystem.
*   **Level 2 (Bonfire):** Once the pool's real `bitcoin_reserve` reaches 1,000,000 sats, the fee drops to **5%**.
*   **Level 3 (Inferno):** When the `bitcoin_reserve` surpasses 10,000,000 sats, the fee is further reduced to **3%**.
*   **Post-Graduation (DEX Listing):** After a pool graduates and is listed on an external Decentralized Exchange (DEX), `postfun` takes a final, standard **1%** fee for facilitating the initial liquidity provision. Trading fees on the DEX itself will follow the DEX's standard fee structure (typically 0.3% per swap).

**How Fees are Distributed (from the collected fee amount):**

The collected fee from each swap is intelligently distributed to align incentives across the ecosystem:

*   **Platform Treasury:** **80%** of the fee. This portion sustains `postfun`'s operations, funds future development, covers infrastructure costs (including Lightning network routing fees), and contributes to platform-wide initiatives.
*   **Content Creator:** **15%** of the fee. The original author of the tweet automatically earns a direct percentage of every trade on a pool for their content. This is a passive income stream for their social influence.
*   **Minter:** **5%** of the fee. The user who first minted the Content Pool and initiated its market earns a smaller cut of every subsequent trade. This rewards their early foresight and risk-taking.

**Example:**
If a user buys 10,000 `sats` worth of tokens in a Level 1 pool (10% fee):
*   **Total Debit from User:** 10,000 `sats`
*   **Collected Fee (10%):** 1,000 `sats`
*   **Sats for Swap (entering the pool):** 9,000 `sats`
*   **Fee Distribution:**
    *   Platform: 800 `sats` (80% of 1,000)
    *   Content Creator: 150 `sats` (15% of 1,000)
    *   Minter: 50 `sats` (5% of 1,000)

*(Suggested Visual: A detailed infographic showing the fee distribution breakdown from a sample transaction, clearly labeling each recipient.)*

---

## 3. Why do I need the `postfun` Chrome Extension?

The `postfun` Chrome Extension is much more than just an add-on; it's an integral part of the `postfun` experience and is highly recommended for all users. It provides critical functionality and enhances your security and convenience:

*   **Secure Nostr Private Key Storage:** Your Nostr private key (`nsec`), which is your `postfun` identity, is securely stored *within the extension* on your local device. This means your key never leaves your browser and is never transmitted to `postfun` servers.
*   **One-Click Trading on X.com:** The extension injects `postfun` market data directly onto your X.com timeline and tweet pages. This allows you to view prices and execute trades instantly without ever leaving X.com or switching tabs. This is the core of our "Copilot" feature.
*   **Seamless Authentication:** The extension acts as your `NIP-07` compliant Nostr signer. When `postfun.xyz` requires you to log in or approve a transaction, the extension handles the cryptographic signing securely in the background, only asking for your explicit approval via a popup. This makes logging in fast, secure, and intuitive.
*   **Protection of Funds and Identity:** By managing your `nsec` securely and mediating all cryptographic operations, the extension is a crucial layer in protecting your digital assets and identity.

---

## 4. What is Nostr? Why do I need an `nsec` and `npub`?

**Nostr (Notes and Other Stuff Transmitted by Relays)** is a simple, open, and decentralized protocol designed for creating censorship-resistant global social networks. Unlike traditional social media platforms, Nostr doesn't rely on central servers that can be shut down or censor content.

**Your `nsec` (Nostr Secret Key) and `npub` (Nostr Public Key) are fundamental to your `postfun` identity:**

*   **`nsec` (Private Key):** This is a long string of characters (starting with `nsec1...`). It acts as your **identity, password, and signature key** all in one. It should be kept absolutely secret and secure. Only the `postfun` extension stores this for you locally. If you lose your `nsec`, you lose access to your `postfun` account and funds.
*   **`npub` (Public Key):** This is derived from your `nsec` (starts with `npub1...`). It's what you share with others. It acts as your **public identifier** on `postfun` and other Nostr-powered applications. When you make a trade or link your X.com account, your `npub` is publicly recorded as the actor.

**Why `postfun` uses Nostr:**
*   **Self-Sovereign Identity:** You own your identity, not `postfun`.
*   **Enhanced Security:** All transactions and logins are cryptographically signed by your `nsec` (via the extension), providing strong security.
*   **Future-Proofing:** `postfun` is built on open, decentralized standards, allowing for greater interoperability and resilience.

---

## 5. What happens if the creator never claims their earnings?

This is a common and important question, especially for creators who might not be immediately aware of `postfun`.

*   **Funds are Earmarked:** When a Content Pool generates fees for a creator, these `sats` are automatically moved to a designated `earned_sats` balance associated with that specific X.com username within `postfun`'s backend ledger.
*   **Indefinite Holding:** These funds remain in this earmarked balance indefinitely. They do not expire or get reabsorbed by the platform.
*   **Claim Anytime:** The creator (or anyone who can securely prove ownership of that X.com account via the TLS Notary process) can claim these funds at any time, even years later. Once claimed, they are transferred to the creator's main `postfun` Lightning wallet balance.

This ensures that the value generated by a creator's content is always available to them, regardless of when they discover `postfun` or choose to interact with the platform. It's a testament to our commitment to direct, automatic creator monetization.

---

## 6. What about fees for Lightning withdrawals?

While `postfun` strives to provide low-cost transactions, the Lightning Network itself incurs routing fees for payments.

*   **Our Policy:** For Lightning withdrawals, `postfun` charges a small processing fee of **0.5% of the withdrawal amount, or a minimum of 10 sats, whichever is higher.**
*   **Why a Fee?** This fee helps cover the operational costs of maintaining Lightning channels, managing liquidity, and covering the routing fees charged by other nodes on the Lightning Network to complete your payment.
*   **Transparency:** Before you confirm any withdrawal, the `postfun` interface will clearly display the exact amount you will receive after the fee is deducted. This ensures full transparency.

---