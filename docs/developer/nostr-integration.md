---
sidebar_position: 3
---

# Understanding Nostr Integration (NIP-07): Secure Authentication for Your `postfun` Apps

## The "Signer" Principle: Your Private Key, Always in Your Control

At `postfun`, security and user self-custody are paramount. Unlike traditional web applications that rely on username/password combinations or email-based logins, `postfun` uses the **Nostr protocol** for its core identity and authentication. Specifically, we leverage **NIP-07**, a standard that allows web applications to interact with a Nostr key manager (like our `postfun` Chrome Extension) without ever directly accessing the user's private key (`nsec`).

Think of it this way:

*   **Your `postfun` Extension:** This acts as your secure **"Signer."** It's like a hardware wallet or a physical key that holds your `nsec` securely inside your browser. It has the *ability* to sign Nostr events.
*   **`postfun.xyz` Website (or your DApp):** This acts as the **"Requester."** It needs certain Nostr events to be signed (like a login event or a trade execution event).
*   **The Interaction:** The Requester asks the Signer (your extension) to sign an event. The Signer *then prompts you for permission*. If you approve, the Signer uses your `nsec` to sign the event *locally within the extension* and returns the signed event to the Requester. **Your `nsec` never leaves the extension.**

This model is critical for ensuring that you retain full control and custody of your Nostr identity and, by extension, your `postfun` account.

## The Login Flow: Step-by-Step for Frontend Developers

To integrate `postfun`'s secure authentication into your own web applications (DApps), you'll follow this standard NIP-07 flow. This process typically occurs when a user clicks a "Login" or "Connect Wallet" button on your frontend.

### 1. Check for the `window.nostr` Provider

The `postfun` Chrome Extension (and other NIP-07 compatible extensions) injects a `window.nostr` object into the browser's JavaScript environment. Your application should first check for its presence.

```javascript
// Check if a NIP-07 compatible extension is installed and active
if (typeof window.nostr !== 'undefined') {
  console.log("Nostr extension detected!");
  // Proceed with login logic
} else {
  console.error("Nostr extension not found. Please install postfun extension to log in.");
  // Prompt user to install the extension
}
```

### 2. Generate a Unique Login Challenge

To prevent replay attacks (where an attacker uses an old signed login event), your backend *must* issue a unique, unpredictable "challenge" string for each login attempt. The frontend will include this challenge in the Nostr event it asks the user to sign.

```javascript
// Example: Fetch a challenge from your backend
// Your backend would generate this challenge and store it temporarily
const response = await fetch('https://postfun.xyz/api/auth/challenge');
const { challenge } = await response.json();

console.log("Received challenge:", challenge);
```

### 3. Craft the Nostr Event Template

You'll create a standard Nostr event object (but *without* a signature yet). For login, the `Kind 22242` ("Ephemeral Event") is commonly used as it's not meant to be stored by relays long-term. The `content` field will contain the unique challenge.

```javascript
const eventTemplate = {
  kind: 22242, // Ephemeral event kind
  created_at: Math.floor(Date.now() / 1000), // Current Unix timestamp
  tags: [], // Optional tags, can be empty for login
  content: JSON.stringify({ challenge: challenge, purpose: "postfun login" }) // Include your challenge here
};

console.log("Event template to sign:", eventTemplate);
```

### 4. Request Signature from the Extension

Now, call `window.nostr.signEvent()` on the event template. This is the crucial step that triggers the extension's user prompt.

```javascript
try {
  const signedEvent = await window.nostr.signEvent(eventTemplate);
  console.log("Signed event received from extension:", signedEvent);
  // Now send this signedEvent to your backend for verification
} catch (error) {
  console.error("User denied signing or an error occurred:", error);
  // Handle user cancellation or extension error
}
```

### 5. Send the Signed Event to Your Backend

Your backend will verify this `signedEvent` to authenticate the user. Refer to the [Backend API Reference](/docs/mechanics/api-reference) for the exact endpoint.

```javascript
const loginResponse = await fetch('https://postfun.xyz/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(signedEvent)
});

if (loginResponse.ok) {
  const { token } = await loginResponse.json();
  console.log("Login successful! Received JWT:", token);
  // Store this JWT (e.g., in localStorage or an authentication context)
  // for all subsequent authenticated API requests.
} else {
  console.error("Backend login failed:", await loginResponse.text());
  // Handle backend authentication errors
}
```

### 6. Using the JWT for Authenticated Requests

Once you have the JWT, attach it to the `Authorization` header of all subsequent authenticated API calls to the `postfun` backend.

```javascript
// Example: Fetch user's private dashboard data
const jwt = localStorage.getItem('postfun_jwt'); // Assuming you stored it
const myDataResponse = await fetch('https://postfun.xyz/api/me', {
  headers: {
    'Authorization': `Bearer ${jwt}`
  }
});

if (myDataResponse.ok) {
  const userData = await myDataResponse.json();
  console.log("User data:", userData);
} else {
  console.error("Failed to fetch user data.");
}
```

## Security Best Practices for Developers

When building with NIP-07 and `postfun` authentication, always keep these critical security principles in mind:

*   **Never Request the User's `nsec` Directly:** The entire purpose of NIP-07 is to abstract this away. If your application asks for an `nsec`, it's a red flag.
*   **Always Use Unique Challenges:** Each login attempt (or any signed action) should use a unique, single-use challenge generated by your backend. This prevents replay attacks.
*   **Verify Signatures on the Backend:** Never trust a signed event received directly from the frontend. Always send the full signed event to your backend for cryptographic verification before granting access or performing any action.
*   **Handle User Cancellations:** Users can always decline a signing request from the extension. Your code must gracefully handle this scenario.
*   **JWT Security:** Store JWTs securely (e.g., in `localStorage` for convenience, but be aware of XSS risks; `HttpOnly` cookies from a backend are more secure for server-rendered apps). Ensure your JWTs have short expiry times.
*   **Rate Limiting:** Implement rate limiting on your API endpoints to prevent abuse.

By following these guidelines, you can build secure and robust applications that integrate seamlessly with the `postfun` ecosystem, empowering users with true self-custody and decentralized identity.