const mongoose = require("mongoose");
const AccessTokenSchema = require("../schema/accessToken");
const TransactionsSchema = require("../schema/transactions");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: { type: String },
    jwt_token: { type: String },
    transactions: { type: [TransactionsSchema] },
    access_token: { type: [AccessTokenSchema] },
  },
  { strict: false }
);

module.exports = mongoose.model("user", userSchema);
