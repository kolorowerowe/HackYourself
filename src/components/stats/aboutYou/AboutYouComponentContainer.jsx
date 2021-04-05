import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import {useCommonStyles} from "../../../theme/commonStyles";
import StatisticsStatusBoundary from "../StatisticsStatusBoundary";
import moment from "moment";
import {formatDuration} from "../../../utils/dateTimeUtils";
import {DataLabeled} from "../../generic/DataDisplay";


const AboutYouComponentContainer = (props) => {

    const {
        aboutYouStatistics: {
            viewed: {
                totalTimeViewed = 0
            } = {}
        } = {},
        aboutYouStatisticsStatus
    } = props;

    const styles = useCommonStyles();

    return (
        <StatisticsStatusBoundary statisticsStatus={aboutYouStatisticsStatus}>
            <Grid container spacing={5} className={styles.containerPadding}>
                <Grid item xs={12}>
                    <Typography variant={'h6'}>
                        Things you have viewed
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <DataLabeled label={'All videos viewed length'}
                                 value={formatDuration(moment.duration(totalTimeViewed, 'second'))}/>
                </Grid>
            </Grid>
        </StatisticsStatusBoundary>
    );
};


export default AboutYouComponentContainer;
