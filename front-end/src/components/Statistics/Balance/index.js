import React from "react";
import BarChart from "../Charts/BarChart";
import "../../css/balanceByAccount.css";

const BalanceByAccount = ({ account, balance }) => {
  return (
    <article className="balanceByAccount">
      <div className="left">
        <p className="bold">{account}</p>
      </div>
      <div className="right">
        <p>Balance: {balance.toFixed(2)}</p>
      </div>
    </article>
  );
};

// accountToBalance is an object which maps: account => balance
const BalanceByAccountList = ({ accountToBalance }) => {
  return (
    <div>
      <h1>Balance by Account</h1>
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
        <h1>Balance</h1>
        <BarChart name="Balance Trend" data={stats.balanceTrend} />
        <br />
        <hr />
        <br />
        <BalanceByAccountList accountToBalance={stats.accountToBalance} />
      </div>
    </>
  );
};

export default Balance;
