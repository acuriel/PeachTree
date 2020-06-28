import React, {useContext, useState, useEffect} from 'react';
import { observer } from "mobx-react";
import StoreContext from "../stores/RootStore";
import { useHistory } from 'react-router-dom';
import TitledBox from '../components/Common/TitledBox';

import {
  Box,
  Button,
  ButtonGroup,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';


const STATUS_TO_COLOR = {
  "sent": "red",
  "received": "orange",
  "payed": "green",
}



function TransactionHistory() {
  const {dashboardStore} = useContext(StoreContext);
  const [textPattern, setTextPattern] = useState("");
  const [showPayedTransactions, setShowPayedTransactions] = useState(false);
  const [sortingParam, setSortingParam] = useState("date")
  const [sortingDirection, setSortingDirection] = useState(1)
  const history = useHistory();

  useEffect(() => {
    dashboardStore.reloadData();
  }, [dashboardStore])

  const getButtonProperties = activeWhen =>
    sortingParam === activeWhen
      ? {variant : "contained", endIcon: sortingDirection > 0 ? <ExpandMore/> : <ExpandLess/>}
      : {variant: "outlined"};

  const handleSortingButtonClick = (param, defaultDir=1) => {
    return () => {
      if(sortingParam === param){
        setSortingDirection(-1 * sortingDirection);
      }else{
        setSortingParam(param);
        setSortingDirection(defaultDir);
      }
    }
  }

  return (
    <TitledBox title="Transactions History">
      <Box>
        <FormControlLabel
            style={{float:"right", marginTop:"-60px", marginRight: "10px"}}
            control={
              <Switch
                checked={showPayedTransactions}
                onChange={e => setShowPayedTransactions(e.target.checked)}
                name="show-payed"
                color="primary"
              />
            }
            label="Show payed transactions"
            labelPlacement="start"
          />
        <Box display="flex" flexDirection="row" justifyContent="space-between" style={{padding:"0 20px"}}>
          <Box flexGrow={1}>
            <TextField fullWidth id="search-text" label="Type for searching..."
              value={textPattern}
              onChange={e => setTextPattern(e.target.value)} />
          </Box>
          <Box>
            <ButtonGroup color="secondary">
                <Button {...getButtonProperties("date")}
                  onClick={handleSortingButtonClick("date")}>
                    Date
                </Button>
                <Button {...getButtonProperties("contractor")}
                  onClick={handleSortingButtonClick("contractor")}>
                    Contractor
                </Button>
                <Button {...getButtonProperties("amount")}
                  onClick={handleSortingButtonClick("amount")}>
                    Amount
                </Button>
              </ButtonGroup>
            </Box>
          </Box>

        <List style={{
          height:'400px',
          overflowY:'scroll',
        }}>
          {dashboardStore.processedTransactions(
              textPattern,
              showPayedTransactions,
              sortingParam,
              sortingDirection
            )
            .map(transaction => {
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
      </Box>
    </TitledBox>
  );
}

export default observer(TransactionHistory);
