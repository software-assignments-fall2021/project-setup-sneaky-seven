const accessTokenSchema = require('../schemas/accessTokenSchema');

// Function to post access_token to database  
// Mongoose quickstart: https://mongoosejs.com/docs/index.html
// TODO: finalize the structure of storing access_token. 
const postAccessTokenToDatabase = async ( access_token_object ) => {
  // step 1: construct schema (imported from '../schemas/accessTokenSchema')

  // Step 2: compile schema to model 
  const AccessToken = mongoose.model('AccessToken', accessTokenSchema);

  // Step 3: create a schema instance 
  const accessTokenInstance = new AccessToken(access_token_object);

  // Step 4: save to database
  await accessTokenInstance.save();
};

module.exports = postAccessTokenToDatabase;