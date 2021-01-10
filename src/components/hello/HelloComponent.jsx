import React from 'react';
import {CardActionArea, CardHeader, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {useCommonStyles} from "../../theme/commonStyles";
import {useHistory} from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {R_CHOOSE_FOLDER, R_CHOOSE_STATS_FILE, R_CONTACT, R_HELP, R_STATS} from "../root/routes";

const HelloComponent = () => {

    const commonStyles = useCommonStyles();
    const styles = useStyles();

    const history = useHistory();

    const MenuCard = ({title, path, description, xs}) => {

        return <Grid item xs={xs} className={styles.gridItem}>
            <Card>
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
                    Hello, let's start hacking!
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    Please, choose what you want to do
                </Typography>
            </Grid>

            <MenuCard title={'Choose dir'}
                      description={'First time? Select downloaded data and begin your hacking.'}
                      path={R_CHOOSE_FOLDER}
                      xs={6}/>

            <MenuCard title={'Choose stats file'}
                      description={'Analysed data before? Load them into app.'}
                      path={R_CHOOSE_STATS_FILE}
                      xs={6}/>

            <MenuCard title={'See your statistics'}
                      description={'After loading stats here you can see them all'}
                      path={R_STATS}
                      xs={12}/>

            <MenuCard title={'Help'}
                      description={'Don\'t know where to start? Open instructions.'}
                      path={R_HELP}
                      xs={6}/>

            <MenuCard title={'Contact'}
                      description={'Find a problem or want to see authors?'}
                      path={R_CONTACT}
                      xs={6}/>
        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    gridItem: {
        width: '100%',
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