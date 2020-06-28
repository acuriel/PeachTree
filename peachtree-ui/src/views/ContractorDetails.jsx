import React, {useEffect, useState, useContext} from 'react';
import { Box, Tabs, Tab } from '@material-ui/core';
import TitledBox from '../components/Common/TitledBox';
import TabPanel from '../components/Common/TabPanel';
import TransactionList from '../components/TransactionList/TransactionList';
import { observer } from "mobx-react";
import StoreContext from "../stores/RootStore";


function ContractorDetails({match}) {
  const [contractor, setContractor] = useState(undefined)
  const {dashboardStore} = useContext(StoreContext);
  const [tabPos, setTabPos] = useState(0)

  useEffect(() => {
    dashboardStore.reloadData().then(() => {
      const result = dashboardStore.contractors.filter(contractor => {
        return contractor.id === parseInt(match.params.id)
      })
      if(result.length > 0){
        setContractor(result[0])
      }
    });
  }, [dashboardStore, match.params.id]);

  return contractor && (
    <TitledBox title="Contractor Details" padded>
      <Box>
        <h2>{contractor.name} </h2>
        <Tabs
          value={tabPos}
          indicatorColor="primary"
          textColor="primary" variant="fullWidth"
          onChange={(event, newValue) => setTabPos(newValue)}
          aria-label="disabled tabs example"
        >
          <Tab label="Sent"/>
          <Tab label="Received"/>
          <Tab label="Payed"/>
        </Tabs>
        <TabPanel value={tabPos} index={0}>
          <TransactionList transactions={dashboardStore.transactions.filter(
            (transaction) => transaction.contractor.id === contractor.id && transaction.status==="sent")}
            />
        </TabPanel>
        <TabPanel value={tabPos} index={1}>
          <TransactionList transactions={dashboardStore.transactions.filter(
            (transaction) => transaction.contractor.id === contractor.id && transaction.status==="received")}
            />
        </TabPanel>
        <TabPanel value={tabPos} index={2}>
          <TransactionList transactions={dashboardStore.transactions.filter(
            (transaction) => transaction.contractor.id === contractor.id && transaction.status==="payed")}
            />
        </TabPanel>
      </Box>
    </TitledBox>
  );
}

export default observer(ContractorDetails);
