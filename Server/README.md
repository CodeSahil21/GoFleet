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

## Captain API Documentation

### Captain Signup

**Endpoint:** `POST /api/captains/signup`

**Description:** Register a new captain with vehicle details.

**Request Body:**
```json
{
  "firstname": "string",
  "lastname": "string",
  "email": "string",
  "password": "string",
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": "number",
    "vehicleType": "CAR" | "MOTORCYCLE" | "AUTO"
  }
}
```

**Response:**
- **Success (201 Created):**
```json
{
  "token": "jwt_token_here",
  "captain": {
    "id": "string",
    "firstname": "string",
    "lastname": "string",
    "email": "string"
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

### Captain Signin

**Endpoint:** `POST /api/captains/signin`

**Description:** Authenticate a captain and receive a JWT token.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
- **Success (200 OK):**
```json
{
  "token": "jwt_token_here",
  "captain": {
    "id": "string",
    "firstname": "string",
    "lastname": "string",
    "email": "string"
  }
}
```
- **Error (400 Bad Request):**
```json
{
  "msg": "Captain not found"
}
```
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

### Get Captain Profile

**Endpoint:** `GET /api/captains/profile`

**Description:** Get the authenticated captain's profile.

**Headers:**
- `Authorization: Bearer <token>` (required)

**Response:**
- **Success (200 OK):**
```json
{
  "captain": {
    "id": "string",
    "firstname": "string",
    "lastname": "string",
    "email": "string"
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
  "msg": "Error fetching captain profile"
}
```

### Captain Logout

**Endpoint:** `POST /api/captains/logout`

**Description:** Logout the authenticated captain and clear their token.

**Headers:**
- `Authorization: Bearer <token>` (required)

**Response:**
- **Success (200 OK):**
```json
{
  "msg": "Logout successful"
}
```
- **Error (500 Internal Server Error):**
```json
{
  "msg": "Error during logout"
}
```

### Maps Auto-Complete

**Endpoint:** `GET /maps/auto-complete`

**Description:** Get location suggestions based on input text.

**Query Parameters:**
- `input` (string, required): Search text for location suggestions (minimum 3 characters)

**Headers:**
- `Authorization: Bearer <token>` (required)

**Response:**
- **Success (200 OK):**
```json
{
  "predictions": [
    {
      "description": "New York, NY, USA",
      "place_id": "ChIJOwg_06VPwokRYv534QaPC8g",
      "structured_formatting": {
        "main_text": "New York",
        "secondary_text": "NY, USA"
      }
    }
  ]
}
```

- **Error (400 Bad Request):**
```json
{
  "errors": {
    "input": ["String must contain at least 3 character(s)"]
  }
}
```

- **Error (404 Not Found):**
```json
{
  "msg": "No suggestions found"
}
```

**Example:**
```bash
curl -X GET "http://localhost:4000/maps/auto-complete?input=New%20York" \
-H "Authorization: Bearer <your_token>"
```

**Notes:**
- Input must be at least 3 characters long
- Returns a list of location predictions from Google Places API
- Each prediction includes formatted address and place ID

### Get Ride Fare

**Endpoint:** `GET/rides/get-fare`

**Description:** Calculate the estimated fare for all vehicle types between pickup and destination locations.

**Query Parameters:**
- `pickup` (string, required): Pickup location address
- `destination` (string, required): Destination location address

**Headers:**
- `Authorization: Bearer <token>` (required)

**Response:**
- **Success (200 OK):**
```json
{
  "auto": 180,
  "car": 250,
  "moto": 120
}
```

**Error Responses:**
- **Error (400 Bad Request):**
```json
{
  "error": "Pickup and destination are required"
}
```

- **Error (401 Unauthorized):**
```json
{
  "error": "Unauthorized access"
}
```

- **Error (500 Internal Server Error):**
```json
{
  "error": "Error calculating fare"
}
```

**Example:**
```bash
curl -X GET "http://localhost:4000/maps/get-fare?pickup=Mumbai&destination=Pune" \
-H "Authorization: Bearer <your_token>"
```

**Fare Calculation:**
- Base fares:
  - AUTO: ₹30
  - CAR: ₹50
  - MOTORCYCLE: ₹20

- Per kilometer rates:
  - AUTO: ₹10/km
  - CAR: ₹15/km
  - MOTORCYCLE: ₹8/km

- Per minute rates:
  - AUTO: ₹2/min
  - CAR: ₹3/min
  - MOTORCYCLE: ₹1.5/min

**Formula:**
```
Final Fare = Base Fare + (Distance in km × Rate per km) + (Duration in minutes × Rate per minute)
```

**Notes:**
- All fares are rounded to the nearest whole number
- All monetary values are in Indian Rupees (INR)
- Distance and duration are fetched from Google Maps API
- Returns fares for all vehicle types in a single response

## Create Ride

**Endpoint:** `POST /rides/create`

**Description:** This endpoint allows an authenticated user to create a new ride by providing pickup and destination details along with the vehicle type.

**Request:**

- **URL:** `http://localhost:4000/rides/create`
- **Method:** `POST`
- **Headers:**
  - `Authorization: Bearer <token>` (required)
  - `Content-Type: application/json`
- **Body:**
  ```json
  {
    "pickup": "Mumbai",
    "destination": "Pune",
    "vehicleType": "CAR"
  }
  ```

**Response:**

- **Success (201 Created):**
  ```json
  {
    "id": 1,
    "userId": 123,
    "pickup": "Mumbai",
    "destination": "Pune",
    "fare": 250,
    "otp": "123456",
    "status": "PENDING",
    "createdAt": "2023-10-01T12:00:00.000Z",
    "updatedAt": "2023-10-01T12:00:00.000Z"
  }
  ```

- **Error (400 Bad Request):**
  ```json
  {
    "errors": {
      "field": "error_message"
    }
  }
  ```

- **Error (401 Unauthorized):**
  ```json
  {
    "message": "Unauthorized: User ID not found"
  }
  ```

- **Error (404 Not Found):**
  ```json
  {
    "msg": "Ride not created"
  }
  ```

**Example:**

```bash
curl -X POST http://localhost:4000/rides/create \
-H "Authorization: Bearer <token>" \
-H "Content-Type: application/json" \
-d '{
  "pickup": "Mumbai",
  "destination": "Pune",
  "vehicleType": "CAR"
}'
```

**Notes:**

- The `vehicleType` can be one of the following: `AUTO`, `CAR`, or `MOTO`.
- The `fare` is calculated based on the distance and duration between the pickup and destination locations.
- An OTP is generated for the ride and included in the response.
- Input data is validated using Zod schema.

## Start Ride

**Endpoint:** `GET /rides/start-ride`

**Description:** This endpoint allows the captain to start a ride after verifying the OTP provided by the user.

**Request:**

- **URL:** `http://localhost:4000/rides/start-ride`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer <token>` (required)
- **Query Parameters:**
  ```json
  {
    "rideId": 1,
    "otp": "123456"
  }
  ```

**Response:**

- **Success (200 OK):**
  ```json
  {
  "id": 1,
  "userId": 123,
  "captainId": 456,
  "pickup": "Mumbai",
  "destination": "Pune",
  "fare": 250,
  "status": "ONGOING",
  "otp": "654321",
  "user": {
    "id": 123,
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "socketId": "abc123"
  },
  "captain": {
    "id": 456,
    "firstname": "Jane",
    "lastname": "Smith",
    "email": "jane.smith@example.com",
    "vehicle": {
      "id": 1,
      "plate": "MH12AB1234",
      "vehicleType": "CAR"
    }
  }
}
  ```

- **Error (400 Bad Request):**
  ```json
  {
    "errors": {
      "field": "error_message"
    }
  }
  ```

- **Error (404 Not Found):**
  ```json
  {
    "msg": "Ride not found"
  }
  ```

- **Error (401 Unauthorized):**
  ```json
  {
    "msg": "Unauthorized access"
  }
  ```

- **Error (500 Internal Server Error):**
  ```json
  {
    "msg": "Ride did not start"
  }
  ```

**Example:**

```bash
curl -X GET "http://localhost:4000/rides/start-ride?rideId=1&otp=123456" \
-H "Authorization: Bearer <token>"
```

**Notes:**

- The `rideId` must be a valid ride ID, and the ride must be in the `ACCEPTED` status.
- The `otp` provided by the user must match the OTP stored for the ride.
- Upon successful validation, the ride status is updated to `ONGOING`.
- The user is notified via socket about the ride status change.
- Input data is validated using Zod schema.

## End Ride

**Endpoint:** `POST /rides/end-ride`

**Description:** This endpoint allows the captain to end an ongoing ride.

**Request:**

- **URL:** `http://localhost:4000/rides/end-ride`
- **Method:** `POST`
- **Headers:**
  - `Authorization: Bearer <token>` (required)
  - `Content-Type: application/json`
- **Body:**
  ```json
  {
    "rideId": 1
  }
  ```

**Response:**

- **Success (200 OK):**
  ```json
  {
    "id": 1,
    "userId": 123,
    "captainId": 456,
    "pickup": "Mumbai",
    "destination": "Pune",
    "fare": 250,
    "status": "COMPLETED",
    "otp": "654321",
    "user": {
      "id": 123,
      "firstname": "John",
      "lastname": "Doe",
      "email": "john.doe@example.com",
      "socketId": "abc123"
    },
    "captain": {
      "id": 456,
      "firstname": "Jane",
      "lastname": "Smith",
      "email": "jane.smith@example.com",
      "vehicle": {
        "id": 1,
        "plate": "MH12AB1234",
        "vehicleType": "CAR"
      }
    }
  }
  ```

- **Error (400 Bad Request):**
  ```json
  {
    "errors": {
      "field": "error_message"
    }
  }
  ```

- **Error (404 Not Found):**
  ```json
  {
    "msg": "Ride not found"
  }
  ```

- **Error (403 Forbidden):**
  ```json
  {
    "msg": "Unauthorized: Captain does not match"
  }
  ```

- **Error (400 Bad Request):**
  ```json
  {
    "msg": "Ride not ongoing"
  }
  ```

- **Error (500 Internal Server Error):**
  ```json
  {
    "msg": "An unexpected error occurred"
  }
  ```

**Example:**

```bash
curl -X POST http://localhost:4000/rides/end-ride \
-H "Authorization: Bearer <token>" \
-H "Content-Type: application/json" \
-d '{
  "rideId": 1
}'
```

**Notes:**

- The `rideId` must be a valid ride ID, and the ride must be in the `ONGOING` status.
- The captain making the request must match the captain assigned to the ride.
- Upon successful validation, the ride status is updated to `COMPLETED`.
- The user is notified via socket about the ride status change.
- Input data is validated using Zod schema.

