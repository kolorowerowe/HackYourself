import React from 'react';
import {CardActionArea, CardHeader, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {useCommonStyles} from "../../theme/commonStyles";
import {useHistory} from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
    R_CHOOSE_FOLDER,
    R_CHOOSE_STATS_FILE,
    R_CONTACT,
    R_HELP,
    R_STATS_MESSAGE,
    R_STATS_TOPICS
} from "../root/sidebar/routes";
import {useTranslation} from "react-i18next";

const HelloComponent = () => {

    const commonStyles = useCommonStyles();
    const styles = useStyles();

    const history = useHistory();
    const {t} = useTranslation();

    const MenuCard = ({title, path, description, xs}) => {

        return <Grid item xs={xs} className={styles.gridItem}>
            <Card className={styles.card}>
                <CardActionArea onClick={() => history.push(path)}>
                    <CardHeader title={title}/>
                    <CardContent className={styles.cardContent}>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    };


    return (
        <Grid container spacing={3} className={commonStyles.containerPadding}>
            <Grid item xs={12}>
                <Typography variant={'h4'} align={'center'}>
                    {t('description:welcome')}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    {t('description:ask_text')}
                </Typography>
            </Grid>

            <MenuCard title={t('general:choose_dir')}
                      description={t('description:choose_dir')}
                      path={R_CHOOSE_FOLDER}
                      xs={6}/>

            <MenuCard title={t('general:choose_stats_file')}
                      description={t('description:choose_stats_file')}
                      path={R_CHOOSE_STATS_FILE}
                      xs={6}/>

            <MenuCard title={t('general:messenger_stats')}
                      description={t('description:messenger_stats')}
                      path={R_STATS_MESSAGE}
                      xs={12}/>

            <MenuCard title={t('general:topics')}
                      description={t('description:topics')}
                      path={R_STATS_TOPICS}
                      xs={12}/>

            <MenuCard title={t('general:events')}
                      description={t('description:events')}
                      path={R_STATS_EVENTS}
                      xs={12}/>

            <MenuCard title={t('general:help')}
                      description={t('description:help')}
                      path={R_HELP}
                      xs={6}/>

            <MenuCard title={t('general:contact')}
                      description={t('description:contact')}
                      path={R_CONTACT}
                      xs={6}/>
        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    gridItem: {
        width: '100%'
    },
    card:{
        '&:hover': {
            backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.main} 4px, transparent 4px, transparent)`,
        }
    },
    cardContent: {
        minHeight: 55,
        paddingTop: 0
    },
    cardActions: {
        padding: 0,
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));


export default HelloComponent;
