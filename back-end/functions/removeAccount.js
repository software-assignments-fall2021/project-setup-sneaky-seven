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

/**
 * Removes the access token of the account specified from the DB
 * @param {*} curAccountName
 * @param {*} accessTokensArr
 * @param {*} userId
 * @returns true if account was removed, false otherwise
 */
const removeAccount = async (curAccountName, curAccountId, accessTokensArr, userId) => {
  try {
    for (const token of accessTokensArr) {
      const tempAccount = await plaidClient.accountsGet({
        access_token: token.access_token,
      });
      // prevent null errors if tempAccount.data.accounts is null or anything is null
      const accountArr = tempAccount?.data?.accounts ? tempAccount?.data?.accounts : [];
      // check each bank's accounts to see if account to be removed exists
      for (const accountObj of accountArr) {
        console.log(accountObj.account_id);
        console.log(curAccountId);
        if (accountObj.name === curAccountName && accountObj.account_id === curAccountId) {
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
    // if we get here, then we did not remove anything
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = removeAccount;
