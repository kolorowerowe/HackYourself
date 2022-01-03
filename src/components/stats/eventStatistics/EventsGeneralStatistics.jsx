import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import {useCommonStyles} from "../../../theme/commonStyles";
import {CustomCountUp} from "../../generic/DataDisplay";
import DoneIcon from "@material-ui/icons/Done";
import StarIcon from '@material-ui/icons/Star';
import CloseIcon from '@material-ui/icons/Close';

const EventsGeneralStatistics = (props) => {

    const {
        yourEventsCount = 0,
        eventsInvitedCount = 0,
        eventsJoinedCount = 0,
        eventsDeclinedCount = 0,
        eventsInterestedCount = 0
    } = props;

    const styles = useCommonStyles();

    return (
        <Grid container spacing={5} className={styles.containerPadding}>
            <Grid item xs={12}>
                <Typography variant={'h6'}>
                    Your Events
                </Typography>
            </Grid>


            <CustomCountUp label={'Joined'}
                           value={eventsJoinedCount}
                           iconComponent={<DoneIcon color={'secondary'}/>}
                           xs={4}
                           big/>

            <CustomCountUp label={'Interested'}
                           value={eventsInterestedCount}
                           iconComponent={<StarIcon color={'secondary'}/>}
                           xs={4}
                           big/>

            <CustomCountUp label={'Declined'}
                           value={eventsDeclinedCount}
                           iconComponent={<CloseIcon color={'secondary'}/>}
                           xs={4}
                           big/>

            <CustomCountUp label={'Your events'}
                           value={yourEventsCount}
                           xs={6}/>

            <CustomCountUp label={'Events you have been invited to'}
                           value={eventsInvitedCount}
                           xs={6}/>
        </Grid>
    );
};


export default EventsGeneralStatistics;
