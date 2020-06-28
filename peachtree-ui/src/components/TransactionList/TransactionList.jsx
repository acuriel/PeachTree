import React from 'react';
import { observer } from "mobx-react";
import { useHistory } from 'react-router-dom';

import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
} from '@material-ui/core';


const STATUS_TO_COLOR = {
  "sent": "red",
  "received": "orange",
  "payed": "green",
}

function TransactionList({transactions, ...params}) {
  console.log("Hey")
  const history = useHistory();
  return (
    <List style={{
      height:'400px',
      overflowY:'auto',
    }}>
      {transactions.map(transaction => {
          return (
            <ListItem
              key={transaction.id}
              style={{
                cursor:"pointer",
                borderLeft:"5px solid " + STATUS_TO_COLOR[transaction.status]}}
              onClick={() => history.push(`/transactions/${transaction.id}`)}>
              <ListItemAvatar>
                <Avatar  variant="square">
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={transaction.contractor.name} secondary={transaction.creation_date.toDateString()} />
              <ListItemSecondaryAction>
                <Box component="b">$ {parseFloat(transaction.amount).toFixed(2)}</Box>
              </ListItemSecondaryAction>
            </ListItem>
          )
      })}
    </List>
  );
}

export default observer(TransactionList);
