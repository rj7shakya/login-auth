const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
// const sgMail = require("@sendgrid/mail");

router.put(
  "/",
  [check("email", "Please include a valid email").isEmail()],
  auth,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email } = req.body;
    try {
      let user = await User.findOne({ email });
    } catch (err) {
      return res.status(400).sen("Email doesnt exist");
    }

    jwt.sign({ id: user.id }, config.get("jwtSecretpw"), (err, token) => {
      if (err) throw err;
      res.json({ token });

      const emailData = {
        from: "shakyarajad1@gmail.com",
        to: email,
        subject: `Password reset link`,
        html: `
        <h1>Please use the following link to reset the password</h1>
        <p>${config.get("CLIENT_URL")}/auth/reset/${token}</p>
        `,
      };

      try {
        // sgMail.send(emailData);
      } catch (error) {
        return res.send(error.message);
      }
      res.json({ msg: "email has been sent" });
    });
  }
);

module.exports = router;
