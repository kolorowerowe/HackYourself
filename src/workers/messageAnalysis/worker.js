import registerPromiseWorker from 'promise-worker/register';
import {getWordStats, getWordStatsPerRecipient} from "../../algorithms/message/wordAlgorithms";
import {getTimeStats, getTimeStatsPerRecipient} from "../../algorithms/message/timeAlgorithms";
import {getTotalStats} from "../../algorithms/message/totalAlgorithms";
import {getAboutYouStatistics} from "../../algorithms/aboutYou/aboutYouAlgorithms";
import {getEventStatistics} from "../../algorithms/events/eventAlgorithms";
import {getPostsStatistics} from "../../algorithms/posts/postsAlgorithms";


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

    if (message.type === 'getAboutYouStatistics') {
        return getAboutYouStatistics(message.aboutYou);
    }

    if (message.type === 'getEventStatistics') {
        return getEventStatistics(message.events);
    }

    if(message.type === 'getPostsStatistics'){        
        return getPostsStatistics(message.posts);
    }

});