Of course. This is an excellent idea. The first set of documents onboards the user; this next set turns a user into an expert and builds deep trust through transparency.

This brief is designed to be a direct follow-up, providing the material for a new, more technical section in the Docusaurus documentation.

---

### **Brief for Technical Writer: `postfun` Deeper Information**

**Project:** `postfun.xyz` Documentation - Complementary Content
**Platform:** Docusaurus
**Goal:** To create a new section of the documentation, "Platform Mechanics," that provides a transparent, in-depth look at the economic, architectural, and security principles of `postfun`. The target audience is power users, developers, security researchers, and anyone who wants to understand *why* the system works the way it does. The tone should be precise, factual, and confident.

---

### **1. New Docusaurus Site Structure**

Please add a new top-level category to the sidebar, placed between "Advanced Topics" and "FAQ":

*   ...
*   💡 Advanced Topics
*   **⚙️ Platform Mechanics** (The new section)
*   ❓ FAQ

---

### **2. Content Outline & Material for "Platform Mechanics"**

Here is the detailed breakdown of the content for each new page.

#### **⚙️ Platform Mechanics**

*   **Page 1: The `postfun` Economic Engine**
    *   **Goal:** To provide a detailed, quantitative breakdown of the platform's tokenomics and fee structure. This is the "Tokenomics Whitepaper" section.
    *   **Content:**
        *   **Design Philosophy:** Start by explaining the core goals: create accelerating scarcity, align incentives between all participants, and ensure platform sustainability.
        *   **The Full Token Journey (Infographic Recommended):**
            1.  **Birth:** A pool is created with 1,000,000,000 tokens held in the `asset` reserve.
            2.  **Distribution:** As users buy tokens, the `token_reserve` decreases.
            3.  **Level 2 Burn (The Culling):** At 1M sats in the real `bitcoin_reserve`, a fixed **50,000,000 tokens** are burned. Explain that this is a *permanent* supply reduction.
            4.  **Level 3 Burn (The Inferno):** At 10M sats, a fixed **100,000,000 tokens** are burned. Emphasize that this has a larger relative impact on the remaining supply.
            5.  **Graduation Burn (The Supernova):** At 100M sats, a final **150,000,000 tokens** are burned.
            6.  **The DEX Listing:** After the final burn, 100% of the remaining, user-held tokens are paired with 45% of the `bitcoin_reserve`. The supply is now fixed and lives on a public DEX.
        *   **The Flow of a Sat (Fee Breakdown Diagram Recommended):**
            *   Use a concrete example: "A user makes a 10,000 sat 'Buy' swap at Level 1 (10% fee)."
            *   Total Debit: 10,000 sats.
            *   Fee (10%): 1,000 sats.
            *   Sats entering the `bitcoin_reserve` for the swap: 9,000 sats.
            *   **Fee Distribution (of the 1,000 sats):**
                *   **Platform Treasury:** 800 sats (80%).
                *   **Content Creator Wallet:** 150 sats (15%).
                *   **Minter Wallet:** 50 sats (5%).
            *   Explain that this happens on *every single swap*, creating a constant flow of micro-rewards.

*   **Page 2: Architecture & Trust Model**
    *   **Goal:** To be radically transparent about how the system is built, what is centralized, and what is decentralized.
    *   **Content:**
        *   **System Diagram:** A visual diagram showing the relationship between the User, Website, Extension, Backend (API), Worker Queue (Redis), and the Core Services (PostgreSQL DB, Lightning Node).
        *   **Component Roles:**
            *   **Clients (Website/Extension):** The "Presentation Layer." Their job is to display data and request signatures. They are trust-minimized and never handle private keys directly (only the extension's secure storage does).
            *   **Backend (FastAPI):** The "Coordination Layer." Its job is to authenticate, validate, and queue tasks. It is the central orchestrator.
            *   **Workers:** The "Execution Layer." These are the reliable workhorses that process financial transactions asynchronously. This ensures the platform is fast and can retry failed operations.
            *   **Database (PostgreSQL):** The "Source of Truth." This is the central ledger for all balances and reserves.
        *   **Trust Assumptions (Be Explicit):**
            *   **What you DON'T trust us with:** Your Nostr private key (`nsec`). This is why the extension is critical.
            *   **What you DO trust us with:**
                1.  **Fair Execution:** That our backend and workers will execute the CPMM formula correctly and without manipulation. (We mitigate this with a public swap history for auditing).
                2.  **Custody of Lightning Funds:** That the satoshis you deposit into the integrated Lightning wallet are held securely by us.
                3.  **Platform Uptime:** That our servers will be online to process transactions.

*   **Page 3: Security Deep Dive**
    *   **Goal:** To reassure technical and security-conscious users that we use best practices.
    *   **Content:**
        *   **Nostr Identity (NIP-07):** Explain the "Signer <> Requester" model. The extension is a secure "Signer" (like a hardware wallet). The website is a "Requester." The `nsec` is like a key in a vault that only the extension can access to sign things on your behalf, after your approval.
        *   **How TLS Notary Works (Simplified):** Use an analogy. "Imagine you want to prove you accessed a bank vault, without revealing what was inside. You bring a trusted Notary with you. The Notary watches you open the vault and then signs a document stating, 'I confirm Bob accessed Vault #123 on this date.' They don't see or record the contents. The TLS Notary proof is a cryptographic version of that notarized document for your browser session with X.com."
        *   **Lightning Wallet Security:** Explain that the user's deposits are held in the platform's custodial hot wallet. Explain the risks (hot wallet compromise) and our planned mitigations (e.g., periodic sweeps to cold storage, automated monitoring, rebalancing strategies).

*   **Page 4: API Reference (For Developers)**
    *   **Goal:** To empower third-party developers to build tools on top of `postfun`.
    *   **Content:**
        *   **Disclaimer:** "This is a reference for our official clients. While we encourage community development, the API is subject to change. For heavy use, please contact us."
        *   **Authentication:** Detail the `POST /auth/login` flow, explaining how a developer can request a signature from a user's NIP-07 extension to get a JWT.
        *   **Public Endpoints:** List the main public `GET` endpoints (`/stats`, `/tweets`, `/tweets/{id}`, etc.). For each, provide:
            *   The full path.
            *   Any query parameters.
            *   A sample JSON response object.
        *   **Authenticated Endpoints:** Briefly list the key `POST` endpoints (`/swaps`, `/mints`) so developers know what's possible, but perhaps add a note: "Direct trading via the API for third-party bots is a future feature."

*   **Page 5: Risk Factors**
    *   **Goal:** A dedicated page for responsible disclosure of all potential risks.
    *   **Content:**
        *   **Market Risk:** "The price of Content Pool tokens is highly volatile and determined by supply and demand. You can lose some or all of your initial capital. This is a high-risk platform."
        *   **Technical Risk:** "The platform is built on complex software. While audited and tested, bugs or exploits could potentially occur, which could lead to a loss of funds."
        *   **Custodial Risk:** "The integrated Lightning wallet is custodial. Funds deposited are held by the platform. While we employ security best practices, a compromise of our systems could put these funds at risk. For large amounts, we recommend self-custody."
        *   **Centralization Risk:** "Many core functions are managed by a centralized backend. Platform downtime will prevent trading, deposits, and withdrawals."
