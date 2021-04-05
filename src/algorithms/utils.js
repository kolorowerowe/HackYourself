import {fixEncoding} from './encoding';

export const getRecipients = (threadList) => {
    return threadList.map(thread => thread.title).filter(title => !!title);
}

export const getUserNameFromThreads = (threadList) => {
    let users = {};
    for (let thread of threadList) {
        if (thread.participants) {
            for (let part of thread.participants.filter(p => p.name)) {
                if (!users[part.name])
                    users[part.name] = 1;
                else
                    users[part.name] += 1;
            }
        }
    }
    return Object.keys(users).length ? fixEncoding(Object.keys(users).reduce((a, b) => users[a] > users[b] ? a : b)) : "";
}

export const reduceToSum = (acc, x) => acc + x;

export const reduceToSumFromString = (acc, x) => acc + parseFloat(x);
