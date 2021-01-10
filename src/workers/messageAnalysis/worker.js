import registerPromiseWorker from 'promise-worker/register';
import {getWordStats, getWordStatsPerRecipient} from "../../algorithms/wordAlgorithms";
import {getTimeStats, getTimeStatsPerRecipient} from "../../algorithms/timeAlgorithms";
import {getTotalStats} from "../../algorithms/totalAlgorithms";


registerPromiseWorker((message) => {

    if (message.type === 'getTotalStats') {
        return getTotalStats(message.threadList, message.userName);
    }

    if (message.type === 'getWordStats') {
        return getWordStats(message.threadList, message.userName);
    }

    if (message.type === 'getTimeStats') {
        return getTimeStats(message.threadList, message.userName);
    }

    if (message.type === 'getWordStatsPerRecipient') {
        return getWordStatsPerRecipient(message.threadList, message.userName);
    }

    if (message.type === 'getTimeStatsPerRecipient') {
        return getTimeStatsPerRecipient(message.threadList, message.userName);
    }


});