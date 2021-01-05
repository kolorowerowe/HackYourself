import React, {useState} from 'react';
import LoadDataComponentContainer from "../loadData/LoadDataComponentContainer";
import {loadDataFromPath} from "../../utils/fileLoader";
import SnackbarAlert from "./SnackbarAlert";
import makeStyles from "@material-ui/core/styles/makeStyles";
import SideBar from "./SideBar";
import StatisticsComponentContainer from "../stats/StatisticsComponentContainer";
import ContactComponent from "../contact/ContactComponent";
import {replaceWithJSONCharacters} from '../../algorithms/encoding';
import {getUsername} from '../../algorithms/utils';
import HelpComponent from "../hello/HelpComponent";
import {CHOOSE_DIR, CONTACT, HELP, STATS} from "./routes";
import messageAnalysisWorker from "../../workers/messageAnalysis";

const RootComponent = () => {
    const classes = useStyles();

    const [route, setRoute] = useState(CHOOSE_DIR);

    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingPercentage, setLoadingPercentage] = useState(0);
    const [fileValidationError, setFileValidationError] = useState(null);


    const [statistics, setStatistics] = useState({});
    const [allStatsLoaded, setAllStatsLoaded] = useState(false);

    const [snackbarMessage, setSnackbarMessage] = useState('');

    const onLoadData = async (path) => {
        setFileValidationError(null);
        setLoading(true);
        setStep(0);
        if (path) {
            localStorage.setItem('PATH', path);
        }
        if (username) {
            localStorage.setItem('USERNAME', username);
        }

        loadDataFromPath(path).then(async data => {
            setStep(1);
            await setStatsFromMessagesMap(data);

            setRoute(STATS);
            setLoading(false);
            setAllStatsLoaded(true);
            setSnackbarMessage('Loaded successfully');

            // await saveToFile('stats.json', newStatistics);
        }).catch(e => {
            setFileValidationError(e);
        });
    }

    const allSteps = 7;
    const setStep = (step) => {
        setLoadingPercentage(Math.round((step / allSteps) * 100));
    }

    const setStatsFromMessagesMap = async (messagesMap) => {

        let _username = username;
        if (!_username) {
            _username = getUsername([...messagesMap.values()]);
            setUsername(_username);
        }
        setStep(2);

        const messages = [...messagesMap.values()];
        const usernameNormalized = replaceWithJSONCharacters(_username);

        let newStatistics = {};

        newStatistics.totalStats = await messageAnalysisWorker.postForTotalStats(messagesMap, usernameNormalized);
        setStep(3);

        newStatistics.totalStats = await messageAnalysisWorker.postForTotalStats(messagesMap, usernameNormalized);
        setStep(3);

        newStatistics.wordStats = await messageAnalysisWorker.postForWordStats(messages, usernameNormalized);
        setStep(4);

        newStatistics.timeStats = await messageAnalysisWorker.postForTimeStats(messages, usernameNormalized);
        setStep(5);

        newStatistics.timeStatsPerRecipient = await messageAnalysisWorker.postForTimeStatsPerRecipient(messages, usernameNormalized);
        setStep(6);

        newStatistics.wordStatsPerRecipient = await messageAnalysisWorker.postForWordStatsPerRecipient(messages, usernameNormalized);
        setStep(7);

        setStatistics(newStatistics);

        return newStatistics;
    }


    return (
        <div className={classes.root}>
            <SideBar route={route}
                     setRoute={setRoute}/>
            <main className={classes.content}>
                {route === CHOOSE_DIR && <LoadDataComponentContainer username={username}
                                                                     setUsername={setUsername}
                                                                     loading={loading}
                                                                     loadingPercentage={loadingPercentage}
                                                                     fileValidationError={fileValidationError}
                                                                     onLoadData={onLoadData}/>
                }
                {route === STATS && <StatisticsComponentContainer messagesLoaded={allStatsLoaded}
                                                                  statistics={statistics}/>
                }
                {route === HELP && <HelpComponent navigateToChooseDir={() => setRoute(CHOOSE_DIR)}/>}
                {route === CONTACT && <ContactComponent username={username}/>}
            </main>

            <SnackbarAlert snackbarMessage={snackbarMessage}
                           setSnackbarMessage={setSnackbarMessage}/>

        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
    },
}));

export default RootComponent;
