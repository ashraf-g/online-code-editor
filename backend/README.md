# code-editor

## Description

This is an online code compiler.

## Project Structure

- `config/`: Contains database configuration files.
- `routes/`: Contains route handling files.
- `server.js`: Main entry point of the server.

## Configuration

1. Set up a `.env` file for environment variables.
2. Configure database connection in `config/db.js`.

## Available Routes

- `/`: Main route handling using `Routes.js`.

## Project Structure

-`config`: Contains Database Connection file

- `model/`: Contains model file
- `middleware/`: Contains middleware files.
- `controller/`: Contains controller files for handling business logic.
- `routes/`: Contains route handling files.

## Model

- `UserModel.js`: Model file defining user data schema and database interactions.
- `JobModel.js`: The Job model schema defines the structure of job documents in the database. It store every code which is compiled.
- `CodeModel.js`: Model file defining user code save in database after login and it is visible in frontend.

## Middleware

- `fetchuser`: Middleware to fetch user details for authenticated routes.

## Controller

- `userController.js`: Controller functions for user-related operations.
- `mailController.js`: Controller functions for sending mail.
- `editorController.js`: Controller functions for code execution and management.

## Routes

### User Routes

- `POST /register`: Register a new user.
- `POST /login`: User login.
- `POST /getuser/:id`: Get user details by ID.
- `PUT /resetpassword/:id`: Reset user password.
- `POST /otp`: Generate OTP for user.
- `POST /verify`: Verify OTP.

### Code Execution Routes

- `POST /run`: Execute code.

### Code Management Routes

- `GET /viewcode`: View user's saved code (requires authentication).
- `POST /addcode`: Add new code (requires authentication).
- `PUT /updatecode/:id`: Update existing code (requires authentication).
- `DELETE /deletecode/:id`: Delete code by ID (requires authentication).

## Credits

- Created by Huma Mokashi and Gulam Ashraf
