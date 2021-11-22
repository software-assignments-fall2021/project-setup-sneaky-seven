import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAsync } from "../../../utils";
import PieChart from "../Charts/PieChart";
import BarChart from "../Charts/BarChart";
import api from "../../../api/index";
import "../../css/balanceByAccount.css";
const { DateTime } = require("luxon");

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
      {Object.getOwnPropertyNames(accountToBalance).map((account) => (
        <BalanceByAccount
          account={account}
          balance={accountToBalance[account]}
        />
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
      </div>
      <BalanceByAccountList accountToBalance={stats.accountToBalance}/>
    </>
  );

};

export default Balance;
