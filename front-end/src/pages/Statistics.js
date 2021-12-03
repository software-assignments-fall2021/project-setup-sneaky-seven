import React, { useState } from "react";
import api from "../api";
import StatsNavbarWrapper from "../components/Statistics/StatsNavbar/StatsNavbarWrapper";
import { useAsync } from "../utils";
import { DateTime } from "luxon";

const Statistics = () => {
  // Used for balances
  const [accountToBalance, setAccountToBalance] = useState({});
  const [balanceTrend, setBalanceTrend] = useState([]);

  // Used for spendings
  const [spendingByCategories, setSpendingByCategories] = useState([]);
  const [spendingTrend, setSpendingTrend] = useState([]);

  // Put smth in front end to specify how many days back we wanna look back
  useAsync(async () => {
    // Get bank accounts to show accounts by balance
    const bankAccounts = await api.getBankAccounts();
    bankAccounts.forEach((account) =>
      setAccountToBalance(
        Object.assign(accountToBalance, {
          [account.name]: account.balances.current,
        })
      )
    );

    // Get the balance by trend
    const transactions = await api.getAllTransactions();
    const dateToNet = {};
    transactions.forEach((transaction) => {
      const date = transaction.date;
      const amount = transaction.amount;
      const val = dateToNet[date] ? dateToNet[date] + amount : amount;
      dateToNet[date] = val;
    });

    // take the sum
    let balance = Object.values(accountToBalance).reduce((a, b) => a + b, 0);
    const now = DateTime.now().toFormat("yyyy-MM-dd");
    let tempBalanceTrend = [[now, balance]];

    Object.entries(dateToNet).forEach((entry) => {
      let [date, net] = entry;
      balance += net;

      // assume that dateToNet will be iterated in reverse chronological order
      if (date === now) {
        tempBalanceTrend = [[now, balance]];
      } else {
        tempBalanceTrend = [[date, balance], ...tempBalanceTrend];
      }
    });

    setBalanceTrend([["Date", "Balance"], ...tempBalanceTrend]);

    const categoryToMoneySpent = {};
    const dateToMoneySpent = {};

    // Spending stuff
    transactions.forEach((transaction) => {
      const category = transaction.category;
      const date = transaction.date;
      const moneySpent = Math.max(0, transaction.amount);

      if (categoryToMoneySpent[category]) {
        categoryToMoneySpent[category] += moneySpent;
      } else {
        categoryToMoneySpent[category] = moneySpent;
      }

      if (dateToMoneySpent[date]) {
        dateToMoneySpent[date] += moneySpent;
      } else {
        dateToMoneySpent[date] = moneySpent;
      }
    });

    let tempSpendingByCategories = [];
    let tempSpendingTrend = [];
    Object.entries(categoryToMoneySpent).forEach(
      (entry) =>
        (tempSpendingByCategories = [entry, ...tempSpendingByCategories])
    );
    setSpendingByCategories([
      ["Category", "Money Spent"],
      ...tempSpendingByCategories,
    ]);

    Object.entries(dateToMoneySpent).forEach(
      (entry) => (tempSpendingTrend = [entry, ...tempSpendingTrend])
    );
    setSpendingTrend([["Date", "Money Spent"], ...tempSpendingTrend]);
  }, []);

  const stats = {
    accountToBalance: accountToBalance,
    balanceTrend: balanceTrend,
    spendingByCategories: spendingByCategories,
    spendingTrend: spendingTrend,
  };

  return (
    <div>
      <h1>Statistics</h1>
      <StatsNavbarWrapper stats={stats} />
      <br />
    </div>
  );
};

export default Statistics;
