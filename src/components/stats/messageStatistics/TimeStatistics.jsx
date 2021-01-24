import React, {useCallback, useMemo} from 'react';
import Grid from "@material-ui/core/Grid";
import {Line} from 'react-chartjs-2'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {unfixEncoding} from '../../../algorithms/encoding';
import moment from "moment";
import {NO_FILTER} from "../../root/constans";
import {Typography, useTheme} from "@material-ui/core";
import {MONTH_YEAR_FORMAT} from "../../../algorithms/timeAlgorithms";

const TimeStatistics = (props) => {

    const {
        timeStats,
        timeStatsPerRecipient,
        recipients,
        recipientFilter,
        setRecipientFilter
    } = props;

    const theme = useTheme();

    const getLineChartBase = useCallback((data = [], getLabel = () => '') => () => ({
        labels: data.map(getLabel),
        datasets: [
            {
                label: 'Messages sent',
                data: data.map(({count}) => count),
                fill: false,
                backgroundColor: theme.palette.secondary.main,
                borderColor: theme.palette.secondary.dark,
                yAxisID: 'y-axis-1'
            },
            {
                label: 'Avg msg length',
                data: data.map(({averageLength}) => averageLength),
                fill: false,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.dark,
                yAxisID: 'y-axis-2'
            },
        ],
    }), [theme]);

    const chartOptions = {
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

    const currentData = useMemo(() => recipientFilter === NO_FILTER ?
        timeStats :
        timeStatsPerRecipient[unfixEncoding(recipientFilter)],
        [recipientFilter, timeStats, timeStatsPerRecipient]);

    const hourlyData = useMemo(() => {
        let data = currentData.hourly;
        const getHourLabel = ({hour}) => hour;
        return getLineChartBase(data, getHourLabel);

    }, [currentData, getLineChartBase]);

    const weeklyData = useMemo(() => {
        let data = currentData.weekly;
        const getWeeklyLabel = item => moment().isoWeekday(item.isoWeekday).format('dddd');
        return getLineChartBase(data, getWeeklyLabel);

    }, [currentData, getLineChartBase]);


    const timelineData = useMemo(() => {
        let data = currentData.timelineStats;

        const getTimelineLabel = ({date}) => moment(date, MONTH_YEAR_FORMAT).format('MMM YYYY');
        return getLineChartBase(data, getTimelineLabel);

    }, [currentData, getLineChartBase]);


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
                <Typography>
                    Hourly statistics
                </Typography>
                <Line data={hourlyData} options={chartOptions}/>
            </Grid>
            <Grid item xs={6}>
                <Typography>
                    Weekly statistics
                </Typography>
                <Line data={weeklyData} options={chartOptions}/>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    Timeline statistics
                </Typography>
                <Line data={timelineData} options={chartOptions}/>
            </Grid>
        </Grid>
    );
};

TimeStatistics.propTypes = {};

export default TimeStatistics;