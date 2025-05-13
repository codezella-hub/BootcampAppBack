# StudyHub Backend

## Overview

**StudyHub** is the backend of a full-stack BootCamp learning platform, developed as part of the **4TWIN engineering syllabus** at **Esprit School of Engineering**, under the supervision of **Mr. Radhouene Massoudi**.

This backend handles core logic for intelligent certification, course management, and AI-enhanced quiz evaluation using **TensorFlow**. It supports multiple user roles — **Student**, **Professor**, **Admin**, **Company**, and **Guest** — and is designed to scale through modern web technologies, robust security, and real-time communication.

## Features

- 🔐 **JWT-based authentication** and role-based access
- 🧠 **AI-powered quiz evaluation** via TensorFlow and Machine Learning
- 🧑‍🎓 Role-based access: Admin / Student / Professor / Company / Guest
- 📚 RESTful API for course management
- 🛒 Cart and checkout logic for certification
- 🧾 Certificate generation and digital validation
- 💬 Chat forum system using WebSockets
- 📊 Admin statistics and analytics endpoints
- 📨 Email notifications via Nodemailer

## Tech Stack

### Backend
- **Node.js** (runtime)
- **Express.js** (framework)
- **MongoDB** + **Mongoose** (NoSQL database)
- **TensorFlow.js** (AI quiz evaluation)
- **JWT** (authentication)
- **Socket.IO** (real-time communication)


### Frontend (see frontend repo)
- React.js
- Redux
- Tailwind CSS

### Dev Tools & Services
- Postman
- GitHub Education
- VS Code
- Git / GitHub
- .env for environment variable management

## Directory Structure
/backend
├── config/ # Environment and DB setup
├── controllers/ # API logic (Auth, Quiz, User, Course...)
├── middleware/ # Auth guards and role filters
├── models/ # MongoDB schemas
├── routes/ # API route definitions
├── services/ # TensorFlow logic, mailer, etc.
├── uploads/ # Certificate / profile uploads
├── utils/ # Token handler, validators
├── .env # Secrets (not committed)
└── server.js # Server entry point


## Getting Started

### Prerequisites

- Node.js v16+
- MongoDB (Atlas or Local)
- Optional: Redis (for caching or session extensions)

### Setup Instructions

```bash
# Clone the repo
git clone https://github.com/codezella-hub/BootcampAppBack/
cd studyhub-backend

# Install dependencies
npm install

# Run development server
npm run dev

Sample API Endpoints
POST /api/auth/register — Register a user

POST /api/auth/login — Login and get token

GET /api/courses — Retrieve all courses

POST /api/quiz/submit — Submit answers for AI evaluation

GET /api/forum — Retrieve forum threads
 #nodejs, #express, #mongodb, #machine-learning, #ai, #tensorflow, #socketio, #education, #esprit, #4twin, #jwt-auth, #backend, #rest-api, #web-development, #certificate-system
