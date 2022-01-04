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

const CustomCountUp = ({value, label, tooltip = '', iconComponent, xs = 3, big = false}) => {

    const styles = useCommonStyles();

    return (
        <Grid item xs={xs}>
            <Tooltip title={tooltip}>
                <div className={styles.oneUnderAnother}>
                    <div className={styles.flexAligned}>
                        {!!iconComponent && iconComponent}
                        <CountUp end={value} className={styles.countUpSmall} style={{fontSize: big ? 40 : 30}}/>
                    </div>
                    {!!label && <Typography variant={big ? 'h5' : 'h6'} align={'center'} color={'secondary'}>
                        {label}
                    </Typography>}
                </div>
            </Tooltip>

        </Grid>
    );
};


export {DataLabeled, CustomCountUp};