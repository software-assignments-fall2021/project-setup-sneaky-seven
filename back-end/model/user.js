const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
  jwt_token: { type: String },
  access_token: { type: [String] }
}, { strict: false });

module.exports = mongoose.model("user", userSchema);