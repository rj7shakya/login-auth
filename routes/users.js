const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

//POST   api/users
//desc   signup user
//access public

router.post(
  "/",
  [
    check("name", "Please Enter a name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).send({ msg: "User already exists!" });
      }
      user = new User({ name, email, password });
      res.json(user);
      await user.save();
    } catch (err) {
      res.status(500).send("Server error");
    }

    res.json("Signup here");
  }
);

module.exports = router;
