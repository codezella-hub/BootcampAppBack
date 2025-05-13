🎓 StudyHub – BootCamp Learning Platform Backend

🚀 Overview  
**StudyHub** is a full-featured BootCamp learning platform backend, developed using **Node.js**, **Express.js**, and **MongoDB**. It delivers RESTful services for a complete certification system, course management, AI-powered quiz evaluation, and real-time collaborative forums. The platform is built to support different types of users, including **students**, **professors**, **companies**, and **admins**, with role-based dashboards and secure authentication.

Developed as part of the **4TWIN academic program** at **Esprit School of Engineering**, under the supervision of **Mr. Radhouene Massoudi**, this backend integrates machine learning and modular design to offer a reliable, scalable, and intelligent education service.

🧠 AI Integration  
StudyHub leverages **TensorFlow.js** for intelligent quiz evaluation, helping automate grading and improve feedback accuracy.

- **AI-Powered Quiz Evaluation**: Real-time, smart assessment of student quiz responses
- **Adaptive Scoring**: Based on concept importance and user performance
- **Modular Integration**: Can be upgraded with advanced ML models

⚙️ Technology Stack

**Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- TensorFlow.js (Quiz evaluation logic)
- Socket.IO (Forum messaging system)
- Multer (File upload handler)
- Nodemailer (Email services)

**DevOps & Tools**
- Postman (API testing)
- GitHub (Version control, education visibility)
- dotenv (Environment configs)

📌 Key Features

✅ **Authentication & Authorization**
- Secure login with JWT
- Role-based access (Admin, Student, Professor, Company, Guest)

📘 **Course & Quiz Management**
- Create, list, and manage courses
- AI-evaluated quizzes with instant feedback
- Track progress and completion

💬 **Forum & Chat**
- Real-time discussion system
- Socket.IO-powered channels

📄 **Certification Engine**
- Certificate generation
- Secure validation endpoints

📈 **Analytics & Statistics**
- Admin dashboards with user and course metrics
- Role-specific endpoints

🗂️ Project Structure

bootcampappback/
│
├── config/ # DB connection, environment variables
├── controllers/ # Business logic for each route
├── middleware/ # JWT, role guards
├── models/ # MongoDB schemas
├── routes/ # REST API routes
├── services/ # AI logic, mailer, cart, utilities
├── uploads/ # Uploaded certificates & images
├── utils/ # Token & validation helpers
├── .env # Environment variables (ignored in git)
└── server.js # Main application entry point


🐳 Docker-Ready (optional)
- Containerize using a separate `Dockerfile` for production deployments
- Connects cleanly with frontend and MongoDB services

🔁 CI/CD with GitHub Education (optional)
- GitHub Actions for testing, linting, and deployment


👥 Authors  
- Louay Benslimen  
- Saker Hajji  
- Mokhles Benna  
- Sofienne Mrabet  
- Hachem Dhawadi  

---

🧾 Keywords  
`Node.js` `Express` `MongoDB` `JWT` `TensorFlow` `MachineLearning` `AI` `REST API` `Education Platform` `BootCamp` `Fullstack` `Quiz Evaluation` `Forum` `Esprit School of Engineering` `4TWIN`

> “Designed for intelligent education, built with scalable backend logic.”

