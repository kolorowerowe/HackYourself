import moment from "moment";
import {compareYearMonth, getMonthYear, MONTH_YEAR_FORMAT} from "../message/timeAlgorithms";

export const getEventStatistics = ({ events_invited = [], your_events = [], event_responses = {}}) => {


    const {events_joined, events_declined, events_interested} = event_responses;

    const allEvents = [
        ...events_invited,
        ...your_events,
        ...events_joined,
        ...events_declined,
        ...events_interested
    ];

    // credits: https://stackoverflow.com/a/46219650
    const uniqueEventsByName = allEvents.filter((e, i) => allEvents.findIndex(a => a.name === e.name) === i);

    const dateList = uniqueEventsByName.map(({start_timestamp}) => moment.unix(start_timestamp));


    return {
        yourEventsCount: your_events.length,
        eventsInvitedCount: events_invited.length,
        eventsJoinedCount: events_joined.length,
        eventsDeclinedCount: events_declined.length,
        eventsInterestedCount: events_interested.length,
        ...getTimeStats(dateList)
    };
};


// Gets hourly/weekly stats
// param: timestampList - list of timestamps
export const getTimeStats = (dateList) => {

    let hourly = [];
    for (let i = 0; i < 24; ++i) {
        hourly[i] = getHourlyStats(i, dateList);
    }

    let weekly = [];
    for (let i = 1; i <= 7; ++i) {
        weekly = [...weekly, getWeeklyStats(i, dateList)];
    }

    const timelineStats = getTimelineStats(dateList);

    return {hourly, weekly, timelineStats};
}


const getHourlyStats = (hour, dateList) => {
    let filtered = dateList.filter(d => d.hours() === hour);

    return {
        hour,
        count: filtered.length,
    };
};

const getWeeklyStats = (isoWeekday, dateList) => {
    let filtered = dateList.filter(d => d.isoWeekday() === isoWeekday);

    return {
        isoWeekday,
        count: filtered.length,
    };
};


const getTimelineStats = (dateList) => {

    const resMap = dateList.reduce((map, date) => {
        const monthYear = getMonthYear(date);

        const currCount = map.get(monthYear) || 0;

        map.set(monthYear, currCount + 1);

        return map;
    }, new Map());

    const timelineStatsInActiveMonth = [...resMap.entries()].sort(compareYearMonth).map(obj => ({
        date: moment(obj[0]).format(MONTH_YEAR_FORMAT),
        count: obj[1],
    }));

    if (timelineStatsInActiveMonth.length === 0) {
        return [];
    }

    let firstMonth = moment(timelineStatsInActiveMonth[0].date, MONTH_YEAR_FORMAT);
    const lastMonth = moment(timelineStatsInActiveMonth[timelineStatsInActiveMonth.length - 1].date, MONTH_YEAR_FORMAT);

    let generatedMonths = [];
    while (moment(firstMonth).isSameOrBefore(lastMonth, 'month')) {
        generatedMonths.push(firstMonth.format(MONTH_YEAR_FORMAT));
        firstMonth = firstMonth.add(1, 'month');
    }

    let timelineStatsPointer = 0;
    const timelineStatsAllMonths = generatedMonths.map(month => {
        if (month === timelineStatsInActiveMonth[timelineStatsPointer].date) {
            return timelineStatsInActiveMonth[timelineStatsPointer++]
        }
        return {
            date: month,
            count: 0,
        }
    });

    return timelineStatsAllMonths;
};