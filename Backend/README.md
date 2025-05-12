# Backend API Documentation

## `/users/register` Endpoint

### Description

Registers a new user by creating a user account with the provided information.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- **fullname** (object):
  - **firstname** (string, required): User's first name (minimum 3 characters).
  - **lastname** (string, optional): User's last name (minimum 3 characters).
- **email** (string, required): User's email address (must be a valid email).
- **password** (string, required): User's password (minimum 6 characters).

#### Example Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

### Example Response

- **201 Created**

  ```json
  {
    "token": "JWT_TOKEN_HERE",
    "user": {
      "_id": "USER_ID",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

- **400 Bad Request**
  - Validation errors or if a user with the provided email already exists.
  ```json
  {
    "errors": [
      { "msg": "Error message here", "param": "field", "location": "body" }
    ]
  }
  ```

## `/users/login` Endpoint

### Description

Authenticates an existing user by validating the provided email and password, and returns a JWT token if successful.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- **email** (string, required): User's email address (must be a valid email).
- **password** (string, required): User's password (minimum 6 characters).

#### Example Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

### Example Response

- **200 OK**

  ```json
  {
    "token": "JWT_TOKEN_HERE",
    "user": {
      "_id": "USER_ID",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

  Additionally, the JWT token is set as an HTTP-only cookie (`token`).

- **400 Bad Request**

  - Validation errors if the input does not meet the required criteria.

  ```json
  {
    "errors": [
      { "msg": "Error message here", "param": "field", "location": "body" }
    ]
  }
  ```

- **401 Unauthorized**

  - If the email or password is incorrect.

  ```json
  {
    "message": "Invalid email or password"
  }
  ```

  # 🚪 Logout Endpoint

## Endpoint

`GET /users/logout`

## Description

Logs out the currently authenticated user by blacklisting the provided token. The token can be passed either in the request headers or via cookies. This action invalidates the token, preventing further use for authentication.

## Authentication

✅ **Required**

The token should be provided in:

- `Authorization` header as a Bearer token, or
- `token` cookie

## Request

### Method

`GET`

### Headers (if using header authentication)

---

For more details on the implementation, please refer to:

- [user.controller.js](UBER-VIDEO/Backend/controllers/user.controller.js)
- [user.routes.js](UBER-VIDEO/Backend/routes/user.routes.js)

# Captain Routes Documentation

## `/captain/register` Endpoint

### Description

Registers a new captain account along with associated vehicle details. All fields are required and must meet the specified constraints.

### HTTP Method

`POST`

### Request Body

```json
{
  "fullname": {
    "firstname": "Jane", // Required, minimum 3 characters
    "lastname": "Doe" // Optional, minimum 3 characters if provided
  },
  "email": "jane.doe@example.com", // Required, valid email format
  "password": "secret123", // Required, minimum 6 characters
  "vehicle": {
    "color": "Red", // Required, minimum 3 characters
    "plate": "ABC123", // Required, minimum 3 characters
    "capacity": 4, // Required, numerical value representing seating capacity
    "vehicleType": "car" // Required, must be one of: "car", "motorcycle", "auto"
  }
}
```

### Example Response

**201 Created**

```json
{
  "token": "JWT_TOKEN_HERE", // JWT authentication token
  "captain": {
    "_id": "CAPTAIN_ID", // Unique identifier of the captain
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

---

## `/captain/login` Endpoint

### Description

Authenticates an existing captain using email and password.

### HTTP Method

`POST`

### Request Body

```json
{
  "email": "jane.doe@example.com", // Required, valid email format
  "password": "secret123" // Required, minimum 6 characters
}
```

### Example Response

**200 OK**

```json
{
  "token": "JWT_TOKEN_HERE", // JWT authentication token (also set as an HTTP-only cookie)
  "captain": {
    "_id": "CAPTAIN_ID", // Unique identifier of the captain
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

**Error Responses**

- **400 Bad Request** – For validation errors:
  ```json
  {
    "errors": [{ "msg": "Invalid Email", "param": "email", "location": "body" }]
  }
  ```
- **401 Unauthorized** – For invalid credentials:
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

---

## `/captain/profile` Endpoint

### Description

Returns the profile information of the currently authenticated captain.

### HTTP Method

`GET`

### Headers

Requires an authentication token provided either in the `Authorization` header as a Bearer token or as a `token` cookie.

### Example Response

**200 OK**

```json
{
  "captain": {
    "_id": "CAPTAIN_ID", // Unique identifier
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

---

## `/captain/logout` Endpoint

### Description

Logs out the currently authenticated captain by blacklisting the token, effectively invalidating it.

### HTTP Method

`GET`

### Headers

Requires an authentication token provided either in the `Authorization` header as a Bearer token or as a `token` cookie.

### Example Response

**200 OK**

```json
{
  "message": "Logout successfully"
}
```

---

For further details on implementation, please refer to:

- [captain.routes.js](Backend/routes/captain.routes.js)
- [captain.controller.js](Backend/controllers/captain.controller.js)
- [captain.service.js](Backend/services/captain.service.js)
