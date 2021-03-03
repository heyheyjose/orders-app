import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router/immutable';
import configureStore, { history } from './state/configureStore';
import './index.css';
import Login from './Login';
import Orders from './Orders';

const store = configureStore();

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/orders" component={Orders} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
