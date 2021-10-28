// read env vars from .env file. Access variables in .env by 'process.env.MY_VARIABLE_NAME'
require("dotenv").config({ silent: true })
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid')
// import and instantiate express
const express = require("express") 
// instantiate an Express object
const app = express() 
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID
const PLAID_SECRET = process.env.PLAID_SECRET
const PLAID_ENV = process.env.PLAID_ENV || 'sandbox'

// PLAID_PRODUCTS is a comma-separated list of products to use when initializing
// Link. Note that this list must contain 'assets' in order for the app to be
// able to create and retrieve asset reports.
const PLAID_PRODUCTS = (process.env.PLAID_PRODUCTS || 'transactions').split(
  ',',
)

// PLAID_COUNTRY_CODES is a comma-separated list of countries for which users
// will be able to select institutions from.
const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || 'US').split(
  ',',
)

// Parameters used for the OAuth redirect Link flow.
// Set PLAID_REDIRECT_URI to 'http://localhost:3000'
// The OAuth redirect flow requires an endpoint on the developer's website
// that the bank website should redirect to. You will need to configure
// this redirect URI for your client ID through the Plaid developer dashboard
// at https://dashboard.plaid.com/team/api.
const PLAID_REDIRECT_URI = process.env.PLAID_REDIRECT_URI || ''

// We store the access_token in memory - in production, store it in a secure
// persistent data store
let ACCESS_TOKEN = null
let PUBLIC_TOKEN = null
let ITEM_ID = null
// The payment_id is only relevant for the UK Payment Initiation product.
// We store the payment_id in memory - in production, store it in a secure
// persistent data store
let PAYMENT_ID = null

// Initialize the Plaid client
const configuration = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
      'PLAID-SECRET': PLAID_SECRET,
      'Plaid-Version': '2020-09-14',
    },
  },
})

const plaidClient = new PlaidApi(configuration)

// middleware for parsing incoming POST data
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// function to get categories from Plaid
app.get('/api/categories', async (req, resp) => {
    try {
        const response = await plaidClient.categoriesGet({})
        const categories = response.data.categories
        console.log(categories)
        resp.json(categories)
    } catch (error) {
        console.log(error.response.data)
    }
})
// export the express app we created to make it available to other modules
module.exports = app