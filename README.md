# Task Management Backend

A REST API for managing tasks with user authentication, JWT-based authorization, role-based access control, and task ownership.

## Features

- User registration and login
- JWT authentication
- Protected API routes
- Role-based access control
- Admin and normal-user roles
- Task CRUD operations
- Task ownership protection
- Request validation
- SQLite database
- Password hashing with bcrypt
- Automated tests with Jest and Supertest

## Tech Stack

- Node.js
- Express.js
- SQLite
- better-sqlite3
- JWT
- bcryptjs
- express-validator
- Jest
- Supertest

## Project Structure

```text
src/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── taskController.js
│   └── userController.js
├── middleware/
│   ├── authMiddleware.js
│   └── validationMiddleware.js
├── models/
│   ├── Task.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   ├── taskRoutes.js
│   └── userRoutes.js
└── validators/
    ├── taskValidator.js
    └── userValidator.js

scripts/
└── createAdmin.js

server.js
```

## Installation

Clone the repository and install the dependencies:

```bash
npm install
```

Create a `.env` file in the project root and add the required environment variables.

Example:

```env
PORT=5000
JWT_SECRET=your_secret_key
```

## Running the Server

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

The server runs on:

```text
http://localhost:5000
```

## API Endpoints

### Authentication

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| POST   | `/auth/register` | Register a new user     |
| POST   | `/auth/login`    | Login and receive a JWT |

### Users

| Method | Endpoint | Description                                           |
| ------ | -------- | ----------------------------------------------------- |
| GET    | `/users` | Access user information according to role permissions |

### Tasks

| Method | Endpoint     | Description                                   |
| ------ | ------------ | --------------------------------------------- |
| POST   | `/tasks`     | Create a task                                 |
| GET    | `/tasks`     | Get tasks available to the authenticated user |
| PUT    | `/tasks/:id` | Update a task                                 |
| DELETE | `/tasks/:id` | Delete a task                                 |

All task routes require JWT authentication.

## Task Data

A task contains:

```json
{
  "title": "Learn Express",
  "description": "Practice building REST APIs",
  "status": "pending"
}
```

Allowed task statuses:

```text
pending
completed
```

## Authorization

The API uses JWT tokens to authenticate users.

Normal users can access their own tasks.

Administrators have additional access according to the role-based authorization rules implemented in the API.

Task update and delete operations also check task ownership so that a normal user cannot modify another user's task.

## Validation

The API validates incoming task data.

- Title is required.
- Description must be a string when provided.
- Status must be `pending` or `completed`.
- Task IDs must be valid positive integers.

Invalid requests return validation errors instead of being processed.

## Testing

Tests are configured using Jest and Supertest.

Run the test suite with:

```bash
npm test
```

## Admin Setup

An administrator can be created using the provided seed script:

```bash
npm run seed:admin
```

## Security

The application includes:

- Password hashing with bcrypt
- JWT-based authentication
- Protected routes
- Role-based authorization
- Task ownership checks
- Request validation
- Environment variables for sensitive configuration

## License

This project is for learning and portfolio purposes.

```

**After replacing `README.md`, save it. Don't commit yet.**

Then tell me **“README done”**.

After that, we'll do the **minimum required tests + final security check**, and then I'll give you the exact `git add`, `commit`, and `push` commands.
```
