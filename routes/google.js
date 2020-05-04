const { OAuth2Client } = require("google-auth-library");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const _ = require("lodash");

const client = new OAuth2Client(config.get("GOOGLE_ID"));

router.put("/", async (req, res) => {
  const { idToken } = req.body;
  client
    .verifyIdToken({ idToken, audience: config.get("GOOGLE_ID") })
    .then((response) => {
      const { email_verified, name, emai } = response.payload;
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (user) {
            const token = jwt.sign(
              { _id: user._id, name },
              config.get("jwtSecret")
            );
            const { _id, email, name } = user;
            return res.json({
              token,
              user: { _id, email, name },
            });
          } else {
            let password = email + config.get("jwtSecret");
            user = new User({ name, email, password });
            user.save((err, data) => {
              if (err) {
                console.log(err);
                res.status(400).json({
                  error: "error to sign with google",
                });
              }
              const token = jwt.sign(
                { _id: data._id },
                config.get("jwtSecret")
              );
              const { _id, email, name } = data;
              return res.json({
                token,
                user: { _id, email, name },
              });
            });
          }
        });
      } else {
        res.json({ error: "google login failed" });
      }
    });
});

module.exports = router;
