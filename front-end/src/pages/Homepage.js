import React, { useState } from "react";
import Accounts from "./Accounts.js";
import Spending from "../components/Statistics/Spending";
import Balance from "../components/Statistics/Balance";
import BalanceByAccountList from "../components/Statistics/Balance/BalanceByAccountList";
import prepareStats from "../components/Statistics/utils/prepare_stats";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "../components/css/Homepage.css";
import HomePageTransactionList from "../components/HomePageTransactionList.js";


const Homepage = () => {
  const [stats, setStats] = useState({
    accountToBalance: {},
    balanceTrend: [],
    spendingByCategories: [],
    spendingTrend: []
  })

  if (Object.keys(stats.accountToBalance).length === 0) {
    prepareStats(30, null).then(stats => setStats(stats))
  }

  return (
    <div>
      <br /> <br />
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
        <h1>Transactions & Categories </h1>

        <HomePageTransactionList> </HomePageTransactionList>
        <Button
          variant="contained"
          id="new-account-btn"
          component={Link}
          to="/transactions"
        >
          See More Transactions
        </Button>
        <Button
          variant="contained"
          id="new-account-btn"
          component={Link}
          to="/categories"
        >
          See More Categories
        </Button>
      </div>
      <hr />
      <div className="statContainer">
        <h4>These are statistics for all accounts starting from the last month.</h4>
        <h4>Click 'See More' to show statistics for accounts selected and different time ranges.</h4>
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
        <Balance stats={stats} />
        <h1>Balance by Account</h1>
        <BalanceByAccountList accountToBalance={stats.accountToBalance}/>
        <Button
          variant="contained"
          id="new-account-btn"
          component={Link}
          to="/statistics"
        >
          See More
        </Button>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Homepage;
