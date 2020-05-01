const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

// GET  api/auth
// desc  get logged in user
// access private
router.get("/", (req, res) => {
  res.json("logged user");
});

// POST  api/auth
// desc  auth user and get token(login)
// access public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  (req, res) => {
    res.json("login here");
  }
);

module.exports = router;
