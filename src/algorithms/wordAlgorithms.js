import {replaceWithJSCharacters, toRemove} from "./encoding";
import {getRecipients} from "./utils";

export const getWordStats = (messages, user_name) => {
    const allMessages = messages.map(e => e.messages).filter(e => e).flat();
    const texts = allMessages.filter(m => m.sender_name === user_name && m.type === 'Generic')
        .map(m => m.content)
        .filter(m => m);

    let split = texts.map(t => t.split(/(\s+)/))
        .flat()
        .map(t => t.trim())
        .filter(t => t.length > 0);

    split = replaceWithJSCharacters(split)
        .map(m => m.replace(toRemove, "").toLocaleLowerCase())
        .filter(e => e);

    let occurrences = split.reduce((acc, word) => {
        if (typeof acc[word] == 'undefined') {
            acc[word] = 1;
        } else {
            acc[word] += 1;
        }
        return acc;
    }, {});

    let occurrencesList = [];
    for (const [key, value] of Object.entries(occurrences)) {
        occurrencesList.push(({word: key, value: value}));
    }

    occurrencesList.sort(compareOccurrence).reverse();
    occurrencesList = occurrencesList.map((occurrence, index) => ({...occurrence, order: index + 1}));

    return {
        occurrencesList,
        count: texts.length
    };
}

const compareOccurrence = (a, b) => {
    if (a.value < b.value) {
        return -1;
    }
    if (a.value > b.value) {
        return 1;
    }
    return 0;
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