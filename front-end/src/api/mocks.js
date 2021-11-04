import { timeout, mapValues } from "../utils";

/** Delays a random amount of time and resolves with the data */
const delayed = (data, ms = Math.random() * 4) => {
  return async (...args) => {
    const value = typeof data === "function" ? data(...args) : data;
    await timeout(ms);
    return value;
  };
};

export const getAllTransactions = [
  {
    id: 1,
    merchant: "Chikfila",
    category: "food",
    account: "Checking",
    amount: -45.56,
    currency: "USD",
    date: "2021-10-05T14:48:00.000Z",
  },
  {
    id: 2,
    merchant: "McDonalds",
    category: "food",
    account: "Checking",
    amount: 45.56,
    currency: "USD",
    date: "2021-10-05T14:48:00.000Z",
  },
  {
    id: 3,
    merchant: "Best Buy",
    category: "shopping",
    account: "Checking",
    amount: 400,
    currency: "USD",
    date: "2021-10-05T14:48:00.000Z",
  },
];

export function getTransactionById(id) {
  return getAllTransactions.find((transaction) => transaction.id === id);
}

export const getAccountInfo = [
  {
    bankName: "Bank of America - Cash Rewards Mastercard",
    type: "card",
    bankId: "33b7e620-4ffd-4352-a0d7-3e36bacd40d6",
  },
  {
    bankName: "Bank of America - Advantage Plus Banking",
    type: "card",
    bankId: "ddd6048e-4a10-408e-a606-9c7fffcfbd20",
  },
  {
    bankName: "JP Morgan Chase - Student Checking Account",
    type: "cash",
    bankId: "5752ca81-5c37-4226-909d-7f6ae1b0f453",
  },
  {
    bankName: "Discover it Student Cash Back",
    type: "card",
    bankid: "ae0c0a2f-ca19-481c-adf5-1a905d0c7c13",
  },
];

/** Takes an object and creates a new object where the values return the values of the original object, with a random delay */
export const mocks = mapValues(
  {
    getAllTransactions,
    getTransactionById,
    getAccountInfo,
  },
  delayed
);
