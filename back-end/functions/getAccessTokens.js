const AccessTokenModel = require('../model/accessToken');
const UserModel = require("../model/user");

const getAccessTokens = async ( userId ) => {
    const accessTokensArr = UserModel.findById({'_id': userId}).select('access_token');
    console.log("access token query from db: " + accessTokensArr);
    return accessTokensArr;
}

module.exports = getAccessTokens;