---
sidebar_position: 1
---

# The `postfun` Economic Engine

## Design Philosophy

The postfun economic model is built on three core principles:
1. Create accelerating scarcity
2. Align incentives between all participants
3. Ensure platform sustainability

## The Full Token Journey

1. **Birth**: A pool is created with 1,000,000,000 tokens held in the `asset` reserve
2. **Distribution**: As users buy tokens, the `token_reserve` decreases
3. **Level 2 Burn (The Culling)**: At 1M sats in the real `bitcoin_reserve`, a fixed **50,000,000 tokens** are burned
4. **Level 3 Burn (The Inferno)**: At 10M sats, a fixed **100,000,000 tokens** are burned
5. **Graduation Burn (The Supernova)**: At 100M sats, a final **150,000,000 tokens** are burned
6. **The DEX Listing**: After the final burn, 100% of the remaining, user-held tokens are paired with 45% of the `bitcoin_reserve`

## The Flow of a Sat (Fee Breakdown)

When a user makes a 10,000 sat 'Buy' swap at Level 1 (10% fee):

- Total Debit: 10,000 sats
- Fee (10%): 1,000 sats
- Sats entering the `bitcoin_reserve` for the swap: 9,000 sats
- **Fee Distribution (of the 1,000 sats)**:
  - Platform Treasury: 800 sats (80%)
  - Content Creator Wallet: 150 sats (15%)
  - Minter Wallet: 50 sats (5%)

This happens on *every single swap*, creating a constant flow of micro-rewards.