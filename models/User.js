const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  First_Name: { type: String, required: true },
  Last_Name: { type: String, required: true },
  Password: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
  },
  Last_Login: { type: Date }
});

module.exports = mongoose.model("User", UserSchema);
