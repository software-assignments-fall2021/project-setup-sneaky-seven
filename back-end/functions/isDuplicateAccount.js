require("dotenv").config({ silent: true });
const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");

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

const isDuplicateAccount = async (
  curAccountName,
  curAccountMask,
  accessTokensArr
) => {
  for (const token of accessTokensArr) {
    const tempAccount = await plaidClient.accountsGet({
      access_token: token.access_token,
    });
    // check each bank's accounts to see if any duplicates exist
    for (const accountObj of tempAccount.data.accounts) {
      if (
        accountObj.name === curAccountName &&
        accountObj.mask === curAccountMask
      ) {
        return true; // stop iterating, this account is duplicate
      }
    }
  }
  return false;
};

module.exports = isDuplicateAccount;
