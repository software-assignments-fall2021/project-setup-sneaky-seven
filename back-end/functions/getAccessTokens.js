const AccessTokenModel = require("../model/accessToken");
const UserModel = require("../model/user");

const getAccessTokens = async (userId) => {
  const accessTokensArr = await UserModel.findById({ _id: userId })
    .select("access_token")
    .exec();
  return accessTokensArr.access_token; // return empty array if no query found or if error
};

module.exports = getAccessTokens;
