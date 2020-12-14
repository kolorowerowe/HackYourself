import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import StorageIcon from '@material-ui/icons/Storage';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import MailIcon from '@material-ui/icons/Mail';
import PropTypes from 'prop-types';

const SideBar = (props) => {

    const {
        route,
        setRoute
    } = props;

    const classes = useStyles();


    const sidebarElements = [{
        name: 'Choose dir',
        value: 'CHOOSE_DIR',
        IconComponent: StorageIcon
    }, {
        name: 'Stats',
        value: 'STATS',
        IconComponent: EqualizerIcon
    }, {
        name: 'Help',
        value: 'HELP',
        IconComponent: HelpOutlineIcon
    }, {
        name: 'Contact',
        value: 'CONTACT',
        IconComponent: MailIcon
    }]

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar variant={'dense'}>
                    <Typography variant="h6" noWrap>
                        Hack Yourself
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.toolbar}/>
            <List>
                {sidebarElements.map(({name, value, IconComponent}) => (
                    <ListItem button
                              key={value}
                              onClick={() => {
                                  setRoute(value)
                              }}>
                        <ListItemIcon color={value === route ? 'primary' : 'textPrimary'}>
                            <IconComponent color={value === route ? 'primary' : 'action'}/>
                        </ListItemIcon>
                        <ListItemText primary={name}
                                      primaryTypographyProps={{color: value === route ? 'primary' : 'textPrimary'}}/>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

SideBar.propTypes = {
    route: PropTypes.string,
    setRoute: PropTypes.func
};

const drawerWidth = 200;


const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    appBar: {
        width: drawerWidth,
        left: 0
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
}));

export default SideBar;