import { Typography } from "@material-ui/core"
import React from "react"
import {Run} from './RunListItem'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export interface BreadcrumbsProps {
    run: Run,
  }

const Breadcrumbs = (props: BreadcrumbsProps) => {
    return (
        <div className="breadcrumbs">
            <Typography color="textSecondary">{props.run.projectName}</Typography>
            <NavigateNextIcon fontSize="small" />
            <Typography color="textSecondary">{props.run.simulationName}</Typography>
        </div>
    )
}

export default Breadcrumbs