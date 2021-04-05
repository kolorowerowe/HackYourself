import {useState} from "react";
import {unfixEncoding} from "../algorithms/encoding";
import analysisWorker from "../workers/messageAnalysis";
import {saveToFile} from "../utils/fileSaver";
import {STATS_MISSING, STATS_NOT_READY, STATS_OK} from "../components/root/constans";


export const useStatistics = () => {

    const [statistics, setStatistics] = useState({});

    const [statisticsStatus, setStatisticsStatus] = useState({
        message: STATS_NOT_READY,
        aboutYou: STATS_NOT_READY,
        topics: STATS_NOT_READY
    });

    const [loadingLabel, setLoadingLabel] = useState('');

    const setStatisticsFromRawData = async (data, userName) => {

        const {threadList, aboutYou, topics} = data;

        setLoadingLabel('Started analyzing data');
        const userNameOriginal = unfixEncoding(userName);


        let newStatistics = {
            messengerStatistics: {},
            aboutYouStatistics: {},
            topics: []
        };

        if (!isObjectEmpty(threadList)) {
            setLoadingLabel('Analyzing total statistics ...');
            newStatistics.messengerStatistics.totalStats = await analysisWorker.postForTotalStats(threadList, userNameOriginal);

            setLoadingLabel('Analyzing time statistics ...');
            newStatistics.messengerStatistics.timeStats = await analysisWorker.postForTimeStats(threadList, userNameOriginal);

            setLoadingLabel('Analyzing word statistics ...');
            newStatistics.messengerStatistics.wordStats = await analysisWorker.postForWordStats(threadList, userNameOriginal);

            setLoadingLabel('Analyzing time statistics per recipient ...');
            newStatistics.messengerStatistics.timeStatsPerRecipient = await analysisWorker.postForTimeStatsPerRecipient(threadList, userNameOriginal);


            setLoadingLabel('Analyzing word statistics per recipient ...');
            newStatistics.messengerStatistics.wordStatsPerRecipient = await analysisWorker.postForWordStatsPerRecipient(threadList, userNameOriginal);

            setLoadingLabel('Analyzed messenger statistics.');
            setStatisticsStatus(prev => ({
                ...prev,
                message: STATS_OK
            }));
        } else {
            setStatisticsStatus(prev => ({
                ...prev,
                message: STATS_MISSING
            }));
        }

        if (!isObjectEmpty(aboutYou)) {
            setLoadingLabel('Analyzing about you ...');
            newStatistics.aboutYouStatistics = await analysisWorker.postForAboutYouStatistics(aboutYou);

            setStatisticsStatus(prev => ({
                ...prev,
                aboutYou: STATS_OK
            }));
        } else {
            setStatisticsStatus(prev => ({
                ...prev,
                aboutYou: STATS_MISSING
            }));
        }

        if (!isObjectEmpty(topics)) {
            setLoadingLabel('Setting topics ...');
            newStatistics.topics = topics;
            setStatisticsStatus(prev => ({
                ...prev,
                topics: STATS_OK
            }));
        } else {
            setStatisticsStatus(prev => ({
                ...prev,
                topics: STATS_MISSING
            }));
        }

        setStatistics(newStatistics);
        setLoadingLabel('Done!');

        saveToFile('stats.json', newStatistics);

        setTimeout(() => setLoadingLabel(''), 3000);

    }

    const setStatisticsManually = (newStats) => {
        setStatistics(newStats);

        if (!isObjectEmpty(newStats.messengerStatistics)) {
            setStatisticsStatus(prev => ({
                ...prev,
                message: STATS_OK
            }));
        } else {
            setStatisticsStatus(prev => ({
                ...prev,
                message: STATS_MISSING
            }));
        }

        if (isObjectEmpty(newStats.aboutYou)) {
            setStatisticsStatus(prev => ({
                ...prev,
                aboutYou: STATS_OK
            }));
        } else {
            setStatisticsStatus(prev => ({
                ...prev,
                aboutYou: STATS_MISSING
            }));
        }

        if (!isObjectEmpty(newStats.topics)) {
            setStatisticsStatus(prev => ({
                ...prev,
                topics: STATS_OK
            }));
        } else {
            setStatisticsStatus(prev => ({
                ...prev,
                topics: STATS_MISSING
            }));
        }
    }

    return {
        statistics,
        loadingLabel,
        statisticsStatus,
        setStatisticsFromRawData,
        setStatisticsManually
    }
}

const isObjectEmpty = (obj) => {
    return !obj || Object.keys(obj).length === 0;
}