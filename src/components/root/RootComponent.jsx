import React, {useState} from 'react';
import LoadDataComponentContainer from "../loadData/LoadDataComponentContainer";
import {loadDataFromPath} from "../../utils/fileLoader";
import SnackbarAlert from "./SnackbarAlert";
import makeStyles from "@material-ui/core/styles/makeStyles";
import SideBar from "./SideBar";
import {getTotalStats} from "../../algorithms/totalAlgorithms";
import StatisticsComponentContainer from "../stats/StatisticsComponentContainer";
import ContactComponent from "../contact/ContactComponent";
import {getWordStats, getWordStatsPerRecipient} from "../../algorithms/wordAlgorithms";
import {enretardize} from '../../algorithms/encoding';
import {getUsername} from '../../algorithms/utils';
import {getTimeStats, getTimeStatsPerRecipient} from '../../algorithms/timeAlgorithms';
import HelpComponent from "../hello/HelpComponent";

const RootComponent = () => {

    // let fs = window.require('fs');
    // let json1 = JSON.parse(fs.readFileSync('json/message_1.json'));
    // let json2 = JSON.parse(fs.readFileSync('json/message_2.json'));
    // console.log(getTimeStats([json1, json2],"Grzegorz Nieu\u00c5\u00bcy\u00c5\u0082a"));
    // console.log(getTimeStatsPerRecipient([json1, json2],"Grzegorz Nieu\u00c5\u00bcy\u00c5\u0082a"));
    // console.log(getWordStats([json1, json2],"Grzegorz Nieu\u00c5\u00bcy\u00c5\u0082a"));
    // console.log(getWordStatsPerRecipient([json1, json2],"Grzegorz Nieu\u00c5\u00bcy\u00c5\u0082a"));

    const classes = useStyles();

    const [route, setRoute] = useState('CHOOSE_DIR');

    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingPercentage, setLoadingPercentage] = useState(0);
    const [fileValidationError, setFileValidationError] = useState(null);

    const [totalStats, setTotalStats] = useState(undefined);
    const [wordStats, setWordStats] = useState(undefined);
    const [timeStats, setTimeStats] = useState(undefined);
    const [wordStatsPerRecipient, setWordStatsPerRecipient] = useState(undefined);
    const [timeStatsPerRecipient, setTimeStatsPerRecipient] = useState(undefined);
    const [allStatsLoaded, setAllStatsLoaded] = useState(false);

    const [snackbarMessage, setSnackbarMessage] = useState('');


    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const onLoadData = async (path) => {
        setFileValidationError(null);
        setLoading(true);
        await setStep(0);
        if (path) {
            localStorage.setItem('PATH', path);
        }
        if (username) {
            localStorage.setItem('USERNAME', username);
        }

        loadDataFromPath(path).then(async data => {
            await setStep(1);
            await setStatsFromMessagesMap(data);
        }).catch(e => {
            setFileValidationError(e);
        });
    }

    const allSteps = 7;
    const setStep = async (step) => {
        setLoadingPercentage(Math.round((step / allSteps) * 100));
        await sleep(300);
    }


    const setStatsFromMessagesMap = async (messagesMap) => {



        let _username = username;
        if (!_username) {
            _username = getUsername([...messagesMap.values()]);
            setUsername(_username);
        }
        await setStep(2);


        setTotalStats(getTotalStats(messagesMap, enretardize(_username)));

        await setStep(3);


        setWordStats(getWordStats([...messagesMap.values()], enretardize(_username)));
        await setStep(4);


        setTimeStats(getTimeStats([...messagesMap.values()], enretardize(_username)));
        await setStep(5);


        setTimeStatsPerRecipient(getTimeStatsPerRecipient([...messagesMap.values()], enretardize(_username)));
        await setStep(6);


        setWordStatsPerRecipient(getWordStatsPerRecipient([...messagesMap.values()], enretardize(_username)));
        await setStep(7);


        setRoute('STATS');
        setLoading(false);
        setAllStatsLoaded(true);
        setSnackbarMessage('Loaded successfully');

    }


    return (
        <div className={classes.root}>
            <SideBar route={route}
                     setRoute={setRoute}/>
            <main className={classes.content}>
                {route === 'CHOOSE_DIR' && <LoadDataComponentContainer username={username}
                                                                       setUsername={setUsername}
                                                                       loading={loading}
                                                                       loadingPercentage={loadingPercentage}
                                                                       fileValidationError={fileValidationError}
                                                                       onLoadData={onLoadData}/>
                }
                {route === 'STATS' && <StatisticsComponentContainer messagesLoaded={allStatsLoaded}
                                                                    totalStats={totalStats}
                                                                    wordStats={wordStats}
                                                                    timeStats={timeStats}
                                                                    wordStatsPerRecipient={wordStatsPerRecipient}
                                                                    timeStatsPerRecipient={timeStatsPerRecipient}/>
                }
                {route === 'HELP' && <HelpComponent navigateToChooseDir={() => setRoute('CHOOSE_DIR')}/>}
                {route === 'CONTACT' && <ContactComponent username={username}/>}
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
