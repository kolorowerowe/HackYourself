import React, {useState} from 'react';
import {Button, IconButton, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import {useCommonStyles} from "../../theme/commonStyles";
import TransitEnterexitIcon from '@material-ui/icons/TransitEnterexit';
import Tooltip from "@material-ui/core/Tooltip";

const LoadDataComponentContainer = (props) => {

    const {
        username,
        setUsername,
        loading,
        onLoadData,
        fileValidationError
    } = props;

    const styles = useCommonStyles();


    const [pathToData, setPathToData] = useState('');

    return (
        <Grid container spacing={3} className={styles.containerPadding}>
            <Grid item xs={12}>
                <div style={{display:'flex'}}>
                    <TextField id="path"
                               name="path"
                               value={pathToData}
                               placeholder={'./data/facebook-kolorowerowe/messages/inbox'}
                               label={'Relative path to the inbox folder'}
                               onChange={e => setPathToData(e.target.value)}
                               disabled={loading}
                               fullWidth
                    />
                    <Tooltip title={'Paste last used path'}>
                        <IconButton onClick={()=> {
                            setPathToData(localStorage.getItem('PATH'));
                        }}>
                            <TransitEnterexitIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
            </Grid>
            <Grid item xs={12}>
                <div style={{display:'flex'}}>
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
                        <IconButton onClick={()=> {
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
                <LinearProgress/>
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
