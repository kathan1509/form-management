# Role-Based Access App

This project implements a role-based access control system using Node.js, Express, and MariaDB. It provides login functionality for three types of users: Admins, Teachers, and Students. Each user role has specific permissions and access to different parts of the application.

## Features

- User authentication with JWT (JSON Web Tokens)
- Role-based access control
- User registration and login
- User profile management
- Secure password storage using bcrypt

## Technologies Used

- Node.js
- Express.js
- MariaDB
- JSON Web Tokens (JWT)
- Bcrypt for password hashing

## Project Structure

```
role-based-access-app
├── src
│   ├── app.js
│   ├── config
│   │   └── db.config.js
│   ├── controllers
│   │   ├── auth.controller.js
│   │   └── user.controller.js
│   ├── middlewares
│   │   └── auth.middleware.js
│   ├── models
│   │   └── user.model.js
│   ├── routes
│   │   ├── auth.routes.js
│   │   └── user.routes.js
│   └── utils
│       └── helpers.js
├── package.json
├── .env
├── .gitignore
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd role-based-access-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your database credentials and JWT secret:
   ```
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   JWT_SECRET=your_jwt_secret
   ```

## Usage

1. Start the application:
   ```
   npm start
   ```

2. The server will run on `http://localhost:3000`.

## API Endpoints

- **Authentication**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Login an existing user

- **User Management**
  - `GET /api/users` - Retrieve all users (Admin only)
  - `GET /api/users/:id` - Retrieve user information by ID
  - `PUT /api/users/:id` - Update user profile

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.