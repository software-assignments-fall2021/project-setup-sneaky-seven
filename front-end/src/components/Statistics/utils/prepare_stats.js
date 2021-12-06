import { DateTime, Interval } from "luxon";
import api from "../../../api";

// Tooltip configuration for spending and balance trends
const trendTooltipConfig = {role: "tooltip", type: "string", p: { html: true } };

const createTrendTooltip = (date, money) => {
  const moneyStr = money < 0 ? ` -\$${Math.abs(money).toFixed(2)}` : ` \$${money.toFixed(2)}`
  return `Date: <strong>${date}</strong><br>Amount:<strong>${moneyStr}</strong>`
};

/**
 * Gives back useful information from accounts, such as 
 * - a mapping from account's ID to account's name
 * - a mapping from account's name to the account's balance
 */
const interpretAccounts = async () => {
  const bankAccounts = await api.getBankAccounts();
  let accountToBalance = {};
  let accountIdToName = {};
  bankAccounts.forEach((account) => {
    accountToBalance = Object.assign(accountToBalance, {
      [account.name]: account.balances.current
    });
    accountIdToName = Object.assign(accountIdToName, {
      [account.account_id]: account.name
    });
  });
  return { accountToBalance, accountIdToName };
};

/**
 * Get useful information from the transactions
 * @param {*} days  The number of days to elapse the statistics
 * @param {*} selectedAccounts  The accounts that have been selected by the user to show statistics for
 * @param {*} idToName  A map from the account ID to the account name, only passed once it has been defined
 */
const interpretTransactions = async (days, selectedAccounts=null, idToName=null) => {

  // Gather transaction data
  const transactions = await api.getAllTransactions(days);

  // Initialize dicts for spending trend
  const categoryToMoneySpent = {};
  const dateToMoneySpent = {};

  // Initialize dicts for balance trend
  const dateToNet = {};

  // Iterate through the transactions
  transactions.forEach((transaction) => {
    const accountId = transaction.account_id;

    // Only fill these dicts for the selected accounts
    if (selectedAccounts && !selectedAccounts[idToName[accountId]]) {
      return;
    }

    const date = transaction.date;
    const amount = transaction.amount;
    
    const val = dateToNet[date] ? dateToNet[date] + amount : amount;
    dateToNet[date] = val;

    const category = transaction.category;
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

  return { categoryToMoneySpent, dateToMoneySpent, dateToNet };
};

/**
 * Gathers the spending and balance trends for the statistics
 * @param {*} days  The number of days the stats elapse
 * @param {*} accountToBalance  A mapping from the account's name to the account's balance
 * @param {*} dateToMoneySpent  A mapping from the date to the amount of money spent for the accounts selected
 * @param {*} dateToNet  A mapping from the date to the net amount of money gained in the selected accounts' total balance
 * @param {*} selectedAccounts  An object indicating which accounts were selected
 */
const getTrends = (days, accountToBalance, dateToMoneySpent, dateToNet, selectedAccounts=null) => {
  let balanceTrend = [];
  let spendingTrend = [];

  const now = DateTime.now();
  const formattedNow = now.toFormat("yyyy-MM-dd")
  const before = now.minus({ days });

  // Gather the total initial balance
  let balance = 0;
  for (const account in accountToBalance) {
    if (selectedAccounts && !selectedAccounts[account]) {
      continue;
    }
    balance += accountToBalance[account];
  }
  
  // Initialize balance trend and spending trends
  let tempBalanceTrend = [[formattedNow, balance, createTrendTooltip(formattedNow, balance)]];
  let tempSpendingTrend = [];

  Interval.fromDateTimes(before, now)
  .splitBy({ days: 1 })
  .reverse() // assume iteration in reverse chronological order
  .forEach(date => {
    const formattedDate = date.start.toFormat("yyyy-MM-dd");
    const net = dateToNet[formattedDate] ? dateToNet[formattedDate] : 0;

    balance += net;

    if (formattedDate === now.toFormat("yyyy-MM-dd")) {
      tempBalanceTrend = [[formattedDate, balance, createTrendTooltip(formattedDate, balance)]];
    } else {
      tempBalanceTrend = [[formattedDate, balance, createTrendTooltip(formattedDate, balance)], ...tempBalanceTrend];
    }

    const moneySpent = dateToMoneySpent[formattedDate] ? dateToMoneySpent[formattedDate] : 0;
    tempSpendingTrend = [[formattedDate, moneySpent, createTrendTooltip(formattedDate, moneySpent)], ...tempSpendingTrend];
  });

  balanceTrend = [["Date", "Balance", trendTooltipConfig], ...tempBalanceTrend];
  spendingTrend = [["Date", "Money Spent", trendTooltipConfig], ...tempSpendingTrend];

  return { balanceTrend, spendingTrend };
};

/**
 * Gathers the spending by categories
 * @param {*} categoryToMoneySpent  A mapping from the category to the money spent for that category.
 */
const getSpendingByCategories = (categoryToMoneySpent) => {
  let spendingByCategories = [];

  let tempSpendingByCategories = [];
  
  Object.entries(categoryToMoneySpent).forEach(
    (entry) => (tempSpendingByCategories = [entry, ...tempSpendingByCategories])
  );
  spendingByCategories = [
    ["Category", "Money Spent"],
    ...tempSpendingByCategories,
  ];

  return spendingByCategories;
};

/**
 * Prepares tables for the statistics shown in the statistics page
 * @param {*} days  The number of days the stats elapse 
 * @param {*} selectedAccounts  The accounts that we want to show the stats for. 
 */
const prepareStats = async (days, selectedAccounts=null, idToName=null) => {
  // Used for balances
  const { accountToBalance, accountIdToName } = await interpretAccounts();

  // Interpret the transactions
  const { categoryToMoneySpent, dateToMoneySpent, dateToNet } = await interpretTransactions(days, selectedAccounts, idToName);

  // Gather balance and spending trends
  const { balanceTrend, spendingTrend } = getTrends(days, accountToBalance, dateToMoneySpent, dateToNet, selectedAccounts);

  // Gather spending by categories
  const spendingByCategories = getSpendingByCategories(categoryToMoneySpent);

  // Build up the object containing the necessary statistics
  const stats = {
    accountToBalance,
    accountIdToName,
    balanceTrend,
    spendingByCategories,
    spendingTrend,
  };

  return stats;
}

export default prepareStats;