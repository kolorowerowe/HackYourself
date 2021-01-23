import React from 'react';
import {MuiThemeProvider} from '@material-ui/core/styles';
import RootComponent from "./components/root/RootComponent";
import {darkTheme} from "./theme/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import {HashRouter} from "react-router-dom";
import {SnackbarProvider} from 'notistack';

function App() {
    return (
        <MuiThemeProvider theme={darkTheme}>
            <HashRouter>
                <SnackbarProvider maxSnack={3}
                                  anchorOrigin={{
                                      vertical: 'bottom',
                                      horizontal: 'right',
                                  }}>
                    <div>
                        <CssBaseline/>
                        <RootComponent/>
                    </div>
                </SnackbarProvider>
            </HashRouter>
        </MuiThemeProvider>
    );
}

export default App;
