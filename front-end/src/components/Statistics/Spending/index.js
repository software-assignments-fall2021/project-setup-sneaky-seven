import Chart from "react-google-charts"

// The Spending page
const Spending = () => {
    return (
        <Chart
            width={'500px'}
            height={'300px'}
            chartType="PieChart"
            loader={<div>Loading Pie Chart</div>}
            data={[
                ['Category', 'Money Spent'],
                ['Lorem', 11],
                ['Ipsum', 2],
                ['Dolor', 3]
            ]}
            options={{
                title: 'Spending by Categories',
                pieHole: 0.4
            }}
        />

    )
};

export default Spending;