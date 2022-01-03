import Box from "@material-ui/core/Box";
import React from "react";

export const  TabPanel = (tabPanelProps)  => {
    const {children, value, index, ...other} = tabPanelProps;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}