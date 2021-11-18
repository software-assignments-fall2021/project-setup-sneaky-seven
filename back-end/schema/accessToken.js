const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const accessTokenSchema = new mongoose.Schema({
    access_token: String, 
    item_id: String
});

module.exports = accessTokenSchema;