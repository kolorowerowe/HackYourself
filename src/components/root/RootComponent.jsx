import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import StartComponentContainer from "../start/StartComponentContainer";
import { getTimeStats, getTimeStatsPerRecipient, getWordStats, getWordStatsPerRecipient } from '../algorithms';


const RootComponent = () => {
    
    // let fs = window.require('fs');
    // let json1 = JSON.parse(fs.readFileSync('json/message_1.json'));
    // let json2 = JSON.parse(fs.readFileSync('json/message_2.json'));
    // console.log(getTimeStats([json1, json2],"Grzegorz Nieu\u00c5\u00bcy\u00c5\u0082a"));
    // console.log(getTimeStatsPerRecipient([json1, json2],"Grzegorz Nieu\u00c5\u00bcy\u00c5\u0082a"));
    // console.log(getWordStats([json1, json2],"Grzegorz Nieu\u00c5\u00bcy\u00c5\u0082a"));
    // console.log(getWordStatsPerRecipient([json1, json2],"Grzegorz Nieu\u00c5\u00bcy\u00c5\u0082a"));
    return (
        <div>
            <CssBaseline/>

            {/*Here should be some sidebars, routers ..., now it's only one component */}
            <StartComponentContainer/>

        </div>

    );
};


export default RootComponent;
