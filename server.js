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

const PORT = process.env.PORT || 5000;

// define routes
app.use("/api/users", require("./routes/users")); //get all, update, delete
app.use("/api/auth", require("./routes/auth"));

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
