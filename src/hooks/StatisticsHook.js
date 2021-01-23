import {useState} from "react";
import {unfixEncoding} from "../algorithms/encoding";
import messageAnalysisWorker from "../workers/messageAnalysis";
import {saveToFile} from "../utils/fileSaver";
import {STATS_NOT_READY, STATS_OK} from "../components/root/constans";


export const useStatistics = () => {

    const [statistics, setStatistics] = useState({});

    const [statisticsStatus, setStatisticsStatus] = useState({
        message: STATS_NOT_READY,
        topics: STATS_NOT_READY
    });

    const [loadingPercentage, setLoadingPercentage] = useState(0);

    const allSteps = 6;
    const setStep = (step) => {
        setLoadingPercentage(Math.round((step / allSteps) * 100));
    }

    const setStatisticsFromRawData = async (data, userName) => {

        const {threadList, topics} = data;

        setStep(1);
        const userNameOriginal = unfixEncoding(userName);


        let newStatistics = {
            messengerStatistics: {},
            topics: []
        };

        newStatistics.messengerStatistics.totalStats = await messageAnalysisWorker.postForTotalStats(threadList, userNameOriginal);
        setStep(2);

        newStatistics.messengerStatistics.wordStats = await messageAnalysisWorker.postForWordStats(threadList, userNameOriginal);
        setStep(3);

        newStatistics.messengerStatistics.timeStats = await messageAnalysisWorker.postForTimeStats(threadList, userNameOriginal);
        setStep(4);

        newStatistics.messengerStatistics.timeStatsPerRecipient = await messageAnalysisWorker.postForTimeStatsPerRecipient(threadList, userNameOriginal);
        setStep(5);

        newStatistics.messengerStatistics.wordStatsPerRecipient = await messageAnalysisWorker.postForWordStatsPerRecipient(threadList, userNameOriginal);
        setStep(6);

        newStatistics.topics = topics;

        setStatistics(newStatistics);
        saveToFile('stats.json', newStatistics);

        //TODO: handle cases
        setStatisticsStatus(prev => ({
            ...prev,
            message: STATS_OK,
            topics: STATS_OK
        }));

        setTimeout(() => setStep(0), 3000);


    }

    const setStatisticsManually = (newStats) => {
        setStatistics(newStats);

        //TODO: handle cases
        setStatisticsStatus(prev => ({
            ...prev,
            message: STATS_OK,
            topics: STATS_OK
        }));
    }

    return {
        statistics,
        loadingPercentage,
        statisticsStatus,
        setStatisticsFromRawData,
        setStatisticsManually
    }
}