import React from 'react';
import messages from './resources/threadAgataT.json'
import {getWordStats} from "../algorithms/message/wordAlgorithms";


test('Get correct word stats', () => {

    const userName = 'Dominik Ko\u00c5\u0082odziej';

    const wordStats = getWordStats([messages], userName);

    expect(wordStats).toEqual({
        occurrencesList: [
            {word: 'w', value: 2, order: 1},
            {word: 'oki', value: 2, order: 2},
            {word: 'messengerze', value: 1, order: 3},
            {word: 'sobą', value: 1, order: 4},
            {word: 'ze', value: 1, order: 5},
            {word: 'porozmawiać', value: 1, order: 6},
            {word: 'teraz', value: 1, order: 7},
            {word: 'możecie', value: 1, order: 8},
            {word: expect.anything(), value: 1, order: 9},
            {word: 'czeka', value: 1, order: 10},
            {word: 'arkusz', value: 1, order: 11},
            {word: 'pssssst', value: 1, order: 12},
            {word: 'bitehacka', value: 1, order: 13},
            {word: 'na', value: 1, order: 14},
            {word: 'dostępność', value: 1, order: 15},
            {word: 'twoja', value: 1, order: 16},
            {word: 'tam', value: 1, order: 17},
            {word: 'jak', value: 1, order: 18},
            {word: 'heeeej', value: 1, order: 19},
            {word: 'no', value: 1, order: 20},
            {word: 'd', value: 1, order: 21},
            {word: 'super', value: 1, order: 22},
            {word: 'oooo', value: 1, order: 23},
            {word: 'chęcią', value: 1, order: 24},
            {word: 'z', value: 1, order: 25},
            {word: 'podeślę', value: 1, order: 26},
            {word: 'ci', value: 1, order: 27},
            {word: 'i', value: 1, order: 28},
            {word: 'zrobię', value: 1, order: 29},
            {word: 'to', value: 1, order: 30},
            {word: 'jutro', value: 1, order: 31},
            {word: 'ale', value: 1, order: 32},
            {word: 'xd', value: 1, order: 33},
            {word: 'pokoju', value: 1, order: 34},
            {word: 'którym', value: 1, order: 35},
            {word: 'wielkie', value: 1, order: 36},
            {word: 'dzięki', value: 1, order: 37}
        ]
    });

});
