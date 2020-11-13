import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
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
import CircularProgress from '@material-ui/core/CircularProgress';



const RunListItem = (
    classes: any,
    runName: string = '',
    simulationName: string = '',
    projectName: string = '',
    runId: string,
    disabled: boolean = false,

) => {
  return (
    <Accordion {...disabled ? 'disabled' : ''} >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id={runId}
      >
        <CircularProgress variant="static" value={73}/>
        <Typography className={classes.heading}>{runName}</Typography>
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