import React from 'react';
import {AppBar, Toolbar, Button, Typography} from '@material-ui/core';
import { createBrowserHistory } from "history";
import { observer } from "mobx-react";

export const history = createBrowserHistory();


function NavigationBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{flexGrow:1}}>
          PeachTree Bank
        </Typography>
          <div>
            <Button style={{color:"white"}} href="/">
              Transactions
            </Button>
            <Button style={{color:"white"}} href="/accounts">
              Accounts
            </Button>
            <Button style={{color:"white"}} href="/contractors">
              Contractors
            </Button>
          </div>
      </Toolbar>
    </AppBar>
  );
}

export default observer(NavigationBar);
