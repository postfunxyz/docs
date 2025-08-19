---
sidebar_position: 4
---

# API Reference (For Developers)

## Disclaimer

This is a reference for our official clients. While we encourage community development, the API is subject to change. For heavy use, please contact us.

## Authentication

To authenticate with the API, you need to use the `POST /auth/login` flow:
1. Request a signature from a user's NIP-07 extension to get a JWT
2. Use the JWT in subsequent requests

## Public Endpoints

### GET /stats
Retrieve platform statistics

**Response:**
```json
{
  "totalVolume": 1234567890,
  "totalPools": 12345,
  "totalUsers": 9876
}
```

### GET /tweets
Retrieve a list of content pools

**Query Parameters:**
- `by`: Sort order (new, top, rising)
- `limit`: Number of results (default: 20, max: 100)

**Response:**
```json
[
  {
    "id": "tweet123",
    "url": "https://x.com/user/status/123",
    "title": "Example tweet content",
    "creator": "npub1...",
    "minter": "npub1...",
    "volume": 123456,
    "liquidity": 7890,
    "createdAt": "2023-01-01T00:00:00Z"
  }
]
```

### GET /tweets/:id
Retrieve details for a specific content pool

## Authenticated Endpoints

Key endpoints include:
- `POST /swaps` - Execute trades
- `POST /mints` - Create new pools

Direct trading via the API for third-party bots is a future feature.