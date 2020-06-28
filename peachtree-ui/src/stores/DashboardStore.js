import {observable, action, runInAction, decorate} from 'mobx'
import BaseStore from './BaseStore';
import Transaction from './Transaction';
import TransactionsService from '../services/TransactionsService';
import AccountsService from '../services/AccountsService';
import ContractorsService from '../services/ContractorsService';
import {sequentialStringSearch} from '../helpers/common'


export default class DashboardStore extends BaseStore{
  transactions = [];
  accounts = [];
  contractors = [];
  newTransaction = new Transaction();
  newAccount = "";
  newContractor = "";

  constructor(rootStore){
    super(rootStore);
    this.reloadData();
    if(this.accounts.length > 0 && this.contractors.length > 0){

      this.newTransaction = new Transaction(rootStore, this.accounts[0], this.contractors[0])
    }
  }

  reloadData = async () => {
    await this._loadTransactions();
    await this._loadAccounts();
    await this._loadContractors();
  }

  _loadTransactions = async() => {
    try {
      const res = await TransactionsService.getAll();
      runInAction(() => {
        this.transactions.replace(res.data.map(t => new Transaction(this.rootStore, t)));
      })
    } catch (error) {
      console.log(error);
    }
  }

  _loadAccounts = async() => {
    try {
      const res = await AccountsService.getAll();
      runInAction(() => {
        this.accounts.replace(res.data)
      })
    } catch (error) {
      console.log(error);
    }
  }

  _loadContractors = async() => {
    try {
      const res = await ContractorsService.getAll();
      runInAction(() => {
        this.contractors.replace(res.data)
      })
    } catch (error) {
      console.log(error);
    }
  }

  addTransaction = async () => {
    try {
      console.log(this.newTransaction);
      await TransactionsService.create({
        contractor: this.newTransaction.contractor.id,
        account: this.newTransaction.account.id,
        amount: this.newTransaction.amount
      });
      this._loadTransactions();
      runInAction(() => {
        this.newTransaction.reset();
      })
    } catch (error) {
      console.log(error);
    }
  }

  elementByNameCreator = (text, service, loader) => {
    return async (name) => {
      try {
        if(name.length === 0){
          throw new Error(`The ${text} name is required`)
        }
        const res = await service.create({name: name});
        loader();
        return res;
      } catch (error) {
        console.log(error);
      }
    }
  }

  addAccount = this.elementByNameCreator("account", AccountsService, () => this._loadAccounts());

  addAccountFromForm = async (name) => {
    try {
      const res = await this.addAccount(name);
      runInAction(() => {
        this.newTransaction.account = res.data;
      })
    } catch (error) {
      console.log(error)
    }
  }

  addContractor = this.elementByNameCreator("contractor", ContractorsService, () => this._loadContractors());

  addContractorFromForm = async (name) => {
    try {
      const res = await this.addContractor(name);
      runInAction(() => {
        this.newTransaction.contractor = res.data;
      })
    } catch (error) {
      console.log(error)
    }
  }

  processedTransactions(pattern, showPayed, sortBy, direction){
    const getSortParamFuncs = {
      "date": t => t.creation_date,
      "contractor": t => t.contractor.name,
      "amount": t => t.amount
    }
    const getSortParam = getSortParamFuncs[sortBy];
    return this.transactions
      .filter(transaction => (showPayed || transaction.status !== "payed") && sequentialStringSearch(pattern, transaction.contractor.name))
      .sort((t1,t2) => direction * (getSortParam(t1) < getSortParam(t2) ? 1 : -1))
  }
}

decorate(DashboardStore, {
  transactions: observable,
  accounts: observable,
  contractors: observable,
  newAccount: observable,
  newContractor: observable,
  _loadTransactions: action,
  _loadAccounts: action,
  _loadContractors: action,
  addTransaction: action,
  addAccountFromForm: action,
})
