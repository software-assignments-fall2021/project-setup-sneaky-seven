import React, { useState } from "react";
import { NavLink as Link, useLocation } from "react-router-dom";
import "../../css/StatsNavbar.css";

const StatsNavbar = () => {

  // SET USE STATE TRUE OR FALSE DEPENDING ON WHAT WE LAND ON...
  const location = useLocation();
  console.log(location);
  const [spendingActive, setSpendingActive] = useState(location.pathname === '/statistics/spending');

  return (
    <div className="statsNavbar">
      <Link 
        className={spendingActive ? "statsNavLinkActive" : "statsNavLink"} 
        to="/statistics/spending"
        onClick={() => {
          setSpendingActive(true);
        }}> Spending </Link>
      <Link 
        className={!spendingActive ? "statsNavLinkActive" : "statsNavLink"} 
        to="/statistics/balance"
        onClick={() => {
          setSpendingActive(false);
        }}> Balance </Link>
    </div>
  );
};

export default StatsNavbar;
