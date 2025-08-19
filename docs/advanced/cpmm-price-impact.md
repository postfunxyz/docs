---
sidebar_position: 1
---

# The CPMM and Price Impact: Unpacking postfun's Dynamic Pricing

## Understanding the Pricing Mechanism: How postfun Determines Value

At the heart of every `postfun` Content Pool lies a sophisticated yet elegantly simple mathematical model: the **Constant Product Market Maker (CPMM)**. This isn't just a fancy term; it's the engine that dynamically sets the price of your tokens based purely on supply and demand within that specific pool. Unlike traditional order books where buyers and sellers list their exact prices, the CPMM uses an algorithmic approach to ensure there's always a market for your tokens, regardless of whether you're buying or selling.

This deterministic pricing model is crucial for `postfun` because it allows us to create instant, liquid markets for any tweet, bypassing the need for initial price discovery or manual liquidity provision.

## The Foundational Formula: `x * y = k`

The CPMM operates based on a single, unchanging equation:

`virtual_reserve * token_reserve = constant (k)`

Let's break down each component:

*   **`virtual_reserve (x)`**: This is a conceptual representation of the amount of Bitcoin (sats) within the bonding curve. It's a **pricing parameter**, not a physical stash of sats. Its value shifts dynamically to maintain the constant `k` as tokens are bought, sold, or burned. Crucially, this `virtual_reserve` starts at a predefined value (e.g., 10,000,000 sats at Level 1) and *increases* over time as tokens are burned.

*   **`token_reserve (y)`**: This represents the actual, real quantity of tokens within the bonding curve's reserve. When you buy tokens, they are removed from this reserve. When you sell tokens, they are returned to this reserve. This `token_reserve` decreases as tokens are distributed to holders and further decreases dramatically during our automated token burn events.

*   **`constant (k)`**: This is the unchanging factor. It is calculated once at the very moment a Content Pool is minted (e.g., `10,000,000 virtual_sats * 1,000,000,000 tokens = 19 * 10^15`). This `k` value remains fixed throughout the entire lifecycle of the pool, ensuring the fundamental mathematical relationship between the virtual sats and token reserves is always preserved.

**How Price is Derived:** The current price of a single token is effectively `virtual_reserve / token_reserve`. As the `token_reserve` decreases (due to buys or burns), the price per token naturally increases.

## Understanding Price Impact: Your Trades Shape the Market

Every time a buy or sell transaction occurs within a `postfun` Content Pool, it directly affects the `virtual_reserve` and `token_reserve` values, which in turn moves the price along the curve. This is known as **Price Impact**.

*   **When you BUY tokens:**
    *   The `sats` you spend (after fees) are added to the **real** `bitcoin_reserve` (more on this below).
    *   The corresponding number of `tokens` are removed from the `token_reserve` and transferred to your wallet.
    *   Because `token_reserve (y)` decreases, to maintain the `constant (k)`, the `virtual_reserve (x)` must increase. This results in the price of the token increasing. Larger buys cause a larger increase.

*   **When you SELL tokens:**
    *   The `tokens` you sell are returned to the `token_reserve`.
    *   The corresponding `sats` are removed from the **real** `bitcoin_reserve` and sent to your wallet.
    *   Because `token_reserve (y)` increases, to maintain the `constant (k)`, the `virtual_reserve (x)` must decrease. This results in the price of the token decreasing. Larger sells cause a larger decrease.

The `postfun` user interface (on both the website and the extension) will always clearly display the estimated price impact of your trade *before* you confirm it. This transparency ensures you understand how your transaction will affect the market.

## Why Token Burns Are Powerful: Accelerating Scarcity for Price Appreciation

This is where `postfun` truly innovates beyond a standard CPMM. Our automated token burn events are a built-in mechanism designed to create **accelerating scarcity** and consequently **permanent, upward pressure on the token's price**.

Here's the genius:

1.  **Fixed Constant `k`:** Remember, `virtual_reserve * token_reserve = k`, and `k` *never changes*.
2.  **Token Burns Reduce `y`:** During a burn event (e.g., 50 million tokens at Level 2), a significant chunk of the `token_reserve (y)` is permanently destroyed.
3.  **`x` Must Increase:** Since `k` is fixed, if `y` decreases, then `x` (the `virtual_reserve`) *must* increase proportionally to maintain `k`.
4.  **Price Rises:** Because `x` represents the virtual value that determines price, an increase in `x` directly translates to an increase in the price of the remaining tokens.

**The Impact:** Every token burn directly and irrevocably shifts the entire bonding curve upwards. This means that after a burn, the lowest possible price a token can be traded at is significantly higher than it was before the burn. This mechanism fundamentally rewards long-term holders and incentivizes the community to push pools to higher levels, creating a self-reinforcing cycle of price appreciation and engagement.

**Illustrative Example (Conceptual):**

*   **Before Burn:** `10,000,000 (virtual sats) * 1,000,000,000 (tokens) = 19 * 10^15 (k)`
*   **After 50M Token Burn:** `token_reserve` becomes `950,000,000`.
    *   `x_new = k / y_new = (19 * 10^15) / 950,000,000 = 20,000,000`
    *   The `virtual_reserve (x)` has increased from 10M to 20M, effectively doubling the underlying pricing base, even though no new sats have entered the real reserve due to a buy.

This mechanism ensures that participating in `postfun` is not just about short-term speculation but about actively contributing to the long-term, fundamental value growth of the digital assets you hold.