import React from 'react'
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionActions from '@material-ui/core/AccordionActions';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CircularProgressWithLabel from './RunProgress';
import { Breadcrumbs } from '@material-ui/core';
import './../styles/App.scss'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import StopIcon from '@material-ui/icons/Stop';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import api_config, { base_url } from '../api_config';
import axios from 'axios'
import IconButton from '@material-ui/core/IconButton';


// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
// axios.defaults.headers.common["Access-Control-Allow-Methods"] = "GET, PUT, POST, DELETE, OPTIONS";
// axios.defaults.headers.common["Content-Type"] = "application/json";


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

const RunListItem = (
    run: Run,
    classes: any,
) => {
  const r = run
  const isRunning = run.status == "RUNNING" || run.status == "QUEUED"
  const disabled: boolean = false

  const CancelRun = () => {
    axios.post(`${base_url}/projects/${r.projectId}/simulations/${r.simulationId}/runs/${r.runId}/cancel`, api_config)
      .then((res: any) => {
        console.log(res)
      })
  }

  let primaryButton = <Button
    variant="contained"
    color="secondary"
    size="small"
    className={classes.button}
    startIcon={<StopIcon />}
    onClick={CancelRun}
  >
    Cancel Run
  </Button>

  if (!isRunning) {
    primaryButton = <Button
      variant="contained"
      color="primary"
      size="small"
      disabled
      className={classes.button}
      startIcon={<PlayArrowRoundedIcon />}
    >
      Continue Run
    </Button>
  }

  let deleteButton = <IconButton aria-label="delete" disabled color="primary">
      <DeleteIcon />
    </IconButton>

  return (
    <Accordion {...disabled ? 'disabled' : ''} >
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
            <Chip size="small" label={run.simulationType.replace(/_/g, " ").toLowerCase()} className="chip"/>
          </div>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Typography color="textSecondary" className={classes.breadcrumb}>{run.projectName}</Typography>
            <Typography color="textSecondary" className={classes.breadcrumb}>{run.simulationName}</Typography>
          </Breadcrumbs>
        </div>
      </AccordionSummary>
      <AccordionDetails className={classes.details}>
        <div className={classes.column} />
        <div className={classes.column}>
          <Chip label="Barbados" onDelete={() => {}} />
        </div>
        <div className={clsx(classes.column, classes.helper)}>
          <Typography variant="caption">
            Select your destination of choice
            <br />
            <a href="#secondary-heading-and-columns" className={classes.link}>
              Learn more
            </a>
          </Typography>
        </div>
      </AccordionDetails>
      <Divider />
      <AccordionActions className={classes.actions}>
        {deleteButton}
        {primaryButton}
      </AccordionActions>
    </Accordion>
  );
};

export default RunListItem