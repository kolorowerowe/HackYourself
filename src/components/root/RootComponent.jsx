import React, {useState} from 'react';
import {loadDataFromDirPath, loadDataFromStatsFile} from "../../utils/fileLoader";
import SnackbarAlert from "./SnackbarAlert";
import SideBar from "./SideBar";
import {replaceWithJSONCharacters} from '../../algorithms/encoding';
import {getUsername} from '../../algorithms/utils';
import {R_CHOOSE_FOLDER, R_CHOOSE_STATS_FILE, R_CONTACT, R_HELP, R_STATS} from "./routes";
import messageAnalysisWorker from "../../workers/messageAnalysis";
import {saveToFile} from "../../utils/fileSaver";
import ChooseStatsFileComponent from "../loadData/ChooseStatsFileComponent";
import {PATH_TO_FOLDER, PATH_TO_STATS_FILE, USERNAME} from "./localStorageKeys";
import {Route, Switch, useHistory} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import HelpComponent from "../hello/HelpComponent";
import ContactComponent from "../contact/ContactComponent";
import StatisticsComponentContainer from "../stats/StatisticsComponentContainer";
import ChooseFolderComponent from "../loadData/ChooseFolderComponent";
import {Typography} from "@material-ui/core";

const RootComponent = () => {
    const classes = useStyles();
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingPercentage, setLoadingPercentage] = useState(0);
    const [fileValidationError, setFileValidationError] = useState(null);


    const [statistics, setStatistics] = useState({});
    const [allStatsLoaded, setAllStatsLoaded] = useState(false);

    const [snackbarMessage, setSnackbarMessage] = useState('');

    const onStartAnalysingDataClick = async (pathToFolder) => {
        setFileValidationError(null);
        setLoading(true);
        setStep(0);
        if (pathToFolder) {
            localStorage.setItem(PATH_TO_FOLDER, pathToFolder);
        }
        if (username) {
            localStorage.setItem(USERNAME, username);
        }

        loadDataFromDirPath(pathToFolder).then(async data => {
            setStep(1);

            const newStatistics = await getStatsFromMessagesMap(data);
            setStatistics(newStatistics);

            history.push(R_STATS);
            setLoading(false);
            setAllStatsLoaded(true);
            setSnackbarMessage('Successfully analysed data');

            saveToFile('stats.json', newStatistics);
        }).catch(e => {
            setFileValidationError(e);
        });
    }

    const onLoadStatisticsFromFileClick = async (pathToStatsFile) => {
        setFileValidationError(null);
        setLoading(true);

        if (pathToStatsFile) {
            localStorage.setItem(PATH_TO_STATS_FILE, pathToStatsFile);
        }

        loadDataFromStatsFile(pathToStatsFile).then(async data => {

            setStatistics(data);

            history.push(R_STATS);
            setLoading(false);
            setAllStatsLoaded(true);
            setSnackbarMessage('Loaded successfully from file');

        }).catch(e => {
            setFileValidationError(e);
        });
    }

    const allSteps = 7;
    const setStep = (step) => {
        setLoadingPercentage(Math.round((step / allSteps) * 100));
    }

    const getStatsFromMessagesMap = async (messagesMap) => {

        let _username = username;
        if (!_username) {
            _username = getUsername([...messagesMap.values()]);
            setUsername(_username);
        }
        setStep(2);

        const messages = [...messagesMap.values()];
        const usernameNormalized = replaceWithJSONCharacters(_username);

        let newStatistics = {};

        newStatistics.totalStats = await messageAnalysisWorker.postForTotalStats(messages, usernameNormalized);
        setStep(3);

        newStatistics.wordStats = await messageAnalysisWorker.postForWordStats(messages, usernameNormalized);
        setStep(4);

        newStatistics.timeStats = await messageAnalysisWorker.postForTimeStats(messages, usernameNormalized);
        setStep(5);

        newStatistics.timeStatsPerRecipient = await messageAnalysisWorker.postForTimeStatsPerRecipient(messages, usernameNormalized);
        setStep(6);

        newStatistics.wordStatsPerRecipient = await messageAnalysisWorker.postForWordStatsPerRecipient(messages, usernameNormalized);
        setStep(7);

        return newStatistics;
    }


    return (
        <div className={classes.root}>
            <SideBar/>
            <main className={classes.content}>
                <Switch>
                    <Route exact path="/">
                        <Typography>
                            What do you want to do?
                        </Typography>
                    </Route>
                    <Route exact path={R_CHOOSE_FOLDER}>
                        <ChooseFolderComponent username={username}
                                               setUsername={setUsername}
                                               loading={loading}
                                               loadingPercentage={loadingPercentage}
                                               fileValidationError={fileValidationError}
                                               onStartAnalysingDataClick={onStartAnalysingDataClick}
                                               goToChooseStatsFile={() => history.push(R_CHOOSE_STATS_FILE)}/>
                    </Route>
                    <Route exact path={R_CHOOSE_STATS_FILE}>
                        <ChooseStatsFileComponent goToChooseFolder={() => history.push(R_CHOOSE_FOLDER)}
                                                  onLoadStatisticsFromFileClick={onLoadStatisticsFromFileClick}
                                                  loading={loading}
                                                  loadingPercentage={loadingPercentage}
                                                  fileValidationError={fileValidationError}/>
                    </Route>
                    <Route exact path={R_STATS}>
                        <StatisticsComponentContainer messagesLoaded={allStatsLoaded}
                                                      statistics={statistics}
                        />
                    </Route>
                    <Route exact path={R_HELP}>
                        <HelpComponent navigateToChooseDir={() => history.push(R_CHOOSE_FOLDER)}/>
                    </Route>
                    <Route exact path={R_CONTACT}>
                        <ContactComponent username={username}/>
                    </Route>
                </Switch>
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
