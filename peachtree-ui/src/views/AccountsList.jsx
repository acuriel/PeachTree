import React, {useContext, useState, useEffect} from 'react';
import { observer } from "mobx-react";
import StoreContext from "../stores/RootStore";
import { useHistory } from 'react-router-dom';
import TitledBox from '../components/Common/TitledBox';
import {sequentialStringSearch} from '../helpers/common'

import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';


function AccountsList() {
  const {dashboardStore} = useContext(StoreContext);
  const [textPattern, setTextPattern] = useState("");
  const history = useHistory();

  useEffect(() => {
    dashboardStore.reloadData();
  }, [dashboardStore])


  return (
    <TitledBox title="Accounts">
      <Box>
        <TextField  id="search-text" label="Type for searching..." fullWidth
          value={textPattern}
          onChange={e => setTextPattern(e.target.value)} />

        <List style={{
          height:'400px',
          overflowY:'scroll',
        }}>
          {dashboardStore.accounts.filter(account => sequentialStringSearch(textPattern, account.name) ).map(account => {
              return (
                <ListItem
                  key={account.id}
                  style={{cursor:"pointer"}}
                  onClick={() => history.push(`/accounts/${account.id}`)}>
                  <ListItemText primary={account.name}/>
                  <ListItemSecondaryAction>
                    <Box component="b">$ {parseFloat(account.amount).toFixed(2)}</Box>
                  </ListItemSecondaryAction>
                </ListItem>
              )
          })}

        </List>
      </Box>
    </TitledBox>
  );
}

export default observer(AccountsList);
