import React, { useState } from "react";

/**
 * 
 * @param {*} callback  For if something is clicked. Change react state hook
 */
const BalanceByAccount = ({ account, balance, onClick }) => {
    const [selected, setSelected] = useState(true);

    return (
      <article 
        className={ selected && onClick ? "balanceByAccountActive" : "balanceByAccount" } 
        onClick={() => {
          if (onClick) {
            onClick();
            setSelected(!selected);
          }
        }}>
      <div className="left">
        <p className="bold">{account}</p>
      </div>
      <div className="right">
        <p>Balance: ${balance.toFixed(2)}</p>
      </div>
      </article>
  );
};

// accountToBalance is an object which maps: account => balance
// If callbacks is defined, add a checkbox and check it if onclick
const BalanceByAccountList = ({ accountToBalance, callbacks }) => {
  return (
    <div className="transparentContainer">
      {Object.keys(accountToBalance).length !== 0 ?
      Object.entries(accountToBalance).map(([account, balance]) => (
        <BalanceByAccount 
          key={account} 
          account={account} 
          balance={balance}
          onClick={callbacks ? callbacks[account] : null} 
        />
      )) : <h2>Loading</h2>}
    </div>
  );
};

export default BalanceByAccountList;