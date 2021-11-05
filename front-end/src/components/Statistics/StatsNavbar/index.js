import React from "react";
import { NavLink as Link } from "react-router-dom";
import Spending from "../Spending";
import Balance from "../Balance";
import "../../css/StatsNavbar.css";

const StatsNavbar = () => {
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

export default StatsNavbar;
