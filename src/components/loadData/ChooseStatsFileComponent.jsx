import React, {useState} from 'react';
import {Button, IconButton, TextField, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {useCommonStyles} from "../../theme/commonStyles";
import TransitEnterexitIcon from '@material-ui/icons/TransitEnterexit';
import Tooltip from "@material-ui/core/Tooltip";
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import {PATH_TO_STATS_FILE} from "../root/localStorageKeys";
import Link from "@material-ui/core/Link";
import CustomLinearProgress from "../generic/CustomLinearProgress";
import {useTranslation} from "react-i18next";

const ChooseStatsFileComponent = (props) => {

    const {
        goToChooseFolder,
        onLoadStatisticsFromFileClick,
        loading,
        loadingLabel,
    } = props;

    const styles = useCommonStyles();

    const [pathToStatsFile, setPathToStatsFile] = useState('');
    const {t} = useTranslation();

    const onClick = () => {
        const {
            remote: {
                dialog
            }
        } = window.require('electron');

        dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [
                {name: 'json files', extensions: ['json']}
            ]
        }).then((data) => {
            const {
                filePaths
            } = data;

            if (filePaths.length > 0) {
                setPathToStatsFile(filePaths[0]);
            }
        }).catch(e => {
            console.error(e);
        });
    }

    return (
        <Grid container spacing={5} className={styles.containerPadding}>
            <Grid item xs={12}>
                <Typography variant={'h6'}>
                    {t('description:load_data_long')}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <div style={{display: 'flex'}}>
                    <TextField id="path"
                               name="path"
                               value={pathToStatsFile}
                               placeholder={'C:\\Users\\domin\\Documents\\Downloads\\stats.json'}
                               label={t('description:path_to_file')}
                               onChange={e => setPathToStatsFile(e.target.value)}
                               disabled={loading}
                               fullWidth
                    />
                    <Tooltip title={t('description:select_folder')}>
                        <IconButton onClick={onClick}>
                            <FolderOpenIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={t('description:paste_last')}>
                        <IconButton onClick={() => {
                            setPathToStatsFile(localStorage.getItem(PATH_TO_STATS_FILE) || '');
                        }}>
                            <TransitEnterexitIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
            </Grid>

            <Grid item xs={12}>
                <CustomLinearProgress loading={loading} label={loadingLabel}/>
            </Grid>

            <Grid item xs={12}>
                <Button onClick={() => onLoadStatisticsFromFileClick(pathToStatsFile)}
                        fullWidth
                        disabled={loading}
                        variant={'outlined'}>
                    {t('description:load_data_short')}
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Link
                    component="button"
                    variant="body2"
                    onClick={goToChooseFolder}
                >
                    {t('description:beginning')}
                </Link>
            </Grid>
        </Grid>
    );
};


export default ChooseStatsFileComponent;
