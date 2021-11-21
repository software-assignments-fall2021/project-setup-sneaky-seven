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

const Balance = ({ data }) => {
  const [accountToBalance, setAccountToBalance] = useState({});
  const [balanceTrend, setBalanceTrend] = useState([])
  // const [bankData, setBankData] = useState([]);

  useAsync(async () => {
    api.getBankAccounts().then(accounts => {
      console.log(accountToBalance)
      accounts.forEach(account => setAccountToBalance(
          Object.assign(
              accountToBalance,
              {[account.name]: account.balances.current}
          )
      ))
    })

    // Need to get all transactions from all the way back to the beginning
    api.getAllTransactions(50)
       .then(data => {
         const dateToNet = {}
         data.forEach(transaction => {
           // console.log(dateToNet)
           const date = transaction.date
           const amount = transaction.amount
           const val = dateToNet[date] ? dateToNet[date] + amount : amount
           dateToNet[date] = val
         })

         // take the sum
         let balance = Object.values(accountToBalance).reduce((a, b) => a + b, 0)
         const now = DateTime.now().toFormat("yyyy-MM-dd")
         setBalanceTrend(balanceTrend => [[now, balance], ...balanceTrend])
         Object.entries(dateToNet).forEach(entry => {
             let [date, net] = entry
             balance += net
             // update the array without .push
             setBalanceTrend(balanceTrend => [[date, balance], ...balanceTrend])
         })

         setBalanceTrend(balanceTrend => [["Date", "Balance"], ...balanceTrend])

       }).error(console.error)
  }, [])

  // const dateToNet = {};

  // bankData?.forEach((transaction) => {
  //   const date = transaction.date;
  //   const amount = transaction.amount;
  //
  //   if (dateToNet[date]) {
  //     dateToNet[date] += amount;
  //   } else {
  //     dateToNet[date] = amount;
  //   }
  // });

  // console.log(bankData)

  console.log(balanceTrend)

  return (
    <>
      <br />
      <div className="container-s">
        <h1>Balance</h1>
        <BarChart name="Balance Trend" data={balanceTrend} />
      </div>
      <BalanceByAccountList accountToBalance={accountToBalance}/>
    </>
  );
};

export default Balance;
