import PieChart from "../Charts/PieChart";
import BarChart from "../Charts/BarChart";

// The Spending page
const Spending = ({ stats }) => {
  // Make this like one of those fragmented pie charts, and make color scheme
  // consistent
  return (
    <>
      <br />
      <div className="container-s">
        <h1>Spending</h1>
        <PieChart name="Spending by Categories" data={stats.spendingByCategories ?? []} />
        <hr />
        <BarChart name="Spending Trend" data={stats.spendingTrend ?? []} />
      </div>
    </>
  );
};

export default Spending;
