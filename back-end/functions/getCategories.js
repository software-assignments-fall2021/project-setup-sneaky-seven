const AccessTokenModel = require("../model/accessToken");
const UserModel = require("../model/user");

const getCategories = async (userId) => {
  const categories = await UserModel.findById({ _id: userId })
    .select("categories")
    .exec();
  return categories;
};

module.exports = getCategories;
