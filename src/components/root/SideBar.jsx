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
import {R_CHOOSE_FOLDER, R_CONTACT, R_HELP, R_HOME, R_STATS} from "./routes";
import {useHistory, useLocation} from "react-router-dom";

const SideBar = () => {

    const classes = useStyles();

    const sidebarElements = [{
        name: 'Choose dir',
        value: R_CHOOSE_FOLDER,
        IconComponent: StorageIcon
    }, {
        name: 'Stats',
        value: R_STATS,
        IconComponent: EqualizerIcon
    }, {
        name: 'Help',
        value: R_HELP,
        IconComponent: HelpOutlineIcon
    }, {
        name: 'Contact',
        value: R_CONTACT,
        IconComponent: MailIcon
    }]

    const history = useHistory();
    const {pathname} = useLocation();

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
                    <Typography variant="h6" noWrap onClick={() => history.push(R_HOME)}>
                        Hack Yourself
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.toolbar}/>
            <List>
                {sidebarElements.map(({name, value, IconComponent}) => {
                    const isSelected = value.split("/")[1] === pathname.split("/")[1]

                    const selectedStyle = `linear-gradient(90deg, #4267B2, #4267B2 4px, transparent 4px, transparent)`;
                    const notSelectedStyle = `linear-gradient(90deg, #4267B2, #4267B2 0%, transparent 0%, transparent)`;

                    return <ListItem button
                                     key={value}
                                     onClick={() => {
                                         history.push(value)
                                     }}
                                     style={{
                                         backgroundImage: isSelected ? selectedStyle : notSelectedStyle
                                     }}>


                        <ListItemIcon>
                            <IconComponent color={isSelected ? 'action' : 'disabled'} className={classes.iconOnHover}/>
                        </ListItemIcon>
                        <ListItemText primary={name}
                                      primaryTypographyProps={{color: isSelected ? 'textPrimary' : 'textSecondary'}}/>
                    </ListItem>
                })}
            </List>
        </Drawer>
    );
};

SideBar.propTypes = {};

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
    '&:hover' :{
        iconOnHover: {
            color: '#000'
        }
    }

}));

export default SideBar;