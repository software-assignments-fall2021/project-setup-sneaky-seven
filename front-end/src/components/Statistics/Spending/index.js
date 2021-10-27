import PieChart from "../Charts/PieChart";
import BarChart from "../Charts/BarChart";
import "../../css/Statistics.css";

// The Spending page
const Spending = () => {
  return (
    <div className="container-stats">
      <h1>Spending</h1>
      <PieChart
        name="Spending by Categories"
        data={[
          ["Category", "Money Spent"], // mock data
          ["Academics", 11], // note: change color scheme
          ["Transportation", 2],
          ["Food", 3],
        ]}
      />
      <BarChart
        name="Spending Trend"
        data={[
          ["Day", "Money Spent"], // mock data
          ["10/25/2021", 11],
          ["10/26/2021", 2],
          ["10/27/2021", 3],
        ]}
      />
    </div>
  );
};

export default Spending;
