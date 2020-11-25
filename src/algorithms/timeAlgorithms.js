import {getRecipients} from "./utils";

const getHourly = (hour, messages) => {
    let filtered = messages.filter(m => m.date.getHours() === hour);
    let contents = filtered.map(e => e.content).filter(e => e);
    let averageLength = contents.length === 0 ? 0
        : (contents.reduce((acc, curr) => acc + (curr ? curr.length : 0), 0) / contents.length);
    return {
        count: filtered.length,
        averageLength
    };
};

const getWeekly = (day, messages) => {
    let filtered = messages.filter(m => m.date.getDay() === day);
    let contents = filtered.map(e => e.content).filter(e => e);
    let averageLength = contents.length === 0 ? 0
        : (contents.reduce((acc, curr) => acc + (curr ? curr.length : 0), 0) / contents.length);
    return {
        count: filtered.length,
        averageLength
    };
};


// Gets hourly/weekly stats
// param: messages - list of serialized jsons from inbox
export const getTimeStats = (messages, user_name) => {

    const allMessages = messages.map(e => e.messages)
        .filter(e => e)
        .flat()
        .filter(m => m.sender_name === user_name);

    const messagesWithDate = allMessages.filter(x => x.timestamp_ms)
        .map(e => ({...e, date: new Date(e.timestamp_ms)}));

    let hourly = [];
    for (let i = 0; i < 24; ++i) {
        hourly[i] = getHourly(i, messagesWithDate);
    }
    let weekly = [];
    for (let i = 0; i < 7; ++i) {
        weekly[i] = getWeekly(i, messagesWithDate);
    }

    return {hourly, weekly};
}

export const getTimeStatsPerRecipient = (messages, user_name) => {
    const recipients = getRecipients(messages, user_name);
    const stats = {};
    for (let rec of recipients) {
        const filtered = messages.filter(m => m.participants
            && m.participants.map(p => p.name).length < 3
            && m.participants.map(p => p.name).includes(rec));
        stats[rec] = getTimeStats(filtered, user_name);
    }
    return stats;
};
