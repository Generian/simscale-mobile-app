import React from 'react'
import {useSelector} from 'react-redux'
import {RootState} from '../reducers';
import {Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import RunListItem, { Run } from './RunListItem'



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      "font-weight": 500,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20,
    },
    details: {
      alignItems: 'center',
    },
    column: {
      flexBasis: '33.33%',
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2),
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    breadcrumb : {
      'max-width': '28vw',
      'font-size': 'x-small',
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap',
    },
    runProgress: {
      'margin-right': '16px',
    },
    actions: {
      'justify-content': 'space-between',
      'padding-right': '16px',
    },
  }),
);

export const RunList = () => {
  // Fetch runs from state
  const runs: Run[] = useSelector((state: RootState) => state.runs);

  // Define style classes
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {runs.map((run: Run) => {
        return RunListItem(
          run,
          classes
        )
      })}
    </div>
  );
};

export default RunList