import {fixEncoding} from "../encoding";
import {reduceToSum} from "../utils";


export const getTotalStats = (threadList, userName) => {

    return {
        totalMessagesSent: getTotalMessagesSent(threadList, userName),
        totalImagesSent: getTotalImagesSent(threadList, userName),
        totalVideosSent: getTotalVideosSent(threadList, userName),
        totalFilesSent: getTotalFilesSent(threadList, userName),
        totalSharesSent: getTotalSharesSent(threadList, userName),
        totalMessages: getTotalMessages(threadList),
        topUsers: getTopUsers(threadList, userName)
    }
}


const getTotalImagesSent = (threadList, userName) => {
    return threadList.reduce(
        (acc, json) => acc + json.messages
            .filter(m => m.sender_name === userName && m.type === 'Generic')
            .map(m => m.photos ? m.photos.length : 0)
            .reduce(reduceToSum, 0)
        , 0);
}

const getTotalVideosSent = (threadList, userName) => {
    return threadList.reduce(
        (acc, json) => acc + json.messages
            .filter(m => m.sender_name === userName && m.type === 'Generic')
            .map(m => m.videos ? m.videos.length : 0)
            .reduce(reduceToSum, 0)
        , 0);
}

const getTotalFilesSent = (threadList, userName) => {
    return threadList.reduce(
        (acc, json) => acc + json.messages
            .filter(m => m.sender_name === userName && m.type === 'Generic')
            .map(m => m.files ? m.files.length : 0)
            .reduce(reduceToSum, 0)
        , 0);
}

const getTotalSharesSent = (threadList, userName) => {
    return threadList.reduce(
        (acc, json) => acc + json.messages
            .filter(m => m.sender_name === userName && m.type === 'Share').length
        , 0);
}

const getTotalMessagesSent = (threadList, userName) => {
    return threadList.reduce(
        (acc, json) => acc + json.messages
            .filter(m => m.sender_name === userName && m.type === 'Generic')
            .length
        , 0);}

const getTotalMessages = (threadList) => {
    return threadList.reduce((acc, json) => acc + json.messages.length, 0);
}

const getTopUsers = (threadList, userName, top = 10) => {
    let allUsers = threadList.filter(({title}) => !!title).map(json => ({
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

    return allUsers.map(user => ({...user, name: fixEncoding(user.name)}));
}