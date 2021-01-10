import React, {useState} from 'react';
import {loadDataFromDirPath, loadDataFromStatsFile} from "../../utils/fileLoader";
import SnackbarAlert from "./SnackbarAlert";
import SideBar from "./SideBar";
import {unfixEncoding} from '../../algorithms/encoding';
import {getUserNameFromThreads} from '../../algorithms/utils';
import {R_CHOOSE_FOLDER, R_CHOOSE_STATS_FILE, R_CONTACT, R_HELP, R_STATS} from "./routes";
import messageAnalysisWorker from "../../workers/messageAnalysis";
import {saveToFile} from "../../utils/fileSaver";
import ChooseStatsFileComponent from "../loadData/ChooseStatsFileComponent";
import {PATH_TO_FOLDER, PATH_TO_STATS_FILE, USER_NAME} from "./localStorageKeys";
import {Route, Switch, useHistory} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import HelpComponent from "../help/HelpComponent";
import ContactComponent from "../contact/ContactComponent";
import StatisticsComponentContainer from "../stats/StatisticsComponentContainer";
import ChooseFolderComponent from "../loadData/ChooseFolderComponent";
import HelloComponent from "../hello/HelloComponent";

const RootComponent = () => {
    const classes = useStyles();
    const history = useHistory();

    const [userName, setUserName] = useState('');
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
        if (userName) {
            localStorage.setItem(USER_NAME, userName);
        }

        loadDataFromDirPath(pathToFolder).then(async threadList => {
            setStep(1);

            const newStatistics = await getStatsFromThreads(threadList);
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

    const getStatsFromThreads = async (threadList) => {

        let _userName = userName;
        if (!_userName) {
            _userName = getUserNameFromThreads(threadList);
            setUserName(_userName);
        }
        setStep(2);

        const userNameOriginal = unfixEncoding(_userName);

        let newStatistics = {};

        newStatistics.totalStats = await messageAnalysisWorker.postForTotalStats(threadList, userNameOriginal);
        setStep(3);

        newStatistics.wordStats = await messageAnalysisWorker.postForWordStats(threadList, userNameOriginal);
        setStep(4);

        newStatistics.timeStats = await messageAnalysisWorker.postForTimeStats(threadList, userNameOriginal);
        setStep(5);

        newStatistics.timeStatsPerRecipient = await messageAnalysisWorker.postForTimeStatsPerRecipient(threadList, userNameOriginal);
        setStep(6);

        newStatistics.wordStatsPerRecipient = await messageAnalysisWorker.postForWordStatsPerRecipient(threadList, userNameOriginal);
        setStep(7);

        return newStatistics;
    }


    return (
        <div className={classes.root}>
            <SideBar/>
            <main className={classes.content}>
                <Switch>
                    <Route exact path="/">
                        <HelloComponent/>
                    </Route>
                    <Route exact path={R_CHOOSE_FOLDER}>
                        <ChooseFolderComponent userName={userName}
                                               setUserName={setUserName}
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
                        <ContactComponent userName={userName}/>
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
