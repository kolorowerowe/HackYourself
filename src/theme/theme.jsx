import {createMuiTheme} from '@material-ui/core/styles';

export const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#4267B2',
            light: '#5E94FF',
            dark: '#2A4373'
        },
        secondary: {
            main: '#B3A539',
            light: '#FFEB52',
            dark: '#736A25'
        }
    }
});

