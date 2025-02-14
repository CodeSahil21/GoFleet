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

## Captain Routes

### Create Captain

#### Endpoint
`POST /api/captains`

#### Description
Creates a new captain with the provided details.

#### Request Body
```json
{
    "firstname": "string",
    "lastname": "string (optional)",
    "email": "string",
    "password": "string",
    "color": "string",
    "plate": "string",
    "capacity": "number",
    "vehicleType": "CAR" | "MOTORCYCLE" | "AUTO"
}
```

#### Response
```json
{
    "id": "string",
    "firstname": "string",
    "lastname": "string",
    "email": "string",
    "vehicleId": "string"
}
```

#### Errors
- `400 Bad Request`: All fields are required.
- `409 Conflict`: Captain already exists.

### Get Captain

#### Endpoint
`GET /api/captains/:id`

#### Description
Fetches the details of a captain by ID.

#### Response
```json
{
    "id": "string",
    "firstname": "string",
    "lastname": "string",
    "email": "string",
    "vehicle": {
        "id": "string",
        "color": "string",
        "plate": "string",
        "capacity": "number",
        "vehicleType": "CAR" | "MOTORCYCLE" | "AUTO"
    }
}
```

#### Errors
- `404 Not Found`: Captain not found.

### Update Captain

#### Endpoint
`PUT /api/captains/:id`

#### Description
Updates the details of a captain by ID.

#### Request Body
```json
{
    "firstname": "string (optional)",
    "lastname": "string (optional)",
    "email": "string (optional)",
    "password": "string (optional)",
    "color": "string (optional)",
    "plate": "string (optional)",
    "capacity": "number (optional)",
    "vehicleType": "CAR" | "MOTORCYCLE" | "AUTO" (optional)
}
```

#### Response
```json
{
    "id": "string",
    "firstname": "string",
    "lastname": "string",
    "email": "string",
    "vehicleId": "string"
}
```

#### Errors
- `400 Bad Request`: Invalid input.
- `404 Not Found`: Captain not found.

### Delete Captain

#### Endpoint
`DELETE /api/captains/:id`

#### Description
Deletes a captain by ID.

#### Response
```json
{
    "message": "Captain deleted successfully"
}
```

#### Errors
- `404 Not Found`: Captain not found.

