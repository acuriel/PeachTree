import React, {useContext} from 'react';
import { Button, TextField, Box } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { observer } from "mobx-react";
import StoreContext from "../stores/RootStore";
import TitledBox from '../components/Common/TitledBox';

const filter = createFilterOptions();

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: "0px 20px 10px 20px",
    '& .MuiTextField-root': {
      marginBottom: '20px',
    },
  }
}));

function AddTransaction() {
  const {dashboardStore} = useContext(StoreContext);
  const classes = useStyles();

  return (
    <TitledBox title="Make a transaction" padded>
      <Box className={classes.root}>
        <Autocomplete
          required
          fullWidth
          id="account"
          value={dashboardStore.newTransaction.account}
          onChange={(e, newValue) => {
            if(!newValue) return;
            if (newValue.inputValue) {
              dashboardStore.addAccountFromForm(newValue.inputValue)
            } else {
              dashboardStore.newTransaction.account = newValue
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            // Suggest the creation of a new value
            if (params.inputValue !== '') {
              filtered.push({
                inputValue: params.inputValue,
                name:params.inputValue,
                showLabel: `Add "${params.inputValue}"`,
              });
            }

            return filtered;
          }}
          options={dashboardStore.accounts}
          getOptionLabel={(option) => option.name}
          renderOption={option => option.showLabel || option.name}
          renderInput={(params) => <TextField {...params} label="Account" />}
        />
        {/*TODO: refactor these 2 autocompletes. Too much code in common*/}
        <Autocomplete
          fullWidth
          id="cotnractor"
          value={dashboardStore.newTransaction.contractor}
          onChange={(e, newValue) => {
            if(!newValue) return;
            if (newValue.inputValue) {
              dashboardStore.addContractorFromForm(newValue.inputValue)
            } else {
              dashboardStore.newTransaction.contractor = newValue
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            // Suggest the creation of a new value
            if (params.inputValue !== '') {
              filtered.push({
                inputValue: params.inputValue,
                name:params.inputValue,
                showLabel: `Add "${params.inputValue}"`,
              });
            }
            return filtered;
          }}
          options={dashboardStore.contractors}
          getOptionLabel={(option) => option.name}
          renderOption={option => option.showLabel || option.name}
          renderInput={(params) => <TextField {...params} label="Contractor" />}
        />
        <TextField fullWidth id="account"
          value={dashboardStore.newTransaction.amount}
          onChange={e => dashboardStore.newTransaction.amount = e.target.value}
          type="number"
          label="Standard" />
        <Button variant="contained" color="primary" fullWidth onClick={() => dashboardStore.addTransaction()}>
          Add
        </Button>
      </Box>
    </TitledBox>
  );
}

export default observer(AddTransaction);
