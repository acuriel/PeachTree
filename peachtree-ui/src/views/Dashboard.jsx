import React, {useEffect, useContext} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Grid} from '@material-ui/core';
import AddTransaction from './AddTransaction';
import TransactionHistory from './TransactionHistory';
import TransactionDetails from './TransactionDetails';
import AccountsList from './AccountsList';
import AccountDetails from './AccountDetails';
import ContractorsList from './ContractorsList';
import ContractorDetails from './ContractorDetails';
import { observer } from "mobx-react";
import StoreContext from "../stores/RootStore";

import { makeStyles } from '@material-ui/core/styles';
import Background from '../static/images/bg.jpg'


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${Background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    width: "100%",
    height: "100%",
    position: "absolute",
    '& > .MuiGrid-item':{
      padding: "20px",
    }
  },
}));


function Dashboard() {
  const classes = useStyles();
  const {dashboardStore} = useContext(StoreContext);

  useEffect(() => {
    dashboardStore.reloadData();
  }, [dashboardStore])

  return (
    <Grid container alignContent='space-around' className={classes.root}>
      <Grid item md={4} sm={12} >
        <AddTransaction/>
      </Grid>
      <Grid item md={8} sm={12}>
        <Switch>
          <Route path="/transactions/:id" component={TransactionDetails}/>
          <Route path="/accounts/:id" component={AccountDetails}/>
          <Route path="/accounts" exact component={AccountsList}/>
          <Route path="/contractors/:id" component={ContractorDetails}/>
          <Route path="/contractors" exact component={ContractorsList}/>
          <Route path="" component={TransactionHistory}/>
        </Switch>
      </Grid>
    </Grid>
  );
}

export default observer(Dashboard);
