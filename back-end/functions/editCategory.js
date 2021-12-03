const AccessTokenModel = require("../model/accessToken");
const UserModel = require("../model/user");

// Function to post access_token to database
// Mongoose quickstart: https://mongoosejs.com/docs/index.html
const editCategory = async (category, userId) => {
  const found = await UserModel.exists({
    _id: userId,
    "categories.name": category.oldName,
  });
  UserModel.updateOne(
    { _id: userId, "categories.name": category.oldName },
    {
      $set: {
        "categories.$.name": category.name,
        "categories.$.icon": category.icon,
      },
    },
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully changed category name");
      }
    }
  );
  return found;
};

module.exports = editCategory;
