---
sidebar_position: 3
---

# Security Deep Dive

## Nostr Identity (NIP-07)

The extension implements the "Signer - Requester" model:
- The extension is a secure "Signer" (like a hardware wallet)
- The website is a "Requester"
- The `nsec` is like a key in a vault that only the extension can access to sign things on your behalf, after your approval

## How TLS Notary Works

Imagine you want to prove you accessed a bank vault, without revealing what was inside. You bring a trusted Notary with you. The Notary watches you open the vault and then signs a document stating, "I confirm Bob accessed Vault #123 on this date." They don't see or record the contents.

The TLS Notary proof is a cryptographic version of that notarized document for your browser session with X.com.

## Lightning Wallet Security

User deposits are held in the platform's custodial hot wallet. While we employ security best practices including:
- Periodic sweeps to cold storage
- Automated monitoring
- Rebalancing strategies

There is always a risk with hot wallets, which is why we recommend self-custody for large amounts.