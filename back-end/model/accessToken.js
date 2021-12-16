const mongoose = require("mongoose");
const accessTokenSchema = require('../schema/accessToken')

module.exports = mongoose.model('accessToken', accessTokenSchema);