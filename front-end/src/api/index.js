import {
  mocks,
  getAllTransactions as _getAllTransactions,
  getAccountInfo as _getAccountInfo,
} from "./mocks";
import axios from "axios";
import React from "react";

const MOCK = false;

async function getCategoryList() {
  try {
    const result = await axios.get("/api/categories");
    return result.data;
  } catch (err) {
    console.log(
      "Something went wrong. We're probably out of requests for the day!"
    );
    console.error(err);
    return _getAllTransactions;
  }
}

// TODO(michelle): Remove this when we have a real database that stores real access tokens.
//    Access tokens should be stored in the DB (when we have a DB):
//    https://plaid.com/docs/api/tokens/#token-exchange-flow
const listeners = [];
let accessToken = localStorage.getItem("access_token");
function useAccessToken() {
  const [dummy, setDummy] = React.useState(0);

  React.useEffect(() => {
    if (dummy === 0) {
      listeners.push(setDummy);
      setDummy(1);
    }
  }, [dummy, setDummy]);

  const fetchToken = React.useCallback(async (public_token) => {
    const resp = await axios.post("/api/set_access_token", { public_token });
    accessToken = resp.data.access_token;
    localStorage.setItem("access_token", accessToken);
    listeners.forEach(listener => listener(d => d + 1));
  }, []);

  return { accessToken, fetchToken };
}

async function postNewCategory(name, icon) {
  try {
    await axios.post("/api/categories", { name, icon });
  } catch (err) {
    console.error(err);
  }
}

/** @returns {Promise<_getAllTransactions>} */
async function getAllTransactions() {
  // TODO: fetch actual data
  try {
    const result = await axios.get("/api/get_transactions");
    return result.data;
  } catch (err) {
    console.log(
      "Something went wrong. We're probably out of requests for the day!"
    );
    console.error(err);
    return _getAllTransactions;
  }
}

/** @returns {Promise<_getAllTransactions>} */
async function getRecentTransactions() {
  try {
    const result = await axios("/api/get_transactions");
    return result.data;
  } catch (err) {
    console.error(err);
    return _getAllTransactions;
  }
}

async function getTransactionById(id) {
  const transactions = await getAllTransactions();
  console.log("getting");
  return transactions.find((transaction) => transaction.transaction_id === id);
}

async function getAccountInfo() {
  try {
    const result = axios(
      "https://my.api.mockaroo.com/budget_app_accounts.json?key=9a5445a0"
    );
    return result.data;
  } catch (err) {
    console.log(
      "Something went wrong. We're probably out of requests for the day!"
    );
    console.error(err);
    return _getAccountInfo;
  }
}

const api = {
  postNewCategory,
  getCategoryList,
  getAllTransactions,
  getRecentTransactions,
  getTransactionById,
  getAccountInfo,
  useAccessToken
};

if (MOCK) {
  Object.assign(api, mocks);
}

export default api;
