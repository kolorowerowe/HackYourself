export const saveToFile = (fileName, body) => {

    try {
        let fs = window.require('fs');

        fs.writeFileSync(fileName, JSON.stringify(body), 'utf-8');
    } catch (e) {
        console.error(e);
    }
}