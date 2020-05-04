const fetch = require("node-fetch");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const _ = require("lodash");

// const client = new OAuth2Client(config.get("GOOGLE_ID"));

router.post("/", async (req, res) => {
  const { userID, accessToken } = req.body;
  console.log(userID);
  // const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name.email&access_token=${accessToken}`;
  const url = `https://graph.facebook.com/v3.1/me?access_token=${accessToken}`;
  return fetch(url, {
    method: "GET",
  })
    .then((response) => res.json())
    .then((response) => {
      console.log(response);
      const { email, name } = response;
      // console.log(email);
      User.findOne({ email }).exec((err, user) => {
        if (user) {
          const token = jwt.sign({ _id: email, name }, config.get("jwtSecret"));
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
                error: "error to sign with fb",
              });
            }
            const token = jwt.sign({ _id: data._id }, config.get("jwtSecret"));
            const { _id, email, name } = data;
            return res.json({
              token,
              user: { _id, email, name },
            });
          });
        }
      });
    })
    .catch((error) => {
      res.json({ error: "fb login failed" });
    });
});

module.exports = router;
