import React, {useEffect, useState, useContext} from 'react';
import { Box, Tabs, Tab } from '@material-ui/core';
import { AttachMoney } from '@material-ui/icons';
import TitledBox from '../components/Common/TitledBox';
import TabPanel from '../components/Common/TabPanel';
import TransactionList from '../components/TransactionList/TransactionList';
import { observer } from "mobx-react";
import StoreContext from "../stores/RootStore";


function AccountDetails({match}) {
  const [account, setAccount] = useState(undefined)
  const {dashboardStore} = useContext(StoreContext);
  const [tabPos, setTabPos] = useState(0)

  useEffect(() => {
    dashboardStore.reloadData().then(() => {
      const result = dashboardStore.accounts.filter(account => {
        return account.id === parseInt(match.params.id)
      })
      if(result.length > 0){
        setAccount(result[0])
      }
    });
  }, [dashboardStore, match.params.id]);

  return account && (
    <TitledBox title="Account Details" padded>
      <Box>
        <h2 style={{ float: "right" }}><AttachMoney /> {account.amount} </h2>
        <h2>{account.name} </h2>
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
            (transaction) => transaction.account.id === account.id && transaction.status==="sent")}
            />
        </TabPanel>
        <TabPanel value={tabPos} index={1}>
          <TransactionList transactions={dashboardStore.transactions.filter(
            (transaction) => transaction.account.id === account.id && transaction.status==="received")}
            />
        </TabPanel>
        <TabPanel value={tabPos} index={2}>
          <TransactionList transactions={dashboardStore.transactions.filter(
            (transaction) => transaction.account.id === account.id && transaction.status==="payed")}
            />
        </TabPanel>
      </Box>
    </TitledBox>
  );
}

export default observer(AccountDetails);
