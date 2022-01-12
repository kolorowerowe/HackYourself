import React from 'react';
import { AppBar, Tabs } from "@material-ui/core";
import useTheme from "@material-ui/core/styles/useTheme";
import { useTranslation } from "react-i18next"
import StatisticsStatusBoundary from "../StatisticsStatusBoundary";
import SwipeableViews from "react-swipeable-views";
import {TabPanel} from "../../generic/TabPabel";
import PostsGeneralStatistics from "./PostsGeneralStatistics";

const PostsComponent = (props) => {
    const {t} = useTranslation()

    const {
        postsStatistics,
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
    console.log("statistics: ", postsStatistics);
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
                    <Tabs label={t('general:general')}/>
                    <Tabs label={t('general:time')}/>
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel index={0} value={value} dir={theme.direction}>
                    <PostsGeneralStatistics 
                        postsCount={postsStatistics.postsCount} 
                        postsWithPlacesCount={postsStatistics.postsWithPlacesCount} 
                        postsWithGifsCount={postsStatistics.postsWithGifsCount} 
                        postsWithImagesCount={postsStatistics.postsWithImagesCount}
                        postsWithVideoCount={postsStatistics.postsWithVideoCount}
                        avgTextLength={postsStatistics.avgTextLength}
                        topUsedEmojies={postsStatistics.topUsedEmojies}
                        topTaggedPersons={postsStatistics.topTaggedPersons}
                        topUsedPlaces={postsStatistics.topUsedPlaces}                        
                        >                        
                    </PostsGeneralStatistics>
                </TabPanel>
                <TabPanel index={1} value={value} dir={theme.direction}>
                    <PostsGeneralStatistics 
                        postsCount={postsStatistics.postsCount} 
                        postsWithPlacesCount={postsStatistics.postsWithPlacesCount} 
                        postsWithGifsCount={postsStatistics.postsWithGifsCount} 
                        postsWithImagesCount={postsStatistics.postsWithImagesCount}
                        postsWithVideoCount={postsStatistics.postsWithVideoCount}
                        avgTextLength={postsStatistics.avgTextLength}
                        topUsedEmojies={postsStatistics.topUsedEmojies}
                        topTaggedPersons={postsStatistics.topTaggedPersons}
                        topUsedPlaces={postsStatistics.topUsedPlaces}                        
                        >                        
                    </PostsGeneralStatistics>
                </TabPanel>
            </SwipeableViews>
        </StatisticsStatusBoundary>
    )
}

export default PostsComponent