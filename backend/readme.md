#  Backend API's Documentation
# /users/register Endpoint 

## Description
This endpoint is used for user registration. It validates the user input and creates a new user if the provided data is valid.

## Request
- **Method:** POST
- **Endpoint:** /users/register

### Request Body
- **email**: Must be a valid email string.
- **fullname.firstname**: A string with a minimum length of 3 characters.
- **fullname.lastname**: An optional string (if provided, minimum length of 3 characters).
- **password**: A string with a minimum length of 6 characters.

Example:
```json
{
  "email": "user@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "secret123"
}
```

## Response
### Success (201)
- **Status Code:** 201 Created
- **Body:**
  - `token`: A JSON Web Token for subsequent authentication.
  - `user`: The created user object.

### Validation Error (400)
- **Status Code:** 400 Bad Request
- **Body:**
  - `errors`: An array of error objects detailing the validation failures.

# /users/login Endpoint 

## Description
This endpoint is used for user authentication. It validates the provided credentials and responds with a token if valid.

## Request
- **Method:** POST
- **Endpoint:** /users/login

### Request Body
- **email**: Must be a valid email string.
- **password**: A string with a minimum length of 6 characters.

Example:
```json
{
  "email": "user@example.com",
  "password": "secret123"
}
```

## Response
### Success (200)
- **Status Code:** 200 OK
- **Body:**
  - `token`: A JSON Web Token for authentication.
  - `user`: The authenticated user object.

### Error (401)
- **Status Code:** 401 Unauthorized
- **Body:**
  - `message`: "Invalid email or password"
  - or an `errors` array if validation fails.

# /users/profile Endpoint 

## Description
Returns the authenticated user's profile.

## Request
- **Method:** GET
- **Endpoint:** /users/profile
- **Authentication:** Required. Provide the JWT either as a cookie named `token` or as an Authorization header: `Authorization: Bearer <token>`.

### Request Example (curl)
```bash
curl -H "Cookie: token=<JWT>" \
     -H "Content-Type: application/json" \
     -X GET http://localhost:3000/users/profile
```

## Response
### Success (200)
- **Status Code:** 200 OK
- **Body:** The authenticated user object (JSON).

### Unauthorized (401)
- **Status Code:** 401 Unauthorized
- **Body:** `{ "message": "Unauthorized" }` or an `errors` array if validation fails.

# /users/logout Endpoint 

## Description
Logs out the authenticated user by clearing the `token` cookie and blacklisting the token server-side.

## Request
- **Method:** GET
- **Endpoint:** /users/logout
- **Authentication:** Required. Provide the JWT either as a cookie named `token` or as an Authorization header: `Authorization: Bearer <token>`.

### Request Example (curl)
```bash
curl -H "Cookie: token=<JWT>" \
     -H "Content-Type: application/json" \
     -X GET http://localhost:3000/users/logout
```

## Response
### Success (200)
- **Status Code:** 200 OK
- **Body:** `{ "message": "Logged out" }`

### Unauthorized (401)
- **Status Code:** 401 Unauthorized
- **Body:** `{ "message": "Unauthorized" }` or an `errors` array if validation fails.
