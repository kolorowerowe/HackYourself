import {Typography} from "@material-ui/core";
import React from "react";
import {useCommonStyles} from "../../theme/commonStyles";
import Grid from "@material-ui/core/Grid";
import CountUp from "react-countup";
import Tooltip from "@material-ui/core/Tooltip";

const DataLabeled = ({value, label}) => {

    const styles = useCommonStyles();

    return (
        <div className={styles.oneUnderAnother}>
            <Typography className={styles.countUp}>
                {value}
            </Typography>
            <Typography variant={'h5'} align={'center'} color={'secondary'}>
                {label}
            </Typography>
        </div>
    )
};

const BigCountUp = ({value, label}) => {

    const styles = useCommonStyles();

    return (
        <Grid item xs={6}>
            <div className={styles.oneUnderAnother}>
                <CountUp end={value} className={styles.countUp}/>
                <Typography variant={'h5'} align={'center'} color={'secondary'}>
                    {label}
                </Typography>
            </div>
        </Grid>
    );
};

const SmallCountUp = ({value, label, iconComponent}) => {

    const styles = useCommonStyles();

    return (
        <Grid item xs={3}>
            <div className={styles.oneUnderAnother}>
                <Tooltip title={label}>
                    <div className={styles.flexAligned}>
                        {iconComponent}
                        <CountUp end={value} className={styles.countUpSmall}/>
                    </div>
                </Tooltip>
            </div>
        </Grid>
    );
};


export {DataLabeled, BigCountUp, SmallCountUp};