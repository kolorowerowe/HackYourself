import React, {useMemo} from 'react';
import Grid from "@material-ui/core/Grid";
import {Line} from 'react-chartjs-2'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {unfixEncoding} from '../../algorithms/encoding';
import moment from "moment";
import {NO_FILTER} from "../root/constans";

const weeklyChart = {
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

const timelineChart = {
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
            hourly = [],
            weekly = [],
            timelineStats = []
        } = {},
        timeStatsPerRecipient,
        recipients,
        recipientFilter,
        setRecipientFilter
    } = props;

    const weeklyData = useMemo(() => {
        let data = recipientFilter === NO_FILTER ? weekly : timeStatsPerRecipient[unfixEncoding(recipientFilter)].weekly;
        weeklyChart.labels = data.map(item => {
            return moment().isoWeekday(item.isoWeekday).format('dddd');
        });
        weeklyChart.datasets[0].data = data.map((item) => {
            return item.count
        });
        weeklyChart.datasets[1].data = data.map((item) => {
            return item.averageLength
        });
        return weeklyChart;

    }, [weekly, recipientFilter, timeStatsPerRecipient]);

    const hourlyData = useMemo(() => {
        let data = recipientFilter === NO_FILTER ? hourly : timeStatsPerRecipient[unfixEncoding(recipientFilter)].hourly;
        hourlyChart.labels = data.map(item => {
            return item.hour
        });
        hourlyChart.datasets[0].data = data.map((item) => {
            return item.count
        });
        hourlyChart.datasets[1].data = data.map((item) => {
            return item.averageLength
        });
        return hourlyChart;

    }, [hourly, recipientFilter, timeStatsPerRecipient]);

    const timelineData = useMemo(() => {
        let data = recipientFilter === NO_FILTER ? timelineStats : timeStatsPerRecipient[unfixEncoding(recipientFilter)].timelineStats;
        timelineChart.labels = data.map((item) => {
            return item.date
        });
        timelineChart.datasets[0].data = data.map((item) => {
            return item.count
        });
        timelineChart.datasets[1].data = data.map((item) => {
            return item.averageLength
        });
        return timelineChart;

    }, [timelineStats, recipientFilter, timeStatsPerRecipient]);


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Select
                    labelId="select-recipient-time"
                    id="select-recipient-time"
                    value={recipientFilter}
                    onChange={e => setRecipientFilter(e.target.value)}
                >
                    (<MenuItem value={NO_FILTER}>{NO_FILTER}</MenuItem>)
                    {recipients.map(r => <MenuItem value={r}
                                                   key={`R-${r}`}>{r}
                        </MenuItem>
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
            <Grid item xs={6}>
                Timeline statistics
            </Grid>
            <Grid item xs={12}>
                <Line data={timelineData} options={options}/>
            </Grid>
        </Grid>
    );
};

TimeStatistics.propTypes = {};

export default TimeStatistics;