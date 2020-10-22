import {createMuiTheme} from '@material-ui/core/styles';
import orange from "@material-ui/core/colors/orange";

export const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: orange[600],
        }
    }
});

