import React from 'react';
import messages from './resources/threadAgataT.json'
import {getTotalStats} from "../algorithms/totalAlgorithms";


test('Get correct word stats', () => {

    const userName = 'Dominik Ko\u00c5\u0082odziej';

    const totalStats = getTotalStats([messages], userName);

    expect(totalStats).toEqual({
        totalMessagesSent: 6,
        totalMessages: 11,
        topUsers: [
            {
                name: 'Agata T',
                sentMessagesCount: 6,
                allMessagesCount: 11,
                participantsCount: 2,
                activityRatio: 9,
                order: 1
            }
        ]
    });

});
