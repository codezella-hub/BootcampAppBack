# BootcampAppBack 🎓

> 🧠 **Backend API for the Bootcamp Management Platform**  
> Developed as part of the _Projet Intégré 4TWIN_ at **Esprit School of Engineering**.  
> Publicly hosted and maintained under the GitHub Campus Program with focus on accessibility, education, and open collaboration.

---

## 📘 Overview

**BootcampAppBack** is a RESTful backend developed in **Node.js**, responsible for managing all core operations of a Bootcamp education platform. It supports user authentication, course management, enrollment tracking, and data processing—all with future-proof architecture and GitHub Education visibility strategies.

This repository is part of a broader effort to **enhance Esprit’s visibility on GitHub** while delivering accessible, performant, and real-world educational solutions.

---

## 🚀 Features

- 🔐 JWT-based authentication and route protection
- 👨‍🏫 Instructor and student role separation
- 📚 Course creation, updates, deletion
- 📝 Enrollment system
- 📊 Real-time cart/session updates (via frontend)
- 🧩 Modular Express routing
- 📦 MongoDB integration using Mongoose
- 🌍 WCAG-aligned for frontend compatibility
- 💼 GitHub Education visibility compliance

---

## 🔧 Tech Stack

- **Node.js** v22 (via NVM)
- **Express.js**
- **MongoDB** / Mongoose ODM
- **JWT** for secure auth
- **dotenv** for environment configuration
- **ESLint**, **Prettier**, **Postman** for development standards

---

## 📁 Directory Structure

```bash
BootcampAppBack/
├── controllers/         # Logic for handling routes
├── models/              # Mongoose data models
├── routes/              # Express routers
├── middleware/          # Auth, error handling, etc.
├── config/              # DB connection
├── .env.example         # Example environment config
├── app.js               # Express setup
├── server.js            # Entry point
└── README.md            # Project overview
```

---

## ⚙️ Getting Started

### ✅ Prerequisites

- [Node.js v22](https://nodejs.org/en) (installed via [NVM for Windows](https://github.com/coreybutler/nvm-windows))
- [MongoDB](https://www.mongodb.com/) local or hosted (Atlas)
- Git CLI or GitHub Desktop

### 📦 Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-org/BootcampAppBack.git
cd BootcampAppBack

# 2. Install dependencies
npm install

# 3. Use correct Node version
nvm install 22
nvm use 22

# 4. Configure environment variables
cp .env.example .env
# Edit .env with your DB URI and JWT secret

# 5. Start the development server
npm start
```

---

## 🌍 .env Configuration

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/bootcamp
JWT_SECRET=yourStrongSecretKey
```

---

## 🔁 API Endpoints

| Method | Endpoint                  | Description               |
|--------|---------------------------|---------------------------|
| GET    | `/api/courses`            | Get all courses           |
| POST   | `/api/auth/register`      | Register new user         |
| POST   | `/api/auth/login`         | Login and return JWT      |
| POST   | `/api/courses/:id/enroll` | Enroll in a course        |

---

## 🧪 Testing

Use **Postman**, **Thunder Client** (VS Code), or CURL to test routes.

Example:

```http
POST /api/auth/register
{
  "email": "student@esprit.tn",
  "password": "securePass123"
}
```

---

## 🦾 Accessibility (WCAG 2.1 AA Support)

Although this is the backend, it is **structured to support accessibility** on the frontend level. Frontend routing and data rendering follows principles from [WCAG 2.1](https://www.w3.org/WAI/WCAG22/):

- ✅ Clear route names
- ✅ Proper JSON structure for screen readers
- ✅ Modular backend to enable semantic frontends

---

## 📌 GitHub Best Practices

- `README.md` present ✅  
- `.env.example` shared ✅  
- Topics used for SEO ✅  
- Esprit affiliation visible ✅  
- Public repository ✅  

> This repository supports **open collaboration** and aims to **highlight Esprit students’ skills** on the GitHub Campus.

---

## 🏷 GitHub Topics

```
nodejs
express
mongodb
rest-api
bootcamp
esprit
education
jwt-auth
accessibility
github-campus
```

---

## 📚 Related Projects

- [`BootcampAppFront`](https://github.com/your-org/BootcampAppFront) – Frontend interface for this API
- [`GitHub Visibility Report`](./Amélioration%20de%20la%20visibilité%20d’Esprit%20grâce%20à%20GitHub.pdf)

---

## 🙌 Acknowledgements

Project developed within the **4TWIN** track at **Esprit School of Engineering**.  
Special thanks to our instructors and [GitHub Campus Experts](https://education.github.com/experts) community.

---

## 🪪 License

MIT License © 2024 Bootcamp Team – Esprit School of Engineering

---
