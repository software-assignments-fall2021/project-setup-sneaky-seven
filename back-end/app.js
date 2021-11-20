const { DateTime } = require("luxon");
// read env vars from .env file. Access variables in .env by 'process.env.MY_VARIABLE_NAME'
require("dotenv").config({ silent: true });
const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");
// import and instantiate express
const express = require("express");
// instantiate an Express object
const app = express();
// import mongoose module to connect to MongoDB Atlas
const mongoose = require("mongoose");
// import jsonwebtoken for user login
const jwt = require("jsonwebtoken");

// import constants (to be removed once they are in DB)
const categories = require("./constants/categories");
const FAQData = require("./constants/FAQData");
// import functions

const constructAccountsArr = require("./functions/constructAccountsArray");
const constructTransactionArr = require("./functions/constructTransactionArray");
const prettyPrintResponse = require("./functions/prettyPrintResponse");
const formatError = require("./functions/formatError");
const postAccessTokenToDatabase = require("./functions/postAccessTokenToDatabase");
const getAccessTokens = require("./functions/getAccessTokens");

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

// Database config
const DB_URL = process.env.DB_URL;
const DB_PARAMS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(DB_URL, DB_PARAMS)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });
// importing user context
const UserModel = require("./model/user");
const getTransactionsForAccount = require("./functions/getTransactions");

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

// middleware for parsing incoming POST data
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data

// Get user info from frontend and sign
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res.status(400).send("All input is required.");
    }

    // Validate if user exist in our database
    const user = await UserModel.findOne({ email });
    if (user && password == user.password) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_SECRET_KEY
      );

      // save user token
      user.jwt_token = token;
      await user.save();

      res.status(200).json(user);
    } else if (user == null) {
      res.status(404).send("Email is not registered. Please register.");
    } else {
      res.status(401).send("Invalid Credentials. Please try again.");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res.status(400).send("All input is required.");
    } else if (password.length < 7) {
      return res.status(400).send("Password must have length greater than 7.");
    }

    // Validate if user exist in our database
    const oldUser = await UserModel.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User already exist. Please log in");
    }

    // New user. Create user in our database
    const user = await UserModel.create({
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email }, // when create a new document, Mongoose automatically add '_id' property
      process.env.TOKEN_SECRET_KEY
    );

    // save user token
    user.jwt_token = token;
    // save user to database so we can access and update array of access tokens
    await user.save();

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

// function to get categories from Plaid
app.get("/api/categories", async (req, resp) => {
  try {
    resp.json(categories);
  } catch (error) {
    console.log(error.response.data);
  }
});

app.post("/api/categories", async (req, resp) => {
  console.log(req.body);
  categories.push(req.body);
  categories.sort((a, b) => a.name.localeCompare(b.name));

  resp.json({});
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
  const id = request.body._id;
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

    // complete posting access_token to database
    postAccessTokenToDatabase(
      {
        access_token: ACCESS_TOKEN,
        item_id: ITEM_ID,
      },
      id
    );
  } catch (error) {
    prettyPrintResponse(error.response);
    return response.json(formatError(error.response));
  }
});

// Gets the bank accounts associated with the Link
// https://plaid.com/docs/api/accounts/#accountsget
app.post("/api/get_bank_accounts", async (req, response, next) => {
  console.log("enter get_bank_accounts");
  try {
    const obj = req.body.access_token_object;
    const userId = req.body._id;
    ACCESS_TOKEN = obj.access_token;

    const accessTokensArr = await getAccessTokens(userId);

    const allAccounts = [];
    for (const token of accessTokensArr) {
      const tempAccount = await plaidClient.accountsGet({
        access_token: token.access_token,
      });
      for (const accountObj of tempAccount.data.accounts) {
        allAccounts.push(accountObj);
      }
    }
    return response.json(constructAccountsArr(allAccounts));
  } catch (error) {
    console.log("get_bank_accounts error:");
    prettyPrintResponse(error);
    // unauthorized if no access token, else forbidden access
    response.status(400);
    return response.json({
      err: error,
    });
  }
});

// Gets transactions assosiated with the account which the ACESS_TOKEN belongs to
// https://plaid.com/docs/api/products/#transactionsget
app.get("/api/get_transactions", async (request, response) => {
  console.log("getting transactions");
  try {
    let allTransactions = [];
    const userId = request.query._id;

    const accessTokensArr = await getAccessTokens(userId);
    console.log(accessTokensArr);
    days = request.query.time;
    dayOffset = request.query.ofst;
    const now = DateTime.now();
    endDate = now.minus({ days: dayOffset }).toFormat("yyyy-MM-dd");
    startDate = now
      .minus({ days: dayOffset })
      .minus({ days: days })
      .toFormat("yyyy-MM-dd");

    for (const token of accessTokensArr) {
      allTransactions = allTransactions.concat(
        await getTransactionsForAccount(
          token.access_token,
          startDate,
          endDate,
          plaidClient
        )
      );
    }
    // console.log(allTransactions);
    allTransactions.sort(function (a, b) {
      return (
        DateTime.fromISO(b.date).toMillis() -
        DateTime.fromISO(a.date).toMillis()
      );
    });
    return response.json(allTransactions);
  } catch (error) {
    console.log("ERROR:");
    console.log(error);
    prettyPrintResponse(error);
    return response.status(500).json({
      err: error,
    });
  }
});

app.get("/faq", async (req, resp) => {
  resp.json(FAQData);
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

// export the express app we created to make it available to other modules
module.exports = { app, prettyPrintResponse, formatError };
