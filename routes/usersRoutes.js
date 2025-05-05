const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send("Error fetching users");
  }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching user");
  }
});

// Edit User
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const updatedUser = await users.findByIdAndUpdate(id, updates, { new: true });
 
    !updatedUser && res.json({ message: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    res.json({ error: 'Server error' });
  }
});

// Remove User
router.post("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.RemoveAll(id);

    !user && res.status(404).send("User not found");
    return res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error removing user");
  }
});

module.exports = router;
