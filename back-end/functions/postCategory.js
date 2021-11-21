const AccessTokenModel = require("../model/accessToken");
const UserModel = require("../model/user");

// Function to post access_token to database
// Mongoose quickstart: https://mongoosejs.com/docs/index.html
const postCategory = async (category, userId) => {
  const duplicate = await UserModel.exists({
    _id: userId,
    "categories.name": category.name,
  });
  if (!duplicate) {
    UserModel.findOneAndUpdate(
      { _id: userId, "categories.name": { $ne: category.name } },
      { $push: { categories: category } },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully added new category");
        }
      }
    );
  }
  return duplicate;
};

module.exports = postCategory;
