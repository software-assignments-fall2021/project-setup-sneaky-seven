import PieChart from '../Charts/PieChart'
import BarChart from '../Charts/BarChart'

// The Spending page
const Spending = () => {
    return (
<<<<<<< HEAD
        <div>
            <h1>Spending</h1>
            <PieChart
                name="Spending by Categories"
                data={[
                    ['Category', 'Money Spent'], // mock data
                    ['Academics', 11], // note: change color scheme
                    ['Transportation', 2],
                    ['Food', 3]
                ]}
            />
            <BarChart
                name="Spending Trend"
                data={[
                    ['Day', 'Money Spent'], // mock data
                    ['10/25/2021', 11],
                    ['10/26/2021', 2],
                    ['10/27/2021', 3]
                ]}
            />
        </div>
=======
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

>>>>>>> Update gitignore
    )
}

export default Spending