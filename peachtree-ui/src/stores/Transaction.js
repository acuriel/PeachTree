import {observable, action, runInAction, decorate} from 'mobx'
import BaseStore from './BaseStore';
import TransactionsService from '../services/TransactionsService';

export default class Transaction extends BaseStore{
  id=undefined;
  account = null;
  contractor = null;
  amount = 0;
  status = "sent";
  creation_date = undefined;
  modification_date = undefined;

  constructor(rootStore, transaction){
    super(rootStore);
    if(transaction){
      this.id = transaction.id;
      this.account = transaction.account || null;
      this.contractor = transaction.contractor || null;
      this.amount = transaction.amount || 0;
      this.status = transaction.status || "sent";
      this.creation_date = new Date(transaction.creation_date);
      this.modification_date = new Date(transaction.modification_date);
    }
  }

  updateStatus = async(newStatus) => {
    try {
      await TransactionsService.partialUpdate(this.id, {status: newStatus});
      runInAction(() => {
        this.status = newStatus;
        console.log(this.status);
      })
    } catch (error) {
      console.log(error)
    }
  }

  reset(){
    this.account =  null;
    this.contractor =  null;
    this.amount =  0;
  }

}

decorate(Transaction, {
  account: observable,
  contractor: observable,
  amount: observable,
  status: observable,
  creation_date: observable,
  modification_date: observable,
  updateStatus: action,
  reset:action,
})
