require("dotenv").config({ silent: true });
const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");
const UserModel = require("../model/user");

// Initialize the Plaid client
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || "sandbox";

const configuration = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": PLAID_CLIENT_ID,
      "PLAID-SECRET": PLAID_SECRET,
      "Plaid-Version": "2020-09-14",
    },
  },
});

const plaidClient = new PlaidApi(configuration);

const removeAccount = async (curAccountName, accessTokensArr, userId) => {
  try {
    console.log("USER ID: " + userId);
    for (const token of accessTokensArr) {
      const tempAccount = await plaidClient.accountsGet({
        access_token: token.access_token,
      });
      // check each bank's accounts to see if account to be removed exists
      for (const accountObj of tempAccount.data.accounts) {
        if (accountObj.name === curAccountName) {
          UserModel.updateOne(
            { _id: userId },
            { $pull: { access_token: token } },
            function (err) {
              if (err) {
                console.log(err);
              } else {
                console.log("Successfully removed access token from db.");
              }
            }
          );

          return true; // stop iterating, account already removed
        }
      }
    }
    return false;
  } catch (error) {
    console.log(error);
    return false; // default to true so nothing is posted to DB
  }
};

module.exports = removeAccount;
