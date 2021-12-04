import React from "react";
import BarChart from "../Charts/BarChart";
import "../../css/balanceByAccount.css";

// Idea: Balance by account could have a button that says show trend
// And we expand it

const BalanceByAccount = ({ account, balance }) => {
  return (
    <article className="balanceByAccount">
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
const BalanceByAccountList = ({ accountToBalance }) => {
  return (
    <div>
      <h1>Current Balance by Account</h1>
      {Object.entries(accountToBalance).map(([account, balance]) => (
        <BalanceByAccount key={account} account={account} balance={balance} />
      ))}
    </div>
  );
};

const Balance = ({ stats }) => {
  return (
    <>
      <br />
      <div className="container-s">
        <h1>Total Balance Trend</h1>
        <BarChart data={stats.balanceTrend} />
        <br />
        <hr />
        <br />
        
      </div>
      <BalanceByAccountList accountToBalance={stats.accountToBalance} />
    </>
  );
};

export default Balance;
