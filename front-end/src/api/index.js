import {
  mocks,
  getAllTransactions as _getAllTransactions,
  getAccountInfo as _getAccountInfo,
} from "./mocks";
import { mapValues } from "../utils";
import axios from "axios";

const MOCK = false;

/** @returns {Promise<_getAllTransactions>} */
async function getAllTransactions() {
  // TODO: fetch actual data
  try {
    const result = await axios(
      "https://my.api.mockaroo.com/budget_web_app.json?key=d9fa63b0"
    );
    return result.data;
  } catch (err) {
    console.log(
      "Something went wrong. We're probably out of requests for the day!"
    );
    console.error(err);
    return _getAllTransactions;
  }
}

async function getTransactionById(id) {
  const transactions = await api.getAllTransactions();
  return transactions.find((transaction) => transaction.id === id);
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
  getAllTransactions,
  getTransactionById,
  getAccountInfo,
};

if (MOCK) {
  Object.assign(api, mocks);
}

export default api;
