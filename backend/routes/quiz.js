const express = require("express");
const { body } = require("express-validator");
const fetchuser = require('../middleware/fetchuser');
const quizController = require("../controllers/quizController");

const router = express.Router();

// Validation for adding a new quiz
const addQuizValidation = [
  body("question", "Enter the question properly").isLength({ min: 5 }),
  body("option1", "Option 1 must have at least 3 characters").isLength({ min: 3 }),
  body("option2", "Option 2 must have at least 3 characters").isLength({ min: 3 }),
  body("option3", "Option 3 must have at least 3 characters").isLength({ min: 3 }),
  body("option4", "Option 4 must have at least 3 characters").isLength({ min: 3 }),
  body("answer", "Answer must have at least 3 characters").isLength({ min: 3 }),
];

// Define routes using the quizController functions
router.get("/fetchallquiz", fetchuser, quizController.fetchAllQuiz); //stored in backend
router.get("/fetchallquizbasedonmessage/:message", quizController.fetchAllQuizBasedOnMessage); //based on code display all the message in frontend
router.post("/addquiz", fetchuser, addQuizValidation, quizController.addQuiz);
router.put("/updatequiz/:id", fetchuser, quizController.updateQuiz);
router.put("/updatecode/:id", fetchuser, quizController.updateCode);
router.delete("/deletequiz/:id", fetchuser, quizController.deleteQuiz);

module.exports = router;


