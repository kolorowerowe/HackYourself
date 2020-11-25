import React, {useMemo, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import CountUp from "react-countup";
import {TableBody, TableContainer, TableHead, TableRow, TextField, Typography} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import {useCommonStyles} from "../../theme/commonStyles";

const WordStatistics = (props) => {

    const {
        wordStats: {
            count,
            occurrencesList
        }
    } = props;


    const [wordPattern, setWordPattern] = useState('')

    const visibleWord = useMemo(()=> {
        if (!!wordPattern){
            return occurrencesList.filter(({word}) => word.includes(wordPattern)).slice(0, 100);
        }
        return occurrencesList.slice(0, 100);

    }, [occurrencesList, wordPattern]);

    console.log(visibleWord);

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField id="wordPattern"
                           name="wordPattern"
                           value={wordPattern}
                           placeholder={'hej'}
                           label={'Poszukiwane słowo'}
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