const express = require("express");
const router = express.Router();
const {
    validateQuizData,
    checkQuizExists,
}=require("../middleware/quizValidate");

const {
    createQuiz,
    getAllQuizzes,
    getQuizById,
    updateQuiz,
    deleteQuiz,
    getQuizByCourseId,
    getQuizBySubCourseId,
    getQuizByUserId
} = require("../controller/quizController");


// Test route simple
router.get('/show', (req, res) => {
    res.send('salut 4 twin 9');
});

// 🎯 CRUD Routes pour Quiz
router.post("/quiz",validateQuizData, createQuiz);                    // Créer un quiz
router.get("/quiz", getAllQuizzes);                  // Obtenir tous les quiz
router.get("/quiz/:id",checkQuizExists, getQuizById);                // Obtenir un quiz par ID
router.put("/quiz/:id",checkQuizExists, updateQuiz);                 // Mettre à jour un quiz par ID
router.delete("/quiz/:id",checkQuizExists, deleteQuiz);              // Supprimer un quiz par ID

// 🧩 Routes spécifiques
router.get("/quiz/course/:courseid", getQuizByCourseId);        // Quiz par courseId
router.get("/quiz/subCourse/:subCourseId", getQuizBySubCourseId); // Quiz par subCourseId
router.get("/quiz/user/:userId", getQuizByUserId);              // Quiz créés par un utilisateur

module.exports = router;
