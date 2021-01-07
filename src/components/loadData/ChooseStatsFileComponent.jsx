import React, {useState} from 'react';
import {Button, IconButton, TextField, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import {useCommonStyles} from "../../theme/commonStyles";
import TransitEnterexitIcon from '@material-ui/icons/TransitEnterexit';
import Tooltip from "@material-ui/core/Tooltip";
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import {PATH_TO_STATS_FILE} from "../root/localStorageKeys";
import Link from "@material-ui/core/Link";

const ChooseStatsFileComponent = (props) => {

    const {
        goToChooseFolder,
        onLoadStatisticsFromFileClick,
        loading,
        loadingPercentage,
        fileValidationError
    } = props;

    const styles = useCommonStyles();

    const [pathToStatsFile, setPathToStatsFile] = useState('');

    const onClick = () => {
        const {
            remote: {
                dialog
            }
        } = window.require('electron');

        dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [
                {name: 'json files', extensions: ['json']}
            ]
        }).then((data) => {
            const {
                filePaths
            } = data;

            if (filePaths.length > 0) {
                setPathToStatsFile(filePaths[0]);
            }
        }).catch(e => {
            console.error(e);
        });
    }

    return (
        <Grid container spacing={5} className={styles.containerPadding}>
            <Grid item xs={12}>
                <Typography variant={'h4'} align={'center'}>
                    Hello, let's start hacking!
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant={'h6'}>
                    Let's load already analysed data.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <div style={{display: 'flex'}}>
                    <TextField id="path"
                               name="path"
                               value={pathToStatsFile}
                               placeholder={'C:\\Users\\domin\\Documents\\Downloads\\stats.json'}
                               label={'Path to the json file with statistics'}
                               onChange={e => setPathToStatsFile(e.target.value)}
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
                            setPathToStatsFile(localStorage.getItem(PATH_TO_STATS_FILE) || '');
                        }}>
                            <TransitEnterexitIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
            </Grid>

            {!!fileValidationError && <Grid item xs={12}>
                <Alert severity="error" variant={'filled'}>
                    {fileValidationError.message}
                </Alert>
            </Grid>}

            {loading && <Grid item xs={12}>
                <LinearProgress variant={'determinate'} value={loadingPercentage}/>
            </Grid>}

            <Grid item xs={12}>
                <Button onClick={() => onLoadStatisticsFromFileClick(pathToStatsFile)}
                        fullWidth
                        disabled={loading}
                        variant={'outlined'}>
                    Load data!
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Link
                    component="button"
                    variant="body2"
                    onClick={goToChooseFolder}
                >
                    Want to analyse data from beginning? Click here!
                </Link>
            </Grid>
        </Grid>
    );
};


export default ChooseStatsFileComponent;
