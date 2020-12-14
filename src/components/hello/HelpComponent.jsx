import React from 'react';
import {Button, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {useCommonStyles} from "../../theme/commonStyles";
import FacebookIcon from "@material-ui/icons/Facebook";
import StorageIcon from "@material-ui/icons/Storage";


const HelpComponent = ({navigateToChooseDir}) => {

    const styles = useCommonStyles();

    const openExternalLink = (link) => {
        const {shell} = window.require('electron');
        shell.openExternal(link);
    }

    const guides = [
        {
            text: "Login into the Facebook page."
        }, {
            text: "Go to the settings."
        }, {
            text: "Go to \"Your Facebook information\"."
        }, {
            text: "Click on \"Download Your Information\"."
        }, {
            text: "Here you can find direct link to your Facebook's info:",
            button: <Button startIcon={<FacebookIcon/>}
                            onClick={() => openExternalLink('https://www.facebook.com/dyi/?referrer=yfi_settings')}
                            size={'small'}>
                Facebook
            </Button>
        }, {
            text: "In the top bar select Format = HTML."
        }, {
            text: "Ensure that \"Messages\" option is checked."
        }, {
            text: "Create file."
        }, {
            text: "Creating files may take up while. When the file will be ready you will be notified by Facebook."
        }, {
            text: "Download the file from the tab \"Available Copies\"."
        }, {
            text: "Unpack the files."
        }, {
            text: "Go to the \"Choose dir\" section in HackYourself.",
            button: <Button startIcon={<StorageIcon/>}
                            onClick={navigateToChooseDir}
                            size={'small'}>
                Choose dir
            </Button>
        }, {
            text: "Select the path to the \"Inbox\" folder and load data."
        }, {
            text: "Enjoy watching your statistics!"
        }
    ];

    return (
        <Grid container spacing={3} className={styles.containerPadding}>
            <Grid item xs={12}>
                <Typography>
                    You can find below short instructions about how to hack yourself.
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