import PromiseWorker from 'promise-worker';

// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!./worker';


const worker = new Worker();
const promiseWorker = new PromiseWorker(worker);

const postForTotalStats = (messages, username) => promiseWorker.postMessage({
    type: 'getTotalStats', messages, username
});

const postForWordStats = (messages, username) => promiseWorker.postMessage({
    type: 'getWordStats', messages, username
});

const postForTimeStats = (messages, username) => promiseWorker.postMessage({
    type: 'getTimeStats', messages, username
});

const postForTimeStatsPerRecipient = (messages, username) => promiseWorker.postMessage({
    type: 'getTimeStatsPerRecipient', messages, username
});

const postForWordStatsPerRecipient = (messages, username) => promiseWorker.postMessage({
    type: 'getWordStatsPerRecipient', messages, username
});

export default {
    postForTotalStats,
    postForWordStats,
    postForTimeStats,
    postForTimeStatsPerRecipient,
    postForWordStatsPerRecipient
}