const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  question_id: String,
  selected_option: String,
  is_correct: Boolean,
});

const ResponseSchema = new mongoose.Schema({
  user_id: String,
  quiz_id: String,
  answers: [AnswerSchema], // Array of answers
  score: Number, // Float score
  isPassed: Boolean, // True if the user passed
  attemptNumber: Number, // Number of attempts
  timeTaken: Number, // Time in seconds
  dateAttempted: { type: Date, default: Date.now, immutable: true }, // Fixed field
});

module.exports = mongoose.model("Response", ResponseSchema);
