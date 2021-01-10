import iconv from 'iconv-lite';

const fixEnc = (string) => {
    return iconv.decode(iconv.encode(string, "latin1"), "utf8");
}

const unfixEnc = (string) => {
    return iconv.decode(iconv.encode(string, "utf8"), "latin1")
}

export const fixEncoding = (object) => {
    if (object.constructor === String) {
        return fixEnc(object);
    } else if (object.constructor === Array) {
        return object.map(text => fixEnc(text));
    }
}

export const unfixEncoding = (object) => {
    if (object.constructor === String) {
        return unfixEnc(object);
    } else if (object.constructor === Array) {
        return object.map(text => unfixEnc(text));
    }
}

export const linkRegex = /(https?:\/\/[^\s]+)/g;
export const toRemove = /[0-9!@#$%^&*()\-_+={}[\]\\|:;'"<,.>/?]/g;