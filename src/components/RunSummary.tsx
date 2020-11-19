import { Typography, Chip } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import {Run} from './RunListItem'
import {parse, end, toSeconds, pattern} from 'iso8601-duration'

export interface RunSummaryProps {
    run: Run
}

const RunSummary = (props: RunSummaryProps) => {

    const [duration, setDuration] = useState(toSeconds(parse(props.run.duration)))

    const isRunning = props.run.status == "RUNNING" || props.run.status == "QUEUED"

    useEffect(() => {
        const interval = setInterval(() => {
            if (isRunning) {
                console.log('Updating duration')
                setDuration(duration + 1)
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const consumption = props.run.computeResource.value.toFixed(1).toString()
    const consumptionLabel = props.run.computeResource.type == "CPU_HOURS" ? "CPUh" : "GPUh"

    // Create duration string
    const hours = Math.floor(duration/3600)
    const minutes = Math.floor((duration - (hours * 3600))/60)
    const seconds = Math.floor(duration - (hours * 3600) - (minutes * 60))
    const duration_string = `${hours != 0 ? hours + " h " : ""}${minutes != 0 ? minutes + " min " : ""}${seconds != 0 ? seconds + " sec " : ""}`

    return (
        <div className="summaryContainer">
            <Typography variant="caption">
                <Chip size="small" label={props.run.status.toLowerCase()} className={`chip ${props.run.status}`}/><br/>
                <span className="title">Simulation name</span><br/>
                <p className="item">{props.run.simulationName}</p>
                <span className="title">Project name</span><br/>
                <p className="item">{props.run.projectName}</p>
                <span className="title">Duration</span><br/>
                <p className="item">{duration_string}</p>
                <span className="title">Core hour consumption</span><br/>
                <p className="item">{consumption + " " + consumptionLabel}</p>
            </Typography>
        </div>
    )
}

export default RunSummary