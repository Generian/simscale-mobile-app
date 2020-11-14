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



const RunListItem = (
    classes: any,
    runName: string = '',
    simulationName: string = '',
    projectName: string = '',
    runId: string,
    progress: number,
    simulationType: string,
    disabled: boolean = false,
) => {
  return (
    <Accordion {...disabled ? 'disabled' : ''} >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id={runId}
      >
        <div className={classes.runProgress}>
          <CircularProgressWithLabel value={progress*100}/>
        </div>
        <div className="stacked">
          <div className="inline">
            <Typography className={classes.heading}>{runName}</Typography>
            <Chip size="small" label={simulationType.replace(/_/g, " ").toLowerCase()} className="chip"/>
          </div>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Typography color="textSecondary" className={classes.breadcrumb}>{projectName}</Typography>
            <Typography color="textSecondary" className={classes.breadcrumb}>{simulationName}</Typography>
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
      <AccordionActions>
        <Button size="small">Cancel</Button>
        <Button size="small" color="primary">
          Save
        </Button>
      </AccordionActions>
    </Accordion>
  );
};

export default RunListItem