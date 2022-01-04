import React from 'react';
import {Button, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {useCommonStyles} from "../../theme/commonStyles";
import FacebookIcon from "@material-ui/icons/Facebook";
import StorageIcon from "@material-ui/icons/Storage";
import {useTranslation} from "react-i18next";

const HelpComponent = ({navigateToChooseDir}) => {

    const styles = useCommonStyles();

    const openExternalLink = (link) => {
        const {shell} = window.require('electron');
        shell.openExternal(link);
    }

    const {t} = useTranslation();

    const guides = [
        {
            text: t('description:guide_step_1')
        }, {
            text: t('description:guide_step_2')
        }, {
            text: t('description:guide_step_3')
        }, {
            text: t('description:guide_step_4')
        }, {
            text: t('description:guide_step_5'),
            button: <Button startIcon={<FacebookIcon/>}
                            onClick={() => openExternalLink('https://www.facebook.com/dyi/?referrer=yfi_settings')}
                            size={'small'}>
                Facebook
            </Button>
        }, {
            text: t('description:guide_step_6')
        }, {
            text: t('description:guide_step_7')
        }, {
            text: t('description:guide_step_8')
        }, {
            text: t('description:guide_step_9')
        }, {
            text: t('description:guide_step_10')
        }, {
            text: t('description:guide_step_11')
        }, {
            text: t('description:guide_step_12'),
            button: <Button startIcon={<StorageIcon/>}
                            onClick={navigateToChooseDir}
                            size={'small'}>
                {t('description:guide_step_15')}
            </Button>
        }, {
            text: t('description:guide_step_13')
        }, {
            text: t('description:guide_step_14')
        }
    ];

    return (
        <Grid container spacing={3} className={styles.containerPadding}>
            <Grid item xs={12}>
                <Typography>
                    {t('description:guide_info')}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {guides.map((line, index) =>
                    <div key={index} className={styles.instructionStep}>
                        <Typography>
                            {index + 1}. {line.text}
                        </Typography>
                        {!!line.button && line.button}
                    </div>)}
            </Grid>
        </Grid>
    );
};


export default HelpComponent;