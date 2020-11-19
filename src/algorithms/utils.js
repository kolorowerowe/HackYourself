import {replaceRetarded} from './encoding';

export const getRecipients = (messages, user_name) => {
    let recipients = [];
    for (let thread of messages) {
        if (thread.participants) {
            recipients = [...recipients, ...thread.participants.map(p => p.name).filter(p => p && p !== user_name)];
        }
    }

    return recipients;
}

export const getUsername = (messages) => {
    console.log(messages);
    let users = {};
    for (let thread of messages) {
        if (thread.participants) {
            for (let part of thread.participants.filter(p => p.name)){
                if (!users[part.name])
                    users[part.name] = 1;
                else 
                    users[part.name] += 1;
            }
        }
    }
    return Object.keys(users).length ? replaceRetarded([Object.keys(users).reduce((a, b) => users[a] > users[b] ? a : b)])[0] : "";
}