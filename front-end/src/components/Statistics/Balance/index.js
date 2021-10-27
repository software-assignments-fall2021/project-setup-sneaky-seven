import PieChart from '../Charts/PieChart'
import BarChart from '../Charts/BarChart'

const axios = require('axios').default

const data = axios.get('https://my.api.mockaroo.com/budget_web_app.json?key=d9fa63b0')
    .then(response => {
        console.log('6ix9ine')
    })

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
                    ['10/27/2021', 14]
                ]}
            />
        </div>
    )
};

export default Balance;