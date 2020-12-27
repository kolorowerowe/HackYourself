import React, {useMemo, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {Line} from 'react-chartjs-2'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {enretardize, replaceRetarded} from '../../algorithms/encoding';

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
    const NoFilter = "All recipients";
    const {
        timeStats: {
            hourly = [],
            weekly = []
        } = {},
        timeStatsPerRecipient
    } = props;
    const [recipient, setRecipient] = useState(NoFilter);
    let recipients = timeStatsPerRecipient ? replaceRetarded([...new Set(Object.keys(timeStatsPerRecipient))]) : [];
    const weeklyData = useMemo(() => {
        let data = recipient === NoFilter ? weekly : timeStatsPerRecipient[enretardize(recipient)].weekly;
        weeklyChart.datasets[0].data = data.map((item) => {
            return item.count
        });
        weeklyChart.datasets[1].data = data.map((item) => {
            return item.averageLength
        });
        return weeklyChart;

    }, [weekly, recipient]);

    const hourlyData = useMemo(() => {
        let data = recipient === NoFilter ? hourly : timeStatsPerRecipient[enretardize(recipient)].hourly;
        hourlyChart.labels = data.map((item, index) => {
            return index
        });
        hourlyChart.datasets[0].data = data.map((item) => {
            return item.count
        });
        hourlyChart.datasets[1].data = data.map((item) => {
            return item.averageLength
        });
        return hourlyChart;

    }, [hourly, recipient]);


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Select
                    labelId="select-recipient-time"
                    id="select-recipient-time"
                    value={recipient}
                    onChange={e => setRecipient(e.target.value)}
                >
                    (<MenuItem value={NoFilter}>{NoFilter}</MenuItem>)
                    {recipients.map(r =>
                        (<MenuItem value={r}
                                   key={`R-${r}`}>{r}</MenuItem>)
                    )}
                </Select>
            </Grid>
            <Grid item xs={6}>
                Weekly statistics
            </Grid>
            <Grid item xs={6}>
                Hourly statistics
            </Grid>
            <Grid item xs={6}>
                <Line data={weeklyData} options={options}/>
            </Grid>
            <Grid item xs={6}>
                <Line data={hourlyData} options={options}/>
            </Grid>
        </Grid>
    );
};

TimeStatistics.propTypes = {};

export default TimeStatistics;