import {replaceWithJSCharacters} from "./encoding";


export const getTotalStats = (messagesMap, userName) => {

    return {
        totalMessagesSent: getTotalMessagesSent(messagesMap, userName),
        totalMessages: getTotalMessages(messagesMap),
        topUsers: getTopUsers(messagesMap, userName)
    }
}

const getTotalMessagesSent = (messagesMap, userName) => {
    return [...messagesMap.values()].reduce((acc, json) => acc + json.messages.filter(m => m.sender_name === userName && m.type === 'Generic').length, 0);
}

const getTotalMessages = (messagesMap) => {
    return [...messagesMap.values()].reduce((acc, json) => acc + json.messages.length, 0);
}

const getTopUsers = (messagesMap, userName, top = 10) => {
    let allUsers = [...messagesMap.values()]
        .filter(({title}) => !!title).map(json => ({
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