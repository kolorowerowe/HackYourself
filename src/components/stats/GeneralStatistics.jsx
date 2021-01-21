import React, {useMemo, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import CountUp from "react-countup";
import {
    Divider,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    useTheme
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import {useCommonStyles} from "../../theme/commonStyles";
import ImageIcon from '@material-ui/icons/Image';
import VideocamIcon from '@material-ui/icons/Videocam';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ShareIcon from '@material-ui/icons/Share';

import Tooltip from "@material-ui/core/Tooltip";

const GeneralStatistics = ({totalStats}) => {

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
    const theme = useTheme();

    const [userPattern, setUserPattern] = useState('')

    const visibleUsers = useMemo(() => userPattern ?
        topUsers.filter(({name}) => name.toLowerCase().includes(userPattern.toLowerCase())) :
        topUsers,
        [topUsers, userPattern]);

    const BigCountUp = ({value, label,}) => (
        <Grid item xs={6}>
            <div className={styles.oneUnderAnother}>
                <CountUp end={value} className={styles.countUp}/>
                <Typography variant={'h5'} align={'center'} color={'secondary'}>
                    {label}
                </Typography>
            </div>
        </Grid>
    );

    const SmallCountUp = ({value, label, iconComponent}) => (
        <Grid item xs={3}>
            <div className={styles.oneUnderAnother}>
                <Tooltip title={label}>
                    <div className={styles.flexAligned}>
                        {iconComponent}
                        <CountUp end={value} className={styles.countUpSmall}/>
                    </div>
                </Tooltip>
            </div>
        </Grid>
    );

    return (
        <Grid container spacing={2}>

            <BigCountUp label={'Messages sent by you'}
                        value={totalMessagesSent}/>

            <BigCountUp label={'All messages'}
                        value={totalMessages}/>

            <Grid item xs={12}/>

            <SmallCountUp label={'Total images sent'}
                          value={totalImagesSent}
                          iconComponent={<ImageIcon color={'secondary'}/>}/>

            <SmallCountUp label={'Total videos sent'}
                          value={totalVideosSent}
                          iconComponent={<VideocamIcon color={'secondary'}/>}/>

            <SmallCountUp label={'Total files sent'}
                          value={totalFilesSent}
                          iconComponent={<AttachFileIcon color={'secondary'}/>}/>

            <SmallCountUp label={'Total shares sent'}
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
                                    No.
                                </TableCell>
                                <TableCell>
                                    Name
                                </TableCell>
                                <TableCell>
                                    Messages Sent
                                </TableCell>
                                <TableCell>
                                    All messages
                                </TableCell>
                                <TableCell>
                                    Participants
                                </TableCell>
                                <TableCell>
                                    Activity ratio
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

GeneralStatistics.propTypes = {};

export default GeneralStatistics;