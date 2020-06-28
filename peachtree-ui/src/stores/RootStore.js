import React from 'react';
import AuthStore from './AuthStore';
import DashboardStore from './DashboardStore';


class RootStoreClass {
  constructor() {
    this.dashboardStore = new DashboardStore(this);
    this.authStore= new AuthStore(this);
  }
}

export const RootStore =  new RootStoreClass();

const StoreContext = React.createContext(RootStore);

export default StoreContext;
