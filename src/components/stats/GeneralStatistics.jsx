import React, {useMemo, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import CountUp from "react-countup";
import {Divider, TableBody, TableContainer, TableHead, TableRow, TextField, Typography} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import {useCommonStyles} from "../../theme/commonStyles";

const GeneralStatistics = ({totalStats}) => {

    const {
        totalMessages,
        totalMessagesSent,
        topUsers
    } = totalStats;

    const styles = useCommonStyles();

    const [userPattern, setUserPattern] = useState('')

    const visibleUsers = useMemo(() => userPattern ?
        topUsers.filter(({name}) => name.toLowerCase().includes(userPattern.toLowerCase())) :
        topUsers,
        [topUsers, userPattern])

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <div className={styles.oneUnderAnother}>
                    <CountUp end={totalMessagesSent} className={styles.countUp}/>
                    <Typography variant={'h5'} align={'center'}>
                        Messages sent by you
                    </Typography>
                </div>
            </Grid>
            <Grid item xs={6}>
                <div className={styles.oneUnderAnother}>
                    <CountUp end={totalMessages} className={styles.countUp}/>
                    <Typography variant={'h5'} align={'center'}>
                        All messages
                    </Typography>
                </div>
            </Grid>

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