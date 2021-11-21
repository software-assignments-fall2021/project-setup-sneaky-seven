const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const transactionsSchema = new mongoose.Schema({
  transaction_id: String,
  category: String,
  notes: String,
});

module.exports = transactionsSchema;
