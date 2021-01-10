import iconv from 'iconv-lite';

export const fixEncoding = (string) => {
    return iconv.decode(iconv.encode(string, "latin1"), "utf8");
}

export const unfixEncoding = (string) => {
    return iconv.decode(iconv.encode(string, "utf8"), "latin1")
}

export const replaceWithJSCharacters = (texts) => texts.map(t => fixEncoding(t));


export const replaceWithJSONCharacters = (str) => {
    return unfixEncoding(str);
}

export const linkRegex = /(https?:\/\/[^\s]+)/g;
export const toRemove = /[0-9!@#$%^&*()\-_+={}[\]\\|:;'"<,.>/?]/g;