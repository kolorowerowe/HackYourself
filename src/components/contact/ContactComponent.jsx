import React, {useMemo} from 'react';
import {Typography} from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Grid from "@material-ui/core/Grid";
import {useCommonStyles} from "../../theme/commonStyles";
import {useTranslation} from "react-i18next";

const ContactComponent = ({userName}) => {

    const styles = useCommonStyles();
    const {t} = useTranslation();
    
    const ContactPerson = ({name, email}) => {

        return <div style={{padding: 10}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <PersonIcon style={{margin: 5}}/>
                <Typography>
                    {name}
                </Typography>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <MailOutlineIcon style={{margin: 5}}/>
                <Typography>
                    {email}
                </Typography>
            </div>
        </div>
    }

    const developers = [{
        name: 'Szymon Borowy',
        email: 'sborowy4@gmail.com'
    }, {
        name: 'Dominik Kołodziej',
        email: 'dominos55555@gmail.com'
    }, {
        name: 'Grzegorz Gruszczyk',
        email: 'grzesiu15432@gmail.com'
    }];

    const optionalName = useMemo(() => {
        if (!userName) {
            return "!"
        }
        const userNameWords = userName.split(" ");
        if (userNameWords.length > 0) {
            return userNameWords[0] + "!";
        }
    }, [userName]);


    return (
        <Grid container spacing={3} className={styles.containerPadding}>
            <Grid item xs={12}>
                <Typography variant={'h4'}>
                    {t('general:hello')} {optionalName}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    {t('general:thanks_for_downloading')}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    {t('general:any_question')}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {developers.map(({name, email}) => <ContactPerson key={name}
                                                                  name={name}
                                                                  email={email}/>)}
            </Grid>
        </Grid>
    );
};

ContactComponent.propTypes = {};

export default ContactComponent;