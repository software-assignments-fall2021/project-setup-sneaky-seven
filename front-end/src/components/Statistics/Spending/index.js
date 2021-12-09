import PieChart from "../Charts/PieChart";
import LineChart from "../Charts/LineChart";
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
        {(() => {
          if (spendingByCategories.length === 0) {
            return <h2>Loading</h2>;
          } else if (spendingByCategories.length === 1) {
            return <h2>No Spending Data Available</h2>
          } else {
            return <PieChart name="Spending by Categories" data={spendingByCategories} />;
          }
        })()}
        <hr />
      </div>
      <br />
      <div className="transparentContainer">
        <h1>Spending Trend</h1>
        {(() => {
          if (spendingTrend.length === 0) {
            return <h2>Loading</h2>;
          } else if (spendingTrend.length === 1) {
            return <></>
          } else {
            return <LineChart data={spendingTrend} />;
          }
        })()}
        <hr />
      </div>
    </>
  );
};

export default Spending;
