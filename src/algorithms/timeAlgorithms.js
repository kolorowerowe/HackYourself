import {getRecipients} from "./utils";
import moment from "moment";

const AVG_LENGTH_ROUNDING_FACTOR = 10;

const getMonthYear = (timestamp) => {
    return moment(timestamp).format("YYYY-MM");
}

const compareYearMonth = (a, b) => {
    return moment(a[0]).valueOf() - moment(b[0]).valueOf();
}

const getHourly = (hour, messages) => {
    let filtered = messages.filter(m => m.date.getHours() === hour);

    return {
        hour,
        count: filtered.length,
        averageLength: getAverageLengthFromMessages(filtered)
    };
};

const getWeekly = (isoWeekday, messages) => {
    let filtered = messages.filter(m => moment(m.timestamp_ms).isoWeekday() === isoWeekday);

    return {
        isoWeekday,
        count: filtered.length,
        averageLength: getAverageLengthFromMessages(filtered)
    };
};
const getTimelineStats = (messages) => {

    const resMap = messages.reduce((map, message) => {
        const monthYear = getMonthYear(message.timestamp_ms);

        const currObj = map.get(monthYear);

        map.set(monthYear, currObj ? {
                count: currObj.count + 1,
                wordCount: currObj.wordCount + message.content.length
            } :
            {
                count: 1,
                wordCount: message.content.length
            });

        return map;
    }, new Map());

    return [...resMap.entries()].sort(compareYearMonth).map(obj => ({
        date: moment(obj[0]).format('MMM YYYY'),
        count: obj[1].count,
        averageLength: Math.round(obj[1].wordCount * AVG_LENGTH_ROUNDING_FACTOR / obj[1].count) / AVG_LENGTH_ROUNDING_FACTOR
    }))

};

const getAverageLengthFromMessages = (messages) => {
    let contents = messages.map(e => e.content).filter(e => e);
    let allContentCharactersLength = contents.reduce((acc, curr) => acc + (curr ? curr.length : 0), 0);
    let averageLength = contents.length === 0 ? 0 : allContentCharactersLength / contents.length;

    return Math.round(averageLength * AVG_LENGTH_ROUNDING_FACTOR) / AVG_LENGTH_ROUNDING_FACTOR;
}


// Gets hourly/weekly stats
// param: messages - list of serialized jsons from inbox
export const getTimeStats = (threadList, userName) => {

    const allMessages = threadList.map(e => e.messages)
        .filter(e => e)
        .flat()
        .filter(m => m.sender_name === userName);

    const messagesWithDate = allMessages.filter(x => x.timestamp_ms && x.content)
        .map(e => ({...e, date: new Date(e.timestamp_ms)}));

    let hourly = [];
    for (let i = 0; i < 24; ++i) {
        hourly[i] = getHourly(i, messagesWithDate);
    }

    let weekly = [];
    for (let i = 1; i <= 7; ++i) {
        weekly = [...weekly, getWeekly(i, messagesWithDate)];
    }

    const timelineStats = getTimelineStats(messagesWithDate);

    return {hourly, weekly, timelineStats};
}

export const getTimeStatsPerRecipient = (threadList, userName) => {
    const recipients = getRecipients(threadList, userName);
    const stats = {};
    for (let rec of recipients) {
        const filtered = threadList.filter(m => m.participants
            && m.participants.map(p => p.name).length < 3
            && m.participants.map(p => p.name).includes(rec));
        stats[rec] = getTimeStats(filtered, userName);
    }
    return stats;
};
