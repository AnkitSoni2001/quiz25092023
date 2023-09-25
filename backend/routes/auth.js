const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const fetchuser = require('../middleware/fetchuser');

const router = express.Router();

// Validation for creating a user
const createUserValidation = [
  body("name").isLength({ min: 3 }),
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
];

// Validation for logging in a user
const loginUserValidation = [
  body("email", 'Enter a valid email').isEmail(),
  body("password", 'Password cannot be blank').exists(),
];

// Define routes using the authController functions
router.post("/createuser", createUserValidation, authController.createUser);
router.post("/login", loginUserValidation, authController.loginUser);
router.post("/getuser", fetchuser, authController.getUser);

module.exports = router;



