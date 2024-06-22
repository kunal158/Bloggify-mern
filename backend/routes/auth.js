const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Function to check if the connection is secure (HTTPS)
function isSecure(req) {
  if (req.secure) {
    // Request was via HTTPS, so it's secure
    return true;
  } else if (req.get("x-forwarded-proto") === "https") {
    // Request was via HTTP, but forwarded through a proxy
    return true;
  } else {
    // Otherwise, assume request was via HTTP
    return false;
  }
}

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json("User not found!");
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(401).json("Wrong credentials!");
    }

    const token = jwt.sign(
      { _id: user._id, username: user.username, email: user.email },
      process.env.SECRET,
      { expiresIn: "3d" }
    );

    const { password, ...info } = user._doc;
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true, // Set secure to true if your site is served over HTTPS
        sameSite: "none", // SameSite attribute for cross-site cookies
      })
      .status(200)
      .json(info);
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json(err);
  }
});

//LOGOUT
router.get("/logout", async (req, res) => {
  try {
    const cookieOptions = {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      secure: isSecure(req), // Set secure to true if connection is secure (HTTPS)
      expires: new Date(0), // Expire the cookie immediately
    };

    res
      .clearCookie("token", cookieOptions)
      .status(200)
      .send("User logged out successfully!");
  } catch (err) {
    console.error("Error during logout:", err);
    res.status(500).json(err);
  }
});

//REFETCH
router.get("/refetch", async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json("No token found!");
  }

  jwt.verify(token, process.env.SECRET, {}, async (err, data) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }

    const user = await User.findById(data._id);

    if (!user) {
      return res.status(404).json("User not found!");
    }
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://bloggify-ui--cyan.vercel.app"
    ); // Set your frontend URL here
    res.status(200).json({
      username: user.username,
      email: user.email,
      _id: user._id,
    });
  });
});

module.exports = router;
