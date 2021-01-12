import React, {useMemo, useState} from 'react';
import Alert from "@material-ui/lab/Alert";
import GeneralStatistics from "./GeneralStatistics";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from 'react-swipeable-views';
import useTheme from "@material-ui/core/styles/useTheme";
import Box from "@material-ui/core/Box";
import {useCommonStyles} from "../../theme/commonStyles";
import WordStatistics from "./WordStatistics";
import TimeStatistics from './TimeStatistics';
import {fixEncoding} from "../../algorithms/encoding";
import {NO_FILTER} from "../root/constans";


const StatisticsComponentContainer = (props) => {

    const {
        messagesLoaded = false,
        statistics: {
            totalStats,
            wordStats,
            timeStats,
            wordStatsPerRecipient,
            timeStatsPerRecipient
        }
    } = props;

    const theme = useTheme();
    const styles = useCommonStyles();

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

    function TabPanel(tabPanelProps) {
        const {children, index, ...other} = tabPanelProps;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box p={3}>
                        {children}
                    </Box>
                )}
            </div>
        );
    }

    return (
        <div>
            {messagesLoaded ?
                <div>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                        >
                            <Tab label="General"/>
                            <Tab label="Time"/>
                            <Tab label="Words"/>
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel index={0} dir={theme.direction}>
                            <GeneralStatistics totalStats={totalStats}/>
                        </TabPanel>
                        <TabPanel index={1} dir={theme.direction}>
                            <TimeStatistics timeStats={timeStats}
                                            timeStatsPerRecipient={timeStatsPerRecipient}
                                            recipients={recipients}
                                            recipientFilter={recipientFilter}
                                            setRecipientFilter={setRecipientFilter}
                            />
                        </TabPanel>
                        <TabPanel index={2} dir={theme.direction}>
                            <WordStatistics wordStats={wordStats}
                                            wordStatsPerRecipient={wordStatsPerRecipient}
                                            recipients={recipients}
                                            recipientFilter={recipientFilter}
                                            setRecipientFilter={setRecipientFilter}/>
                        </TabPanel>
                    </SwipeableViews>
                </div>
                :
                <div className={styles.containerPadding}>
                    <Alert severity={'warning'} variant={'filled'}>
                        Messages haven't been loaded yet. Go to 'Choose dir' site and load data.
                    </Alert>
                </div>
            }

        </div>

    );
};


export default StatisticsComponentContainer;
