import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      position: "relative",
      right: "-12px",
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
  }),
);

export default function FallbackAvatars() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar alt="Sebastian Günther" src="https://www.simscale.com/forum/user_avatar/www.simscale.com/pi3141/120/35383_2.png" className={classes.orange} />
    </div>
  );
}
