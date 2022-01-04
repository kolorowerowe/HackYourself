import {S_MESSENGER, S_TOPICS, S_EVENTS} from "../components/root/constans";

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

const getAboutYou = (aboutYouDirPath, fs) => {
    let data = readJsonFile(`${aboutYouDirPath}/viewed.json`, fs);
    return {
        viewed: data
    };
}

const getTopics = (topicsDirPath, fs) => {
    let {inferred_topics, inferred_topics_v2} = readJsonFile(`${topicsDirPath}/your_topics.json`, fs);
    return inferred_topics_v2 ? inferred_topics_v2 : inferred_topics;
}

const getEvents = (eventsDirPath, fs) => {
    let {events_invited, events_invited_v2} = readJsonFile(`${eventsDirPath}/event_invitations.json`, fs);
    let {your_events, your_events_v2} = readJsonFile(`${eventsDirPath}/your_events.json`, fs);
    let {event_responses, event_responses_v2} = readJsonFile(`${eventsDirPath}/your_event_responses.json`, fs);

    return {
        events_invited: events_invited_v2 ? events_invited_v2 : events_invited,
        your_events: your_events_v2 ? your_events_v2 : your_events,
        event_responses: event_responses_v2 ? event_responses_v2 : event_responses
    }
}

const readJsonFile = (path, fs) => {
    return JSON.parse(fs.readFileSync(path));
}

export const loadDataFromDirPath = async (fbDataDirPath, inspectionResults) => {
    let fs = window.require('fs');

    checkIfIsDirectory(fs, fbDataDirPath);

    let rawDataResult = {
        threadList: undefined,
        aboutYou: undefined,
        topics: undefined,
        events: undefined
    };


    const messengerResult = inspectionResults.find(({type}) => type === S_MESSENGER);
    if (messengerResult.enabled) {
        const inboxPath = `${fbDataDirPath}/${messengerResult.dirPath}`
        const threadDirs = getDirectoriesInsidePath(inboxPath, fs);
        rawDataResult.threadList = getAllThreads(inboxPath, threadDirs, fs);
    }


    // const aboutYouResult = inspectionResults.find(({type}) => type === S_ABOUT_YOU);
    // if (aboutYouResult.enabled) {
    //     const aboutYouDirPath = `${fbDataDirPath}/${aboutYouResult.dirPath}`;
    //     rawDataResult.aboutYou = getAboutYou(aboutYouDirPath, fs);
    // }


    const topicsResult = inspectionResults.find(({type}) => type === S_TOPICS);
    if (topicsResult.enabled) {
        const topicsPath = `${fbDataDirPath}/${topicsResult.dirPath}`
        rawDataResult.topics = getTopics(topicsPath, fs);
    }

    const eventsResult = inspectionResults.find(({type}) => type === S_EVENTS);
    if (eventsResult.enabled) {
        const eventsPath = `${fbDataDirPath}/${eventsResult.dirPath}`
        rawDataResult.events = getEvents(eventsPath, fs);
    }

    return rawDataResult;
};

export const inspectDataExists = (pathToDataFolder, inspectionResults, setInspectionResults) => {
    let fs = window.require('fs');

    const newInspectionResults = inspectionResults.map(inspect => {
        try {
            checkIfIsDirectory(fs, `${pathToDataFolder}/${inspect.dirPath}`);
            return {...inspect, available: true};
        } catch (e) {
            return {...inspect, available: false, enabled: false};
        }
    });

    setInspectionResults(newInspectionResults);
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
