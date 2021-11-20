const constructTransactionArr = require("./constructTransactionArray");

const getTransactionsForAccount = async (
  token,
  startDate,
  endDate,
  plaidClient
) => {
  const params = {
    access_token: token,
    start_date: startDate,
    end_date: endDate,
    options: {
      count: 100,
      offset: 0,
    },
  };

  const result = await plaidClient.transactionsGet(params);
  let transactions = result.data.transactions;
  const total_transactions = result.data.total_transactions;
  // Manipulate the offset parameter to paginate
  // transactions and retrieve all available data
  while (transactions.length < total_transactions) {
    const paginatedRequest = {
      access_token: token,
      start_date: startDate,
      end_date: endDate,
      options: {
        count: 100,
        offset: transactions.length,
      },
    };
    const paginatedResponse = await plaidClient.transactionsGet(
      paginatedRequest
    );
    transactions = transactions.concat(paginatedResponse.data.transactions);
  }
  //   console.log(result.data);
  const accounts = result.data.accounts;

  return constructTransactionArr(transactions, accounts);
};
module.exports = getTransactionsForAccount;
