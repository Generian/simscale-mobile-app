import { AccordionActions, Button, IconButton } from "@material-ui/core"
import React from "react"
import axios from 'axios'
import api_config, { base_url } from '../api_config';
import {Run} from './RunListItem'
import StopIcon from '@material-ui/icons/Stop';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import DeleteIcon from '@material-ui/icons/Delete';

export interface RunFooterProps {
    classes: any,
    run: Run,
}

const RunFooter = (props: RunFooterProps) => {
    
    const isRunning = props.run.status == "RUNNING" || props.run.status == "QUEUED"

    const CancelRun = () => {
        axios.post(`${base_url}/projects/${props.run.projectId}/simulations/${props.run.simulationId}/runs/${props.run.runId}/cancel`, api_config)
          .then((res: any) => {
            console.log(res)
          })
    }

    let primaryButton = <Button
        variant="contained"
        color="secondary"
        size="small"
        className={props.classes.button}
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
        className={props.classes.button}
        startIcon={<PlayArrowRoundedIcon />}
        >
        Continue Run
        </Button>
    }

    let deleteButton = <IconButton aria-label="delete" disabled color="primary">
        <DeleteIcon />
    </IconButton>
    
    return (
        <AccordionActions className={props.classes.actions}>
            {deleteButton}
            {primaryButton}
        </AccordionActions>
    )
}

export default RunFooter