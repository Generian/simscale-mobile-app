import { AccordionActions, Button, IconButton } from "@material-ui/core"
import React from "react"
import axios from 'axios'
import api_config, { base_url } from '../api_config';
import {Run} from './RunListItem'
import StopIcon from '@material-ui/icons/Stop';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import API_KEY from "./../api_key"
import LoadingButton from './LoadingButton'

export interface RunFooterProps {
    classes: any,
    run: Run,
}

const RunFooter = (props: RunFooterProps) => {
    
    const isRunning = props.run.status == "RUNNING" || props.run.status == "QUEUED"

    let primaryButton = <Button
        variant="contained"
        color="primary"
        disabled
        className={props.classes.button}
        startIcon={<PlayArrowRoundedIcon />}
        >
        Continue Run
    </Button>

    if (isRunning) {
        primaryButton = <LoadingButton run={props.run}/>
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