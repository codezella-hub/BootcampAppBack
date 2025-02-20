const mongoose = require("mongoose");
const subCourse = require("./subCourse");

const QuestionSchema = new mongoose.Schema({
  question_id: String,
  text: String,
  options: [String],
  correct: String,
  type: String,
  explanation: String,
});

const QuizSchema = new mongoose.Schema({
  title: String,
  subCourse: String,
  difficulty: String,
  totalQuestions: Number,
  maxAttempts: Number,
  timeLimit: Number,
  createdBy: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  questions: [QuestionSchema],
});

// Middleware to update 'updatedAt' on every save
QuizSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Quiz", QuizSchema);
