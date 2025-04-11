const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Database configuration
const dbConfig = require('./config/db.json');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Successfully connected to MongoDB'))
.catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
});

// Import routes
const categoryRouter = require('./routes/categoryRoute');
const courseRouter = require('./routes/courseRoute');
const courseDetailsRouter = require('./routes/courseDetailsRoute');
const subCourseRouter = require('./routes/SubCourseRoute');
const videoRouter = require('./routes/videoRoute');
const userRouter = require('./routes/userRoute');
const forumRoutes = require('./routes/forumRoutes');
const commentRoutes = require('./routes/commentRoutes');
const likeRoutes = require('./routes/likeRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes'); // ✅ Stripe route

// API prefix
const API_PREFIX = '/api';

// Welcome route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the BootcampApp API',
        version: '1.0.0'
    });
});

// Mount API routes
app.use(`${API_PREFIX}/categories`, categoryRouter);
app.use(`${API_PREFIX}/courses`, courseRouter);
app.use(`${API_PREFIX}/course-details`, courseDetailsRouter);
app.use(`${API_PREFIX}/sub-courses`, subCourseRouter);
app.use(`${API_PREFIX}/videos`, videoRouter);
app.use(`${API_PREFIX}/users`, userRouter);
app.use(`${API_PREFIX}/forums`, forumRoutes);
app.use(`${API_PREFIX}/comments`, commentRoutes);
app.use(`${API_PREFIX}/likes`, likeRoutes);
app.use(`${API_PREFIX}/orders`, orderRoutes);
app.use(`${API_PREFIX}/payment`, paymentRoutes); // ✅ MOUNT STRIPE ROUTE HERE

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

module.exports = app;
