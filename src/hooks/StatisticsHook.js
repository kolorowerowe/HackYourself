import {useState} from "react";
import {unfixEncoding} from "../algorithms/encoding";
import messageAnalysisWorker from "../workers/messageAnalysis";
import {saveToFile} from "../utils/fileSaver";
import {STATS_MISSING, STATS_NOT_READY, STATS_OK} from "../components/root/constans";


export const useStatistics = () => {

    const [statistics, setStatistics] = useState({});

    const [statisticsStatus, setStatisticsStatus] = useState({
        message: STATS_NOT_READY,
        topics: STATS_NOT_READY
    });

    const [loadingLabel, setLoadingLabel] = useState('');

    const setStatisticsFromRawData = async (data, userName) => {

        const {threadList, topics} = data;

        setLoadingLabel('Started analyzing data');
        const userNameOriginal = unfixEncoding(userName);


        let newStatistics = {
            messengerStatistics: {},
            topics: []
        };

        if (!isObjectEmpty(threadList)) {
            setLoadingLabel('Analyzing total statistics ...');
            newStatistics.messengerStatistics.totalStats = await messageAnalysisWorker.postForTotalStats(threadList, userNameOriginal);

            setLoadingLabel('Analyzing time statistics ...');
            newStatistics.messengerStatistics.timeStats = await messageAnalysisWorker.postForTimeStats(threadList, userNameOriginal);

            setLoadingLabel('Analyzing word statistics ...');
            newStatistics.messengerStatistics.wordStats = await messageAnalysisWorker.postForWordStats(threadList, userNameOriginal);

            setLoadingLabel('Analyzing time statistics per recipient ...');
            newStatistics.messengerStatistics.timeStatsPerRecipient = await messageAnalysisWorker.postForTimeStatsPerRecipient(threadList, userNameOriginal);


            setLoadingLabel('Analyzing word statistics per recipient ...');
            newStatistics.messengerStatistics.wordStatsPerRecipient = await messageAnalysisWorker.postForWordStatsPerRecipient(threadList, userNameOriginal);

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