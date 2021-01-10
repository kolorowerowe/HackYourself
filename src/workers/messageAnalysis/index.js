import PromiseWorker from 'promise-worker';

// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!./worker';


const worker = new Worker();
const promiseWorker = new PromiseWorker(worker);

const postForTotalStats = (threadList, userName) => promiseWorker.postMessage({
    type: 'getTotalStats', threadList, userName
});

const postForWordStats = (threadList, userName) => promiseWorker.postMessage({
    type: 'getWordStats', threadList, userName
});

const postForTimeStats = (threadList, userName) => promiseWorker.postMessage({
    type: 'getTimeStats', threadList, userName
});

const postForTimeStatsPerRecipient = (threadList, userName) => promiseWorker.postMessage({
    type: 'getTimeStatsPerRecipient', threadList, userName
});

const postForWordStatsPerRecipient = (threadList, userName) => promiseWorker.postMessage({
    type: 'getWordStatsPerRecipient', threadList, userName
});

export default {
    postForTotalStats,
    postForWordStats,
    postForTimeStats,
    postForTimeStatsPerRecipient,
    postForWordStatsPerRecipient
}