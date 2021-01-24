import React, {useState} from 'react';
import {loadDataFromDirPath, loadDataFromStatsFile} from "../../utils/fileLoader";
import SideBar from "./SideBar";
import {getUserNameFromThreads} from '../../algorithms/utils';
import {R_CHOOSE_FOLDER, R_CHOOSE_STATS_FILE, R_CONTACT, R_HELP, R_STATS_MESSAGE, R_STATS_TOPICS} from "./routes";
import ChooseStatsFileComponent from "../loadData/ChooseStatsFileComponent";
import {PATH_TO_FOLDER, PATH_TO_STATS_FILE, USER_NAME} from "./localStorageKeys";
import {Route, Switch, useHistory} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import HelpComponent from "../help/HelpComponent";
import ContactComponent from "../contact/ContactComponent";
import StatisticsComponentContainer from "../stats/messageStatistics/StatisticsComponentContainer";
import ChooseFolderComponent from "../loadData/ChooseFolderComponent";
import HelloComponent from "../hello/HelloComponent";
import {useSnackbar} from "notistack";
import {useStatistics} from "../../hooks/StatisticsHook";
import TopicsComponentContainer from "../stats/topics/TopicsComponentContainer";

const RootComponent = () => {
    const classes = useStyles();
    const history = useHistory();
    const {enqueueSnackbar} = useSnackbar();

    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false);

    const {
        statistics: {
            messengerStatistics = {},
            topics = []
        } = {},
        loadingLabel,
        statisticsStatus,
        setStatisticsFromRawData,
        setStatisticsManually
    } = useStatistics();

    const onStartAnalysingDataClick = async (pathToFolder, inspectionResults) => {
        setLoading(true);

        if (pathToFolder) {
            localStorage.setItem(PATH_TO_FOLDER, pathToFolder);
        }
        if (userName) {
            localStorage.setItem(USER_NAME, userName);
        }

        loadDataFromDirPath(pathToFolder, inspectionResults).then(async (data) => {

            let _userName = userName;
            if (!_userName) {
                _userName = getUserNameFromThreads(data.threadList || []);
                setUserName(_userName);
            }

            await setStatisticsFromRawData(data, _userName);
            history.push(R_STATS_MESSAGE);
            enqueueSnackbar('Successfully analysed data', {variant: 'success'});

        }).catch(e => {
            console.error(e);
            enqueueSnackbar(e.message, {variant: 'error'});
        }).finally(() => {
            setLoading(false);
        });
    }

    const onLoadStatisticsFromFileClick = async (pathToStatsFile) => {
        setLoading(true);

        if (pathToStatsFile) {
            localStorage.setItem(PATH_TO_STATS_FILE, pathToStatsFile);
        }

        loadDataFromStatsFile(pathToStatsFile).then(async data => {

            setStatisticsManually(data);
            history.push(R_STATS_MESSAGE);
            setLoading(false);

            enqueueSnackbar('Loaded successfully from file', {variant: 'success'});

        }).catch(e => {
            console.error(e);
            enqueueSnackbar(e.message, {variant: 'error'});
        }).finally(() => {
            setLoading(false);
        });
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
                                               loadingLabel={loadingLabel}
                                               onStartAnalysingDataClick={onStartAnalysingDataClick}
                                               goToChooseStatsFile={() => history.push(R_CHOOSE_STATS_FILE)}/>
                    </Route>
                    <Route exact path={R_CHOOSE_STATS_FILE}>
                        <ChooseStatsFileComponent goToChooseFolder={() => history.push(R_CHOOSE_FOLDER)}
                                                  onLoadStatisticsFromFileClick={onLoadStatisticsFromFileClick}
                                                  loading={loading}
                                                  loadingLabel={loadingLabel}/>
                    </Route>
                    <Route exact path={R_STATS_MESSAGE}>
                        <StatisticsComponentContainer messengerStatistics={messengerStatistics}
                                                      messengerStatisticsStatus={statisticsStatus.message}
                        />
                    </Route>
                    <Route exact path={R_STATS_TOPICS}>
                        <TopicsComponentContainer topics={topics}
                                                  topicsStatisticsStatus={statisticsStatus.topics}/>
                    </Route>
                    <Route exact path={R_HELP}>
                        <HelpComponent navigateToChooseDir={() => history.push(R_CHOOSE_FOLDER)}/>
                    </Route>
                    <Route exact path={R_CONTACT}>
                        <ContactComponent userName={userName}/>
                    </Route>
                </Switch>
            </main>

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
