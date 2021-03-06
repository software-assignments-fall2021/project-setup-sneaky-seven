const AccessTokenModel = require("../model/accessToken");
const UserModel = require("../model/user");

// Function to post access_token to database
// This should never be called if the account being added is a duplicate
// Mongoose quickstart: https://mongoosejs.com/docs/index.html
const postAccessTokenToDatabase = async (access_token_object, userId) => {
  // create a schema instance
  const accessTokenInstance = new AccessTokenModel(access_token_object);
  // save to database
  UserModel.updateOne(
    { _id: userId },
    { $push: { access_token: accessTokenInstance } },
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully pushed new access token to user in db.");
      }
    }
  );

  await accessTokenInstance.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully saved new access token to db.");
    }
  });
  return true;
};

module.exports = postAccessTokenToDatabase;
