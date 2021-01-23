import React, {useMemo, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {TableBody, TableContainer, TableHead, TableRow, TextField} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {unfixEncoding} from '../../../algorithms/encoding';
import {NO_FILTER} from "../../root/constans";

const WordStatistics = (props) => {

    const {
        wordStats: {
            occurrencesList = [],
        } = {},
        wordStatsPerRecipient,
        recipients,
        recipientFilter,
        setRecipientFilter
    } = props;

    const [wordPattern, setWordPattern] = useState('')

    const visibleWord = useMemo(() => {
        const occList = recipientFilter === NO_FILTER ? occurrencesList : wordStatsPerRecipient[unfixEncoding(recipientFilter)].occurrencesList;
        if (!!wordPattern) {
            return occList.filter(({word}) => word.includes(wordPattern)).slice(0, 100);
        }
        return occList.slice(0, 100);

    }, [occurrencesList, wordPattern, recipientFilter, wordStatsPerRecipient]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Select
                    labelId="select-recipient-word"
                    id="select-recipient-word"
                    value={recipientFilter}
                    onChange={e => setRecipientFilter(e.target.value)}
                >
                    (<MenuItem value={NO_FILTER}>{NO_FILTER}</MenuItem>)
                    {recipients.map(r =>
                        (<MenuItem value={r}
                                   key={`REC-${r}`}>{r}</MenuItem>)
                    )}
                </Select>
            </Grid>
            <Grid item xs={6}>
                <TextField id="wordPattern"
                           name="wordPattern"
                           value={wordPattern}
                           placeholder={'hi'}
                           label={'Word to search'}
                           onChange={e => setWordPattern(e.target.value)}
                           fullWidth
                />
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    No.
                                </TableCell>
                                <TableCell>
                                    Word
                                </TableCell>
                                <TableCell>
                                    Occurrences
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {visibleWord.map(occurrence => <TableRow key={occurrence.word}>
                                <TableCell>
                                    {occurrence.order}
                                </TableCell>
                                <TableCell>
                                    {occurrence.word}
                                </TableCell>
                                <TableCell>
                                    {occurrence.value}
                                </TableCell>
                            </TableRow>)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
};

WordStatistics.propTypes = {};

export default WordStatistics;