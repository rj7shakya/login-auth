const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(config.get("SENDGRID_APY_KEY"));

router.put(
  "/",
  [check("email", "Please include a valid email").isEmail()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email } = req.body;
    try {
      user = await User.findOne({ email });
    } catch (err) {
      return res.status(400).send("Email doesnt exist");
    }
    if (user === null) {
      return res.status(400).json({ msg: "email doesnot exists" });
    }

    jwt.sign({ id: user._id }, config.get("jwtSecret"), async (err, token) => {
      if (err) {
        throw err;
      }
      // res.json({ token });

      // const emailData = {
      //   from: "shakyarajad1@gmail.com",
      //   to: email,
      //   subject: `Password reset link`,
      //   html: `
      //   <h1>Please use the following link to reset the password</h1>
      //   <p>${config.get("CLIENT_URL")}/auth/reset/${token}</p>
      //   `,
      // };
      // console.log(user);
      // User.updateOne({ resetPasswordLink: token }, (err, success) => {
      //   if (err) {
      //     return res.status(400).json({ error: "db error" });
      //   }
      // });
      data = await User.findByIdAndUpdate(
        user._id,
        { $set: { resetPasswordLink: token } },
        { new: true }
      );

      const url = config.get("CLIENT_URL") + "/auth/reset/" + token;

      res.json({ url: url });
      // sgMail
      //   .send(emailData)
      //   .then((sent) => {
      //     return res.json({ msg: "email has been sent" });
      //   })
      //   .catch((err) => {
      //     console.log("error");
      //     return res.send(err.message);
      //   });
    });
  }
);

module.exports = router;
