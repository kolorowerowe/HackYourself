const MessageFileName = "message_";

const getDirectories = (source, fs) => {
    let allDirName = fs.readdirSync(source, {withFileTypes: true})
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    return allDirName
}

const getAllMessages = (path, dirNames, fs) => {
    let map = new Map();
    dirNames.forEach(element => {
        let messagesFilesInDir = fs.readdirSync(`${path}/${element}`, {withFileTypes: true})
            .filter(dirent => dirent.name.includes(MessageFileName))
            .map(dirent => dirent.name);

        var data = readJsonFile(`${path}/${element}/${messagesFilesInDir[0]}`, fs);

        if (messagesFilesInDir.length > 1) {
            for (let index = 1; index < messagesFilesInDir.length; index++) {
                data.messages = data.messages.concat(readJsonFile(`${path}/${element}/${messagesFilesInDir[index]}`, fs).messages);
            }
        }
        map.set(element, data);
    });

    return map;
}

const readJsonFile = (path, fs) => {
    return JSON.parse(fs.readFileSync(path));
}

export const loadDataFromDirPath = (dirPath) => {

    return new Promise(((resolve, reject) => {
        let fs = window.require('fs');

        if (!fs.existsSync(dirPath)) {
            reject(Error(`Path '${dirPath}' not exists`));
        }

        let stats = fs.lstatSync(dirPath);

        if (!stats.isDirectory()) {
            reject(Error(`Path is not a directory`));
        }

        let allDirName = getDirectories(dirPath, fs);

        let allMessages = getAllMessages(dirPath, allDirName, fs);

        return resolve(allMessages);
    }))
}

export const loadDataFromStatsFile = (pathToStatsFile) => {

    return new Promise(((resolve, reject) => {
        let fs = window.require('fs');

        if (!fs.existsSync(pathToStatsFile)) {
            reject(Error(`Path '${pathToStatsFile}' not exists`));
        }

        //TODO: add file falidation

        const statistics = readJsonFile(pathToStatsFile, fs);

        return resolve(statistics);
    }))
}
