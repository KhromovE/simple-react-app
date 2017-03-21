import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// Containers
import AppContainer from './containers/App';
import DashBoardContainer from './containers/Dashboard';

// Components
import AddDealComponent from './components/AddDeal';
import DealsList from './components/DealsList';

export default (
  <Router history={browserHistory}>
    <Route component={AppContainer}>
      <Route component={DashBoardContainer}>
        <Route path="/add-deal" component={AddDealComponent} />
        <Route path="*" component={DealsList} />
      </Route>
    </Route>
  </Router>
);
