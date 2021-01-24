import React from 'react';
import {TableBody, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

const InspectionDataResult = props => {


    const {results = [], handleEnableStatisticsChange} = props;

    return (
        <div>
            <TableContainer>
                <Table size={'small'}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Statistics
                            </TableCell>
                            <TableCell align={'center'}>
                                Is available
                            </TableCell>
                            <TableCell align={'center'}>
                                Analyze data
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.map(result => <SingleStatsResult key={result.type}
                                                                  {...result}
                                                                  handleEnableStatisticsChange={handleEnableStatisticsChange}/>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

const SingleStatsResult = ({type, name, available, enabled, handleEnableStatisticsChange}) => {

    return <TableRow>
        <TableCell>
            {name}
        </TableCell>
        <TableCell align={'center'}>
            {available ? <DoneIcon/> : <ClearIcon/>}
        </TableCell>
        <TableCell align={'center'}>
            <Checkbox
                checked={available ? enabled : false}
                disabled={!available}
                onChange={e => handleEnableStatisticsChange(type, e.target.checked)}
            />
        </TableCell>
    </TableRow>
}

InspectionDataResult.propTypes = {};

export default InspectionDataResult;