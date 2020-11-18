const MessageFileName = "message_";

const getDirectories = (source, fs) => {
    let allDirName = fs.readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    return allDirName
}

const getAllMessages = (path, dirNames, fs) => {
    let map = new Map();
    dirNames.forEach(element => {
        let messagesFilesInDir = fs.readdirSync(`${path}/${element}`, { withFileTypes: true })
            .filter(dirent => dirent.name.includes(MessageFileName))
            .map(dirent => dirent.name);

        var data = readJsonFile(`${path}/${element}/${messagesFilesInDir[0]}`, fs);

        if(messagesFilesInDir.length > 1) {
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

export const loadDataFromPath = (path) => {
    let fs = window.require('fs');

    if(!fs.existsSync(path)) {
        throw new Error(`Path '${path}' not exists`);
    }

    let stats = fs.lstatSync(path);

    if (!stats.isDirectory()) {
        throw new Error(`Path is not a directory`);
    }

    let allDirName = getDirectories(path, fs);

    let allMessages = getAllMessages(path, allDirName, fs);

    console.log("All messages: " , allMessages);

    return true;
}
