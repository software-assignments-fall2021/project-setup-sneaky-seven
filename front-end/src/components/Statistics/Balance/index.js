import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAsync } from "../../../utils";
import PieChart from "../Charts/PieChart";
import BarChart from "../Charts/BarChart";
import api from "../../../api/index";
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
      {Object.getOwnPropertyNames(accountToBalance).map((account) => (
        <BalanceByAccount
          account={account}
          balance={accountToBalance[account]}
        />
      ))}
    </div>
  );
};

const Balance = ({ data }) => {
  const [token, setToken] = useState(null);
  const [bankData, setBankData] = useState([]);

  // generate a link_token (public token) and get linked banks
  useAsync(async () => {
    axios.post("/api/create_link_token", {}).then((resp) => {
      setToken(resp.data.link_token);
    });

    axios
      .post("/api/get_bank_accounts", {
        access_token_object: localStorage.getItem("access_token_object"),
      })
      .then((resp) => {
        if (!resp.data.err) {
          setBankData(resp.data);
        }
      });
  }, []);

  const base = bankData[0]?.balances?.available ?? 0;
  console.log(base);
  // Gather data
  const accountToBalance = {};
  const dateToBalance = {};

  data.forEach((transaction) => {
    const account = base + transaction.account;
    const date = transaction.date;
    const amount = base + transaction.amount;

    if (accountToBalance[account]) {
      accountToBalance[account] += amount;
    } else {
      accountToBalance[account] = amount;
    }

    if (dateToBalance[date]) {
      dateToBalance[date] += amount;
    } else {
      dateToBalance[date] = amount;
    }
  });

  // Reformat data
  const balanceTrend = [["Date", "Balance"]];

  for (const date in dateToBalance) {
    balanceTrend.push([date, dateToBalance[date]]);
  }

  return (
    <>
      <br />
      <div className="container-s">
        <h1>Balance</h1>
        <BarChart name="Balance Trend" data={balanceTrend} />
      </div>
    </>
  );
};

export default Balance;
