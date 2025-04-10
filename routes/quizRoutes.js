const express = require("express");
const router = express.Router();
const { createQuiz, getAllQuizzes, getQuizById, updateQuiz, deleteQuiz } = require("../controller/quizController");


router.get('/show', (req, res) => {
    res.send('salut 4 twin 9');
});
// Routes
router.post("/quiz", createQuiz); // Create a new quiz
router.get("/quiz", getAllQuizzes); // Get all quizzes
router.get("/quiz/:id", getQuizById); // Get a quiz by ID
router.put("/quiz/:id", updateQuiz); // Update a quiz by ID
router.delete("/quiz/:id", deleteQuiz); // Delete a quiz by ID

module.exports = router;