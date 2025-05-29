# MERN Stack Developer Machine Test

This is a MERN stack-based application designed for a developer machine test. It includes Admin authentication, Agent management, CSV upload with validation, and automatic distribution of data entries among agents.

---

## 📁 Project Structure
mern-machine-test/
│
├── backend/ → Node.js + Express API (MongoDB + JWT Auth)
├── frontend/ → React.js application
└── README.md → Project documentation


## 🚀 Features

### ✅ Admin Panel
- Admin Login with JWT Authentication
- Protected routes for admin-only access

### 👤 Agent Management
- Add and manage up to 5 agents
- View list of created agents

### 📄 CSV Upload & Validation
- Upload a CSV file containing records
- Validate entries for required fields (Name, Email, Phone)
- Show errors for invalid rows

### 🔄 Task Distribution
- Automatically distribute valid records equally among 5 agents
- Show assigned records per agent

---

## 🛠️ Tech Stack

| Layer        | Technology      |
|--------------|-----------------|
| Frontend     | React.js, Axios |
| Backend      | Node.js, Express.js |
| Database     | MongoDB (Mongoose) |
| Auth         | JWT (JSON Web Tokens) |
| File Upload  | Multer, csv-parser |

---

## ⚙️ Setup and Run Instructions

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend

2. Install dependencies:
- npm install

3. Create a .env file and configure your environment variables (e.g. MongoDB URI, JWT secret):
-   MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    PORT=5000


4. Start the backend server:
- npm start

The backend server will start on port 5000 (or as configured).

---

## Frontend Setup
Navigate to the frontend folder:
- cd frontend

For detailed frontend setup and running instructions, please refer to frontend/README.md.

### 🚀 Running the full application
--- Start the backend server (see above).

--- Start the frontend server (see frontend README).

--- Open http://localhost:3000 in your browser to use the app

---

### 👥 Contributing
Contributions and improvements are welcome! Feel free to open issues or submit pull requests.

### 📞 Contact
Your Name – barsharouth7@gmail.com
Project repository: https://github.com/BarshaRouth/CsTechMachineTest

---