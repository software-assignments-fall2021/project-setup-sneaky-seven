/**
 * Constructs array containing the transations of the bank accounts
 * provided.
 * @param {*} transactions
 * @param {*} accounts
 * @returns
 */
const constructTransactionArr = (transactions, accounts) => {
  const ret = [];
  const accountNameMap = accounts.reduce(
    (currentMap, { account_id, name }) => ({
      ...currentMap,
      [account_id]: name,
    }),
    {}
  );
  transactions.forEach(function (transaction) {
    // console.log(transaction.account_id);
    // console.log(transaction.amount);
    const name =
      transaction.merchant_name ??
      transaction.name.split(" ").slice(0, 2).join(" ");
    const tranObj = {
      id: transaction.transaction_id,
      account_id: transaction.account_id,
      account_name: accountNameMap[transaction.account_id],
      transaction_id: transaction.transaction_id,
      amount: transaction.amount,
      merchant: name,
      date: transaction.date,
      currency: transaction.iso_currency_code,
      category: transaction.category,
      location: transaction.location,
      transaction_code: transaction.transaction_code,
    };
    ret.push(tranObj);
  });
  // console.log(ret);
  return ret;
};

module.exports = constructTransactionArr;
