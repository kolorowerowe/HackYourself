import {makeStyles} from "@material-ui/core/styles";

export const useCommonStyles = makeStyles((theme) => ({
    nextToEachOther: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    oneUnderAnother: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    countUp: {
        fontSize: 40,
        display: 'flex',
        justifyContent: 'center',
    },
    containerPadding: {
        padding: theme.spacing(2)
    },
    instructionStep: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 30,
        paddingLeft: 20
    },
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    bigDivider: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
    }
}));