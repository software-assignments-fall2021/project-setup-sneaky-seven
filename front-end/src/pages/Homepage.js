import React, { useState, useEffect } from "react";
import Accounts from "./Accounts.js";
import Transactions from "./Transactions.js";
import Spending from "../components/Statistics/Spending";
import Balance from "../components/Statistics/Balance";
import Button from "@mui/material/Button";
import { useAsync } from "../utils";
import { Link } from "react-router-dom";
import "../components/css/Homepage.css";
import api from "../api";
import axios from "axios";
import HomePageTransactionList from "../components/HomePageTransactionList.js";
import DateTime from "luxon"

const Homepage = () => {
  // const { data } = useAsync(async () => axios.get("/api/get_transactions"), []);
  // const transactions = data?.data ?? [];

    // Used for balances
    const [accountToBalance, setAccountToBalance] = useState({});
    const [balanceTrend, setBalanceTrend] = useState([])
    const [transactions, setTransactions] = useState([])

    // Used for spendings
    const [spendingByCategories, setSpendingByCategories] = useState([])
    const [spendingTrend, setSpendingTrend] = useState([])

    useAsync(async () => {
        // Get bank accounts to show accounts by balance
        const bankAccounts = await api.getBankAccounts()
        bankAccounts.forEach(account => setAccountToBalance(
            Object.assign(
                accountToBalance,
                {[account.name]: account.balances.current}
            )
        ))

        // Get the balance by trend
        const t = await api.getAllTransactions()
        setTransactions(t)

        const dateToNet = {}
        t.forEach(transaction => {
            const date = transaction.date
            const amount = transaction.amount
            const val = dateToNet[date] ? dateToNet[date] + amount : amount
            dateToNet[date] = val
        })

        // take the sum
        let balance = Object.values(accountToBalance).reduce((a, b) => a + b, 0)
        console.log(3)
        let tempBalanceTrend = []
        console.log(tempBalanceTrend)

        Object.entries(dateToNet).forEach(entry => {
            let [date, net] = entry
            balance += net

            // assume that dateToNet will be iterated in reverse chronological order
            tempBalanceTrend = [[date, balance], ...tempBalanceTrend]

        })

        setBalanceTrend([["Date", "Balance"], ...tempBalanceTrend])


        const categoryToMoneySpent = {}
        const dateToMoneySpent = {}

        // Spending stuff
        t.forEach(transaction => {
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

        let tempSpendingByCategories = []
        let tempSpendingTrend = []
        Object.entries(categoryToMoneySpent).forEach(entry => tempSpendingByCategories = [entry, ...tempSpendingByCategories])
        setSpendingByCategories([["Category", "Money Spent"], ...tempSpendingByCategories])

        Object.entries(dateToMoneySpent).forEach(entry => tempSpendingTrend = [entry, ...tempSpendingTrend])
        setSpendingTrend([["Date", "Money Spent"], ...tempSpendingTrend])
    }, []);

    const stats = {
        accountToBalance: accountToBalance,
        balanceTrend: balanceTrend,
        spendingByCategories: spendingByCategories,
        spendingTrend: spendingTrend
    }

  return (
    <div>
      <br />
      <div className="container-home">
        <Accounts> </Accounts>
        <Button
          variant="contained"
          id="new-account-btn"
          component={Link}
          to="/accounts"
        >
          See More
        </Button>
      </div>
      <hr />
      <div className="container-home">
        <HomePageTransactionList> </HomePageTransactionList>
        <Button
          variant="contained"
          id="new-account-btn"
          component={Link}
          to="/transactions"
        >
          See More
        </Button>
      </div>
      <hr />
      <div className="statContainer">
        <Spending stats={stats}> </Spending>
        <Button
          variant="contained"
          id="new-account-btn"
          component={Link}
          to="/statistics/spending"
        >
          {" "}
          See More
        </Button>
      </div>
      <hr />
      <div className="statContainer">
        <Balance stats={stats}> </Balance>
        <Button
          variant="contained"
          id="new-account-btn"
          component={Link}
          to="/statistics"
        >
          See More
        </Button>
      </div>
    </div>
  );
};

export default Homepage;
