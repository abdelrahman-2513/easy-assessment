# Full Stack Test Task

## Overview

This is a full-stack web application that allows users to sign up, sign in, and access a private "welcome" page. The app is built with **React** on the frontend and **NestJS** on the backend. The frontend uses **Context API** with **Axios Interceptors**, and the backend is structured using **modular architecture**, with **custom interceptors**, **rate-limiting**, **helmet** for security, and **exception filters** for error handling.

## Architecture

- **Frontend**: React (TypeScript), Context API, Axios Interceptors, Material-UI (MUI)
- **Backend**: NestJS, MongoDB (via Mongoose), Custom Interceptors, Exception Filters, Helmet, Rate Limiting
- **Database**: MongoDB (Local or Atlas)

## Features

- **Frontend**:
  - Sign up and sign in functionality with validation and error handling.
  - Welcome page that is accessible only to authenticated users.
  - Axios interceptors to manage authentication headers and error handling.
  - Material-UI (MUI) for design.
  - Context API for managing authentication state.

- **Backend**:
  - Sign up and sign in API.
  - Protected `welcome` API endpoint, requiring authentication.
  - Modular architecture with **user module** for CRUD operations.
  - Custom exception filter and interceptors.
  - Rate limiting on endpoints to prevent abuse.
  - Helmet middleware for HTTP security headers.
  - Config service for managing environment variables.

---

## Frontend (React)

### Installation

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd <repo-directory>

2. Install dependencies:

    ```bash
    npm install

3. Start server:

    ```bash
    npm run dev

## Project Structure

- **`src/`**: Contains the React application code.

- **`components/`**: Reusable components (e.g., Button, Input).

- **`hooks/`**: Custom hooks, including `useAuth` for managing authentication state.

- **`apis/`**: API calls using Axios to interact with the backend.

- **`contexts/`**: Context API for managing authentication state.

- **`components/`**: Components for pages (e.g., SignIn, SignUp, Welcome).

---


## Axios Interceptors

- **`src/apis/axiosInstance.ts`**: Configures Axios interceptors to handle adding Authorization tokens and handling errors globally.

## Backend Setup (NestJS)

### Installation

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd <repo-directory>

2. Install dependencies:

    ```bash
    npm install

3. Run Test:

    ```bash
    npm run test:e2e

4. Start server:

    ```bash
    npm run start:dev

## Backend Structure

The backend of the application follows a modular architecture, ensuring scalability and maintainability. Below is the overview of the key directories and files:

### **`src/`** 
Contains the main backend code.

### **`auth/`**
Handles authentication logic, including:
- **Signin**: User login functionality.
- **Signup**: User registration functionality.

### **`user/`**
The user module for handling CRUD operations related to users. 
- **Create User**: Allows creation of user data.
- **Read User**: Fetch user details.
- **Update User**: Modify existing user data.
- **Delete User**: Remove user from the system.

### **`shared/`**
Contains shared utilities and modules such as:
- **Exception Filters**: Standardized error handling.
- **Interceptors**: Custom response formatters and request handlers.
- **Guards**: Authentication and authorization guards.

### **`config/`**
Holds configuration files and services that manage environment variables and application settings.

### **`main.ts`**
The entry point of the application. It initializes and starts the NestJS application.

### **`app.module.ts`**
The root module of the application that imports and connects all the other modules (such as auth, user, etc.) to the NestJS framework.

## Configuration

### .env Configuration File

Make sure you have a `.env` file in the root directory of your backend project with the following environment variables:

```bash
DATABASE_URL=mongodb://localhost:27017/your-db-name
JWT_SECRET=your-secret-key

## Backend Key Features and Security

```markdown
## Backend Features

### 1. Authentication

- **Signup**: `POST /auth/signup` allows users to register with a unique email and password.
- **Signin**: `POST /auth/signin` allows users to authenticate and receive a JWT token.

### 2. User Module (Private Routes)

- **CRUD operations for users** are protected by authentication guards:
  - **GET /user**: Fetch user data.
  - **PUT /user**: Update user information.
  - **DELETE /user**: Delete the user.
  
### 3. Exception Handling

- Custom exception filters to provide structured and meaningful error messages across the application.

### 4. Rate Limiting

- Using the `@nestjs/throttler` module to rate limit requests to protect the application from abuse.

### 5. Helmet Security Headers

- Security middleware using Helmet to secure HTTP headers and prevent attacks like XSS, clickjacking, etc.

## Security and Middleware

### Custom Interceptors

- **`src/shared/interceptors/transformer.interceptor.ts`**: Intercepts all responses to format them in a standardized manner.

### Exception Filters

- **`src/shared/filters/all-exception.filter.ts`**: Catches all exceptions globally and formats them for consistent error handling.

### Rate Limiting

- **`@nestjs/throttler`**: Configured to limit the number of requests per minute to prevent abuse.
  
  Example configuration:
    ```ts
    ThrottlerModule.forRoot({
        ttl: 60, // Time to live (in seconds)
        limit: 10, // Max requests per minute
    })

## Thank You!

Thank you for taking the time to review this project! I hope this application meets the requirements and demonstrates the ability to develop a full-stack solution. Feel free to reach out if you have any questions or suggestions.
