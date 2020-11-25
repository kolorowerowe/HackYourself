import React, { useMemo } from 'react';
import Grid from "@material-ui/core/Grid";
import { Line } from 'react-chartjs-2'

const weeklyChart = {
    labels: ['Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'So', 'Nd'],
    datasets: [
        {
            label: 'Count',
            data: null,
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            yAxisID: 'y-axis-1'
        },
        {
            label: 'Avg',
            data: null,
            fill: false,
            backgroundColor: 'rgb(100, 99, 2)',
            borderColor: 'rgba(100, 99, 2, 0.2)',
            yAxisID: 'y-axis-2'
        },
    ],
}

const hourlyChart = {
    labels: [],
    datasets: [
        {
            label: 'Count',
            data: null,
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            yAxisID: 'y-axis-1'
        },
        {
            label: 'Avg',
            data: null,
            fill: false,
            backgroundColor: 'rgb(100, 99, 2)',
            borderColor: 'rgba(100, 99, 2, 0.2)',
            yAxisID: 'y-axis-2'
        },
    ],
}

const options = {
    scales: {
        yAxes: [{
            type: "linear",
            display: true,
            position: "left",
            id: "y-axis-1",
            gridLines: {
                display: false
            },
            labels: {
                show: true,
            },
        }, {
            type: "linear",
            display: true,
            position: "right",
            id: "y-axis-2",
            gridLines: {
                display: false
            },
            labels: {
                show: true,
            },
            ticks: {
                suggestedMin: 0
            }
        }]
    },
}

const TimeStatistics = (props) => {

    const {
        timeStats: {
            hourly,
            weekly
        }
    } = props;

    const weeklyData = useMemo(() => {
        weeklyChart.datasets[0].data = weekly.map((item) => { return item.count });
        weeklyChart.datasets[1].data = weekly.map((item) => { return item.averageLength });
        return weeklyChart;

    }, [weekly]);

    const hourlyData = useMemo(() => {
        hourlyChart.labels = hourly.map((item, index) => { return index });
        hourlyChart.datasets[0].data = hourly.map((item) => { return item.count });
        hourlyChart.datasets[1].data = hourly.map((item) => { return item.averageLength });
        return hourlyChart;

    }, [hourly]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                Tygodniowe statystyki
            </Grid>
            <Grid item xs={6}>
                Godzinowe statystyki
            </Grid>
            <Grid item xs={6}>
                <Line data={weeklyData} options={options} />
            </Grid>
            <Grid item xs={6}>
                <Line data={hourlyData} options={options} />
            </Grid>
        </Grid>
    );
};

TimeStatistics.propTypes = {

};

export default TimeStatistics;