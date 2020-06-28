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
} from '@material-ui/core';


function ContractorsList() {
  const {dashboardStore} = useContext(StoreContext);
  const [textPattern, setTextPattern] = useState("");
  const history = useHistory();

  useEffect(() => {
    dashboardStore.reloadData();
  }, [dashboardStore])


  return (
    <TitledBox title="Contractors">
      <Box>
        <TextField  id="search-text" label="Type for searching..." fullWidth
          value={textPattern}
          onChange={e => setTextPattern(e.target.value)} />

        <List style={{
          height:'400px',
          overflowY:'scroll',
        }}>
          {dashboardStore.contractors.filter(contractor => sequentialStringSearch(textPattern, contractor.name) ).map(contractor => {
              return (
                <ListItem
                  key={contractor.id}
                  style={{cursor:"pointer"}}
                  onClick={() => history.push(`/contractors/${contractor.id}`)}>
                  <ListItemText primary={contractor.name}/>
                </ListItem>
              )
          })}

        </List>
      </Box>
    </TitledBox>
  );
}

export default observer(ContractorsList);
