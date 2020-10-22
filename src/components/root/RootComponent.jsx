import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import StartComponentContainer from "../start/StartComponentContainer";


const RootComponent = () => {


    return (
        <div>
            <CssBaseline/>

            {/*Here should be some sidebars, routers ..., now it's only one component */}
            <StartComponentContainer/>

        </div>

    );
};


export default RootComponent;
