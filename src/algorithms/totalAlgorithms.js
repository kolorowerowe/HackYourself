import {fixEncoding, replaceWithJSCharacters} from "./encoding";


export const getTotalStats = (messages, userName) => {

    return {
        totalMessagesSent: getTotalMessagesSent(messages, userName),
        totalMessages: getTotalMessages(messages),
        topUsers: getTopUsers(messages, userName)
    }
}

const getTotalMessagesSent = (messages, userName) => {
    return messages.reduce((acc, json) => acc + json.messages.filter(m => m.sender_name === userName && m.type === 'Generic').length, 0);
}

const getTotalMessages = (messages) => {
    return messages.reduce((acc, json) => acc + json.messages.length, 0);
}

const getTopUsers = (messages, userName, top = 10) => {
    let allUsers = messages.filter(({title}) => !!title).map(json => ({
            name: json.title,
            sentMessagesCount: json.messages.filter(m => m.sender_name === userName && m.type === 'Generic').length,
            allMessagesCount: json.messages.length,
            participantsCount: json.participants.length
        }));

    allUsers.sort((a, b) => a.allMessagesCount < b.allMessagesCount ? 1 : -1);

    allUsers = allUsers.map((user, index) => ({
        ...user,
        activityRatio: Math.round(user.sentMessagesCount * user.participantsCount * 100 / user.allMessagesCount) - 100,
        order: index + 1
    }));

    return allUsers.map(user => ({...user, name: replaceWithJSCharacters([user.name])[0]}));
}