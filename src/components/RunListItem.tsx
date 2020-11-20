import React, { useEffect } from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionActions from '@material-ui/core/AccordionActions';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import CircularProgressWithLabel from './RunProgress';
import Breadcrumbs from './Breadcrumbs';
import './../styles/App.scss'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import RunTimeline from './Timeline'
import ChartContainer from './ChartContainer'
import RunFooter from './RunFooter'
import RunSummary from './RunSummary'
import LinearBuffer from './ProgressVertical';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import api_config, { base_url } from './../api_config'
import { UPDATE_RUNS } from '../reducers/getRunsSlice';
import { RootState } from '../reducers';

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
  plots: any[];
}

const RunListItem = (
    run: Run,
    classes: any,
) => {
  let charts = null
  if (run.plots.length > 0) {
    charts = <ChartContainer plots={run.plots}/>
  }

  return (
    <Accordion key={run.runId}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id={run.runId}
      >
        <div className={classes.runProgress}>
          <CircularProgressWithLabel value={run.progress*100} status={run.status}/>
        </div>
        <div className="stacked">
          <div className="inline">
            <Typography className={classes.heading}>{run.runName}</Typography>
            <Chip size="small" label={run.simulationType.replace(/_/g, " ").toLowerCase()} className="chipHeader"/>
          </div>
          <Breadcrumbs run={run}/>
        </div>
      </AccordionSummary>
      <AccordionDetails className={classes.details}>
        <div className="detailsContainer">
          <RunTimeline run={run}/>
          <RunSummary run={run}/>
          {charts}
          <LinearBuffer />
        </div>
      </AccordionDetails>
      <Divider />
      <RunFooter classes={classes} run={run}/>
    </Accordion>
  )
}

export default RunListItem