import React from 'react';
import PropTypes from 'prop-types';
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const SnackbarAlert = ({snackbarMessage, snackbarSeverity, setSnackbarMessage}) => {


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarMessage('');
    }

    return (
        <Snackbar open={!!snackbarMessage} onClose={handleClose}>
            <Alert severity={snackbarSeverity} variant={'filled'} onClose={handleClose}>
                {snackbarMessage}
            </Alert>
        </Snackbar>
    );
};

SnackbarAlert.propTypes = {
    snackbarMessage: PropTypes.string,
    setSnackbarMessage: PropTypes.func
};

export default SnackbarAlert;