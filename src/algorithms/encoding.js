export const jsonEncoding = ["\u00c4\u0085", "\u00c4\u0084", "\u00c4\u0087", "\u00c4\u0086", "\u00c4\u0099", "\u00c4\u0098", "\u00c5\u0082", "\u00c5\u0081", "\u00c5\u0084", "\u00c5\u0083", "\u00c3\u00b3", "\u00c3\u0093", "\u00c5\u009b", "\u00c5\u009a", "\u00c5\u00ba", "\u00c5\u00b9", "\u00c5\u00bc", "\u00c5\u00bb"];
export const jsEncoding = "ąĄćĆęĘłŁńŃóÓśŚźŹżŻ";


export const conversion = ((a, b) => {
    let res = {};
    for (let i = 0; i < a.length; ++i) res[a[i]] = b[i];
    return res;
})(jsonEncoding, jsEncoding);

export const conversionReverse = ((a, b) => {
    let res = {};
    for (let i = 0; i < a.length; ++i) res[a[i]] = b[i];
    return res;
})(jsEncoding, jsonEncoding);

export const replaceWithJSCharacters = (texts) => {
    let result = [];
    for (let t of texts) {
        for (let key in conversion)
            t = t.replaceAll(key, conversion[key]);
        result.push(t);
    }
    return result;
}

export const replaceWithJSONCharacters = (str) => {
    let res = str;
    for (let key in conversionReverse){
        res = res.replaceAll(key, conversionReverse[key]);
    }

    return res;
}


export const toRemove = /[0-9!@#$%^&*()\-_+={}[\]\\|:;'"<,.>/?]/g;