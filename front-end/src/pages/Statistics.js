import React from "react";
import { NavLink as Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './css/Statistics.css';
import Balance from "../components/Statistics/Balance";
import Spending from "../components/Statistics/Spending";
import api from "../api";
import { useAsync } from "../utils";

const Navbar = () => {
  return (
      <div className="statsNavbar">
        <Link className="statsNavLink" to="/statistics/spending">
          Spending
        </Link>
        <Link className="statsNavLink" to="/statistics/balance">
          Balance
        </Link>
      </div>
  );
};

const Statistics = () => {
  const { data: transactionData } = useAsync(api.getAllTransactions, []);
  const transactions = transactionData ?? [];

  return (
    <div>
      <h1>Statistics</h1>
      <Navbar />
      <Switch>
        <Route
          path="/statistics/spending"
          exact
        ><Spending data={transactions} /></Route>
        <Route
          path="/statistics/balance"
          exact
        ><Balance data={transactions} /></Route>
        <Route
          path="/statistics"
          exact
        ><Balance data={transactions} /></Route>
      </Switch>
    </div>
  );
};

export default Statistics;
