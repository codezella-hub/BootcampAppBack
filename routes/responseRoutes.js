const express = require("express");
const router = express.Router();
const { createResponse, getAllResponses, getResponseById, deleteResponse,getResponseByUserId,getResponseByQuizId ,getResponseBySubCourseId,getResponseByCourseId} = require("../controller/responseController");

// Routes
router.post("/response", createResponse); // Create a new response
router.get("/response", getAllResponses); // Get all responses
router.get("/response/:id", getResponseById); // Get a response by ID
router.get("/response/user/:userid", getResponseByUserId); // Get responses by user ID
router.get("/response/quiz/:quizid", getResponseByQuizId); // Get responses by quiz ID
router.get("/response/subCourse/:subCourseid", getResponseBySubCourseId); // Get responses by sub-course ID
router.get("/response/course/:courseId", getResponseByCourseId); // Get responses by course ID
router.delete("/response/:id", deleteResponse); // Delete a response by ID

module.exports = router;