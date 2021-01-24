import React from 'react';
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types'
import {useCommonStyles} from "../../theme/commonStyles";

const CustomLinearProgress = props => {

    const {loading, label} = props;

    const styles = useCommonStyles();

    return (
        loading ? <Box className={styles.oneUnderAnother}>
            <Typography variant="body2" color="textSecondary" style={{marginBottom: 5}}>
                {label}
            </Typography>
            <Box width="100%">
                <LinearProgress/>
            </Box>
        </Box> : null);
};

CustomLinearProgress.propTypes = {
    loading: PropTypes.bool,
    label: PropTypes.string
};

export default CustomLinearProgress;