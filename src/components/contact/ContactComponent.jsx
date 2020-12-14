import React, {useMemo} from 'react';
import {Typography} from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Grid from "@material-ui/core/Grid";
import {useCommonStyles} from "../../theme/commonStyles";

const ContactComponent = ({username}) => {

    const styles = useCommonStyles();

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
        name: 'Grzegorz Nieużyła',
        email: 'grzegorznieuzyla@gmail.com'
    }];

    const optionalName = useMemo(() => {
        if (!username) {
            return "!"
        }
        const usernameWords = username.split(" ");
        if (usernameWords.length > 0){
            return usernameWords[0] + "!";
        }
    }, [username]);


    return (
        <Grid container spacing={3} className={styles.containerPadding}>
            <Grid item xs={12}>
                <Typography variant={'h4'}>
                    Hello there {optionalName}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    We are very happy for downloading our app.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    If you have any questions or you would like to give a feedback - don't hesitate to contact us.
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