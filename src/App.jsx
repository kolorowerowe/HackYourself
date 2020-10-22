import React from 'react';
import {MuiThemeProvider} from '@material-ui/core/styles';
import RootComponent from "./components/root/RootComponent";
import {darkTheme} from "./theme/theme";

function App() {
    return (
        <MuiThemeProvider theme={darkTheme}>
            <RootComponent/>
        </MuiThemeProvider>
    );
}

export default App;
