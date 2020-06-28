import React, {useState} from 'react';
import {Paper, Tabs, Tab} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import LoginForm from '../components/AuthForms/LoginForm';
import RegisterForm from '../components/AuthForms/RegisterForm';

const useStyles = makeStyles(() => ({
  root: {
    margin:"10% auto",
    maxWidth: "500px",
    padding: "20px"
  },
}));


function Auth() {
  const [tabPosition, setTabPosition] = useState(0)
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Tabs
        value={tabPosition}
        onChange={(event, newValue) => setTabPosition(newValue)}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab label="Log in" />
        <Tab label="Register"/>
      </Tabs>
      {tabPosition === 0 ? <LoginForm/> : <RegisterForm/>}
    </Paper>
  );
}

export default Auth;
