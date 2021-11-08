import React from "react";

const BalanceByAccount = ({ account, balance }) => {
  return (
    <article className="balanceByAccount">
      <div className="left">
        <p className="bold">Chase</p>
      </div>
      <div className="right">
        <p>Current Balance: {balance}</p>
      </div>
    </article>
  );
};

// accountToBalance is an object which maps: account => balance
const BalanceByAccountList = ({ accountToBalance }) => {
  return (
    <div>
      {Object.getOwnPropertyNames(accountToBalance).map((account) => (
        <BalanceByAccount
          account={account}
          balance={accountToBalance[account]}
        />
      ))}
    </div>
  );
};

export default BalanceByAccountList;
