import React from 'react';
import {MuiThemeProvider} from '@material-ui/core/styles';
import RootComponent from "./components/root/RootComponent";
import {darkTheme} from "./theme/theme";
import CssBaseline from "@material-ui/core/CssBaseline";

function App() {
    return (
        <MuiThemeProvider theme={darkTheme}>
            <div style={{padding: 20}}>
                <CssBaseline/>
                <RootComponent/>
            </div>
        </MuiThemeProvider>
    );
}

export default App;
