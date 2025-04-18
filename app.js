const express = require('express');
const mongo = require('mongoose');
const db = require('./config/db.json');
const cookieParser = require("cookie-parser");
const passportSetup = require("./services/passport");
const categoryRouter = require('./routes/categoryRoute');
const courseRouter = require('./routes/courseRoutes');
const courseDetailsRouter = require('./routes/courseDetailsRoute');
const subCourseRouter = require('./routes/SubCourseRoute');
const videoRouter = require('./routes/videoRoute');
const registraionRouter = require("./routes/registrationRoute");

const authRouter = require("./routes/authRoutes");
const twoFaRouter = require("./routes/2faAuthRoutes");
const resetPasswordRoutes = require("./routes/resetPasswordRoute");
const updateProfileRoutes = require("./routes/updateProfileRoutes");
const adminUserRoutes = require("./routes/adminUserRoutes");
//const AuthRoutes = require('./routes/auth.routes');
const forumRoutes = require('./routes/forumRoutes');
const commentRoutes = require('./routes/commentRoutes');
const likeRoutes = require('./routes/likeRoutes');
const quizzRouts = require('./routes/quizRoutes');
const responseRoute = require('./routes/responseRoutes');
const authGo = require('./routes/auth.go.js');
const passport = require("passport");
const session = require("express-session"); 
const path = require('path');
require('dotenv').config();
const cors = require('cors');

// Connect to the database
mongo.connect(db.url)
    .then(() => console.log('Database connected'))
    .catch((err) => console.log(err));

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // Added this line for form data
app.use(passport.initialize());
// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the BootcampAppBack!');
});


// Routes


// Configuration de CORS
const corsOptions = {
    origin: 'http://localhost:4000', // Remplacez par l'origine de votre frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
    credentials: true, // Permet l'envoi de cookies et d'authentification
};

app.use(cors(corsOptions));

app.use('/api', categoryRouter);
app.use('/api', courseRouter);
app.use('/api', courseDetailsRouter);
app.use('/api', subCourseRouter);
app.use('/api', videoRouter);

app.use('/api', authRouter);
app.use('/api', resetPasswordRoutes);
app.use('/api', twoFaRouter);
app.use('/api', updateProfileRoutes);
app.use('/api', adminUserRoutes);
app.use('/auth', authGo);

app.use('/api',registraionRouter);
app.use('/api',forumRoutes);
app.use('/api',commentRoutes);
app.use('/api',likeRoutes);
app.use('/api',quizzRouts);
app.use('/api',responseRoute);

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

module.exports = app;
