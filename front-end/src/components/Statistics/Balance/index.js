import PieChart from "../Charts/PieChart";
import BarChart from "../Charts/BarChart";
import "../../css/Statistics.css";

const axios = require("axios").default;

const data = axios
  .get("https://my.api.mockaroo.com/budget_web_app.json?key=d9fa63b0")
  .then((response) => {
    console.log("test");
  });

const Balance = () => {
  return (
    <div className="container-stats">
      <h1>Balance</h1>
      <BarChart
        name="Balance Trend"
        data={[
          ["Category", "Balance"], // mock data
          ["10/25/2021", 4],
          ["10/26/2021", 8],
          ["10/27/2021", 14],
        ]}
      />
    </div>
  );
};

export default Balance;
