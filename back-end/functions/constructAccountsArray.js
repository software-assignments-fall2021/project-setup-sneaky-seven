/**
 * Constructs a cleaned, formatted array containing the banks provided
 * under a given account along with the available and current balance.
 * @param {*} banks 
 * @returns 
 */
const constructAccountsArr = (banks) => {
    const ret = [];
    banks.forEach(function (bank) {
      console.log(bank.account_id);
      console.log(bank.balances);
      const bankObj = {
        account_id: bank.account_id,
        balances: {
          available: bank.balances.available,
          current: bank.balances.current,
          currency: bank.balances.iso_currency_code,
        },
        name: bank.name,
        type: bank.type,
      };
      ret.push(bankObj);
    });
    console.log(ret);
    return ret;
  };

  module.exports = constructAccountsArr;