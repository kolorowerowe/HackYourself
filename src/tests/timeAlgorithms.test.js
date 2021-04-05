import React from 'react';
import messages from './resources/threadAgataT.json'
import {getTimeStats} from "../algorithms/message/timeAlgorithms";


test('Get correct time stats', () => {

    const userName = 'Dominik Ko\u00c5\u0082odziej';

    const timeStats = getTimeStats([messages], userName);

    expect(timeStats).toEqual({
        hourly: [
            {hour: 0, count: 0, averageLength: 0},
            {hour: 1, count: 0, averageLength: 0},
            {hour: 2, count: 0, averageLength: 0},
            {hour: 3, count: 0, averageLength: 0},
            {hour: 4, count: 0, averageLength: 0},
            {hour: 5, count: 0, averageLength: 0},
            {hour: 6, count: 0, averageLength: 0},
            {hour: 7, count: 0, averageLength: 0},
            {hour: 8, count: 0, averageLength: 0},
            {hour: 9, count: 1, averageLength: 3},
            {hour: 10, count: 0, averageLength: 0},
            {hour: 11, count: 0, averageLength: 0},
            {hour: 12, count: 0, averageLength: 0},
            {hour: 13, count: 0, averageLength: 0},
            {hour: 14, count: 0, averageLength: 0},
            {hour: 15, count: 1, averageLength: 51},
            {hour: 16, count: 0, averageLength: 0},
            {hour: 17, count: 0, averageLength: 0},
            {hour: 18, count: 1, averageLength: 20},
            {hour: 19, count: 1, averageLength: 20},
            {hour: 20, count: 0, averageLength: 0},
            {hour: 21, count: 0, averageLength: 0},
            {hour: 22, count: 3, averageLength: 82.3},
            {hour: 23, count: 0, averageLength: 0}
        ],
        weekly: [
            {isoWeekday: 1, count: 0, averageLength: 0},
            {isoWeekday: 2, count: 0, averageLength: 0},
            {isoWeekday: 3, count: 3, averageLength: 82.3},
            {isoWeekday: 4, count: 3, averageLength: 14.3},
            {isoWeekday: 5, count: 0, averageLength: 0},
            {isoWeekday: 6, count: 0, averageLength: 0},
            {isoWeekday: 7, count: 1, averageLength: 51},

        ],
        timelineStats: [
            {date: '2018-03', count: 1, averageLength: 51},
            {date: '2018-04', count: 0, averageLength: 0},
            {date: '2018-05', count: 0, averageLength: 0},
            {date: '2018-06', count: 0, averageLength: 0},
            {date: '2018-07', count: 0, averageLength: 0},
            {date: '2018-08', count: 0, averageLength: 0},
            {date: '2018-09', count: 0, averageLength: 0},
            {date: '2018-10', count: 0, averageLength: 0},
            {date: '2018-11', count: 0, averageLength: 0},
            {date: '2018-12', count: 0, averageLength: 0},
            {date: '2019-01', count: 3, averageLength: 82.3},
            {date: '2019-02', count: 0, averageLength: 0},
            {date: '2019-03', count: 0, averageLength: 0},
            {date: '2019-04', count: 3, averageLength: 14.3}
        ]
    })
});
