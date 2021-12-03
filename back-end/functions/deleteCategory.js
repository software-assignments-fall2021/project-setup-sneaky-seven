const AccessTokenModel = require("../model/accessToken");
const UserModel = require("../model/user");

// Mongoose quickstart: https://mongoosejs.com/docs/index.html
const editCategory = async (category, userId) => {
  const found = await UserModel.exists({
    _id: userId,
    "categories.name": category.name,
    "categories.icon": category.icon,
  });
  UserModel.updateOne(
    {
      _id: userId,
      "categories.name": category.name,
      "categories.icon": category.icon,
    },
    { $pull: { categories: { name: category.name } } },
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully deleted category name", category.name);
      }
    }
  );
  return found;
};

module.exports = editCategory;
