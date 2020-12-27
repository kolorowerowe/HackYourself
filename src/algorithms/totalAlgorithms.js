import {replaceRetarded} from "./encoding";


export const getTotalStats = (messagesMap, userName) => {

    return {
        totalMessagesSent: getTotalMessagesSent(messagesMap, userName),
        totalMessages: getTotalMessages(messagesMap),
        topUsers: getTopUsers(messagesMap, userName)
    }
}

const getTotalMessagesSent = (messagesMap, userName) => {
    return [...messagesMap.values()].reduce((acc, json)=> acc + json.messages.filter(m => m.sender_name === userName && m.type === 'Generic').length, 0);
}

const getTotalMessages = (messagesMap) => {
    return [...messagesMap.values()].reduce((acc, json)=> acc + json.messages.length, 0);
}

const getTopUsers = (messagesMap, userName, top = 10) => {
    let allUsers = [...messagesMap.values()].map(json => ({
        name: json.title || '*UNKNOWN*',
        sentMessagesCount: json.messages.filter(m => m.sender_name === userName && m.type === 'Generic').length,
        allMessagesCount: json.messages.length,
        participantsCount: json.participants.length
    }));

    allUsers.sort((a, b) => a.allMessagesCount < b.allMessagesCount ? 1 : -1);
    return allUsers.slice(0, top).map(user => ({...user, name: replaceRetarded([user.name])[0]}));
}