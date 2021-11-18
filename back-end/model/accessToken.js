const mongoose = require("mongoose");

const accessTokenSchema = new mongoose.Schema({
    access_token: String, 
    item_id: String
});

module.exports = mongoose.model('AccessToken', accessTokenSchema);