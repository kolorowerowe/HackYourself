import React from 'react';
import {fixEncoding} from "../algorithms/encoding";


test('Fix encoding from array of string', () => {

    const texts = [
        'zrobi\u00c4\u0099',
        'ch\u00c4\u0099ci\u00c4\u0085',
        'by\u00c5\u0082am',
        'ju\u00c5\u00bc',
        'dost\u00c4\u0099pno\u00c5\u009b\u00c4\u0087'
    ];

    const replacedTexts = fixEncoding(texts);

    expect(replacedTexts).toEqual([
        'zrobię',
        'chęcią',
        'byłam',
        'już',
        'dostępność'
    ])

});

test('Fix encoding from string', () => {

    const text = "przej\u00c5\u009bci\u00c3\u00b3wk\u00c4\u0099";

    const replacedTexts = fixEncoding(text);

    expect(replacedTexts).toEqual('przejściówkę');

});