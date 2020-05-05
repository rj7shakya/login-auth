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
const axios = require("axios");

router.post("/", async (req, res) => {
  const { userID, accessToken } = req.body;
  const { data } = await axios({
    url: "https://graph.facebook.com/me",
    method: "get",
    params: {
      fields: ["id", "email", "first_name", "last_name"].join(","),
      access_token: accessToken,
    },
  });
  const { email, first_name: name } = data;
  try {
    let user = await User.findOne({ email });
    if (user !== null) {
      const token = jwt.sign(
        { id: user._id },
        config.get("jwtSecret"),
        (err, token) => {
          if (err) throw err;

          const { _id, email, name } = user;
          return res.json({
            token,
            user: { _id, email, name },
          });
        }
      );
    } else {
      let password = email + config.get("jwtSecret");
      user = new User({ name, email, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      user.save((err, data) => {
        if (err) {
          res.json({
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
  } catch (error) {
    res.status(400).send("server error");
  }
});

module.exports = router;
