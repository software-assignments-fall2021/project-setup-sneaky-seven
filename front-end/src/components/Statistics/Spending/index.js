import PieChart from "../Charts/PieChart";
import BarChart from "../Charts/LineChart";
import "../../css/TransparentContainer.css";
import "../../css/Timebar.css";

// The Spending page
const Spending = ({ stats }) => {  
  const spendingTrend = stats.spendingTrend ?? null;
  const spendingByCategories = stats.spendingByCategories ?? null;

  // Consider changing this to a spinning icon
  return (
    <>
      <br />
      <div className="transparentContainer">
        <h1>Spending by Category</h1>
        {spendingByCategories.length !== 0 ? <PieChart name="Spending by Categories" data={spendingByCategories} /> : <h2>Loading</h2>}
        <hr />
      </div>
      <br />
      <div className="transparentContainer">
        <h1>Spending Trend</h1>
        {spendingTrend.length !== 0 ? <BarChart data={spendingTrend} /> : <h2>Loading</h2>}
        <hr />
      </div>
    </>
  );
};

export default Spending;
