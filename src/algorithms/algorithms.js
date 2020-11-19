import {replaceRetarded, toRemove} from "./encoding";

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


const getRecipients = (messages, user_name) => {
    let recipients = [];
    for (let thread of messages) {
        if (thread.participants) {
            recipients = [...recipients, ...thread.participants.map(p => p.name).filter(p => p && p !== user_name)];
        }
    }

    return recipients;
}


// Gets hourly/weekly stats
// param: messages - list of serialized jsons from inbox
export const getTimeStats = (messages, user_name) => {

    const allMessages = messages.map(e => e.messages)
        .filter(e => e)
        .flat()
        .filter(m => m.sender_name === user_name);

    const messagesWithDate = allMessages.filter(x => x.timestamp_ms)
        .map(e => ({...e, date: new Date(e.timestamp_ms)}));

    let hourly = {};
    for (let i = 0; i < 24; ++i) {
        hourly[i] = getHourly(i, messagesWithDate);
    }
    let weekly = {};
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


export const getWordStats = (messages, user_name) => {
    const allMessages = messages.map(e => e.messages).filter(e => e).flat();
    const texts = allMessages.filter(m => m.sender_name === user_name && m.type === 'Generic')
        .map(m => m.content)
        .filter(m => m);

    let split = texts.map(t => t.split(/(\s+)/))
        .flat()
        .map(t => t.trim())
        .filter(t => t.length > 0);

    split = replaceRetarded(split)
        .map(m => m.replace(toRemove, "").toLocaleLowerCase())
        .filter(e => e);

    let occurences = split.reduce((acc, word) => {
        if (typeof acc[word] == 'undefined') {
            acc[word] = 1;
        } else {
            acc[word] += 1;
        }
        return acc;
    }, {});

    return {
        occurences,
        count: texts.length
    };
}


export const getWordStatsPerRecipient = (messages, user_name) => {
    const recipients = getRecipients(messages, user_name);
    const stats = {};
    for (let rec of recipients) {
        const filtered = messages.filter(m => m.participants
            && m.participants.map(p => p.name).length < 3
            && m.participants.map(p => p.name).includes(rec));
        stats[rec] = getWordStats(filtered, user_name);
    }
    return stats;
};

export const getTotalStats = (messagesMap) => {


    return {
        totalMessages: getTotalMessages(messagesMap),
        topUsers: getTopUsers(messagesMap)
    }
}

const getTotalMessages = (messagesMap) => {
    let totalMessages = 0;

    for (let [name, json] of messagesMap) {
        totalMessages += json.messages.length;
    }
    return totalMessages;
}

const getTopUsers = (messagesMap, top = 10) => {
    let allUsers = [];
    for (let [name, json] of messagesMap) {
        allUsers.push({
            name: json.title,
            messagesCount: json.messages.length
        })
    }
    allUsers.sort((a, b) => a.messagesCount < b.messagesCount ? 1 : -1);
    return allUsers.slice(0, top).map(user => ({...user, name: replaceRetarded([user.name])[0]}));
}