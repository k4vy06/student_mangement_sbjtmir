# Student Management System - Project Summary

## How to Run the Application

This project is built using the MERN stack (MongoDB, Express, React, Node.js) and is split into two main directories: `client` (frontend) and `server` (backend).

### 1. Prerequisites
- **Node.js** installed on your system.
- **MongoDB** running locally on port `27017` (or update the `MONGO_URI` in `server/.env`).

### 2. Running the Backend Server
Open a terminal and navigate to the root directory of the project, then run the following commands:
```bash
cd server
npm install
npm run dev
```
- The backend will start on `http://localhost:5000`.
- It connects to the database using the variables defined in `server/.env`.

### 3. Running the Frontend Client
Open a second, separate terminal and navigate to the root directory, then run:
```bash
cd client
npm install
npm run dev
```
- The frontend will start, typically on `http://localhost:5173` (or `5174` if `5173` is in use).
- Open this URL in your web browser to interact with the application.

---

## How the Application Works (Data Flow)

Here is a step-by-step summary of how data flows through the application—from user input to database storage.

### 1. The Input (React Frontend)
When a user fills out a form on the website (e.g., adding a new student), they are interacting with the React frontend. React temporarily stores this information in its internal state memory as they type.

### 2. The Submission (API Call via Axios)
Upon clicking "Submit", React packages the form data into a JSON object. It uses the **Axios** library (configured in `client/src/services/api.js`) to send an HTTP request (such as POST or PUT) containing this JSON payload to the backend server.

### 3. The Reception (Express Backend)
The backend server (running Express.js) listens for incoming API requests. When a request hits a specific route (e.g., `/api/students`), Express routes the data to the appropriate Controller function designed to handle that specific action.

### 4. Validation & Translation (Mongoose)
Inside the controller, the data is handed off to **Mongoose** (using models like `server/models/Student.js`). Mongoose acts as a validator, checking the incoming data against a predefined Schema to ensure all required fields are present and properly formatted.

### 5. Storage (MongoDB Database)
If validation succeeds, Mongoose converts the data into a MongoDB Document and sends a command to the MongoDB database to securely store the record. 

### 6. The Confirmation (Response)
Once the database confirms the data is saved, the Express server responds to the React frontend with a success status (HTTP 200 or 201) and the newly saved data. The frontend then updates its state and the UI, displaying the new information to the user instantly!
