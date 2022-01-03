import React, {useCallback, useEffect, useMemo, useState, useSelector} from 'react';
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
import MailIcon from '@material-ui/icons/Mail';
import MessageIcon from '@material-ui/icons/Message';
import VisibilityIcon from '@material-ui/icons/Visibility';
import GamesIcon from '@material-ui/icons/Games';
import {R_CHOOSE_FOLDER, R_CONTACT, R_HELP, R_HOME, R_STATS_MESSAGE, R_STATS_TOPICS, R_STATS_ABOUT_YOU} from "./routes";
import {useHistory, useLocation} from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import LanguageIcon from '@material-ui/icons/Translate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import MenuItem from "@material-ui/core/MenuItem";
import {useTranslation} from "react-i18next";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import i18next from "i18next";

const SideBar = () => {

    const classes = useStyles();
    const {t} = useTranslation();
    const sidebarElements = [{
        name: t('general:choose_dir'),
        value: R_CHOOSE_FOLDER,
        IconComponent: StorageIcon,
        divider: true
    }, {
        name: t('general:messenger_stats'),
        value: R_STATS_MESSAGE,
        IconComponent: MessageIcon
    }, {
    //     name: 'About you',
    //     value: R_STATS_ABOUT_YOU,
    //     IconComponent: VisibilityIcon
    // }, {
        name: t('general:topics'),
        value: R_STATS_TOPICS,
        IconComponent: GamesIcon,
    }, {
        name: t('general:events'),
        value: R_STATS_EVENTS,
        IconComponent: EventIcon,
        divider: true
    },{
        name: t('general:help'),
        value: R_HELP,
        IconComponent: HelpOutlineIcon
    }, {
        name: t('general:contact'),
        value: R_CONTACT,
        IconComponent: MailIcon
    }]

    const history = useHistory();
    const {pathname} = useLocation();

    const LANGUAGES_LABEL = [
        {
            code: 'en',
            text: 'English',
        },
        {
            code: 'pl',
            text: 'Polski',
        }
    ];
    // let languageCodeGlobal = 'en'

    const [languageMenu, setLanguageMenu] = useState(null);
    const [languageCodeGlobal, setLanguageCodeGlobal] = useState('en');

    const handleLanguageIconClick = (event) => {
        setLanguageMenu(event.currentTarget);
    };

    const handleLanguageChange = (languageCode) => {
        setLanguageMenu(null);
        i18next.changeLanguage(languageCode);
        setLanguageCodeGlobal(languageCode)
    };

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
            <Button
                    color="inherit"
                    onClick={handleLanguageIconClick}
                >
                    <LanguageIcon/>
                    <span className={classes.language}>
                            {LANGUAGES_LABEL.filter((language) => language.code === languageCodeGlobal)[0].text}
                        </span>
                    <ExpandMoreIcon fontSize="small"/>
                </Button>

                <Menu
                    anchorEl={languageMenu}
                    open={!!languageMenu}
                    onClose={() => setLanguageMenu(null)}
                >
                    {LANGUAGES_LABEL.map((language) => (
                        <MenuItem
                            key={language.code}
                            value={language.code}
                            selected={languageCodeGlobal === language.code}
                            onClick={() => handleLanguageChange(language.code)}
                            lang={language.code}
                        >
                            {language.text}
                        </MenuItem>
                    ))}
                </Menu>
            <List>
                {sidebarElements.map(({name, value, IconComponent, divider}) => {
                    const isSelected = value.split("/")[1] === pathname.split("/")[1]

                    const selectedStyle = `linear-gradient(90deg, #4267B2, #4267B2 4px, transparent 4px, transparent)`;
                    const notSelectedStyle = `linear-gradient(90deg, #4267B2, #4267B2 0%, transparent 0%, transparent)`;

                    return <React.Fragment key={value}>
                        <ListItem button
                                  onClick={() => {
                                      history.push(value)
                                  }}
                                  style={{
                                      backgroundImage: isSelected ? selectedStyle : notSelectedStyle
                                  }}>


                            <ListItemIcon>
                                <IconComponent color={isSelected ? 'action' : 'disabled'}
                                               className={classes.iconOnHover}/>
                            </ListItemIcon>
                            <ListItemText primary={name}
                                          primaryTypographyProps={{color: isSelected ? 'textPrimary' : 'textSecondary'}}/>
                        </ListItem>
                        {!!divider && <Divider className={classes.divider}/>}
                    </React.Fragment>
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
    '&:hover': {
        iconOnHover: {
            color: '#000'
        }
    },
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}));

export default SideBar;