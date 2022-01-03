import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Button, IconButton, TextField, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {useCommonStyles} from "../../theme/commonStyles";
import TransitEnterexitIcon from '@material-ui/icons/TransitEnterexit';
import Tooltip from "@material-ui/core/Tooltip";
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import {PATH_TO_FOLDER, USER_NAME} from "../root/localStorageKeys";
import Link from "@material-ui/core/Link";
import InspectionDataResult from "./InspectionDataResult";
import {S_MESSENGER, S_EVENTS, S_TOPICS} from "../root/constans";
import CustomLinearProgress from "../generic/CustomLinearProgress";
import {inspectDataExists} from "../../utils/fileLoader";
import _ from 'lodash';

const ChooseFolderComponent = (props) => {

    const {
        userName,
        setUserName,
        loading,
        loadingLabel,
        onStartAnalysingDataClick,
        goToChooseStatsFile
    } = props;

    const styles = useCommonStyles();

    const [pathToFolder, setPathToFolder] = useState('');

    const [inspectionResults, setInspectionResults] = useState([
        {
            type: S_MESSENGER,
            name: 'Messenger',
            dirPath: '/messages/inbox',
            available: false,
            enabled: true
        },
        // {
        //     type: S_ABOUT_YOU,
        //     name: 'About you',
        //     dirPath: '/about_you',
        //     available: false,
        //     enabled: true
        // },
        {
            type: S_TOPICS,
            name: 'Topics',
            dirPath: '/your_topics',
            available: false,
            enabled: false
        },
        {
            type:S_EVENTS ,
            name: 'Events',
            dirPath: '/events',
            available: false,
            enabled: false
        }
    ]);


    const inspectDataCallback = useCallback(_.debounce(() => {
        inspectDataExists(pathToFolder, inspectionResults, setInspectionResults);
    }, 500), [pathToFolder, inspectionResults, setInspectionResults]);

    useEffect(inspectDataCallback, [pathToFolder]);


    const handleEnableStatisticsChange = (type, checked) => {
        setInspectionResults(prevState => prevState.map(result => result.type === type ? {
            ...result,
            enabled: checked
        } : result))
    };

    const analyzeDisabled = useMemo(() => !inspectionResults.map(({enabled}) => enabled).includes(true), [inspectionResults])

    const onClick = () => {
        const {
            remote: {
                dialog
            }
        } = window.require('electron');

        dialog.showOpenDialog({
            properties: ['openDirectory']
        }).then((data) => {
            const {
                filePaths
            } = data;

            if (filePaths.length > 0) {
                setPathToFolder(filePaths[0]);
            }
        }).catch(e => {
            console.error(e);
        });
    }

    return (
        <Grid container spacing={5} className={styles.containerPadding}>
            <Grid item xs={12}>
                <Typography variant={'h6'}>
                    Start analysing from your Facebook data.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <div style={{display: 'flex'}}>
                    <TextField id="path"
                               name="path"
                               value={pathToFolder}
                               placeholder={'C:\\Users\\domin\\Documents\\Downloads\\facebook-kolorowerowe'}
                               label={'Relative path to the facebook data folder'}
                               onChange={e => setPathToFolder(e.target.value)}
                               disabled={loading}
                               fullWidth
                    />
                    <Tooltip title={'Select folder from your drive'}>
                        <IconButton onClick={onClick}>
                            <FolderOpenIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={'Paste last used path'}>
                        <IconButton onClick={() => {
                            setPathToFolder(localStorage.getItem(PATH_TO_FOLDER) || '');
                        }}>
                            <TransitEnterexitIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
            </Grid>
            <Grid item xs={12}>
                <div style={{display: 'flex'}}>
                    <TextField id="username"
                               name="username"
                               value={userName}
                               placeholder={'Dominik Kołodziej'}
                               label={'Facebook username (optional)'}
                               onChange={e => setUserName(e.target.value)}
                               disabled={loading}
                               fullWidth
                    />
                    <Tooltip title={'Paste last used path'}>
                        <IconButton onClick={() => {
                            setUserName(localStorage.getItem(USER_NAME) || '');
                        }}>
                            <TransitEnterexitIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
            </Grid>


            <Grid item xs={12}>
                <InspectionDataResult results={inspectionResults}
                                      handleEnableStatisticsChange={handleEnableStatisticsChange}/>
            </Grid>

            <Grid item xs={12}>
                <CustomLinearProgress loading={loading} label={loadingLabel}/>
            </Grid>

            <Grid item xs={12}>
                <Button onClick={() => onStartAnalysingDataClick(pathToFolder, inspectionResults)}
                        fullWidth
                        disabled={loading || analyzeDisabled}
                        variant={'outlined'}>
                    Start analysing data!
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Link
                    component="button"
                    variant="body2"
                    onClick={goToChooseStatsFile}
                >
                    Got a stats file? Click here!
                </Link>
            </Grid>
        </Grid>
    );
};


export default ChooseFolderComponent;
