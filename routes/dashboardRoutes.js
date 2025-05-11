const express = require('express');
const router = express.Router();
const {getCourseCount ,countUsers,countEnrollments,countCategories,coursesByCategory,quizSuccessFailureStats,getCoursesByRating} = require('../controller/dashboardControlller');



router.get('/count', getCourseCount);
router.get('/countUser',countUsers);
router.get('/countEnrolledCourses',countEnrollments);
router.get('/countCatgories',countCategories);
router.get('/by-category', coursesByCategory);
router.get('/stats/success-failure', quizSuccessFailureStats);
router.get('/by-rating', getCoursesByRating);
module.exports = router;
