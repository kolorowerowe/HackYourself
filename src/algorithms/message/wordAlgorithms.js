import {fixEncoding, linkRegex, toRemove} from "../encoding";
import {getRecipients} from "../utils";

export const getWordStats = (threadList, userName) => {
    const allMessages = threadList.map(e => e.messages).filter(e => e).flat();
    const texts = allMessages.filter(m => m.sender_name === userName && (m.type === 'Generic' || m.type === 'Share'))
        .map(m => m.content)
        .filter(m => m);

    let split = texts.map(t => t.split(/(\s+)/))
        .flat()
        .map(t => t.trim())
        .filter(t => t.length > 0);


    split = fixEncoding(split)
        .map(m => m.replace(linkRegex, ""))
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

export const getWordStatsPerRecipient = (threadList, userName) => {
    const recipients = getRecipients(threadList);
    const stats = {};
    for (let rec of recipients) {
        const filtered = threadList.filter(thread => thread.title === rec);
        stats[rec] = getWordStats(filtered, userName);
    }
    return stats;
};