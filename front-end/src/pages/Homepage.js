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

const Homepage = () => {
  const { data: transactionData } = useAsync(api.getAllTransactions, []);
  const transactions = transactionData ?? [];

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
        <Transactions> </Transactions>
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
        <Spending data={transactions}> </Spending>
        <Button
          variant="contained"
          id="new-account-btn"
          component={Link}
          to="/statistics"
        >
          {" "}
          See More
        </Button>
      </div>
      <hr />
      <div className="statContainer">
        <Balance data={transactions}> </Balance>
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
