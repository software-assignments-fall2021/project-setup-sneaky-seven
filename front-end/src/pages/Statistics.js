import React, { useState } from "react";
import api from "../api";
import StatsNavbarWrapper from "../components/Statistics/StatsNavbar/StatsNavbarWrapper";
import { useAsync } from "../utils";
import { DateTime } from "luxon";

const prepareData = async (days) => {
  // Used for balances
  let accountToBalance = {}
  let balanceTrend = []
  let spendingByCategories = []
  let spendingTrend = []

  // Get bank accounts to show accounts by balance
  const bankAccounts = await api.getBankAccounts();
  bankAccounts.forEach((account) =>
    accountToBalance = Object.assign(accountToBalance, {
        [account.name]: account.balances.current,
    })
  );


  // Get the balance by trend
  const transactions = await api.getAllTransactions(days);
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

  balanceTrend = [["Date", "Balance"], ...tempBalanceTrend];

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
  spendingByCategories = [
    ["Category", "Money Spent"],
    ...tempSpendingByCategories,
  ];

  Object.entries(dateToMoneySpent).forEach(
    (entry) => (tempSpendingTrend = [entry, ...tempSpendingTrend])
  );
  spendingTrend = [["Date", "Money Spent"], ...tempSpendingTrend];

  const stats = {
    accountToBalance,
    balanceTrend,
    spendingByCategories,
    spendingTrend,
  };

  console.log(stats);

  return stats;
}

// Indirect check for if stats doesn't have any meaningful data
const statsIsEmpty = (stats) => {
  return Object.keys(stats.accountToBalance).length === 0
}

// only render money as spent if it's not a transfer to one of the other registered accounts!!!

const Statistics = () => {
  // Allows us to set the trend lengths
  const [numsOfDaysIndex, setNumsOfDaysIndex] = useState(2)
  const [stats, setStats] = useState({
    accountToBalance: {},
    balanceTrend: [],
    spendingByCategories: [],
    spendingTrend: []
  })

  if (statsIsEmpty(stats)) {
    prepareData(30).then(stats => setStats(stats))
  }

  const numsOfDays = [7, 15, 30, 90, 365]
  const trendLengthsToIndex = {'week': 0, '15 days': 1, 'month': 2, '3 months': 3, 'year': 4}

  return (
    <>
      <h1>Statistics</h1>
      {/** This part gives the user the option to choose different trend lengths */}
      <br />
      <div className="container-s">
        <h4>The following charts represent data starting from the last {Object.keys(trendLengthsToIndex)[numsOfDaysIndex]}.</h4>
        <div className="timebar">
          {Object.keys(trendLengthsToIndex).map(trendLength => 
            <button 
              className="timeOption" 
              onClick={async () => {
                setStats(await prepareData(numsOfDays[trendLengthsToIndex[trendLength]]))
                setNumsOfDaysIndex(trendLengthsToIndex[trendLength])
              }}
            > Last {trendLength}
            </button>
          )}         
        </div>
      </div>
      <div>
        <StatsNavbarWrapper stats={stats} />
        <br />
      </div>
    </>
  );
};

export default Statistics;
