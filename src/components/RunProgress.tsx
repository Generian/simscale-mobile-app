import React from 'react';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PriorityHighRoundedIcon from '@material-ui/icons/PriorityHighRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import './../styles/App.scss'



export default function CircularProgressWithLabel(props: CircularProgressProps & { value: number, status?: string}) {

  let indicator = <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
      props.value,
    )}%`}</Typography>
  
  let color = ""

  switch (props.status) {
    case "FINISHED":
      indicator = <CheckRoundedIcon />
      color = "finished"
      break
    case "CANCELED":
      indicator = <PriorityHighRoundedIcon />
      color = "cancelled"
      break
    case "ERROR":
      indicator = <CloseRoundedIcon />
      color = "error"
      break
  }

  return (
    <Box position="relative" display="inline-flex" className={color}>
      <CircularProgress variant="static" {...props}/>
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {indicator}
      </Box>
    </Box>
  );
}
