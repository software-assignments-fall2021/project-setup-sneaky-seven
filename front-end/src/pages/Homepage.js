import React from "react";
import Accounts from "./Accounts.js";
import Transactions from "./Transactions.js";
import Spending from "../components/Statistics/Spending";
import Balance from "../components/Statistics/Balance";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "../components/css/Homepage.css";

const Homepage = () => {
  return (
    <div>
      <br />
      <div class="container-home">
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
      <div class="container-home">
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
      <div class="statContainer">
        <Spending> </Spending>
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
      <div class="statContainer">
        <Balance> </Balance>
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
