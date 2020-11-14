import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import './../styles/App.scss'
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

export default function LinearIndeterminate() {
  const classes = useStyles();
  const loading: boolean = useSelector((state: RootState) => state.loading);

  const showLoadingBar = loading ? '' : 'hidden'

  const aggregatedClassNames = classNames(
    classes.root,
    showLoadingBar,
  )

  return (
    
    <div className={aggregatedClassNames}>
      <LinearProgress color="secondary" />
    </div>
  );
}