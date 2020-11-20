import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import API_KEY from "./../api_key"
import api_config, { base_url } from '../api_config';
import {Run} from './RunListItem'
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import StopIcon from '@material-ui/icons/Stop';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    buttonSuccess: {
    },
    fabProgress: {
      color: green[500],
      position: 'absolute',
      top: -6,
      left: -6,
      zIndex: 1,
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  }),
);

export interface LoadingButtonProps {
    run: Run
}

const LoadingButton = (props:LoadingButtonProps) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [label, setLabel] = React.useState("Cancel Run");
  const [canceled, setCanceled] = React.useState(false);
  const timer = React.useRef<number>();

  const CancelRun = () => {
    setSuccess(false)
    setLoading(true)
    fetch(`${base_url}/projects/${props.run.projectId}/simulations/${props.run.simulationId}/runs/${props.run.runId}/cancel`, {headers: {'X-API-KEY': API_KEY}, method: 'POST'})
        .then((res: any) => {
            setSuccess(true)
            setLoading(false)
            setLabel("Continue Run")
            setCanceled(true)
        })
        .catch((err:any) => {
            console.log(err)
            setSuccess(false)
            setLoading(false)
        })
    }

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
        CancelRun()
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button
            variant="contained"
            color="secondary"
            className={buttonClassname}
            disabled={loading || canceled}
            onClick={handleButtonClick}
            startIcon={canceled ? <PlayArrowRoundedIcon /> : <StopIcon />}
        >
            {label}
        </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </div>
  );
}

export default LoadingButton