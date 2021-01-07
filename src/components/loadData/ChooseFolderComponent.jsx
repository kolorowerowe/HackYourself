import React, {useState} from 'react';
import {Button, IconButton, TextField, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import {useCommonStyles} from "../../theme/commonStyles";
import TransitEnterexitIcon from '@material-ui/icons/TransitEnterexit';
import Tooltip from "@material-ui/core/Tooltip";
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import {PATH_TO_FOLDER, USERNAME} from "../root/localStorageKeys";
import Link from "@material-ui/core/Link";

const ChooseFolderComponent = (props) => {

    const {
        username,
        setUsername,
        loading,
        loadingPercentage,
        onStartAnalysingDataClick,
        fileValidationError,
        goToChooseStatsFile
    } = props;

    const styles = useCommonStyles();

    const [pathToFolder, setPathToFolder] = useState('');

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
                <Typography variant={'h4'} align={'center'}>
                    Hello, let's start hacking!
                </Typography>
            </Grid>
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
                               placeholder={'C:\\Users\\domin\\Documents\\Downloads\\facebook-kolorowerowe\\messages\\inbox'}
                               label={'Relative path to the inbox folder'}
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
                               value={username}
                               placeholder={'Dominik Kołodziej'}
                               label={'Facebook username (optional)'}
                               onChange={e => setUsername(e.target.value)}
                               disabled={loading}
                               fullWidth
                    />
                    <Tooltip title={'Paste last used path'}>
                        <IconButton onClick={() => {
                            setUsername(localStorage.getItem(USERNAME) || '');
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
                <Button onClick={() => onStartAnalysingDataClick(pathToFolder, username)}
                        fullWidth
                        disabled={loading}
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
