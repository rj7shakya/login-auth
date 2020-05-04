const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const _ = require("lodash");

router.put(
  "/",
  [
    check(
      "newPassword",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let { resetPasswordLink, newPassword } = req.body;
    const salt = await bcrypt.genSalt(10);
    newPassword = await bcrypt.hash(newPassword, salt);
    console.log("changing");
    if (resetPasswordLink) {
      jwt.verify(resetPasswordLink, config.get("jwtSecretpw"), function (
        err,
        decoded
      ) {
        if (err) {
          return res.status(400).json({ error: "link error" });
        }
        User.findOne({ resetPasswordLink }, (err, user) => {
          if (err) {
            return res.status(400).json({
              error: "smthg went wrong",
            });
          }

          const updatedFields = {
            password: newPassword,
            resetPasswordLink: "",
          };
          user = _.extend(user, updatedFields);
          var userr = new User(user);
          userr.save((err, result) => {
            if (err) {
              console.log(err);
              return res.status(400).json({ error: "error resetting" });
            }
            res.json({
              message: "password changed",
            });
          });
        });
      });
    }
  }
);

module.exports = router;
