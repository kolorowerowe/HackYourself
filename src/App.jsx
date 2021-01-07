import React from 'react';
import {MuiThemeProvider} from '@material-ui/core/styles';
import RootComponent from "./components/root/RootComponent";
import {darkTheme} from "./theme/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import {HashRouter} from "react-router-dom";

function App() {
    return (
        <MuiThemeProvider theme={darkTheme}>
            <HashRouter>
                <div>
                    <CssBaseline/>
                    <RootComponent/>
                </div>
            </HashRouter>
        </MuiThemeProvider>
    );
}

export default App;
