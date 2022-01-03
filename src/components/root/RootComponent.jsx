import React, {useState} from 'react';
import {loadDataFromDirPath, loadDataFromStatsFile} from "../../utils/fileLoader";
import SideBar from "./sidebar/SideBar";
import {getUserNameFromThreads} from '../../algorithms/utils';
import {
    R_CHOOSE_FOLDER,
    R_CHOOSE_STATS_FILE,
    R_CONTACT,
    R_HELP,
    R_STATS_MESSAGE,
    R_STATS_TOPICS,
    R_STATS_ABOUT_YOU, R_STATS_EVENTS
} from "./sidebar/routes";
import ChooseStatsFileComponent from "../loadData/ChooseStatsFileComponent";
import {PATH_TO_FOLDER, PATH_TO_STATS_FILE, USER_NAME} from "./localStorageKeys";
import {Route, Switch, useHistory} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import HelpComponent from "../help/HelpComponent";
import ContactComponent from "../contact/ContactComponent";
import MessageStatisticsComponent from "../stats/messageStatistics/MessageStatisticsComponent";
import ChooseFolderComponent from "../loadData/ChooseFolderComponent";
import HelloComponent from "../hello/HelloComponent";
import {useSnackbar} from "notistack";
import {useStatistics} from "../../hooks/StatisticsHook";
import TopicsComponentContainer from "../stats/topics/TopicsComponentContainer";
import AboutYouComponentContainer from "../stats/aboutYou/AboutYouComponentContainer";
import EventsComponentContainer from "../stats/eventStatistics/EventsComponentContainer";

const RootComponent = () => {
    const classes = useStyles();
    const history = useHistory();
    const {enqueueSnackbar} = useSnackbar();

    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false);

    const {
        statistics: {
            messengerStatistics = {},
            aboutYouStatistics = {},
            topics = [],
            eventStatistics = {}
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
                        <MessageStatisticsComponent messengerStatistics={messengerStatistics}
                                                    messengerStatisticsStatus={statisticsStatus.message}
                        />
                    </Route>

                    {/*THIS IS NOT USED*/}
                    <Route exact path={R_STATS_ABOUT_YOU}>
                        <AboutYouComponentContainer aboutYouStatistics={aboutYouStatistics}
                                                    aboutYouStatisticsStatus={statisticsStatus.aboutYou}/>
                    </Route>
                    <Route exact path={R_STATS_TOPICS}>
                        <TopicsComponentContainer topics={topics}
                                                  topicsStatisticsStatus={statisticsStatus.topics}/>
                    </Route>
                    <Route exact path={R_STATS_EVENTS}>
                        <EventsComponentContainer eventStatistics={eventStatistics}
                                                  eventStatisticsStatus={statisticsStatus.events}/>
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
