const AccessTokenModel = require('../model/accessToken');
const UserModel = require("../model/user");

// Function to post access_token to database  
// Mongoose quickstart: https://mongoosejs.com/docs/index.html
const postAccessTokenToDatabase = async ( access_token_object, userId ) => {
  // create a schema instance 
  const accessTokenInstance = new AccessTokenModel(access_token_object);
  // save to database
  UserModel.updateOne({ _id: userId },
    { $push: {access_token: accessTokenInstance} }, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("Successfully pushed new access token to user in db.");
      }
    })

  accessTokenInstance.save(function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("Successfully saved new access token to db.");
    }
  });
};

module.exports = postAccessTokenToDatabase;