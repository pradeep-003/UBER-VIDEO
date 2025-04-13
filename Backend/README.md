# User Registration Endpoint Documentation

## `/users/register`

### Description

This endpoint allows a new user to register. It requires the user's first name, email, and password. The full name object must include at least a valid `firstname` (minimum 3 characters). The password must be at least 6 characters long. Optionally, the full name can include a `lastname`.

### Request Data

- **fullname** (object)
  - **firstname** (string, required): Minimum 3 characters.
  - **lastname** (string, optional): Minimum 3 characters if provided.
- **email** (string, required): A valid email address.
- **password** (string, required): Minimum 6 characters.

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

### Response Status Codes

- **201 Created**  
  The user is successfully registered.  
  **Response Body:**

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

  - **Validation Error:** If any required fields are missing or do not meet the criteria.  
    **Response Body:**
    ```json
    {
      "errors": [
        { "msg": "Error message here", "param": "field", "location": "body" }
      ]
    }
    ```
  - **User Already Exists:** If a user with the provided email already exists.  
    **Response Body:**
    ```json
    {
      "message": "User already exist"
    }
    ```

- **500 Internal Server Error**  
  If an unexpected error occurs during registration.

---

For more details on the implementation, refer to the [user.controller.js](Backend/controllers/user.controller.js) and [user.routes.js](Backend/routes/user.routes.js) files.

### POST Method at Port 4000

The `/users/register` endpoint is accessible via a POST request to the server running on port `4000`. Ensure the server is properly configured to listen on this port.

#### Example Request

```bash
curl -X POST http://localhost:4000/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "secret123"
}'
```

#### Expected Response

- **201 Created**: User successfully registered.
- **400 Bad Request**: Validation error or user already exists.
- **500 Internal Server Error**: Unexpected server error.
