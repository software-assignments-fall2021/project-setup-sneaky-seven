import React, { useState } from "react";

/**
 * 
 * @param {*} callback  For if something is clicked. Change react state hook
 */
const BalanceByAccount = ({ account, balance, onClick, selectedAccounts }) => {
    return (
      <article 
        className={ selectedAccounts && selectedAccounts[account] && onClick ? "balanceByAccountActive" : "balanceByAccount" } 
        onClick={onClick}>
      <div className="left">
        <p className="bold">{account}</p>
      </div>
      <div className="right">
        <p>Balance: <strong><em>${balance.toFixed(2)}</em></strong></p>
      </div>
      </article>
  );
};

// accountToBalance is an object which maps: account => balance
// If callbacks is defined, add a checkbox and check it if onclick
const BalanceByAccountList = ({ accountToBalance, selectedAccounts, callbacks }) => {
  return (
    <div className="transparentContainer">
      {Object.keys(accountToBalance).length !== 0 ?
      Object.entries(accountToBalance).map(([account, balance]) => (
        <BalanceByAccount 
          key={account} 
          account={account} 
          balance={balance}
          onClick={callbacks ? callbacks[account] : null}
          selectedAccounts={selectedAccounts} 
        />
      )) : <h2>Loading</h2>}
    </div>
  );
};

export default BalanceByAccountList;