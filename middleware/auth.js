const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "no authorization" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    if (decoded.id) {
      req.id = decoded.id;
    } else {
      req.id = decoded.user.id;
    }
    next();
  } catch (err) {
    res.status(401).json({ msg: "token invalid" });
  }
};
