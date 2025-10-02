

# ManageMate - MERN User Management Dashboard

ManageMate is a full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js). It provides a secure system where an admin can register, log in, and manage a private list of users through a full-featured dashboard.


## Live Demo

**[🚀 View the live application here!](https://manage-mate-app.onrender.com)**

## Key Features

-   **Secure Admin Authentication**: Signup and login for administrators using JWT (JSON Web Tokens) and bcrypt for password encryption.
-   **Full CRUD Functionality**: Admins can Create, Read, Update, and Delete user records from the dashboard.
-   **Dynamic Dashboard**: A responsive and interactive dashboard built with React and styled with Tailwind CSS.
-   **Real-time Search**: Instantly filter the user list by name or email.
-   **Client-side Pagination**: Easily navigate through large lists of users.
-   **Custom Modals**: A smooth user experience for adding, editing, and confirming the deletion of users.
-   **Protected API**: Backend routes are protected with custom middleware to ensure only authenticated Admins can access and manage data.

## Tech Stack

-   **Frontend**: React (with Vite), React Router, Tailwind CSS, Axios
-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB (using Mongoose)
-   **Authentication**: JSON Web Tokens (JWT)

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

-   Node.js (v18 or later is recommended)
-   npm (Node Package Manager)
-   A MongoDB Connection String
  
### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Backend Setup:**
    ```bash
    # Navigate to the backend directory
    cd backend

    # Install dependencies
    npm install

    # Create a .env file (see the "Environment Variables" section below)
    touch .env 

    # Start the backend server (runs on http://localhost:7777 by default)
    npm start
    ```

3.  **Frontend Setup:**
    ```bash
    # Navigate to the frontend directory (from the root project folder)
    cd frontend

    # Install dependencies
    npm install

    # Create a .env file (see the "Environment Variables" section below)
    touch .env

    # Start the frontend development server (runs on http://localhost:5173 by default)
    npm run dev
    ```

### Environment Variables

You must create `.env` files in both the `backend` and `frontend` directories for the application to work.

#### Backend (`backend/.env`)
```env
# Your MongoDB connection string
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/yourDatabaseName

# A long, random, secret string for signing JWTs
JWT_SECRET=your_super_secret_jwt_key

# The port for the backend server to run on
PORT=7777
 ```

## Contact

Astha Ade - [GitHub](https://github.com/asthaade) - [LinkedIn](https://www.linkedin.com/in/astha-ade-7167aa24b)
