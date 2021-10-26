import { mocks, getAllTransactions as _getAllTransactions } from "./mocks";
import axios from "axios";

const MOCK = false;

/** @returns {Promise<_getAllTransactions>} */
async function getAllTransactions() {
  // TODO: fetch actual data
  const result = await axios(
    "https://my.api.mockaroo.com/budget_web_app.json?key=d9fa63b0"
  );
  // console.log(result);
  return result.data;
}
async function getTransactionById(id) {
  return (await getAllTransactions()).find(
    (transaction) => transaction.id === id
  );
}
const api = {
  getAllTransactions,
  getTransactionById,
};

if (MOCK) {
  Object.assign(api, mocks);
}

export default api;
