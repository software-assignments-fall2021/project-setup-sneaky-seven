// read env vars from .env file. Access variables in .env by 'process.env.MY_VARIABLE_NAME'
require("dotenv").config({ silent: true });
const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");
// import and instantiate express
const express = require("express");
// instantiate an Express object
const app = express();
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || "sandbox";

// PLAID_PRODUCTS is a comma-separated list of products to use when initializing
// Link. Note that this list must contain 'assets' in order for the app to be
// able to create and retrieve asset reports.
const PLAID_PRODUCTS = (process.env.PLAID_PRODUCTS || "transactions").split(
  ","
);

// PLAID_COUNTRY_CODES is a comma-separated list of countries for which users
// will be able to select institutions from.
const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || "US").split(
  ","
);

// Parameters used for the OAuth redirect Link flow.
// Set PLAID_REDIRECT_URI to 'http://localhost:3000'
// The OAuth redirect flow requires an endpoint on the developer's website
// that the bank website should redirect to. You will need to configure
// this redirect URI for your client ID through the Plaid developer dashboard
// at https://dashboard.plaid.com/team/api.
const PLAID_REDIRECT_URI = process.env.PLAID_REDIRECT_URI || "";

// We store the access_token in memory - in production, store it in a secure
// persistent data store
let ACCESS_TOKEN = null;
let PUBLIC_TOKEN = null;
let ITEM_ID = null;
// The payment_id is only relevant for the UK Payment Initiation product.
// We store the payment_id in memory - in production, store it in a secure
// persistent data store
let PAYMENT_ID = null;

// Initialize the Plaid client
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

const prettyPrintResponse = (response) => {
  console.log(response.data);
};

const formatError = (error) => {
  return {
    error: { ...error.data, status_code: error.status },
  };
};

const constructAccountsArr = (banks) => {
  const ret = [];
  banks.forEach(function (bank) {
    console.log(bank.account_id);
    console.log(bank.balances);
    const bankObj = {
      account_id: bank.account_id,
      balances: {
        available: bank.balances.available,
        current: bank.balances.current,
        currency: bank.balances.iso_currency_code,
      },
      name: bank.name,
      type: bank.type,
    };
    ret.push(bankObj);
  });
  console.log(ret);
  return ret;
};

// middleware for parsing incoming POST data
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data

// function to get categories from Plaid
app.get("/api/categories", async (req, resp) => {
  try {
    const response = await plaidClient.categoriesGet({});
    const categories = response.data.categories;
    resp.json(filterCategories(categories));
  } catch (error) {
    console.log(error.response.data);
  }
});

// Create a link token with configs which we can then use to initialize Plaid Link client-side.
// See https://plaid.com/docs/#create-link-token
app.post("/api/create_link_token", async (request, response) => {
  console.log("enter create_link_token");
  const configs = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: "user-id",
    },
    client_name: "Plaid Quickstart",
    products: PLAID_PRODUCTS,
    country_codes: PLAID_COUNTRY_CODES,
    language: "en",
  };

  if (PLAID_REDIRECT_URI !== "") {
    configs.redirect_uri = PLAID_REDIRECT_URI;
  }

  try {
    const createTokenResponse = await plaidClient.linkTokenCreate(configs);
    prettyPrintResponse(createTokenResponse);
    response.json(createTokenResponse.data);
  } catch (error) {
    prettyPrintResponse(error);
    return response.json(formatError(error.response));
  }
});

// Exchange token flow - exchange a Link public_token for
// an API access_token
// https://plaid.com/docs/#exchange-token-flow
app.post("/api/set_access_token", async (request, response, next) => {
  console.log("enter set_access_token");
  console.log(request.body);
  PUBLIC_TOKEN = request.body.public_token; // PUBLIC_TOKEN is a global constant
  console.log(PUBLIC_TOKEN);
  try {
    const tokenResponse = await plaidClient.itemPublicTokenExchange({
      public_token: PUBLIC_TOKEN,
    });
    prettyPrintResponse(tokenResponse);
    ACCESS_TOKEN = tokenResponse.data.access_token;
    ITEM_ID = tokenResponse.data.item_id;
    response.json({
      access_token: ACCESS_TOKEN,
      item_id: ITEM_ID,
      error: null,
    });
  } catch (error) {
    prettyPrintResponse(error.response);
    return response.json(formatError(error.response));
  }
});

// Gets the bank accounts associated with the Link
// https://plaid.com/docs/api/accounts/#accountsget
app.post("/api/get_bank_accounts", async (request, response, next) => {
  console.log("enter get_bank_accounts");
  try {
    const obj = JSON.parse(request.body.access_token_object);

    console.log("access token object parsed: " + obj);
    console.log(obj.access_token);

    ACCESS_TOKEN = obj.access_token;
    const res = await plaidClient.accountsGet({
      access_token: ACCESS_TOKEN,
    });
    const accounts = res.accounts;
    return response.json(constructAccountsArr(res.data.accounts));
  } catch (error) {
    console.log("ERROR:");
    prettyPrintResponse(error);
    return response.json({
      err: error,
    });
  }
});

/*
Contact Info get + post routes:
  - stores the confirmation message info
  - resets so calls to /contactConfirm will return default msg
  - stores temp in array until db implementation
*/
let contactInfo = {};
app.get("/contactInfo", async (req, resp) => {
  try {
    const confirmationMessage = contactInfo;
    contactInfo = {};
    console.log(confirmationMessage);
    resp.json(confirmationMessage);
  } catch (error) {
    console.log(error);
  }
});

app.post("/contactInfo", async (req, resp) => {
  try {
    contactInfo.name = req.body.name;
    contactInfo.email = req.body.email;
    contactInfo.message = req.body.message;
    resp.json(contactInfo);
  } catch (error) {
    console.log(error);
  }
});

function filterCategories(data) {
  const hierarchies = data.map((x) => x.hierarchy[0]);
  const categories = [...new Set(hierarchies)];
  console.log(categories);
  return categories;
}
// export the express app we created to make it available to other modules
module.exports = { app, filterCategories, prettyPrintResponse, formatError };
