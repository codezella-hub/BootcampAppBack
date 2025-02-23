const Quiz = require("../models/Quiz");
const User = require("../models/user");
const Forum = require("../models/forum");

// Create a new quiz
async function createQuiz(req, res) {
    try {
        const { title, category, difficulty, totalQuestions, maxAttempts, timeLimit, createdBy, questions } = req.body;
        // const foundUser = await User.findById(createdBy);
        // if (!foundUser) {
        //     return res.status(404).send("User not found");
        // }

        const newQuiz = new Quiz({
            title,
            category,
            difficulty,
            totalQuestions,
            maxAttempts,
            timeLimit,
            createdBy,
            createdAt: new Date(),
            updatedAt: new Date(),
            questions,
        });

        await newQuiz.save();
        res.status(200).json(newQuiz);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating quiz");
    }
}

// Get all quizzes

async function getAllQuizzes(req, res) {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching quizzes');
    }
}

// Get a single quiz by ID
async function getQuizById(req, res) {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).send("Quiz not found");
        }
        res.status(200).json(quiz);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching quiz");
    }
}

// Update a quiz by ID
async function updateQuiz(req, res) {
    try {
        const { title, category, difficulty, totalQuestions, maxAttempts, timeLimit, questions } = req.body;
        const updatedQuiz = await Quiz.findByIdAndUpdate(
            req.params.id,
            { title, category, difficulty, totalQuestions, maxAttempts, timeLimit, questions, updatedAt: new Date() },
            { new: true }
        );
        if (!updatedQuiz) {
            return res.status(404).send("Quiz not found");
        }
        res.status(200).json(updatedQuiz);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating quiz");
    }
}

// Delete a quiz by ID
async function deleteQuiz(req, res) {
    try {
        const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!deletedQuiz) {
            return res.status(404).send("Quiz not found");
        }
        res.status(200).send("Quiz deleted");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting quiz");
    }
}

module.exports = { createQuiz, getAllQuizzes, getQuizById, updateQuiz, deleteQuiz };
