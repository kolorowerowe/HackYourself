import React from 'react';
import Grid from "@material-ui/core/Grid";
import {TableBody, TableContainer, TableHead, TableRow, Typography} from "@material-ui/core";
import {useCommonStyles} from "../../../theme/commonStyles";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import StatisticsStatusBoundary from "../StatisticsStatusBoundary";


const TopicsComponentContainer = (props) => {

    const {
        topics = [],
        topicsStatisticsStatus
    } = props;

    const styles = useCommonStyles();

    return (
        <StatisticsStatusBoundary statisticsStatus={topicsStatisticsStatus}>
            <Grid container spacing={5} className={styles.containerPadding}>
                <Grid item xs={12}>
                    <Typography variant={'h6'}>
                        Your topics
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        A collection of topics determined by your activity on Facebook that is used to create
                        recommendations for you in different areas of Facebook such as News Feed, News and Watch
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        No.
                                    </TableCell>
                                    <TableCell>
                                        Topic
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {topics.map((topic, index) => <TableRow key={"T_" + topic}>
                                    <TableCell>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>
                                        {topic}
                                    </TableCell>
                                </TableRow>)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </StatisticsStatusBoundary>
    );
};


export default TopicsComponentContainer;
