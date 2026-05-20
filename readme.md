# 🩺 DocAppoint Server

Backend server for the **DocAppoint - Doctor Appointment Booking System**.  
This server handles appointment booking APIs, database operations, authentication support, and appointment management features.

---

# 🚀 Project Overview

DocAppoint is a modern Doctor Appointment Booking System where users can:

- Browse available doctors
- Book appointments
- Update appointment information
- Delete appointments
- Manage user profile
- Manage reviews and appointments
- Use secure authentication system

This repository contains the **server-side** code built using **Node.js**, **Express.js**, and **MongoDB**.

---

# 🌐 Live Server

```bash
http://localhost:5000
```

---

# 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB
- dotenv
- cors

---

# 📦 Packages Used

```bash
npm install express mongodb dotenv cors
```

---

# 📁 Project Structure

```bash
docappoint-server/
│
├── node_modules/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── index.js
```

---

# ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_uri
```

---

# ▶️ Run Locally

## Clone the Repository

```bash
git clone https://github.com/SheikhSabbirAhmad/DocAppoint-Server.git
```

---

## Navigate to Project Folder

```bash
cd DocAppoint-Server
```

---

## Install Dependencies

```bash
npm install
```

---

## Start the Server

```bash
npm start
```

---

## Run with Nodemon

```bash
nodemon index.js
```

---

# 🔗 API Endpoints

---

## 🟢 Root Route

```http
GET /
```

### Response

```json
"Server Running"
```

---

# 📖 Booking APIs

---

## 📥 Get All Bookings

```http
GET /booking
```

### Response Example

```json
[
  {
    "_id": "682d123456789",
    "doctorName": "Dr. John Doe",
    "patientName": "Sabbir",
    "date": "2026-05-21",
    "time": "10:00",
    "reason": "Fever"
  }
]
```

---

## 📤 Create Booking

```http
POST /booking
```

### Request Body

```json
{
  "doctorName": "Dr. John Doe",
  "patientName": "Sabbir",
  "date": "2026-05-21",
  "time": "10:00",
  "reason": "Fever"
}
```

### Response Example

```json
{
  "acknowledged": true,
  "insertedId": "682d123456789"
}
```

---

## ✏️ Update Booking

```http
PATCH /booking/:id
```

### Request Body

```json
{
  "patientName": "Updated Name",
  "date": "2026-05-25",
  "time": "12:00",
  "reason": "Updated Reason"
}
```

### Response Example

```json
{
  "acknowledged": true,
  "modifiedCount": 1
}
```

---

## ❌ Delete Booking

```http
DELETE /booking/:id
```

### Response Example

```json
{
  "acknowledged": true,
  "deletedCount": 1
}
```

---

# ✨ Features

✅ REST API Architecture  
✅ MongoDB Integration  
✅ Appointment CRUD Operations  
✅ Error Handling  
✅ Environment Variable Support  
✅ Scalable Backend Structure  
✅ CORS Enabled  
✅ Clean API Design  

---

# 🔐 Future Improvements

- JWT Authentication
- Better Auth Integration
- User Authorization
- Doctor Management APIs
- Admin Dashboard
- Payment Integration
- Reviews & Ratings
- Pagination & Filtering

---

# 🌍 Client Side Repository

Frontend Repository:

```bash
https://github.com/SheikhSabbirAhmad/DocAppoint
```

---

# 👨‍💻 Author

## Sheikh Sabbir Ahmad

### GitHub

```bash
https://github.com/SheikhSabbirAhmad
```

### LinkedIn

```bash
https://www.linkedin.com/in/sheikh-sabbir-ahmad
```

---

# 📄 License

This project is licensed for educational and learning purposes.

---

# ⭐ Support

If you like this project, give it a ⭐ on GitHub.