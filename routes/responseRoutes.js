const express = require("express");
const router = express.Router();
const { createResponse, getAllResponses, getResponseById, deleteResponse } = require("../controller/responseController");

// Routes
router.post("/response", createResponse); // Create a new response
router.get("/response", getAllResponses); // Get all responses
router.get("/response/:id", getResponseById); // Get a response by ID
router.delete("/response/:id", deleteResponse); // Delete a response by ID

module.exports = router;