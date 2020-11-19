import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent, {TimelineOppositeContentProps} from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';
import { Run } from './RunListItem';
import './../styles/App.scss'

const timeDifference = (previous: any, current: any = Date.now()) => {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    previous = Date.parse(previous)

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        const num = Math.round(elapsed/1000)
        return num + ` sec${num == 1 ? '' : 's'} ago`;   
    }

    else if (elapsed < msPerHour) {
        const num = Math.round(elapsed/msPerMinute) 
        return num + ` min${num == 1 ? '' : 's'} ago`;   
    }

    else if (elapsed < msPerDay ) {
        const num = Math.round(elapsed/msPerHour)
        return num + ` hr${num == 1 ? '' : 's'} ago`;   
    }

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

const RunTimeline = (props: TimelineOppositeContentProps & { run: Run}) => {
  return (
    <div className="timelineContainer">
        <React.Fragment>
        <Timeline align="alternate">
            <TimelineItem>
            <TimelineOppositeContent>
                <Typography color="textSecondary">{timeDifference(props.run.runCreatedAt)}</Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
                <Typography>Created</Typography>
            </TimelineContent>
            </TimelineItem>
            <TimelineItem>
            <TimelineOppositeContent>
                <Typography color="textSecondary">{timeDifference(props.run.runStartedAt)}</Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
                <Typography>Started</Typography>
            </TimelineContent>
            </TimelineItem>
            <TimelineItem>
            <TimelineOppositeContent>
                <Typography color="textSecondary">{timeDifference(props.run.runFinishedAt)}</Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
                <Typography>Finished</Typography>
            </TimelineContent>
            </TimelineItem>
        </Timeline>
        </React.Fragment>
    </div>
  );
}

export default RunTimeline