import React, {useMemo, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {Divider, TableBody, TableContainer, TableHead, TableRow, TextField,} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import {useCommonStyles} from "../../../theme/commonStyles";
import ImageIcon from '@material-ui/icons/Image';
import VideocamIcon from '@material-ui/icons/Videocam';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ShareIcon from '@material-ui/icons/Share';
import {CustomCountUp} from "../../generic/DataDisplay";
import {useTranslation} from "react-i18next";

const MessageGeneralStatistics = ({totalStats}) => {

    const {
        totalMessages,
        totalMessagesSent,
        totalImagesSent,
        totalVideosSent,
        totalFilesSent,
        totalSharesSent,
        topUsers
    } = totalStats;

    const styles = useCommonStyles();
    const {t} = useTranslation();

    const [userPattern, setUserPattern] = useState('')

    const visibleUsers = useMemo(() => userPattern ?
        topUsers.filter(({name}) => name.toLowerCase().includes(userPattern.toLowerCase())) :
        topUsers,
        [topUsers, userPattern]);


    return (
        <Grid container spacing={2}>

            <CustomCountUp label={t('general:mess_sent')}
                           value={totalMessagesSent}
                           xs={6}
                           big/>

            <CustomCountUp label={t('general:all_mess')}
                           value={totalMessages}
                           xs={6}
                           big/>

            <Grid item xs={12}/>

            <CustomCountUp tooltip={t('general:tot_img')}
                           value={totalImagesSent}
                           iconComponent={<ImageIcon color={'secondary'}/>}/>

            <CustomCountUp tooltip={t('general:tot_video')}
                           value={totalVideosSent}
                           iconComponent={<VideocamIcon color={'secondary'}/>}/>

            <CustomCountUp tooltip={t('general:tot_files')}
                           value={totalFilesSent}
                           iconComponent={<AttachFileIcon color={'secondary'}/>}/>

            <CustomCountUp tooltip={t('general:tot_shares')}
                           value={totalSharesSent}
                           iconComponent={<ShareIcon color={'secondary'}/>}/>

            <Grid item xs={12}>
                <Divider className={styles.bigDivider}/>
            </Grid>

            <TextField id="wordPattern"
                       name="wordPattern"
                       value={userPattern}
                       placeholder={'Elon'}
                       label={'Search user'}
                       onChange={e => setUserPattern(e.target.value)}
                       fullWidth
            />
            <Grid item xs={12}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    {t('general:no')}
                                </TableCell>
                                <TableCell>
                                    {t('general:name')}
                                </TableCell>
                                <TableCell>
                                    {t('general:name')}
                                </TableCell>
                                <TableCell>
                                    {t('general:all_mess')}
                                </TableCell>
                                <TableCell>
                                    {t('general:participants')}
                                </TableCell>
                                <TableCell>
                                    {t('general:activity_ratio')}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {visibleUsers.map(user => <TableRow
                                key={user.order + "_" + user.name}>
                                <TableCell>
                                    {user.order}
                                </TableCell>
                                <TableCell>
                                    {user.name}
                                </TableCell>
                                <TableCell>
                                    {user.sentMessagesCount}
                                </TableCell>
                                <TableCell>
                                    {user.allMessagesCount}
                                </TableCell>
                                <TableCell>
                                    {user.participantsCount}
                                </TableCell>
                                <TableCell>
                                    {user.activityRatio > 0 && '+'}{user.activityRatio} %
                                </TableCell>
                            </TableRow>)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

        </Grid>
    );
};

MessageGeneralStatistics.propTypes = {};

export default MessageGeneralStatistics;