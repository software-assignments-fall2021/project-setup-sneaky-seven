import { mocks, getAllTransactions as _getAllTransactions } from "./mocks";
const MOCK = true;

const api = {
  /** @returns {Promise<_getAllTransactions>} */
  async getAllTransactions() {
    // TODO: fetch actual data
  },
};

if (MOCK) {
  Object.assign(api, mocks);
}

export default api;
