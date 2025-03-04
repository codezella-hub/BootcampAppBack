const express = require('express');
const mongo = require('mongoose');
const db = require('./config/db.json');
const categoryRouter = require('./routes/categoryRoute');
const courseRouter = require('./routes/courseRoute');
const courseDetailsRouter = require('./routes/courseDetailsRoute');
const subCourseRouter = require('./routes/SubCourseRoute');
const videoRouter = require('./routes/videoRoute');
const userRouter = require('./routes/userRoute');
const forumRoutes = require('./routes/forumRoutes');
const commentRoutes = require('./routes/commentRoutes');
const likeRoutes = require('./routes/likeRoutes');
const orderRoutes = require("./routes/orderRoutes");

const path = require('path');
require('dotenv').config();
const cors = require('cors');

const app = express();

// ✅ Active CORS avant les routes
const corsOptions = {
  origin: 'http://localhost:5173', // Assure-toi que ça correspond à ton frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Connexion à la base de données
mongo.connect(db.url)
    .then(() => console.log('Database connected'))
    .catch((err) => console.log(err));

// Middleware JSON et URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route principale
app.get('/', (req, res) => {
    res.send('Welcome to the BootcampAppBack!');
});

// Routes API
app.use("/api/orders", orderRoutes);
app.use('/api', categoryRouter);
app.use('/api', courseRouter);
app.use('/api', courseDetailsRouter);
app.use('/api', subCourseRouter);
app.use('/api', videoRouter);
app.use('/api', userRouter);
app.use('/api', forumRoutes);
app.use('/api', commentRoutes);
app.use('/api', likeRoutes);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

module.exports = app;
