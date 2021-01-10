import {getRecipients} from "./utils";
import moment from "moment";

const getMonthYear = (timestamp) => {
    return moment(timestamp).format("YYYY-MM");
}

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
        averageLength: obj[1].wordCount / obj[1].count
    }))

};

const compareYearMonth = (a,b) => {
    return moment(a[0]).valueOf() - moment(b[0]).valueOf();
}

const getHourly = (hour, messages) => {
    let filtered = messages.filter(m => m.date.getHours() === hour);
    let contents = filtered.map(e => e.content).filter(e => e);
    let averageLength = contents.length === 0 ? 0
        : (contents.reduce((acc, curr) => acc + (curr ? curr.length : 0), 0) / contents.length);
    return {
        hour,
        count: filtered.length,
        averageLength
    };
};

const getWeekly = (isoWeekday, messages) => {
    let filtered = messages.filter(m => moment(m.timestamp_ms).isoWeekday() === isoWeekday);
    let contents = filtered.map(e => e.content).filter(e => e);
    let averageLength = contents.length === 0 ? 0
        : (contents.reduce((acc, curr) => acc + (curr ? curr.length : 0), 0) / contents.length);
    return {
        isoWeekday,
        count: filtered.length,
        averageLength
    };
};


// Gets hourly/weekly stats
// param: messages - list of serialized jsons from inbox
export const getTimeStats = (threadList, userName) => {

    const allMessages = threadList.map(e => e.messages)
        .filter(e => e)
        .flat()
        .filter(m => m.sender_name === userName);

    const messagesWithDate = allMessages.filter(x => x.timestamp_ms && x.content)
        .map(e => ({...e, date: new Date(e.timestamp_ms)}));

    const timelineStats = getTimelineStats(messagesWithDate);

    let hourly = [];
    for (let i = 0; i < 24; ++i) {
        hourly[i] = getHourly(i, messagesWithDate);
    }
    let weekly = [];
    for (let i = 1; i <= 7; ++i) {
        weekly = [...weekly, getWeekly(i, messagesWithDate)];
    }

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
