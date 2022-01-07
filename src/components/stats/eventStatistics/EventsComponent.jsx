import React from 'react';
import StatisticsStatusBoundary from "../StatisticsStatusBoundary";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import {TabPanel} from "../../generic/TabPabel";
import EventsGeneralStatistics from "./EventsGeneralStatistics";
import useTheme from "@material-ui/core/styles/useTheme";
import EventsTimeStatistics from "./EventsTimeStatistics";
import {useTranslation} from "react-i18next";

const EventsComponent = (props) => {
    const {t} = useTranslation();

    const {
        eventStatistics: {
            yourEventsCount = 0,
            eventsInvitedCount = 0,
            eventsJoinedCount = 0,
            eventsDeclinedCount = 0,
            eventsInterestedCount = 0,
            hourly,
            weekly,
            timelineStats
        } = {},
        eventStatisticsStatus
    } = props;

    const theme = useTheme();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    }


    return (
        <StatisticsStatusBoundary statisticsStatus={eventStatisticsStatus}>

            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                    <Tab label={t('general:general')}/>
                    <Tab label={t('general:time')}/>
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel index={0} value={value} dir={theme.direction}>
                    <EventsGeneralStatistics yourEventsCount={yourEventsCount}
                                             eventsInvitedCount={eventsInvitedCount}
                                             eventsJoinedCount={eventsJoinedCount}
                                             eventsDeclinedCount={eventsDeclinedCount}
                                             eventsInterestedCount={eventsInterestedCount}
                    />
                </TabPanel>
                <TabPanel index={1} value={value} dir={theme.direction}>
                    <EventsTimeStatistics hourly={hourly}
                                          weekly={weekly}
                                          timelineStats={timelineStats}/>
                </TabPanel>
            </SwipeableViews>
        </StatisticsStatusBoundary>
    );
};


export default EventsComponent;
