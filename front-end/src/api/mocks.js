/** Delays a random amount of time and resolves with the data */
const delayed = (data, ms = Math.random() * 4) => {
  return (...args) => {
    const value = typeof data === "function" ? data(...args) : data;
    return new Promise((resolve) => setTimeout(() => resolve(value), ms));
  };
};

/** Takes an object and creates a new object where the values return the values of the original object, with a random delay */
const composeMocks = (object) =>
  Object.entries(object).reduce(
    (transformed, [key, value]) => ({
      ...transformed,
      [key]: delayed(value),
    }),
    {}
  );

export const getAllTransactions = [
  {
    id: 1,
    merchant: "Chikfila",
    category: "food",
    account: "Checking",
    amount: -45.56,
    currency: "USD",
    date: 1635106677792,
  },
  {
    id: 2,
    merchant: "McDonalds",
    category: "food",
    account: "Checking",
    amount: 45.56,
    currency: "USD",
    date: 1635106677792,
  },
  {
    id: 3,
    merchant: "Best Buy",
    category: "shopping",
    account: "Checking",
    amount: 400,
    currency: "USD",
    date: 1635106677792,
  },
];

export function getTransactionById(id) {
  return getAllTransactions.find((transaction) => transaction.id === id);
}

export const mocks = composeMocks({
  getAllTransactions,
  getTransactionById,
});
