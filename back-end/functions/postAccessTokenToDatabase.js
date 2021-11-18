const AccessTokenModel = require('../model/accessToken');

// Function to post access_token to database  
// Mongoose quickstart: https://mongoosejs.com/docs/index.html
// TODO: finalize the structure of storing access_token. 
const postAccessTokenToDatabase = async ( access_token_object ) => {
  // create a schema instance 
  const accessTokenInstance = new AccessToken(access_token_object);
  // save to database
  await accessTokenInstance.save();
};

module.exports = postAccessTokenToDatabase;