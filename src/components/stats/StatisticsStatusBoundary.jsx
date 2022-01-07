import React from 'react';
import PropTypes from 'prop-types';
import {STATS_MISSING, STATS_NOT_READY, STATS_OK} from "../root/constans";
import Alert from "@material-ui/lab/Alert";
import {useCommonStyles} from "../../theme/commonStyles";
import {useTranslation} from "react-i18next";

const StatisticsStatusBoundary = props => {

    const {statisticsStatus, children} = props;
    const {t} = useTranslation();

    const styles = useCommonStyles();

    switch (statisticsStatus) {
        case STATS_NOT_READY:
            return <div className={styles.containerPadding}>
                <Alert severity={'warning'} variant={'filled'}>
                    {t('general:stats_no_loaded')}
                </Alert>
            </div>;
        case STATS_MISSING:
            return <div className={styles.containerPadding}>
                <Alert severity={'warning'} variant={'filled'}>
                    {t('general:stats_missing')}
                </Alert>
            </div>;
        case STATS_OK:
            return children;
        default:
            return null;
    }

};

StatisticsStatusBoundary.propTypes = {
    statisticsStatus: PropTypes.oneOf(['STATS_NOT_READY', 'STATS_MISSING', 'STATS_OK']).isRequired,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]).isRequired,
};

export default StatisticsStatusBoundary;