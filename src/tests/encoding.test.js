import React from 'react';
import {replaceWithJSCharacters} from "../algorithms/encoding";


test('Get encoding', () => {

    const texts = [
        'zrobi\u00c4\u0099',
        'ch\u00c4\u0099ci\u00c4\u0085',
        'by\u00c5\u0082am',
        'ju\u00c5\u00bc',
        'dost\u00c4\u0099pno\u00c5\u009b\u00c4\u0087'
    ];

    const replacedTexts = replaceWithJSCharacters(texts);

    expect(replacedTexts).toEqual([
        'zrobię',
        'chęcią',
        'byłam',
        'już',
        'dostępność'
    ])

});
