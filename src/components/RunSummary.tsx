import { Typography, Chip } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import {Run} from './RunListItem'
import {parse, toSeconds} from 'iso8601-duration'

export interface RunSummaryProps {
    run: Run
}

const createDurationString = (secs: number) => {
    const hours = Math.floor(secs/3600)
    const minutes = Math.floor((secs - (hours * 3600))/60)
    const seconds = Math.floor(secs - (hours * 3600) - (minutes * 60))
    const duration_string = `${hours != 0 ? hours + " h " : ""}${minutes != 0 ? minutes + " min " : ""}${seconds != 0 ? seconds + " sec " : ""}`

    return duration_string
}

const RunSummary = (props: RunSummaryProps) => {

    const DURATION_FROM_SERVER: number = toSeconds(parse(props.run.duration))

    const [duration, setDuration] = useState<number>(DURATION_FROM_SERVER)

    const isRunning = props.run.status == "RUNNING" || props.run.status == "QUEUED"

    useEffect(() => {
        const interval = setInterval(() => {
            if (isRunning) {
                setDuration((d) => {
                    return d + 1
                })
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const consumption = props.run.computeResource.value.toFixed(1).toString()
    const consumptionLabel = props.run.computeResource.type == "CPU_HOURS" ? "CPUh" : "GPUh"

    return (
        <div className="summaryContainer">
            <Typography variant="caption">
                <Chip size="small" label={props.run.status.toLowerCase()} className={`chip ${props.run.status}`}/><br/>
                <span className="title">Simulation name</span><br/>
                <p className="item">{props.run.simulationName}</p>
                <span className="title">Project name</span><br/>
                <p className="item">{props.run.projectName}</p>
                <span className="title">Duration</span><br/>
                <p className="item">{createDurationString(duration)}</p>
                <span className="title">Core hour consumption</span><br/>
                <p className="item">{consumption + " " + consumptionLabel}</p>
            </Typography>
        </div>
    )
}

export default RunSummary