/**
 * Constructs array containing the transations of the bank accounts
 * provided.
 * @param {*} transactions
 * @param {*} accounts
 * @returns
 */
const constructTransactionArr = (transactions, accounts, txCatArr) => {
  const ret = [];
  const accountNameMap = accounts.reduce(
    (currentMap, { account_id, name }) => ({
      ...currentMap,
      [account_id]: name,
    }),
    {}
  );

  transactions.forEach(function (transaction) {
    const txDB = txCatArr?.find(
      (tx) => tx.transaction_id === transaction.transaction_id
    );
    const cat = txDB ? txDB.category : transaction.category[0];
    const note = txDB ? txDB.notes : "";
    const name =
      transaction.merchant_name ??
      transaction.name.split(" ").slice(0, 5).join(" ");
    const tranObj = {
      id: transaction.transaction_id,
      account_id: transaction.account_id,
      account_name: accountNameMap[transaction.account_id],
      transaction_id: transaction.transaction_id,
      amount: transaction.amount,
      merchant: name,
      date: transaction.date,
      currency: transaction.iso_currency_code,
      category: cat,
      location: transaction.location,
      transaction_code: transaction.transaction_code,
      notes: note,
    };
    ret.push(tranObj);
  });
  // console.log(ret);
  return ret;
};

module.exports = constructTransactionArr;
