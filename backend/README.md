### Authentication
- **POST /api/auth/register** - Register new user
  - Request body: `{ "email": "user@example.com", "password": "SecureP@ss123", "name": "John Doe" }`
  - Success: 201 Created
  - Error: 400 Bad Request (e.g., validation errors)
  
- **POST /api/auth/login** - Login user (Rate-limited to 5 attempts per 15 minutes)
  - Request body: `{ "email": "user@example.com", "password": "SecureP@ss123" }`
  - Success: 200 OK with access token and refresh token
  - Error: 401 Unauthorized (invalid credentials)

- **POST /api/auth/refresh-token** - Refresh access token
  - Request body: `{ "refreshToken": "token" }`
  - Success: 200 OK with new access token
  - Error: 400 Bad Request (invalid refresh token)

- **POST /api/auth/2fa/setup** - Setup 2FA
  - Request body: `{ "email": "user@example.com" }`
  - Success: 200 OK with 2FA secret
  - Error: 400 Bad Request (e.g., invalid or expired token)

- **POST /api/auth/2fa/verify** - Verify 2FA code
  - Request body: `{ "email": "user@example.com", "code": "123456" }`
  - Success: 200 OK
  - Error: 401 Unauthorized (invalid code)

- **POST /api/auth/2fa/disable** - Disable 2FA
  - Request body: `{ "email": "user@example.com" }`
  - Success: 200 OK
  - Error: 400 Bad Request (e.g., invalid token)
