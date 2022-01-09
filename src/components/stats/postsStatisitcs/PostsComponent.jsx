import React from 'react';
import { AppBar, Tabs } from "@material-ui/core";
import useTheme from "@material-ui/core/styles/useTheme";
import { useTranslation } from "react-i18next"
import StatisticsStatusBoundary from "../StatisticsStatusBoundary";
import SwipeableViews from "react-swipeable-views";
import {TabPanel} from "../../generic/TabPabel";

const PostsComponent = (props) => {
    const {t} = useTranslation()

    const {
        postsStatisits :{

        } = {},
        postsStatisticsStatus
    } = props

    const theme = useTheme();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    }

    return (
        <StatisticsStatusBoundary statisticsStatus={postsStatisticsStatus}>
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
                    <h3>TODO fill me</h3>
                </TabPanel>
                <TabPanel index={1} value={value} dir={theme.direction}>
                    <h3>TODO fill me</h3>
                </TabPanel>
            </SwipeableViews>
        </StatisticsStatusBoundary>
    )
}

export default PostsComponent