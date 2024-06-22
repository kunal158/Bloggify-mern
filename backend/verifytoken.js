// verifytoken.js
const jwt = require("jsonwebtoken");

const verifytoken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json("You are not authenticated!");
  }

  jwt.verify(token, process.env.SECRET, (err, data) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }

    req.userId = data._id; // Add the decoded user ID to the request object

    next();
  });
};

module.exports = verifytoken;
