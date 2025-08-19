---
sidebar_position: 2
---

# Setting Up Your Wallet (The Key to postfun)

## Your Nostr Key is Your Identity: True Digital Ownership

At `postfun`, your identity is intrinsically linked to your Nostr keypair (`nsec` for private, `npub` for public). This pair is your cryptographic passport – your `nsec` acts as your personal signature, proving you own your `npub` and, by extension, your `postfun` account and all associated funds. This design principle ensures **complete self-custody** and freedom from centralized identity providers. You control your keys, you control your access.

### Why Nostr?
*   **Censorship Resistance:** Nostr is built to be resilient against censorship, providing a robust backbone for decentralized social interactions.
*   **Self-Sovereign Identity:** Your `npub` is your global, unique identifier that doesn't rely on a specific service.
*   **Enhanced Privacy:** Nostr's design encourages encryption and pseudonymous interactions.

## Installing the `postfun` Chrome Extension: Your Secure Gateway

The `postfun` Chrome Extension is not just a tool for trading; it's your primary and most secure interface for managing your Nostr identity and interacting with the `postfun` platform. It acts as a **NIP-07 compatible wallet signer**, meaning your precious `nsec` remains securely stored *within your extension*, never exposed to websites or `postfun` servers.

Here's how to get started with your secure `postfun` wallet:

1.  **Locate and Install the `postfun` Extension:**
    *   Open your Chrome browser.
    *   Navigate to the [Chrome Web Store](https://chrome.google.com/webstore/category/extensions).
    *   Search for "`postfun`" or use our direct download link found on `postfun.xyz/download`.
    *   Click "Add to Chrome" and confirm the installation.
    *   *(Suggested Visual: Screenshot of Chrome Web Store page for postfun extension, highlighting "Add to Chrome" button)*

2.  **Launch the Extension and Begin Setup:**
    *   After installation, click on the `postfun` extension icon in your browser's toolbar (you might need to pin it for easy access).
    *   The extension's side panel will open, presenting you with a welcome screen.
    *   You'll be given two crucial options:
        *   **"Create New Wallet"**: This is recommended for most new users. The extension will generate a brand-new, unique Nostr keypair just for you.
        *   **"Import Wallet"**: If you already have an `nsec` (perhaps from another Nostr client), you can import it here.

3.  **Critical Step: Back Up Your Private Key (`nsec`)!**
    *   **This is the single most important step in securing your `postfun` account.** If you choose "Create New Wallet," the extension will display your newly generated `nsec` (a long string starting with `npub1` for your public key, and `nsec1` for your private key).
    *   **IMMEDIATELY and SECURELY save this `nsec`.**
    *   **Recommended Backup Methods:**
        *   **Offline:** Write it down on paper and store it in multiple secure, physical locations (e.g., a safe, a safety deposit box).
        *   **Encrypted USB:** Store it on an encrypted USB drive, disconnected from the internet.
        *   **Password Manager:** Use a reputable password manager that encrypts your sensitive data.
    *   **Methods to AVOID:**
        *   Saving it in a plain text file on your computer.
        *   Emailing it to yourself.
        *   Storing it in unencrypted cloud storage.
    *   **WARNING: If you lose your `nsec`, you lose access to your `postfun` identity, your tokens, and your sats balance forever. We cannot recover it for you as `postfun` is non-custodial.** The system is designed so that *only you* control your key.
    *   *(Suggested Visual: A prominent, red-colored warning box with text like "LOST YOUR KEY, LOST YOUR FUNDS!" with an example `nsec` partially obscured, highlighting the copy button and advising multiple physical backups.)*

4.  **Confirm and Access Your Wallet:**
    *   After you confirm you have securely backed up your `nsec`, the extension will take you to your main wallet view.
    *   Here, you'll see your `npub` (your public address, which others see when you interact on `postfun`). Your `nsec` remains hidden and protected within the extension.

## Troubleshooting Wallet Setup: Common Issues

*   **"Extension Not Found" on postfun.xyz:**
    *   **Cause:** The extension might not be installed, or it might be disabled.
    *   **Solution:** Verify installation in Chrome's extension manager. Ensure it's enabled. Sometimes, a browser restart helps.
*   **"My `nsec` isn't saving/importing correctly":**
    *   **Cause:** Typo in `nsec`, or extension storage issue.
    *   **Solution:** Double-check the `nsec` string for any errors. Try restarting your browser. If issues persist, reinstall the extension (but only if you have your `nsec` backed up!).
*   **"I lost my `nsec`":**
    *   **Cause:** Key not backed up or backup was lost/destroyed.
    *   **Solution:** Unfortunately, there is no solution from our side. `postfun` cannot recover your `nsec` or your funds. This is a core feature of self-custody. You would need to create a new wallet and start fresh. This is why backup is so critical.

By following these steps, you're set up to securely embark on your `postfun` journey, with full control over your digital identity and assets.