import PieChart from "../Charts/PieChart";
import BarChart from "../Charts/BarChart";
import StatsNavbar from "../StatsNavbar";
import "../../css/Timebar.css"
import { useState } from 'react'

// The Spending page
const Spending = ({ stats }) => {  
  // Make this like one of those fragmented pie charts, and make color scheme
  // consistent
  return (
    <>
      <br />
      <div className="container-s">
        <h1>Total Spending by Category</h1>
        <PieChart name="Spending by Categories" data={stats.spendingByCategories ?? []} />
        <hr />
      </div>
      <br />
      <div className="container-s">
        <h1>Total Spending Trend</h1>
        <BarChart data={stats.spendingTrend ?? []} />
        <hr />
      </div>
    </>
  );
};

export default Spending;
