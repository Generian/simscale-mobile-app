import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Run } from './RunListItem';
import './../styles/App.scss'

const addLeadingZero = (i: number) => {
    let s = ""
    if (i < 10) {
        s = "0" + i
    } else {
        s = String(i)
    }
    return s
}
  
const printClockTime = (t: string) => {
    const time = new Date(t)
    const h = time.getHours();
    const m = time.getMinutes();
    // add a zero in front of numbers < 10
    const m_string = addLeadingZero(m);
    
    return h + ":" + m_string + (h < 12 ? " AM" : " PM")
}

const timeDifference = (previous: any, current: any = Date.now()) => {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    previous = Date.parse(previous)

    var elapsed = current - previous;

    if (elapsed < msPerDay ) {
        return printClockTime(previous)  
    }

    // if (elapsed < msPerMinute) {
    //     const num = Math.round(elapsed/1000)
    //     return num + ` sec${num == 1 ? '' : 's'} ago`;   
    // }

    // else if (elapsed < msPerHour) {
    //     const num = Math.round(elapsed/msPerMinute) 
    //     return num + ` min${num == 1 ? '' : 's'} ago`;   
    // }

    // else if (elapsed < msPerDay ) {
    //     const num = Math.round(elapsed/msPerHour)
    //     return num + ` hr${num == 1 ? '' : 's'} ago`;   
    // }

    else if (elapsed < msPerMonth) {
        const num = Math.round(elapsed/msPerDay)
        return num + ` day${num == 1 ? '' : 's'} ago`;   
    }

    else if (elapsed < msPerYear) {
        const num = Math.round(elapsed/msPerMonth)
        return num + ` month${num == 1 ? '' : 's'} ago`;   
    }

    else {
        const num = Math.round(elapsed/msPerYear)
        return num + `year${num == 1 ? '' : 's'} ago`;   
    }
}

export interface RunTimelineProps {
    run: Run
}

const RunTimeline = (props: RunTimelineProps) => {
    const isStarted = !!props.run.runStartedAt
    const isFinished = !!props.run.runFinishedAt

    let startedDotStyling = "dotSuccess"
    let finishedDotStyling = "dotSuccess"

    let createdLineStyling = "lineSuccess"
    let startedLineStyling = "lineSuccess"

    let startedTimeLabel = timeDifference(props.run.runStartedAt)
    let finishedTimeLabel = timeDifference(props.run.runFinishedAt)
    let finishedLabel = "Finished"
    
    if (isStarted) {
        if (isFinished) {
            switch (props.run.status) {
                case "ERROR":
                    startedLineStyling = "lineError"
                    finishedDotStyling = "dotError"
                    finishedLabel = "Error"
                    break;
                case "CANCELED":
                    startedLineStyling = "lineCanceled"
                    finishedDotStyling = "dotCanceled"
                    finishedLabel = "Canceled"
                    break;
                default:
                    break;
            }
        } else {
            startedLineStyling = "lineRunning"
            finishedDotStyling = "dotRunning"
            finishedTimeLabel = Math.round(props.run.progress * 100) + "%"
        }
    } else {
        createdLineStyling = "lineRunning"
        startedDotStyling = "dotRunning"
        startedLineStyling = "linePending"
        finishedDotStyling = "dotPending"
        startedTimeLabel = ""
        finishedTimeLabel = ""
    }

    return (
        <div className="timeline">
            {/* Created */}
            <Typography color="textSecondary" className="createdTime time">
                {timeDifference(props.run.runCreatedAt)}
            </Typography>
            <div className="dot createdNode dotSuccess"></div>
            <Typography className="createdLabel">Created</Typography>
            <div className={`line createdLine ${createdLineStyling}`}></div>

            {/* Started */}
            <Typography className="startedLabel">Started</Typography>
            <div className={`dot startedNode ${startedDotStyling}`}></div>
            <Typography color="textSecondary" className="startedTime time">
                {startedTimeLabel}
            </Typography>
            <div className={`line startedLine ${startedLineStyling}`}></div>

            {/* Finished */}
            <Typography color="textSecondary" className="finishedTime time">
                {finishedTimeLabel}
            </Typography>
            <div className={`dot finishedNode ${finishedDotStyling}`}></div>
            <Typography className="finishedLabel">{finishedLabel}</Typography>
        </div>
    );
  }

// const RunTimeline = (props: TimelineOppositeContentProps & { run: Run}) => {
//   return (
//     <div className="timelineContainer">
//         <React.Fragment>
//         <Timeline align="alternate">
//             <TimelineItem>
//             <TimelineOppositeContent>
//                 <Typography color="textSecondary">{timeDifference(props.run.runCreatedAt)}</Typography>
//             </TimelineOppositeContent>
//             <TimelineSeparator>
//                 <TimelineDot />
//                 <TimelineConnector />
//             </TimelineSeparator>
//             <TimelineContent>
//                 <Typography>Created</Typography>
//             </TimelineContent>
//             </TimelineItem>
//             <TimelineItem>
//             <TimelineOppositeContent>
//                 <Typography color="textSecondary">{timeDifference(props.run.runStartedAt)}</Typography>
//             </TimelineOppositeContent>
//             <TimelineSeparator>
//                 <TimelineDot />
//                 <TimelineConnector />
//             </TimelineSeparator>
//             <TimelineContent>
//                 <Typography>Started</Typography>
//             </TimelineContent>
//             </TimelineItem>
//             <TimelineItem>
//             <TimelineOppositeContent>
//                 <Typography color="textSecondary">{timeDifference(props.run.runFinishedAt)}</Typography>
//             </TimelineOppositeContent>
//             <TimelineSeparator>
//                 <TimelineDot />
//                 <TimelineConnector />
//             </TimelineSeparator>
//             <TimelineContent>
//                 <Typography>Finished</Typography>
//             </TimelineContent>
//             </TimelineItem>
//         </Timeline>
//         </React.Fragment>
//     </div>
//   );
// }

export default RunTimeline