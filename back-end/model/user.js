const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
  jwt_token: { type: String },
});

module.exports = mongoose.model("user", userSchema);