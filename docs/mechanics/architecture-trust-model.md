---
sidebar_position: 2
---

# Architecture & Trust Model

## System Components

The postfun platform is built with a clear separation of concerns:

1. **Clients (Website/Extension)**: The "Presentation Layer" that displays data and requests signatures. They are trust-minimized and never handle private keys directly
2. **Backend (FastAPI)**: The "Coordination Layer" that authenticates, validates, and queues tasks
3. **Workers**: The "Execution Layer" that process financial transactions asynchronously
4. **Database (PostgreSQL)**: The "Source of Truth" for all balances and reserves

## Trust Assumptions

### What you DON'T trust us with:
- Your Nostr private key (`nsec`) - This is why the extension is critical

### What you DO trust us with:
1. **Fair Execution**: That our backend and workers will execute the CPMM formula correctly and without manipulation (mitigated with a public swap history for auditing)
2. **Custody of Lightning Funds**: That the satoshis you deposit into the integrated Lightning wallet are held securely by us
3. **Platform Uptime**: That our servers will be online to process transactions