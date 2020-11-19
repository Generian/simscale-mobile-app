import { Typography, Chip } from "@material-ui/core"
import React from "react"
import {Run} from './RunListItem'

export interface RunSummaryProps {
    run: Run
}

const RunSummary = (props: RunSummaryProps) => {

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
                <p className="item">{props.run.duration}</p>
                <span className="title">Core hour consumption</span><br/>
                <p className="item">{consumption + " " + consumptionLabel}</p>
            </Typography>
        </div>
    )
}

export default RunSummary