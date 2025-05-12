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

- [user.controller.js](Backend/controllers/user.controller.js)
- [user.routes.js](Backend/routes/user.routes.js)

# Captain Routes Documentation

## `/captain/register` Endpoint

### Description

Registers a new captain by creating a captain account with the provided information. In addition to the basic credentials, the captain must provide vehicle details.

### HTTP Method

`POST`

### Request Body

The request body must be in JSON format and include the following fields:

- **fullname** (object):
  - **firstname** (string, required): Captain's first name (minimum 3 characters).
  - **lastname** (string, optional): Captain's last name (minimum 3 characters if provided).
- **email** (string, required): Captain's email address (must be a valid email).
- **password** (string, required): Captain's password (minimum 6 characters).
- **vehicle** (object, required): Vehicle details including:
  - **color** (string, required): Vehicle color (minimum 3 characters).
  - **plate** (string, required): Vehicle plate number (minimum 3 characters).
  - **capacity** (number, required): Seating capacity.
  - **vehicleType** (string, required): Must be one of the following values: `car`, `motorcycle`, or `auto`.

#### Example Request Body

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "secret123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Example Response

- **201 Created**

  On successful registration, the endpoint will return the newly created captain's details along with an authorization token. (Example response format)

  ```json
  {
    "token": "JWT_TOKEN_HERE",
    "captain": {
      "_id": "CAPTAIN_ID",
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

- **400 Bad Request**

  The endpoint returns a 400 status code if:

  - Required fields are missing
  - One or more fields do not meet the validation criteria

  Example error response:

  ```json
  {
    "errors": [
      { "msg": "Invalid Email", "param": "email", "location": "body" },
      {
        "msg": "First name must be at least 3 characters long",
        "param": "fullname.firstname",
        "location": "body"
      }
    ]
  }
  ```

---

For further details on the implementation, please refer to:

- [captain.routes.js](Backend/routes/captain.routes.js)
- [captain.controller.js](Backend/controllers/captain.controller.js)
- [captain.service.js](Backend/services/captain.service.js)
