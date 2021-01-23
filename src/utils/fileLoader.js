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

const getTopics = (topicsDirPath, fs) => {
    let data = readJsonFile(`${topicsDirPath}/your_topics.json`, fs);
    return data.inferred_topics;
}

const readJsonFile = (path, fs) => {
    return JSON.parse(fs.readFileSync(path));
}

export const loadDataFromDirPath = async (fbDataDirPath) => {
    let fs = window.require('fs');

    checkIfIsDirectory(fs, fbDataDirPath);

    const inboxPath = fbDataDirPath + '/messages/inbox';
    checkIfIsDirectory(fs, inboxPath);
    const threadDirs = getDirectoriesInsidePath(inboxPath, fs);
    const allThreads = getAllThreads(inboxPath, threadDirs, fs);

    const topicsPath = fbDataDirPath + '/your_topics';
    checkIfIsDirectory(fs, topicsPath);
    const topics = getTopics(topicsPath, fs);

    return {
        threadList: allThreads,
        topics
    };
}

const checkIfIsDirectory = (fs, dirPath) => {
    if (!fs.existsSync(dirPath)) {
        throw new Error(`Path '${dirPath}' not exists`);
    }

    let dirStatus = fs.lstatSync(dirPath);
    if (!dirStatus.isDirectory()) {
        throw new Error(`Path should be a directory`);
    }
}

export const loadDataFromStatsFile = async (pathToStatsFile) => {
    let fs = window.require('fs');

    if (!fs.existsSync(pathToStatsFile)) {
        throw new Error(`Path '${pathToStatsFile}' not exists`);
    }

    //TODO: add file validation

    const statistics = readJsonFile(pathToStatsFile, fs);

    return statistics;

}
