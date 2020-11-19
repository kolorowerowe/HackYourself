import React, {useEffect, useState} from 'react';
import LoadDataComponentContainer from "../loadData/LoadDataComponentContainer";
import {loadDataFromPath} from "../../utils/fileLoader";
import SnackbarAlert from "./SnackbarAlert";
import makeStyles from "@material-ui/core/styles/makeStyles";
import SideBar from "./SideBar";
import {Typography} from "@material-ui/core";
import {getTotalStats} from "../../algorithms/algorithms";
import StatisticsComponentContainer from "../stats/StatisticsComponentContainer";
import ContactComponent from "../contact/ContactComponent";

const RootComponent = () => {

    // let fs = window.require('fs');
    // let json1 = JSON.parse(fs.readFileSync('json/message_1.json'));
    // let json2 = JSON.parse(fs.readFileSync('json/message_2.json'));
    // console.log(getTimeStats([json1, json2],"Grzegorz Nieu\u00c5\u00bcy\u00c5\u0082a"));
    // console.log(getTimeStatsPerRecipient([json1, json2],"Grzegorz Nieu\u00c5\u00bcy\u00c5\u0082a"));
    // console.log(getWordStats([json1, json2],"Grzegorz Nieu\u00c5\u00bcy\u00c5\u0082a"));
    // console.log(getWordStatsPerRecipient([json1, json2],"Grzegorz Nieu\u00c5\u00bcy\u00c5\u0082a"));

    const classes = useStyles();

    const [route, setRoute] = useState('HELLO');

    const [messagesMap, setMessagesMap] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [fileValidationError, setFileValidationError] = useState(null);

    const [totalStats, setTotalStats] = useState(undefined);

    const [snackbarMessage, setSnackbarMessage] = useState('');


    const onLoadData = (path) => {
        setFileValidationError(null);
        setLoading(true);

        try {
            const result = loadDataFromPath(path);
            setSnackbarMessage('Loaded successfully');
            setMessagesMap(result);
            setRoute('STATS');
        } catch (e) {
            setFileValidationError(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (messagesMap) {
            setTotalStats(getTotalStats(messagesMap));
        }
    }, [messagesMap])


    return (
        <div className={classes.root}>
            <SideBar route={route}
                     setRoute={setRoute}/>
            <main className={classes.content}>

                {route === 'HELLO' && <Typography>todo: start</Typography>
                }
                {route === 'CHOOSE_DIR' && <LoadDataComponentContainer loading={loading}
                                                                       fileValidationError={fileValidationError}
                                                                       onLoadData={onLoadData}/>
                }
                {route === 'STATS' && <StatisticsComponentContainer messagesLoaded={!!messagesMap}
                                                                    totalStats={totalStats}/>
                }
                {route === 'CONTACT' && <ContactComponent/>
                }
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
