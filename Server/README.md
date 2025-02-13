## API Documentation

### User Signup

**Endpoint:** `POST /api/users/signup`

**Description:** This endpoint allows a new user to sign up by providing their details. It validates the input data, creates a new user, and returns a JWT token along with the user details.

**Request:**

- **URL:** `http://localhost:4000/api/users/signup`
- **Method:** `POST`
- **Headers:**
  - `Content-Type: application/json`
- **Body:**
  ```json
  {
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }
  ```

**Response:**

- **Success (201 Created):**
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "id": 1,
      "firstname": "John",
      "lastname": "Doe",
      "email": "john.doe@example.com"
    }
  }
  ```
- **Error (400 Bad Request):**
  ```json
  {
    "error": {
      "field": "error_message"
    }
  }
  ```
- **Error (500 Internal Server Error):**
  ```json
  {
    "msg": "Error during signup"
  }
  ```

**Example:**

```bash
curl -X POST http://localhost:4000/api/users/signup \
-H "Content-Type: application/json" \
-d '{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "yourpassword"
}'
```

**Notes:**

- The password is hashed before being stored in the database.
- A JWT token is generated and returned upon successful signup.
- Input data is validated using Zod schema.

### User Signin

**Endpoint:** `POST /api/users/signin`

**Description:** This endpoint allows an existing user to sign in by providing their email and password. It validates the input data, checks the credentials, and returns a JWT token along with the user details.

**Request:**

- **URL:** `http://localhost:4000/api/users/signin`
- **Method:** `POST`
- **Headers:**
  - `Content-Type: application/json`
- **Body:**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }
  ```

**Response:**

- **Success (200 OK):**
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "id": 1,
      "firstname": "John",
      "lastname": "Doe",
      "email": "john.doe@example.com"
    }
  }
  ```
- **Error (400 Bad Request):**
  ```json
  {
    "msg": "User not found"
  }
  ```
- **Error (400 Bad Request):**
  ```json
  {
    "msg": "Invalid credentials"
  }
  ```
- **Error (500 Internal Server Error):**
  ```json
  {
    "msg": "Error during login"
  }
  ```

**Example:**

```bash
curl -X POST http://localhost:4000/api/users/signin \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}'
```

**Notes:**

- The password is compared with the hashed password stored in the database.
- A JWT token is generated and returned upon successful signin.
- Input data is validated using Zod schema.

### User Profile

**Endpoint:** `GET /api/user/profile`

**Description:** Fetch the profile of the authenticated user.

**Request:**

- **URL:** `http://localhost:4000/api/user/profile`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer <token>` (required)

**Response:**

- **Success (200 OK):**
  ```json
  {
    "user": {
      "id": 1,
      "firstname": "John",
      "lastname": "Doe",
      "email": "john.doe@example.com",
      "socketId": "someSocketId"
    }
  }
  ```
- **Error (401 Unauthorized):**
  ```json
  {
    "msg": "Unauthorized"
  }
  ```
- **Error (500 Internal Server Error):**
  ```json
  {
    "msg": "Error fetching user profile"
  }
  ```

### User Logout

**Endpoint:** `GET /api/user/logout`

**Description:** Logout the authenticated user by clearing the token and blacklisting it.

**Request:**

- **URL:** `http://localhost:4000/api/user/logout`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer <token>` (required)

**Response:**

- **Success (200 OK):**
  ```json
  {
    "msg": "Logged out successfully"
  }
  ```
- **Error (500 Internal Server Error):**
  ```json
  {
    "msg": "Error during logout"
  }
  ```

**Example:**

```bash
curl -X GET http://localhost:4000/api/user/logout \
-H "Authorization: Bearer <token>"
```

**Notes:**

- The token is cleared from cookies and blacklisted to prevent reuse.
