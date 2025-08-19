---
sidebar_position: 2
---

# Wallet Issues: Troubleshooting Common Problems

Your `postfun` wallet is your gateway to the platform, secured by your Nostr keypair (`nsec` for private, `npub` for public). While our system is designed to be robust, you might occasionally encounter issues with wallet setup or access.

## Common Wallet Issues and Solutions

### 1. "Extension Not Found" on postfun.xyz

**Problem:** The website doesn't detect your Chrome extension.

**Solutions:**
*   **Verify Installation:** Check Chrome's extension manager to ensure the `postfun` extension is installed and enabled.
*   **Browser Restart:** Sometimes a simple browser restart resolves detection issues.
*   **Extension Update:** Ensure you're using the latest version of the extension.
*   **Reinstallation:** If problems persist, try uninstalling and reinstalling the extension (only if you have your `nsec` securely backed up).

### 2. "My `nsec` isn't saving/importing correctly"

**Problem:** You're having trouble importing or saving your private key.

**Solutions:**
*   **Verify Key Format:** Ensure your `nsec` starts with `nsec1` and is the correct length.
*   **Check for Typos:** Carefully review your `nsec` for any typing errors.
*   **Browser Restart:** Try restarting your browser and attempting the import again.
*   **Reinstall Extension:** If issues persist, try reinstalling the extension (only if you have your `nsec` securely backed up).

### 3. "I lost my `nsec`"

**Problem:** You've lost access to your private key.

**Solutions:**
*   **Check Backups:** Look through all possible backup locations (physical copies, encrypted USB drives, password managers).
*   **Important Note:** Unfortunately, if you've lost your `nsec` and have no backups, **there is no way to recover access** to your account or funds. This is a core principle of self-custody.
*   **New Wallet:** You'll need to create a new wallet and start fresh. This is why we strongly emphasize backing up your `nsec` during initial setup.

### 4. Balance Not Updating

**Problem:** Your wallet balance doesn't reflect recent transactions.

**Solutions:**
*   **Refresh:** Try refreshing the extension or website.
*   **Network Issues:** Check your internet connection.
*   **Pending Transactions:** Some transactions (especially Lightning deposits) may take time to confirm.
*   **Extension Restart:** Try closing and reopening the extension.

### 5. Transaction Failures

**Problem:** Trades or other transactions are failing.

**Solutions:**
*   **Check Balance:** Ensure you have sufficient funds for the transaction, including any applicable fees.
*   **Network Status:** Check our status page or Discord for any platform issues.
*   **Retry:** Sometimes transient network issues cause failures; try again after a few minutes.
*   **Contact Support:** If problems persist, gather details about the transaction and contact support.

## Best Practices for Wallet Security

To minimize potential wallet issues:

1.  **Multiple Backups:** Store your `nsec` in multiple secure locations.
2.  **Never Share:** Never share your `nsec` with anyone, including `postfun` support.
3.  **Regular Updates:** Keep your browser and extension updated to the latest versions.
4.  **Secure Environment:** Use your wallet on a secure, malware-free device.

## Advanced Troubleshooting

If basic solutions don't resolve your issue:

1.  **Clear Browser Cache:** Clear your browser's cache and cookies for `postfun.xyz`.
2.  **Try Another Browser:** Test with a different browser to isolate browser-specific issues.
3.  **Check Console:** For technical users, browser console errors might provide clues (accessible via F12 developer tools).
4.  **Contact Support:** If you're still experiencing issues, contact our support team with detailed information about your problem.

Remember, your `nsec` is the ultimate control mechanism for your account. With that control comes the responsibility to keep it secure. We're here to help with technical issues, but we cannot recover lost private keys.