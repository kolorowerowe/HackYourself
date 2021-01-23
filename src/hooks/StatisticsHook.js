import {useState} from "react";
import {unfixEncoding} from "../algorithms/encoding";
import messageAnalysisWorker from "../workers/messageAnalysis";
import {saveToFile} from "../utils/fileSaver";


export const useStatistics = () => {

    const [statistics, setStatistics] = useState({});
    const [allStatisticsLoaded, setAllStatisticsLoaded] = useState(false);
    const [loadingPercentage, setLoadingPercentage] = useState(0);

    const allSteps = 6;
    const setStep = (step) => {
        setLoadingPercentage(Math.round((step / allSteps) * 100));
    }

    const setStatisticsFromThreads = async (threadList, userName) => {

        setStep(1);
        const userNameOriginal = unfixEncoding(userName);


        let newStatistics = {};

        newStatistics.totalStats = await messageAnalysisWorker.postForTotalStats(threadList, userNameOriginal);
        setStep(2);

        newStatistics.wordStats = await messageAnalysisWorker.postForWordStats(threadList, userNameOriginal);
        setStep(3);

        newStatistics.timeStats = await messageAnalysisWorker.postForTimeStats(threadList, userNameOriginal);
        setStep(4);

        newStatistics.timeStatsPerRecipient = await messageAnalysisWorker.postForTimeStatsPerRecipient(threadList, userNameOriginal);
        setStep(5);

        newStatistics.wordStatsPerRecipient = await messageAnalysisWorker.postForWordStatsPerRecipient(threadList, userNameOriginal);
        setStep(6);

        setStatistics(newStatistics);
        saveToFile('stats.json', newStatistics);
        setAllStatisticsLoaded(true);

        setTimeout(() => setStep(0), 3000);


    }

    const setStatisticsManually = (newStats) => {
        setStatistics(newStats);
        setAllStatisticsLoaded(true);
    }

    return {
        statistics,
        loadingPercentage,
        allStatisticsLoaded,
        setStatisticsFromThreads,
        setStatisticsManually
    }
}