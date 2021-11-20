// import {
//   mocks,
//   getAllTransactions as _getAllTransactions,
//   getAccountInfo as _getAccountInfo,
// } from "./mocks";
import axios from "axios";

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
    throw err;
  }
}

async function postNewCategory(name, icon) {
  try {
    await axios.post("/api/categories", { name, icon });
  } catch (err) {
    console.error(err);
  }
}

/** @returns {Promise<_getAllTransactions>} */
async function getAllTransactions(days = 30, offset = 0) {
  try {
    const result = await axios.get("/api/get_transactions", {
      params: {
        time: days,
        ofst: offset,
        _id: sessionStorage.getItem("user")
          ? JSON.parse(sessionStorage.getItem("user"))._id
          : null,
      },
    });
    return result.data;
  } catch (err) {
    console.log(
      "Something went wrong. We're probably out of requests for the day!"
    );
    console.error(err);
    throw err;
  }
}

/** @returns {Promise<_getAllTransactions>} */
async function getRecentTransactions(count = 10) {
  try {
    const result = await getAllTransactions(90);
    const transactions =
      result.length > count ? result.slice(0, count) : result;
    return transactions;
  } catch (err) {
    console.error(err);
    throw err;
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
    throw err;
  }
}

const api = {
  postNewCategory,
  getCategoryList,
  getAllTransactions,
  getRecentTransactions,
  getTransactionById,
  getAccountInfo,
};

// if (MOCK) {
//   Object.assign(api, mocks);
// }

export default api;
