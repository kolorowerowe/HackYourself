import {reduceToSumFromString} from "../utils";

export const getAboutYouStatistics = ({viewed}) => {

    const {viewed_things = []} = viewed;

    const fbViewed = viewed_things.filter(({name}) => name === 'Facebook Watch Videos and Shows')[0] || {children: []};

    const timeViewedList = fbViewed.children.filter(({name}) => name === 'Time Viewed')[0] || {entries: []}.entries || [];

    const totalTimeViewedSecondsList = timeViewedList.entries.map(({data}) => data || {}).map(({watch_position_seconds}) => watch_position_seconds || 0);

    const totalTimeViewed = totalTimeViewedSecondsList.reduce(reduceToSumFromString, 0);

    return {
        viewed: {
            totalTimeViewed
        }
    };
};