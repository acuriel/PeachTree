import React from 'react';
import Dashboard from './views/Dashboard';
import Auth from './views/Auth';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import StoreContext, {RootStore} from './stores/RootStore'
import { createBrowserHistory } from "history";
import NavigationBar from './components/NavigationBar/NavigationBar';

export const history = createBrowserHistory();


function App() {
  return (
    <StoreContext.Provider value={RootStore}>
      <Router history={history}>
        <NavigationBar/>
        <Switch>
          <Route path="/auth" component={Auth}/>
          <Route path="/" component={Dashboard}/>
        </Switch>
      </Router>
    </StoreContext.Provider>
  );
}

export default App;
