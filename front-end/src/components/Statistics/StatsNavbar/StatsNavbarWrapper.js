import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StatsNavbar from "../StatsNavbar";
import Balance from "../Balance";
import Spending from "../Spending";

const StatsNavbarWrapper = ({ stats }) => {
  return (
    <Router>
      <StatsNavbar />
      <Switch>
        <Route
          path="/statistics/spending"
          exact
          component={() => <Spending stats={stats} />}
        />
        <Route
          path="/statistics/balance"
          exact
          component={() => <Balance stats={stats} />}
        />
        <Route
          path="/statistics"
          exact
          component={() => <Balance stats={stats} />}
        />
      </Switch>
    </Router>
  );
};

export default StatsNavbarWrapper;
