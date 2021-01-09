import registerPromiseWorker from 'promise-worker/register';
import {getWordStats, getWordStatsPerRecipient} from "../../algorithms/wordAlgorithms";
import {getTimeStats, getTimeStatsPerRecipient} from "../../algorithms/timeAlgorithms";
import {getTotalStats} from "../../algorithms/totalAlgorithms";


registerPromiseWorker((message) => {

    if (message.type === 'getTotalStats') {
        return getTotalStats(message.messages, message.username);
    }

    if (message.type === 'getWordStats') {
        return getWordStats(message.messages, message.username);
    }

    if (message.type === 'getTimeStats') {
        return getTimeStats(message.messages, message.username);
    }

    if (message.type === 'getWordStatsPerRecipient') {
        return getWordStatsPerRecipient(message.messages, message.username);
    }

    if (message.type === 'getTimeStatsPerRecipient') {
        return getTimeStatsPerRecipient(message.messages, message.username);
    }


});