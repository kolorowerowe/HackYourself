import {useState} from "react";
import {unfixEncoding} from "../algorithms/encoding";
import analysisWorker from "../workers/messageAnalysis";
import {saveToFile} from "../utils/fileSaver";
import {STATS_MISSING, STATS_NOT_READY, STATS_OK} from "../components/root/constans";
import {useTranslation} from "react-i18next";


export const useStatistics = () => {

    const {t} = useTranslation();
    const [statistics, setStatistics] = useState({});

    const [statisticsStatus, setStatisticsStatus] = useState({
        message: STATS_NOT_READY,
        aboutYou: STATS_NOT_READY,
        topics: STATS_NOT_READY,
        events: STATS_NOT_READY,
        posts: STATS_NOT_READY
    });

    const [loadingLabel, setLoadingLabel] = useState('');

    const setStatisticsFromRawData = async (data, userName) => {

        const {threadList, aboutYou, topics, events, posts} = data;

        setLoadingLabel(t('general:analyzing.started'));
        const userNameOriginal = unfixEncoding(userName);


        let newStatistics = {
            messengerStatistics: {},
            aboutYouStatistics: {},
            topics: [],
            events: {},
            posts: {}
        };

        if (!isObjectEmpty(threadList)) {
            setLoadingLabel(t('general:analyzing_message_total_statistics'));
            newStatistics.messengerStatistics.totalStats = await analysisWorker.postForTotalStats(threadList, userNameOriginal);

            setLoadingLabel(t('general:analyzing_message_time_statistics'));
            newStatistics.messengerStatistics.timeStats = await analysisWorker.postForTimeStats(threadList, userNameOriginal);

            setLoadingLabel(t('general:analyzing_message_word_statistics'));
            newStatistics.messengerStatistics.wordStats = await analysisWorker.postForWordStats(threadList, userNameOriginal);

            setLoadingLabel(t('general:analyzing_message_time_per_recipient'));
            newStatistics.messengerStatistics.timeStatsPerRecipient = await analysisWorker.postForTimeStatsPerRecipient(threadList, userNameOriginal);

            setLoadingLabel(t('general:analyzing_message_word_per_recipient'));
            newStatistics.messengerStatistics.wordStatsPerRecipient = await analysisWorker.postForWordStatsPerRecipient(threadList, userNameOriginal);

            setLoadingLabel(t('general:message_ready'));
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
            setLoadingLabel(t('general:analyzing_about_you'));
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
            setLoadingLabel(t('general:setting_topics'));
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

        if (!isObjectEmpty(events)) {
            setLoadingLabel(t('general:analyzing_events'));
            newStatistics.eventStatistics = await analysisWorker.postForEventStatistics(events);

            setStatisticsStatus(prev => ({
                ...prev,
                events: STATS_OK
            }));
        } else {
            setStatisticsStatus(prev => ({
                ...prev,
                events: STATS_MISSING
            }));
        }

        if(!isObjectEmpty(posts)) {
            setLoadingLabel(t('general:analyzing_posts'));
            newStatistics.postsStatistics = await analysisWorker.postForPostsStatistics(posts);

            setStatisticsStatus(prev =>({
                ...prev,
                posts: STATS_OK
            }));
        }else {
            setStatisticsStatus(prev => ({
                ...prev,
                posts: STATS_MISSING
            }))
        }


        setStatistics(newStatistics);
        setLoadingLabel(t('general:all_things_done'));

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

        if (!isObjectEmpty(newStats.eventStatistics)) {
            setStatisticsStatus(prev => ({
                ...prev,
                events: STATS_OK
            }));
        } else {
            setStatisticsStatus(prev => ({
                ...prev,
                events: STATS_MISSING
            }));
        }

        if(!isObjectEmpty(newStats.postsStatistics)) {
            setStatisticsStatus(prev =>({
                ...prev,
                posts: STATS_OK
            }));
        }else {
            setStatisticsStatus(prev =>({
                ...prev,
                posts: STATS_MISSING
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