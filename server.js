const express = require("express");
const app = express();
const connectDB = require("./config/db");

// connect the database
connectDB();

//init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("helloworld");
});

// const { forgetpw } = require("./routes/forgetpw");
// const { resetpw } = require("./routes/resetpw");

const PORT = process.env.PORT || 5000;

// define routes
app.use("/api/users", require("./routes/users")); //get all, update, delete
app.use("/api/auth", require("./routes/auth"));

//forget reset password
app.use("/api/forget", require("./routes/forgetpw"));
app.use("/api/reset", require("./routes/resetpw"));
// app.use("/api/google", require("./routes/google"));
app.use("/api/facebook", require("./routes/facebook"));

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
