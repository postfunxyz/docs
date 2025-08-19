---
sidebar_position: 3
---

# Understanding Nostr Integration (NIP-07)

## The "Signer" Principle

The `postfun` extension is a NIP-07 compatible "Signer." This means it can sign Nostr events on behalf of the user, but only with their explicit permission.

## The Login Flow

### 1. Check for the Provider

```javascript
if (window.nostr) {
  // Nostr extension is available
} else {
  // Nostr extension is not installed
}
```

### 2. Generate a Challenge

Create a unique, random challenge to prevent replay attacks.

### 3. Craft the Event

Create a `Kind 22242` event object with the challenge in the `content`:

```javascript
const eventTemplate = {
  kind: 22242,
  created_at: Math.floor(Date.now() / 1000),
  tags: [],
  content: challenge // The random challenge
};
```

### 4. Request Signature

```javascript
const signedEvent = await window.nostr.signEvent(eventTemplate);
```

### 5. Send to Backend

```javascript
const response = await fetch('https://postfun.xyz/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(signedEvent)
});
```

### 6. Receive JWT

Store the JWT from the response for authenticated requests.

## Security Best Practices

- Never request the user's `nsec` directly
- Always use the NIP-07 standard for authentication
- Generate unique challenges for each login attempt
- Verify the signature on the backend before issuing JWTs