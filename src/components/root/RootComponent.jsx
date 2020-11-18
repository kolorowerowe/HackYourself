import React, {useState} from 'react';
import LoadDataComponentContainer from "../loadData/LoadDataComponentContainer";
import {loadDataFromPath} from "../../utils/fileLoader";
import SnackbarAlert from "./SnackbarAlert";


const RootComponent = () => {

    // let fs = window.require('fs');
    // let json1 = JSON.parse(fs.readFileSync('json/message_1.json'));
    // let json2 = JSON.parse(fs.readFileSync('json/message_2.json'));
    // console.log(getTimeStats([json1, json2],"Grzegorz Nieu\u00c5\u00bcy\u00c5\u0082a"));
    // console.log(getTimeStatsPerRecipient([json1, json2],"Grzegorz Nieu\u00c5\u00bcy\u00c5\u0082a"));
    // console.log(getWordStats([json1, json2],"Grzegorz Nieu\u00c5\u00bcy\u00c5\u0082a"));
    // console.log(getWordStatsPerRecipient([json1, json2],"Grzegorz Nieu\u00c5\u00bcy\u00c5\u0082a"));


    const [fileData, setFileData] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [fileValidationError, setFileValidationError] = useState(null);

    const [snackbarMessage, setSnackbarMessage] = useState('');


    const onLoadData = (path) => {
        setFileValidationError(null);
        setLoading(true);

        try {
            const result = loadDataFromPath(path);
            setSnackbarMessage('Loaded successfully');
            setFileData(result);
        } catch (e) {
            setFileValidationError(e);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div>

            <LoadDataComponentContainer loading={loading}
                                        fileValidationError={fileValidationError}
                                        onLoadData={onLoadData}/>

            <SnackbarAlert snackbarMessage={snackbarMessage}
                           setSnackbarMessage={setSnackbarMessage}/>

        </div>

    );
};


export default RootComponent;
