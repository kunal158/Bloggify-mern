// routes/protectedRoute.js
const express = require("express");
const router = express.Router();
const verifytoken = require("../verifytoken");

// Protected route
router.get("/protected-route", verifytoken, (req, res) => {
  // Access user id from req.userId
  const userId = req.userId;
  // Your protected route logic here
  res.json({ message: "Access granted to protected route", userId });
});

module.exports = router;
