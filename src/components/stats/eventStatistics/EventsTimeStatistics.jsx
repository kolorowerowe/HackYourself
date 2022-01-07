import React, {useCallback, useMemo} from 'react';
import Grid from "@material-ui/core/Grid";
import {Typography, useTheme} from "@material-ui/core";
import {useCommonStyles} from "../../../theme/commonStyles";
import moment from "moment";
import {MONTH_YEAR_FORMAT} from "../../../algorithms/message/timeAlgorithms";
import {Line} from "react-chartjs-2";
import {useTranslation} from "react-i18next";

const EventsTimeStatistics = (props) => {
    const {t} = useTranslation();

    const {
        hourly,
        weekly,
        timelineStats
    } = props;

    const theme = useTheme();

    const getLineChartBase = useCallback((data = [], getLabel = () => '') => () => ({
        labels: data.map(getLabel),
        datasets: [
            {
                label: t('general:events_count'),
                data: data.map(({count}) => count),
                fill: false,
                backgroundColor: theme.palette.secondary.main,
                borderColor: theme.palette.secondary.dark,
                yAxisID: 'y-axis-1'
            }
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
                    show: false,
                },
            }]
        },
        legend: {
            display: false,
        }
    }

    const hourlyData = useMemo(() => {
        const getHourLabel = ({hour}) => hour;
        return getLineChartBase(hourly, getHourLabel);
    }, [hourly, getLineChartBase]);

    const weeklyData = useMemo(() => {
        const getWeeklyLabel = item => moment().isoWeekday(item.isoWeekday).format('dddd');
        return getLineChartBase(weekly, getWeeklyLabel);
    }, [weekly, getLineChartBase]);


    const timelineData = useMemo(() => {
        const getTimelineLabel = ({date}) => moment(date, MONTH_YEAR_FORMAT).format('MMM YYYY');
        return getLineChartBase(timelineStats, getTimelineLabel);
    }, [timelineStats, getLineChartBase]);


    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Typography>
                    {t('general:hour_stats')}
                </Typography>
                <Line data={hourlyData} options={chartOptions}/>
            </Grid>
            <Grid item xs={6}>
                <Typography>
                    {t('general:week_stats')}
                </Typography>
                <Line data={weeklyData} options={chartOptions}/>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    {t('general:time_stats')}
                </Typography>
                <Line data={timelineData} options={chartOptions}/>
            </Grid>
        </Grid>
    );
};


export default EventsTimeStatistics;
