import React from 'react';
import Grid from "@material-ui/core/Grid";
import CountUp from "react-countup";
import {Divider, TableBody, TableContainer, TableHead, TableRow, Typography} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import { useCommonStyles } from "../../theme/commonStyles";

const GeneralStatistics = ({totalStats}) => {

    const {
        totalMessages,
        totalMessagesSent,
        topUsers
    } = totalStats;

    const styles = useCommonStyles();


    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <div className={styles.oneUnderAnother}>
                    <CountUp end={totalMessagesSent} className={styles.countUp} />
                    <Typography variant={'h5'} align={'center'}>
                        Messages sent by you
                    </Typography>
                </div>

                <Divider className={styles.bigDivider}/>

                <div className={styles.oneUnderAnother}>
                    <CountUp end={totalMessages} className={styles.countUp} />
                    <Typography variant={'h5'} align={'center'}>
                        All messages
                    </Typography>
                </div>
            </Grid>

            <Grid item xs={8}>
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {topUsers.map((user, index) => <TableRow key={user.name}>
                                <TableCell>
                                    {index + 1}
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
                            </TableRow>)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

        </Grid>
    );
};

GeneralStatistics.propTypes = {

};

export default GeneralStatistics;