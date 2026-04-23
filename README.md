# Debate / Argumentation Platform

A full-stack web application that enables structured discussions through arguments, rebuttals, and voting.

## 🚀 Features

- User Authentication (Login)
- Create debates
- Add arguments (Pro / Con)
- Nested replies (tree structure)
- Voting system (upvote / downvote)
- Argument scoring
- Clean UI with dark theme

## 🧠 Core Idea

Unlike traditional comment sections, this platform organizes discussions as a **tree of arguments**, making debates more structured and meaningful.

## 🛠️ Tech Stack

### Frontend

- React.js
- Axios
- React Router

### Backend

- Node.js
- Express.js

### Database

- MongoDB

## 📂 Project Structure

backend/
controllers/
models/
routes/

frontend/
src/
pages/
components/
services/

## ⚙️ Setup Instructions

### 1. Clone the repo

git clone <https://github.com/vasu453/debate_platform.git>

### 2. Backend setup

cd backend
npm install
npm run dev

### 3. Frontend setup

cd frontend
npm install
npm run dev

## 🔐 Environment Variables

Create a `.env` file in backend:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret

## 📌 Future Improvements

- Real-time updates (no reload)
- Better UI/UX
- User profiles
- Debate ranking system
- AI-based argument analysis

## 👨‍💻 Author

Nalam Srinivasa Moorty
