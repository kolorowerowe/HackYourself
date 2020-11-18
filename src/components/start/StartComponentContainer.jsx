import React, {useState} from 'react';
import {Button, Typography, TextField, Grid} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { loadDataFromPath } from '../loader';


const useStyles = makeStyles((theme) => ({
    bigSize: {
        fontSize: 30
    }
}));

const LoadData = (path) => {
    console.log(loadDataFromPath(path));
}

const StartComponentContainer = () => {

    const classes = useStyles();

    const [clickCount, setClickCount] = useState(0);
    const [pathToData, setPathToData] = useState('scieżka do folderu inbox');

    return (
        <Grid container spacing={2} alignItems={'center'}>
            <Grid item xs={12}>
                <Typography align={'center'} className={classes.bigSize}>
                    Cześć, jestem sobie React, edytuj mnie
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Button onClick={() => setClickCount(prevState => prevState + 1)}
                        fullWidth>
                    Kliknij mnie
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Typography align={'center'}>
                    {clickCount}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <TextField
                    id="path"
                    name="path"
                    value={pathToData}
                    />
                <Button onClick={() => LoadData(pathToData)}
                        fullWidth>
                   Wczytaj dane!
                </Button>
            </Grid>
        </Grid>
    );
};


export default StartComponentContainer;
