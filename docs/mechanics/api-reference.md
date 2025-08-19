---
sidebar_position: 4
---

# API Reference (For Developers): Integrating with the `postfun` Protocol

## Introduction: Build on the Cultural Value Layer

The `postfun` API provides programmatic access to our platform's data and functionality. We've designed it to be RESTful, robust, and intuitive, allowing developers to extend `postfun`'s capabilities and build innovative tools on top of our cultural value protocol. Whether you're creating analytics dashboards, automating trading strategies, or integrating `postfun` data into other applications, this reference will guide you.

### Disclaimer
This API reference details the interfaces used by our official clients (website and browser extension). While we encourage community development, please be aware that the API is subject to change. For high-volume use cases or to request direct access to authenticated endpoints (for non-browser environments), please contact our team via [Discord](/docs/developer/community-support#join-our-discord) or `partnerships@postfun.xyz` to discuss your specific needs.

## Authentication: Nostr-Powered Session Management

`postfun` uses a hybrid authentication model: **Nostr for Identity, JWT for Session.**

### 1. `POST /auth/login`

*   **Purpose:** Authenticates a user based on a signed Nostr event and issues a JSON Web Token (JWT) for subsequent API requests.
*   **Authentication:** None (this is the login endpoint itself).
*   **Request Method:** `POST`
*   **Endpoint:** `https://api.postfun.xyz/auth/login`
*   **Request Body (`application/json`):** A Nostr event object (Kind 22242) signed by the user's `nsec`. The `content` field *must* contain a `challenge` string provided by a preceding request to the backend (not directly exposed here for simplicity, but assumed to be handled by the client's `signEvent` flow).

    ```json
    {
      "id": "e0e2...",
      "pubkey": "b47c...",
      "created_at": 1678886400,
      "kind": 22242,
      "tags": [],
      "content": "{\"challenge\": \"your_unique_challenge_string\", \"purpose\": \"postfun login\"}",
      "sig": "f1f2..."
    }
    ```
*   **Response (200 OK - `application/json`):**
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYTYyYjc5MTItYTc0Yi00ZGI2LTk0NjQtOTU2MThhNmY0OTQzIiwicHVia2V5IjoiYjQ3YzU1NDU0ZjYyMjAyM2VlM2RkOTkxZTc4Y2QzNzI0YTU0MzJlYWMwYWM1NjY1YjY2ZjcxNjk5OTFlMzQyMCIsImV4cCI6MTY3ODg5MDAwMH0.signature"
    }
    ```
*   **Error Responses:**
    *   `400 Bad Request`: Invalid event structure, missing fields.
    *   `401 Unauthorized`: Invalid signature, expired challenge, `pubkey` mismatch.

**Subsequent Requests:** Once a JWT is obtained, it must be included in the `Authorization` header for all protected endpoints: `Authorization: Bearer <your_jwt_token>`.

## 4.2. Public Data Endpoints (No Authentication Required)

These endpoints provide read-only access to public `postfun` data.

### 1. `GET /stats`
*   **Purpose:** Retrieve platform-wide aggregate statistics.
*   **Response (200 OK - `application/json`):**
    ```json
    {
      "total_assets_cumulative": 152345,
      "new_assets_24h": 345,
      "total_liquidity_sats": 123456789000,
      "liquidity_24h_sats": 5678901230,
      "total_volume_sats": 987654321000,
      "volume_24h_sats": 4321098760
    }
    ```

### 2. `GET /tweets`
*   **Purpose:** Retrieve a paginated list of Content Pools based on various filters.
*   **Query Parameters:**
    *   `by` (string, optional): Sort order. Accepted values: `new` (default), `volume`, `level`, `gainers`, `losers`.
    *   `page` (integer, optional): Page number for pagination (default: 1).
    *   `limit` (integer, optional): Number of results per page (default: 20, max: 100).
*   **Response (200 OK - `application/json`):**
    ```json
    [
      {
        "id": "a1b2c3d4e5f6g7h8",
        "tweet_id": "1678886400000000000",
        "tweet_username": "elonmusk",
        "tweet_content_snippet": "Just bought a new dog. Much wow. 🐕",
        "minter_npub": "npub1...",
        "current_price_sats_per_token": 0.00000125,
        "total_volume_sats": 50000000,
        "current_liquidity_sats": 8000000,
        "current_level": 2,
        "created_at": "2023-08-16T10:00:00Z"
      },
      {
        "id": "b2c3d4e5f6g7h8i9",
        "tweet_id": "1678886400000000001",
        "tweet_username": "balajis",
        "tweet_content_snippet": "The network state is emerging...",
        "minter_npub": "npub1...",
        "current_price_sats_per_token": 0.000005,
        "total_volume_sats": 150000000,
        "current_liquidity_sats": 15000000,
        "current_level": 3,
        "created_at": "2023-08-15T18:30:00Z"
      }
    ]
    ```

### 3. `GET /tweets/{tweetId}`
*   **Purpose:** Retrieve detailed information for a specific Content Pool.
*   **Path Parameters:**
    *   `tweetId` (string, required): The original X.com tweet ID.
*   **Response (200 OK - `application/json`):**
    ```json
    {
      "id": "a1b2c3d4e5f6g7h8",
      "tweet_id": "1678886400000000000",
      "tweet_username": "elonmusk",
      "tweet_content_full": "Just bought a new dog. Much wow. To the moon and beyond with Doge!",
      "minter_npub": "npub1l4t...",
      "creator_npub": "npub1n0x...",
      "current_price_sats_per_token": 0.00000125,
      "virtual_sats_reserve": 10500000.0,
      "token_reserve": 800000000.0,
      "bitcoin_reserve": 1500000,
      "total_volume_sats": 50000000,
      "current_level": 2,
      "next_level_target_sats": 10000000,
      "graduation_target_sats": 100000000,
      "status": "ACTIVE",
      "created_at": "2023-08-16T10:00:00Z",
      "holders_count": 125,
      "swaps_count": 560,
      "recent_swaps": [
        {
          "swap_id": "s_xyz789",
          "user_npub": "npub1a2b...",
          "direction": "BUY",
          "amount_in_sats": 100000,
          "amount_out_tokens": 8000000,
          "fee_sats": 10000,
          "timestamp": "2023-08-16T14:35:00Z"
        }
      ],
      "top_holders": [
        {"npub": "npub1c3d...", "amount_tokens": 500000000},
        {"npub": "npub1e4f...", "amount_tokens": 100000000}
      ]
    }
    ```

### 4. `GET /users/{twitterUsername}`
*   **Purpose:** Retrieve public-facing information about a linked X.com user.
*   **Path Parameters:**
    *   `twitterUsername` (string, required): The X.com username (e.g., `elonmusk`).
*   **Response (200 OK - `application/json`):**
    ```json
    {
      "twitter_username": "elonmusk",
      "is_linked_to_postfun": true,
      "minted_posts_count": 5,
      "total_earned_sats": 12345000
    }
    ```

## 4.3. Authenticated Endpoints (JWT Required)

These endpoints require an `Authorization: Bearer <JWT>` header in the request.

### 1. `GET /me`
*   **Purpose:** Retrieve the currently authenticated user's detailed private information.
*   **Response (200 OK - `application/json`):**
    ```json
    {
      "id": "a62b7912-a74b-4db6-9464-95618a6f4943",
      "npub": "npub1l4tm00000000000000000000000000000000000000000000000000000000",
      "balance_sats": 500000,
      "linked_twitter_username": "your_twitter_handle",
      "available_claim_sats": 15000,
      "holdings": [
        {"asset_id": "a1b2c3d4e5f6g7h8", "amount_tokens": 10000000, "current_value_sats": 12500},
        {"asset_id": "b2c3d4e5f6g7h8i9", "amount_tokens": 500000, "current_value_sats": 2500}
      ],
      "recent_deposits": [
        {"id": "d_123", "amount_sats": 100000, "status": "COMPLETED", "timestamp": "2023-08-15T12:00:00Z"}
      ],
      "recent_withdrawals": [
        {"id": "w_456", "amount_sats": 50000, "status": "COMPLETED", "timestamp": "2023-08-14T18:00:00Z"}
      ],
      "recent_swaps": [
        {"id": "s_789", "asset_id": "a1b2c3d4e5f6g7h8", "direction": "BUY", "amount_sats": 10000, "timestamp": "2023-08-16T14:35:00Z"}
      ]
    }
    ```

### 2. `POST /mints`
*   **Purpose:** Create a new Content Pool for a specific tweet.
*   **Request Body (`application/json`):**
    ```json
    {
      "tweet_id": "1678886400000000000"
    }
    ```
*   **Logic:**
    1.  Authenticated user must have at least 1,000 sats in their balance.
    2.  Tweet must not have an existing `postfun` pool.
    3.  A `mint` job is queued for asynchronous processing. The 1,000 sats fee is immediately deducted from the user's balance.
*   **Response (202 Accepted):** `{ "message": "Mint job queued successfully. Please check your dashboard for status." }`

### 3. `POST /swaps`
*   **Purpose:** Execute a buy or sell transaction for a Content Pool token.
*   **Request Body (`application/json`):**
    ```json
    {
      "tweet_id": "1678886400000000000",
      "direction": "BUY",
      "amount_in_sats": 10000,
      "min_amount_out": 5000000
    }
    ```
*   **Logic:**
    1.  Validate user's balance for `amount_in_sats` (for BUY) or `amount_in_tokens` (for SELL).
    2.  Ensure `amount_in_sats` is at least 1 sat (minimum input).
    3.  A `swap` job is queued for asynchronous processing.
*   **Response (202 Accepted):** `{ "message": "Swap job queued successfully. Transaction pending." }`

### 4. `POST /deposits`
*   **Purpose:** Request a Lightning Network invoice to deposit sats into the user's custodial wallet.
*   **Request Body (`application/json`):**
    ```json
    {
      "amount_sats": 50000,
      "memo": "Deposit to postfun account"
    }
    ```
*   **Logic:**
    1.  Checks if the user has too many pending deposit invoices. (Limits concurrency for security/operational efficiency).
    2.  Requests a BOLT11 invoice from the integrated Lightning service.
    3.  Stores the invoice details (payment hash, expiry) in the `deposits` table with `status='PENDING'`.
*   **Response (200 OK):** `{ "payment_request": "lnbc500n1p..." }`

### 5. `POST /withdrawals/initiate`
*   **Purpose:** Initiate a Lightning Network withdrawal by providing an invoice. Returns fee information.
*   **Request Body (`application/json`):**
    ```json
    {
      "invoice": "lnbc100u1p..."
    }
    ```
*   **Logic:**
    1.  Decodes the provided BOLT11 invoice.
    2.  Calculates the withdrawal fee: **0.5% of amount or 10 sats, whichever is higher.**
    3.  Checks if the user's current `balance_sats` is sufficient to cover the withdrawal amount + fee.
*   **Response (200 OK):**
    ```json
    {
      "decoded_amount_sats": 10000,
      "calculated_fee_sats": 50,
      "total_sats_debited": 10050,
      "memo": "Withdrawal from postfun"
    }
    ```

### 6. `POST /withdrawals/confirm`
*   **Purpose:** Confirm and queue a Lightning Network withdrawal after user reviews fees.
*   **Request Body (`application/json`):**
    ```json
    {
      "invoice": "lnbc100u1p..."
    }
    ```
*   **Logic:**
    1.  Re-validates the invoice and user's balance.
    2.  Queues a `withdrawal` job for asynchronous processing.
*   **Response (202 Accepted):** `{ "message": "Withdrawal job queued successfully. Payment will be processed shortly." }`

### 7. `POST /users/link-twitter`
*   **Purpose:** Securely link an X.com account to the authenticated `postfun` user's `npub`.
*   **Request Body (`application/json`):**
    ```json
    {
      "tls_notary_proof": { /* ... raw TLS Notary proof object ... */ }
    }
    ```
*   **Logic:**
    1.  Receives the TLS Notary proof.
    2.  Uses an internal verifier to validate the proof (e.g., checks against X.com's certificate, proves user's session).
    3.  If valid, extracts the X.com username/ID from the proof.
    4.  Links the authenticated `user_id` to the `twitter_users` record, marking it as `verified`.
*   **Response (200 OK):** `{ "message": "Twitter account successfully linked.", "linked_username": "elonmusk" }`

### 8. `POST /claims`
*   **Purpose:** For a content creator to claim their accumulated `earned_sats` (fees and bonuses) into their main `balance_sats`.
*   **Request Body (`application_json`):** `{}` (No specific body, as user is identified by JWT).
*   **Logic:**
    1.  Verifies the authenticated user has a linked and verified X.com account with a non-zero `earned_sats` balance.
    2.  Queues a `claim` job. The worker will atomically transfer the `earned_sats` to `balance_sats` and reset `earned_sats` to zero.
*   **Response (202 Accepted):** `{ "message": "Claim job queued successfully. Funds will appear shortly." }`