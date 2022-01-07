import React from 'react';
import Grid from "@material-ui/core/Grid";
import {TableBody, TableContainer, TableHead, TableRow, Typography} from "@material-ui/core";
import {useCommonStyles} from "../../../theme/commonStyles";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import StatisticsStatusBoundary from "../StatisticsStatusBoundary";
import {useTranslation} from "react-i18next";

const TopicsComponentContainer = (props) => {

    const {
        topics = [],
        topicsStatisticsStatus
    } = props;

    const styles = useCommonStyles();
    const {t} = useTranslation();

    return (
        <StatisticsStatusBoundary statisticsStatus={topicsStatisticsStatus}>
            <Grid container spacing={5} className={styles.containerPadding}>
                <Grid item xs={12}>
                    <Typography variant={'h6'}>
                        {t('general:your_topics')}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        {t('description:topic_desc')}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        {t('general:no')}
                                    </TableCell>
                                    <TableCell>
                                        {t('general:topic')}
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
