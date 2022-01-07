import React, {useMemo, useState} from 'react';
import MessageGeneralStatistics from "./MessageGeneralStatistics";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from 'react-swipeable-views';
import useTheme from "@material-ui/core/styles/useTheme";
import MessageWordStatistics from "./MessageWordStatistics";
import MessageTimeStatistics from './MessageTimeStatistics';
import {fixEncoding} from "../../../algorithms/encoding";
import {NO_FILTER} from "../../root/constans";
import StatisticsStatusBoundary from "../StatisticsStatusBoundary";
import {TabPanel} from "../../generic/TabPabel";
import {useTranslation} from "react-i18next";

const MessageStatisticsComponent = (props) => {

    const {
        messengerStatisticsStatus,
        messengerStatistics: {
            totalStats,
            wordStats,
            timeStats,
            wordStatsPerRecipient,
            timeStatsPerRecipient
        }
    } = props;

    const theme = useTheme();
    const {t} = useTranslation();

    const recipients = useMemo(() =>
            (timeStatsPerRecipient ? fixEncoding([...new Set(Object.keys(timeStatsPerRecipient))].sort()) : [])
        , [timeStatsPerRecipient]);

    const [recipientFilter, setRecipientFilter] = useState(NO_FILTER);


    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div>
            <StatisticsStatusBoundary statisticsStatus={messengerStatisticsStatus}>
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
                        <Tab label={t('general:words')}/>
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel index={0} value={value} dir={theme.direction}>
                        <MessageGeneralStatistics totalStats={totalStats}/>
                    </TabPanel>
                    <TabPanel index={1} value={value} dir={theme.direction}>
                        <MessageTimeStatistics timeStats={timeStats}
                                               timeStatsPerRecipient={timeStatsPerRecipient}
                                               recipients={recipients}
                                               recipientFilter={recipientFilter}
                                               setRecipientFilter={setRecipientFilter}
                        />
                    </TabPanel>
                    <TabPanel index={2} value={value} dir={theme.direction}>
                        <MessageWordStatistics wordStats={wordStats}
                                               wordStatsPerRecipient={wordStatsPerRecipient}
                                               recipients={recipients}
                                               recipientFilter={recipientFilter}
                                               setRecipientFilter={setRecipientFilter}/>
                    </TabPanel>
                </SwipeableViews>
            </StatisticsStatusBoundary>
        </div>

    );
};


export default MessageStatisticsComponent;
