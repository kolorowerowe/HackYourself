import React, {useState} from 'react';
import {Button, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import {useCommonStyles} from "../../theme/commonStyles";


const LoadDataComponentContainer = (props) => {

    const {
        loading,
        onLoadData,
        fileValidationError
    } = props;

    const styles = useCommonStyles();


    const [pathToData, setPathToData] = useState('');

    return (
        <Grid container spacing={3} className={styles.containerPadding}>
            <Grid item xs={12}>
                <TextField id="path"
                           name="path"
                           value={pathToData}
                           placeholder={'./data/facebook-kolorowerowe/messages/inbox'}
                           label={'Scieżka do folderu inbox'}
                           onChange={e => setPathToData(e.target.value)}
                           disabled={loading}
                           fullWidth
                />
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
                <Button onClick={() => onLoadData(pathToData)}
                        fullWidth
                        disabled={loading}
                        variant={'outlined'}>
                    Wczytaj dane!
                </Button>
            </Grid>

        </Grid>
    );
};


export default LoadDataComponentContainer;
