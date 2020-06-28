import React, {useEffect, useState, useContext} from 'react';
import { Box, IconButton } from '@material-ui/core';
import { AccountBalance, AttachMoney, Today, FlightTakeoff, FlightLand, Schedule } from '@material-ui/icons';
import TitledBox from '../components/Common/TitledBox';
import { Link } from 'react-router-dom';
import { observer } from "mobx-react";
import StoreContext from "../stores/RootStore";


const HorizontalLine = () => <Box
  border="3px solid #dddd"
  style={{padding:"0"}}
  maxWidth="250px"
  flexGrow={1}
  height="0px"
  alignSelf="center"/>;

function TransactionDetails({match}) {
  const [transaction, setTransaction] = useState(undefined)
  const {dashboardStore} = useContext(StoreContext);

  useEffect(() => {
    dashboardStore.reloadData().then(() => {
      const result = dashboardStore.transactions.filter(t => {
        return t.id === parseInt(match.params.id);
      })
      if(result.length > 0){
        setTransaction(result[0])
      }
    })
  }, [dashboardStore, match.params.id]);

  return transaction && (
    <TitledBox title="Transaction Details" padded>
      <Box>
        <h2 style={{ float: "right" }}><AttachMoney /> {transaction.amount} </h2>
        <h2>{transaction.contractor.name} </h2>
        <Link to={"/accounts/" + transaction.account.id}><h5><AccountBalance /> {transaction.account.name} </h5></Link>
        <h5><Today /> {transaction.creation_date.toDateString()} </h5>

        <Box display="flex" flexDirection="row" justifyContent="space-around" >
          <Box>
            <IconButton color="primary" title="Set to Sent" onClick={() => transaction.updateStatus('sent')}>
              <FlightTakeoff fontSize="large" />
            </IconButton>
          </Box>
          <HorizontalLine/>
          <Box>
            <IconButton onClick={() => transaction.updateStatus('received')} color={transaction.status !== "sent" ? "primary" : "default"} title="Set to Received">
              <Schedule fontSize="large" />
            </IconButton>
          </Box>
          <HorizontalLine/>
          <Box>
            <IconButton onClick={() => transaction.updateStatus('payed')} color={transaction.status === "payed" ? "primary" : "default"} title="Set to Payed">
              <FlightLand fontSize="large"/>
            </IconButton>
          </Box>
        </Box>
      </Box>
    </TitledBox>
  );
}

export default observer(TransactionDetails);
