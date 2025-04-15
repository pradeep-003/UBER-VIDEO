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

---

For more details on the implementation, please refer to:

- [user.controller.js](Backend/controllers/user.controller.js)
- [user.routes.js](Backend/routes/user.routes.js)
