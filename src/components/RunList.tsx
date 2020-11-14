import React from 'react'
import {useSelector} from 'react-redux'
import {RootState} from '../reducers';
import {Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import RunListItem from './RunListItem'

export interface Run { 
  runId: string; 
  runName: string; 
  runCreatedAt: any; 
  runStartedAt: any; 
  runFinishedAt: any; 
  duration: any; 
  computeResource: any; 
  status: string; 
  progress: number; 
  simulationId: string; 
  simulationName: string;
  simulationType: string;
  projectId: string; 
  projectName: string; 
}

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
      'max-width': '30vw',
      'font-size': 'smaller',
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap',
    },
    runProgress: {
      'margin-right': '16px',
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
          classes, 
          run.runName, 
          run.simulationName, 
          run.projectName, 
          run.runId,
          run.progress,
          run.simulationType,
        )
      })}
    </div>
  );
};

export default RunList