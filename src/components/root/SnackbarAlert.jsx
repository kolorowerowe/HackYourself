import React from 'react';
import PropTypes from 'prop-types';
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const SnackbarAlert = ({snackbarMessage, setSnackbarMessage}) => {


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarMessage('');
    }

    return (
        <Snackbar open={!!snackbarMessage} autoHideDuration={3000} onClose={handleClose}>
            <Alert severity="success" variant={'filled'} onClose={handleClose}>
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