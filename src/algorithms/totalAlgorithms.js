import {replaceRetarded} from "./encoding";


export const getTotalStats = (messagesMap) => {

    return {
        totalMessages: getTotalMessages(messagesMap),
        topUsers: getTopUsers(messagesMap)
    }
}

const getTotalMessages = (messagesMap) => {
    return [...messagesMap.values()].reduce((acc, json)=> acc + json.messages.length, 0);
}

const getTopUsers = (messagesMap, top = 10) => {
    let allUsers = [...messagesMap.values()].map(json => ({
        name: json.title,
        messagesCount: json.messages.length
    }));

    allUsers.sort((a, b) => a.messagesCount < b.messagesCount ? 1 : -1);
    return allUsers.slice(0, top).map(user => ({...user, name: replaceRetarded([user.name])[0]}));
}