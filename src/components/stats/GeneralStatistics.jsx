import React from 'react';
import Grid from "@material-ui/core/Grid";
import CountUp from "react-countup";
import { TableBody, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import { useCommonStyles } from "../../theme/commonStyles";

const GeneralStatistics = (props) => {

    const {
        totalMessages,
        topUsers
    } = props;

    const styles = useCommonStyles();


    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <div className={styles.oneUnderAnother}>
                    <CountUp end={totalMessages} className={styles.countUp} />
                    <Typography variant={'h5'} align={'center'}>
                        All messages
                    </Typography>
                </div>
            </Grid>

            <Grid item xs={6}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableCell>
                                No.
                            </TableCell>
                            <TableCell>
                                Name
                            </TableCell>
                            <TableCell>
                                Messages Count
                            </TableCell>
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
                                    {user.messagesCount}
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