import React from "react";
import Chart from "react-google-charts";

/**
 * Data is given in this format
 *
 * data={[
   ['Category', 'Money Spent'],
   ['Lorem', 11],
   ['Ipsum', 2],
   ['Dolor', 3]
   ]}
 */

const PieChart = ({ name, data }) => {
  return (
    <Chart
      className="chart"
      chartType="PieChart"
      loader={<div>Loading Pie Chart</div>}
      data={data}
      options={{
        title: name,
        pieHole: 0.4,
        width: "100%",
        height: "100%",
        chartArea: {
          width: "100%",
          height: "100%",
        },
        backgroundColor: { fill: 'transparent' }
      }}
    />
  );
};

export default PieChart;
