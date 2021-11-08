import PieChart from "../Charts/PieChart";
import BarChart from "../Charts/BarChart";

// The Spending page
const Spending = ({ data }) => {
  // Create a categoryToMoneySpent: Category => Total Money Spent
  const categoryToMoneySpent = {};
  const dateToMoneySpent = {};

  // question mark is to resolve undefined issue
  data.forEach((transaction) => {
    const category = transaction.category;
    const date = transaction.date;
    const moneySpent = Math.max(0, transaction.amount);

    if (categoryToMoneySpent[category]) {
      categoryToMoneySpent[category] += moneySpent;
    } else {
      categoryToMoneySpent[category] = moneySpent;
    }

    if (dateToMoneySpent[date]) {
      dateToMoneySpent[date] += moneySpent;
    } else {
      dateToMoneySpent[date] = moneySpent;
    }
  });

  // Reformat the data
  const spendingByCategories = [["Category", "Money Spent"]];
  const spendingTrend = [["Date", "Money Spent"]];

  for (const category in categoryToMoneySpent) {
    spendingByCategories.push([category, categoryToMoneySpent[category]]);
  }

  for (const date in dateToMoneySpent) {
    spendingTrend.push([date, dateToMoneySpent[date]]);
  }

  // Make this like one of those fragmented pie charts, and make color scheme
  // consistent
  return (
    <>
      <br />
      <div className="container-s">
        <h1>Spending</h1>
        <PieChart name="Spending by Categories" data={spendingByCategories} />
        <hr />
        <BarChart name="Spending Trend" data={spendingTrend} />
      </div>
    </>
  );
};

export default Spending;
