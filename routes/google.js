// const { OAuth2Client } = require("google-auth-library");
// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const config = require("config");
// const { check, validationResult } = require("express-validator");
// const auth = require("../middleware/auth");
// const _ = require("lodash");

// const client = new OAuth2Client(config.get("GOOGLE_ID"));

// router.put("/", async (req, res) => {
//   const { idToken } = req.body;
//   client.verify;
//   try {
//     user = await User.findOne({ email });
//   } catch (err) {
//     toast.error("no email found", {
//       position: toast.POSITION.BOTTOM_RIGHT,
//     });
//     return res.status(400).send("Email doesnt exist");
//   }

//   jwt.sign({ _id: user._id }, config.get("jwtSecretpw"), (err, token) => {
//     if (err) {
//       throw err;
//     }
//     // res.json({ token });

//     // const emailData = {
//     //   from: "shakyarajad1@gmail.com",
//     //   to: email,
//     //   subject: `Password reset link`,
//     //   html: `
//     //   <h1>Please use the following link to reset the password</h1>
//     //   <p>${config.get("CLIENT_URL")}/auth/reset/${token}</p>
//     //   `,
//     // };
//     User.updateOne({ resetPasswordLink: token }, (err, success) => {
//       if (err) {
//         return res.status(400).json({ error: "db error" });
//       }
//     });

//     const url = config.get("CLIENT_URL") + "/auth/reset/" + token;

//     res.json({ url: url });
//     // sgMail
//     //   .send(emailData)
//     //   .then((sent) => {
//     //     return res.json({ msg: "email has been sent" });
//     //   })
//     //   .catch((err) => {
//     //     console.log("error");
//     //     return res.send(err.message);
//     //   });
//   });
// });

// module.exports = router;
