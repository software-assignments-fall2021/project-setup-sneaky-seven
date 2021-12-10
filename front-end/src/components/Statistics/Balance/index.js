import React from "react";
import BarChart from "../Charts/LineChart";
import "../../css/balanceByAccount.css";
import "../../css/TransparentContainer.css";

const Balance = ({ stats }) => {
  const balanceTrend = stats.balanceTrend ?? [];
  const accountToBalance = stats.accountToBalance ?? {};

  return (
    <>
      <br />
      <div className="transparentContainer">
        <h1>Balance Trend</h1>
        {balanceTrend.length !== 0 ? <BarChart data={stats.balanceTrend} /> : <h2>Loading</h2>}
        <br />
        <hr />
        <br />
        
      </div>
    </>
  );
};

export default Balance;
