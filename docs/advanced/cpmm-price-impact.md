---
sidebar_position: 1
---

# The CPMM and Price Impact

## Understanding the Pricing Mechanism

The price of tokens on postfun is not random; it's set by a mathematical formula called a Constant Product Market Maker (CPMM).

## The Formula

The CPMM uses this equation:
```
virtual_reserve * token_reserve = constant
```

When you buy tokens:
- Sats are added to the real pool (`bitcoin_reserve`)
- Tokens are removed from the reserve (`token_reserve`)
- This pushes the price up along the curve

When you sell tokens:
- Sats are removed from the real pool
- Tokens are added to the reserve
- This pushes the price down along the curve

## Why Token Burns Are Powerful

Token burns drastically reduce the `token_reserve`. To keep the `constant` the same, the `virtual_reserve` (and thus the price) *must* increase. This creates powerful price movements that benefit early holders.