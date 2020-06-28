import React from 'react';
import { Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';




export default function TitledBox({title, padded, children, ...rest}) {
  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        marginBottom: '20px',
      },
      '& h4':{
        backgroundColor:'#ddd',
        padding: '10px'
      },
      '& .MuiBox-root': {
        padding: padded ? '0px 10px 10px 10px': "0"
      }
    },
  }));

  const classes = useStyles();

  return (
    <Paper className={classes.root} {...rest}>
      <h4>{title}</h4>
      <Box className={classes.root.paddedBox}>
        {children}
      </Box>

    </Paper>
  );
}

