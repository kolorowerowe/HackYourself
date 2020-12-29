import React, {useState} from 'react';
import {Button, IconButton, TextField, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import {useCommonStyles} from "../../theme/commonStyles";
import TransitEnterexitIcon from '@material-ui/icons/TransitEnterexit';
import Tooltip from "@material-ui/core/Tooltip";
import FolderOpenIcon from '@material-ui/icons/FolderOpen';

const LoadDataComponentContainer = (props) => {

    const {
        username,
        setUsername,
        loading,
        loadingPercentage,
        onLoadData,
        fileValidationError
    } = props;

    const styles = useCommonStyles();


    const [pathToData, setPathToData] = useState('');


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
                setPathToData(filePaths[0]);
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
                               value={pathToData}
                               placeholder={'./data/facebook-kolorowerowe/messages/inbox'}
                               label={'Relative path to the inbox folder'}
                               onChange={e => setPathToData(e.target.value)}
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
                            setPathToData(localStorage.getItem('PATH'));
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
                            setUsername(localStorage.getItem('USERNAME'));
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
                <Button onClick={() => onLoadData(pathToData, username)}
                        fullWidth
                        disabled={loading}
                        variant={'outlined'}>
                    Load data!
                </Button>
            </Grid>
        </Grid>
    );
};


export default LoadDataComponentContainer;
