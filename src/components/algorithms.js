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
    for (let thread of messages){
        if (thread.participants){
            recipients = [...recipients, ...thread.participants.map(p => p.name).filter(p => p && p !== user_name)];
        }
    }

    return recipients;
}


// Gets hourly/weekly stats
// param: messages - list of serialized jsons from inbox
export const getTimeStats = (messages, user_name) => {
    const allMessages = messages.map(e => e.messages).filter(e => e).flat().filter(m => m.sender_name === user_name);
    const messagesWithDate = allMessages.filter(x => x.timestamp_ms).map(e => ({...e, date: new Date(e.timestamp_ms)}));
    let hourly = {};
    for (let i = 0; i < 24; ++i)
    {
        hourly[i] = getHourly(i, messagesWithDate);
    }
    let weekly = {};
    for (let i = 0; i < 7; ++i)
    {
        weekly[i] = getWeekly(i, messagesWithDate);
    }

    return {hourly, weekly};
}

export const getTimeStatsPerRecipient = (messages, user_name) => {
    const recipients = getRecipients(messages, user_name);
    const stats = {};
    for (let rec of recipients){
        const filtered = messages.filter(m => m.participants
            && m.participants.map(p => p.name).length < 3 
            && m.participants.map(p => p.name).includes(rec));
        stats[rec] = getTimeStats(filtered, user_name);
    }
    return stats;
};


const retardedEncoding = ["\u00c4\u0085", "\u00c4\u0084", "\u00c4\u0087", "\u00c4\u0086", "\u00c4\u0099", "\u00c4\u0098", "\u00c5\u0082", "\u00c5\u0081", "\u00c5\u0084", "\u00c5\u0083", "\u00c3\u00b3", "\u00c3\u0093", "\u00c5\u009b", "\u00c5\u009a", "\u00c5\u00ba", "\u00c5\u00b9", "\u00c5\u00bc", "\u00c5\u00bb"];
const lessRetardedEncoding = "ąĄćĆęĘłŁńŃóÓśŚźŹżŻ";
const conversion = ((a, b) => {
    let res = {};
    for (let i = 0; i < a.length; ++i) res[a[i]] = b[i];
    return res;
})(retardedEncoding, lessRetardedEncoding);

const replaceRetarded = (texts) => {
    let result = [];
    for (let t of texts){
        for (let key in conversion)
            t = t.replaceAll(key, conversion[key]);
        result.push(t);
    }
    return result;
}
const toRemove = /[0-9!@#$%^&*()\-_+={}[\]\\|:;'"<,.>/?]/g;


export const getWordStats = (messages, user_name) => {
    const allMessages = messages.map(e => e.messages).filter(e => e).flat();
    const texts = allMessages.filter(m => m.sender_name === user_name && m.type === 'Generic')
        .map(m => m.content).filter(m => m);
        let split = texts.map(t => t.split(/(\s+)/)).flat().map(t => t.trim()).filter(t => t.length > 0);
    split = replaceRetarded(split).map(m => m.replace(toRemove, "").toLocaleLowerCase()).filter(e => e);
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
    for (let rec of recipients){
        const filtered = messages.filter(m => m.participants
            && m.participants.map(p => p.name).length < 3 
            && m.participants.map(p => p.name).includes(rec));
        stats[rec] = getWordStats(filtered, user_name);
    }
    return stats;
};