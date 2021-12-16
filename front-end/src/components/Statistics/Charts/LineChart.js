import React from 'react'
import Chart from 'react-google-charts'

/**
 * Data is supplied in the following format
 * [
    ['Year', 'Sales', 'Expenses', 'Profit'],
    ['2014', 1000, 400, 200],
    ['2015', 1170, 460, 250],
    ['2016', 660, 1120, 300],
    ['2017', 1030, 540, 350],
]*/
const LineChart = ({ name, data }) => {
    return (
        <Chart
            width='100%'
            height='100%'
            chartType="LineChart"
            loader={ <div>Loading Chart</div> }
            data={data}
            options={{
                tooltip: { isHtml: true, trigger: "visible" },
                hAxis: { textPosition: 'none' },
                legend: { position: 'none' },
                backgroundColor: { fill: 'transparent' }
            }}
        />
    )
}


export default LineChart