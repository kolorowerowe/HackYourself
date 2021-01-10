const MESSAGE_FILE_PREFIX = "message_";

const getDirectoriesInsidePath = (source, fs) => {
    return fs.readdirSync(source, {withFileTypes: true})
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
}

const getAllThreads = (rootDirPath, dirNames, fs) => {
    let map = new Map();
    dirNames.forEach(dirName => {
        let messagesFilesInDir = fs.readdirSync(`${rootDirPath}/${dirName}`, {withFileTypes: true})
            .filter(dirent => dirent.name.includes(MESSAGE_FILE_PREFIX))
            .map(dirent => dirent.name);

        let data = readJsonFile(`${rootDirPath}/${dirName}/${messagesFilesInDir[0]}`, fs);

        if (messagesFilesInDir.length > 1) {
            for (let index = 1; index < messagesFilesInDir.length; index++) {
                data.messages = data.messages.concat(readJsonFile(`${rootDirPath}/${dirName}/${messagesFilesInDir[index]}`, fs).messages);
            }
        }
        map.set(dirName, data);
    });

    return [...map.values()];
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

        let dirStatus = fs.lstatSync(dirPath);

        if (!dirStatus.isDirectory()) {
            reject(Error(`Path is not a directory`));
        }

        let allDirNames = getDirectoriesInsidePath(dirPath, fs);

        let allThreads = getAllThreads(dirPath, allDirNames, fs);

        return resolve(allThreads);
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
