import React, {useMemo, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import CountUp from "react-countup";
import {TableBody, TableContainer, TableHead, TableRow, TextField, Typography} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import {useCommonStyles} from "../../theme/commonStyles";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { replaceRetarded, enretardize } from '../../algorithms/encoding';

const WordStatistics = (props) => {
    const NoFilter = "All recipients";

    const {
        wordStats: {
            count,
            occurrencesList = [],
        } = {},
        wordStatsPerRecipient
    } = props;

    const [recipient, setRecipient] = useState(NoFilter);
    let recipients = wordStatsPerRecipient ? replaceRetarded([... new Set(Object.keys(wordStatsPerRecipient))]) : [];

    const [wordPattern, setWordPattern] = useState('')

    const visibleWord = useMemo(()=> {
        const occList = recipient === NoFilter ? occurrencesList : wordStatsPerRecipient[enretardize(recipient)].occurrencesList;
        if (!!wordPattern){
            return occList.filter(({word}) => word.includes(wordPattern)).slice(0, 100);
        }
        return occList.slice(0, 100);

    }, [occurrencesList, wordPattern, recipient]);


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Select
                labelId="select-recipient-word"
                id="select-recipient-word"
                value={recipient}
                onChange={e => setRecipient(e.target.value)}
                >
                (<MenuItem value={NoFilter}>{NoFilter}</MenuItem>)
                {recipients.map(r => 
                (<MenuItem value={r}>{r}</MenuItem>)
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
                            <TableCell>
                                No.
                            </TableCell>
                            <TableCell>
                                Word
                            </TableCell>
                            <TableCell>
                                Occurrences
                            </TableCell>
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

WordStatistics.propTypes = {

};

export default WordStatistics;