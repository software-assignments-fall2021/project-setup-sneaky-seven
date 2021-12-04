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
const BarChart = ({name, data}) => {
    return (
        <Chart
            width='100%'
            height='100%'
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={data}
            options={{
                chart: {
                    title: name,
                },
                legend: {position: 'none'},
                chartArea: {
                    width: '100%',
                    height: '100%',
                }
            }}
        />
    )
}


export default BarChart