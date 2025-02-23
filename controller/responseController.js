const Response = require("../models/Response");
const Quiz = require("../models/Quiz");
const User = require("../models/user");

// Create a new response
async function createResponse(req, res) {
    try {
        const { user_id, quiz_id, answers, score, isPassed, attemptNumber, timeTaken } = req.body;

       /* const foundUser = await User.findById(user_id);
        if (!foundUser) {
            return res.status(404).send("User not found");
        }

        const foundQuiz = await Quiz.findById(quiz_id);
        if (!foundQuiz) {
            return res.status(404).send("Quiz not found");
        }*/

        const newResponse = new Response({
            user_id,
            quiz_id,
            answers,
            score,
            isPassed,
            attemptNumber,
            timeTaken,
            dateAttempted: new Date()
        });

        await newResponse.save();
        res.status(200).json(newResponse);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating response");
    }
}

// Get all responses
async function getAllResponses(req, res) {
    try {
        const responses = await Response.find();
        res.status(200).json(responses);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching responses");
    }
}

// Get a response by ID
async function getResponseById(req, res) {
    try {
        const response = await Response.findById(req.params.id);
        if (!response) {
            return res.status(404).send("Response not found");
        }
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching response");
    }
}

// Delete a response
async function deleteResponse(req, res) {
    try {
        const deletedResponse = await Response.findByIdAndDelete(req.params.id);
        if (!deletedResponse) {
            return res.status(404).send("Response not found");
        }
        res.status(200).send("Response deleted");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting response");
    }
}

module.exports = { createResponse, getAllResponses, getResponseById, deleteResponse };