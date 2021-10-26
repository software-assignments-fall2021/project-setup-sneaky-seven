import PieChart from '../Charts/PieChart'
import BarChart from '../Charts/BarChart'

const Balance = () => {
    return (
        <div>
            <h1>Balance</h1>
            <BarChart
                name="Balance Trend"
                data={[
                    ['Category', 'Balance'], // mock data
                    ['10/25/2021', 4],
                    ['10/26/2021', 8],
                    ['10/27/2021', 13]
                ]}
            />
        </div>
    )
};

export default Balance;