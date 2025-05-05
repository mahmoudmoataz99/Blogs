const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/signup", async (req, res) => {
  const { First_Name, Last_Name, email, Password } = req.body;

  if (!First_Name || !Last_Name || !email || !Password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: "Email already in use" });

    const newUser = new User({
      First_Name,
      Last_Name,
      email,
      Password, 
      Last_Login: new Date(),
    });

    await newUser.save();
    res.status(201).json({ message: "Signup successful", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Signup error", error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, Password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.Password !== Password) {
      return res.status (401).json({ message: "Invalid email or password" });
    }

    user.Last_Login = new Date();
    await user.save();

    res.status(200).json({ message: "Login successful", user });
    res.status(200).json({ 
     message: "Login successful", 
     user: {_id: user._id,email: user.email,First_Name: user.First_Name,Last_Name: user.Last_Name}});
   
  } catch (error) {
    res.status(500).json({ message: "Login error", error: error.message });
  }
});

module.exports = router;
